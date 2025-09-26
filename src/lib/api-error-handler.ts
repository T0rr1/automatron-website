import { NextRequest, NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { ERROR_MESSAGES } from '@/lib/validations/common';

// API Error types
export enum ApiErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  METHOD_NOT_ALLOWED = 'METHOD_NOT_ALLOWED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  TIMEOUT = 'TIMEOUT',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
}

// API Error class
export class ApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: number;
  public readonly details?: any;

  constructor(
    message: string,
    code: ApiErrorCode,
    statusCode: number,
    details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

// Rate limiting store (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60000 // 1 minute
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = `rate_limit:${ip}`;
  const current = rateLimitStore.get(key);

  if (!current || now > current.resetTime) {
    // Reset or initialize
    const resetTime = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetTime });
    return { allowed: true, remaining: limit - 1, resetTime };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime };
  }

  // Increment count
  current.count++;
  rateLimitStore.set(key, current);
  
  return { 
    allowed: true, 
    remaining: limit - current.count, 
    resetTime: current.resetTime 
  };
}

// Get client IP address
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return request.ip || 'unknown';
}

// Validate request method
export function validateMethod(
  request: NextRequest,
  allowedMethods: string[]
): void {
  if (!allowedMethods.includes(request.method)) {
    throw new ApiError(
      `Method ${request.method} not allowed`,
      ApiErrorCode.METHOD_NOT_ALLOWED,
      405,
      { allowedMethods }
    );
  }
}

// Validate request body with Zod schema
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      throw new ApiError(
        'Validation failed',
        ApiErrorCode.VALIDATION_ERROR,
        400,
        { errors }
      );
    }
    
    return result.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    throw new ApiError(
      'Invalid JSON in request body',
      ApiErrorCode.BAD_REQUEST,
      400
    );
  }
}

// API response helpers
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  statusCode: number = 200
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode }
  );
}

export function createErrorResponse(
  error: ApiError | Error,
  request?: NextRequest
): NextResponse {
  let apiError: ApiError;
  
  if (error instanceof ApiError) {
    apiError = error;
  } else {
    // Convert generic error to ApiError
    apiError = new ApiError(
      error.message || 'Internal server error',
      ApiErrorCode.INTERNAL_SERVER_ERROR,
      500
    );
  }

  // Log error to Sentry
  const errorId = Sentry.captureException(error, {
    tags: {
      section: 'api_error',
      errorCode: apiError.code,
    },
    extra: {
      statusCode: apiError.statusCode,
      details: apiError.details,
      url: request?.url,
      method: request?.method,
      userAgent: request?.headers.get('user-agent'),
      ip: request ? getClientIP(request) : undefined,
    },
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('API Error:', {
      message: apiError.message,
      code: apiError.code,
      statusCode: apiError.statusCode,
      details: apiError.details,
      stack: apiError.stack,
    });
  }

  // Create user-friendly error message
  let userMessage = apiError.message;
  
  switch (apiError.code) {
    case ApiErrorCode.VALIDATION_ERROR:
      userMessage = ERROR_MESSAGES.VALIDATION_ERROR;
      break;
    case ApiErrorCode.RATE_LIMIT_EXCEEDED:
      userMessage = ERROR_MESSAGES.RATE_LIMIT_ERROR;
      break;
    case ApiErrorCode.INTERNAL_SERVER_ERROR:
      userMessage = ERROR_MESSAGES.SERVER_ERROR;
      break;
  }

  return NextResponse.json(
    {
      success: false,
      error: {
        code: apiError.code,
        message: userMessage,
        ...(process.env.NODE_ENV === 'development' && {
          details: apiError.details,
          originalMessage: apiError.message,
        }),
        ...(process.env.NODE_ENV === 'production' && {
          errorId,
        }),
      },
      timestamp: new Date().toISOString(),
    },
    { 
      status: apiError.statusCode,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// API route wrapper with error handling
export function withErrorHandling(
  handler: (request: NextRequest) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Add request ID for tracing
      const requestId = crypto.randomUUID();
      Sentry.setTag('requestId', requestId);
      
      // Add breadcrumb
      Sentry.addBreadcrumb({
        message: `API request: ${request.method} ${request.url}`,
        category: 'api',
        level: 'info',
        data: {
          method: request.method,
          url: request.url,
          userAgent: request.headers.get('user-agent'),
          ip: getClientIP(request),
        },
      });

      return await handler(request);
    } catch (error) {
      return createErrorResponse(
        error instanceof Error ? error : new Error(String(error)),
        request
      );
    }
  };
}

// Rate limiting middleware
export function withRateLimit(
  limit: number = 5,
  windowMs: number = 60000
) {
  return function (
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      const ip = getClientIP(request);
      const rateLimit = checkRateLimit(ip, limit, windowMs);
      
      if (!rateLimit.allowed) {
        throw new ApiError(
          'Rate limit exceeded',
          ApiErrorCode.RATE_LIMIT_EXCEEDED,
          429,
          {
            limit,
            windowMs,
            resetTime: rateLimit.resetTime,
          }
        );
      }
      
      const response = await handler(request);
      
      // Add rate limit headers
      response.headers.set('X-RateLimit-Limit', limit.toString());
      response.headers.set('X-RateLimit-Remaining', rateLimit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', rateLimit.resetTime.toString());
      
      return response;
    };
  };
}

// Method validation middleware
export function withMethodValidation(allowedMethods: string[]) {
  return function (
    handler: (request: NextRequest) => Promise<NextResponse>
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      validateMethod(request, allowedMethods);
      return handler(request);
    };
  };
}

// Compose multiple middlewares
export function compose(...middlewares: Array<(handler: any) => any>) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

// Common API route setup
export function createApiRoute(
  handler: (request: NextRequest) => Promise<NextResponse>,
  options: {
    methods?: string[];
    rateLimit?: { limit: number; windowMs: number };
  } = {}
) {
  const { methods = ['POST'], rateLimit } = options;
  
  let wrappedHandler = handler;
  
  // Apply middlewares
  if (rateLimit) {
    wrappedHandler = withRateLimit(rateLimit.limit, rateLimit.windowMs)(wrappedHandler);
  }
  
  wrappedHandler = withMethodValidation(methods)(wrappedHandler);
  wrappedHandler = withErrorHandling(wrappedHandler);
  
  return wrappedHandler;
}