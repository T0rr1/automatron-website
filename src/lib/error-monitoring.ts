import * as Sentry from '@sentry/nextjs';

// Error types for categorization
export enum ErrorType {
  NETWORK = 'network',
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  SERVER = 'server',
  CLIENT = 'client',
  TIMEOUT = 'timeout',
  RATE_LIMIT = 'rate_limit',
  FILE_UPLOAD = 'file_upload',
  FORM_SUBMISSION = 'form_submission',
  API_CALL = 'api_call',
  UNKNOWN = 'unknown',
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Error context interface
interface ErrorContext {
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  url?: string;
  component?: string;
  action?: string;
  formData?: Record<string, any>;
  apiEndpoint?: string;
  requestId?: string;
  [key: string]: any;
}

// Enhanced error class
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly severity: ErrorSeverity;
  public readonly context: ErrorContext;
  public readonly timestamp: number;
  public readonly userFriendly: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    context: ErrorContext = {},
    userFriendly: boolean = false
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.severity = severity;
    this.context = context;
    this.timestamp = Date.now();
    this.userFriendly = userFriendly;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }
}

// Error monitoring service
export class ErrorMonitoringService {
  private static instance: ErrorMonitoringService;
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): ErrorMonitoringService {
    if (!ErrorMonitoringService.instance) {
      ErrorMonitoringService.instance = new ErrorMonitoringService();
    }
    return ErrorMonitoringService.instance;
  }

  public initialize() {
    if (this.isInitialized) return;

    // Set up global error handlers
    if (typeof window !== 'undefined') {
      // Handle unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError(
          new AppError(
            event.reason?.message || 'Unhandled promise rejection',
            ErrorType.CLIENT,
            ErrorSeverity.HIGH,
            {
              reason: event.reason,
              promise: event.promise,
            }
          )
        );
      });

      // Handle global errors
      window.addEventListener('error', (event) => {
        this.captureError(
          new AppError(
            event.message || 'Global error',
            ErrorType.CLIENT,
            ErrorSeverity.HIGH,
            {
              filename: event.filename,
              lineno: event.lineno,
              colno: event.colno,
              error: event.error,
            }
          )
        );
      });
    }

    this.isInitialized = true;
  }

  public captureError(
    error: Error | AppError,
    additionalContext: ErrorContext = {}
  ): string {
    const appError = error instanceof AppError ? error : this.normalizeError(error);
    const context = { ...appError.context, ...additionalContext };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group(`🚨 ${appError.type.toUpperCase()} ERROR`);
      console.error('Message:', appError.message);
      console.error('Type:', appError.type);
      console.error('Severity:', appError.severity);
      console.error('Context:', context);
      console.error('Stack:', appError.stack);
      console.groupEnd();
    }

    // Send to Sentry
    const eventId = Sentry.captureException(appError, {
      tags: {
        errorType: appError.type,
        severity: appError.severity,
        userFriendly: appError.userFriendly.toString(),
      },
      extra: {
        ...context,
        timestamp: appError.timestamp,
      },
      level: this.mapSeverityToSentryLevel(appError.severity),
    });

    return eventId;
  }

  public captureMessage(
    message: string,
    level: ErrorSeverity = ErrorSeverity.LOW,
    context: ErrorContext = {}
  ): string {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📝 ${level.toUpperCase()}:`, message, context);
    }

    return Sentry.captureMessage(message, {
      level: this.mapSeverityToSentryLevel(level),
      extra: context,
    });
  }

  public setUserContext(user: {
    id?: string;
    email?: string;
    username?: string;
    [key: string]: any;
  }) {
    Sentry.setUser(user);
  }

  public setContext(key: string, context: Record<string, any>) {
    Sentry.setContext(key, context);
  }

  public addBreadcrumb(
    message: string,
    category: string = 'custom',
    level: 'debug' | 'info' | 'warning' | 'error' = 'info',
    data: Record<string, any> = {}
  ) {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      data,
      timestamp: Date.now() / 1000,
    });
  }

  private normalizeError(error: Error): AppError {
    const message = error.message || 'Unknown error';
    let type = ErrorType.UNKNOWN;
    let severity = ErrorSeverity.MEDIUM;

    // Categorize error based on message content
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('network') || lowerMessage.includes('fetch')) {
      type = ErrorType.NETWORK;
      severity = ErrorSeverity.HIGH;
    } else if (lowerMessage.includes('timeout')) {
      type = ErrorType.TIMEOUT;
      severity = ErrorSeverity.HIGH;
    } else if (lowerMessage.includes('validation') || lowerMessage.includes('invalid')) {
      type = ErrorType.VALIDATION;
      severity = ErrorSeverity.LOW;
    } else if (lowerMessage.includes('unauthorized') || lowerMessage.includes('401')) {
      type = ErrorType.AUTHENTICATION;
      severity = ErrorSeverity.MEDIUM;
    } else if (lowerMessage.includes('forbidden') || lowerMessage.includes('403')) {
      type = ErrorType.AUTHORIZATION;
      severity = ErrorSeverity.MEDIUM;
    } else if (lowerMessage.includes('not found') || lowerMessage.includes('404')) {
      type = ErrorType.NOT_FOUND;
      severity = ErrorSeverity.LOW;
    } else if (lowerMessage.includes('rate limit')) {
      type = ErrorType.RATE_LIMIT;
      severity = ErrorSeverity.MEDIUM;
    } else if (lowerMessage.includes('server') || lowerMessage.includes('500')) {
      type = ErrorType.SERVER;
      severity = ErrorSeverity.HIGH;
    }

    return new AppError(message, type, severity, {
      originalError: error.name,
      stack: error.stack,
    });
  }

  private mapSeverityToSentryLevel(severity: ErrorSeverity): Sentry.SeverityLevel {
    switch (severity) {
      case ErrorSeverity.LOW:
        return 'info';
      case ErrorSeverity.MEDIUM:
        return 'warning';
      case ErrorSeverity.HIGH:
        return 'error';
      case ErrorSeverity.CRITICAL:
        return 'fatal';
      default:
        return 'error';
    }
  }
}

// Convenience functions
export const errorMonitor = ErrorMonitoringService.getInstance();

export function captureError(
  error: Error | string,
  type?: ErrorType,
  severity?: ErrorSeverity,
  context?: ErrorContext
): string {
  const appError = typeof error === 'string' 
    ? new AppError(error, type, severity, context)
    : error;
  
  return errorMonitor.captureError(appError, context);
}

export function captureMessage(
  message: string,
  level?: ErrorSeverity,
  context?: ErrorContext
): string {
  return errorMonitor.captureMessage(message, level, context);
}

export function addBreadcrumb(
  message: string,
  category?: string,
  level?: 'debug' | 'info' | 'warning' | 'error',
  data?: Record<string, any>
) {
  errorMonitor.addBreadcrumb(message, category, level, data);
}

// Error boundary helpers - moved to separate component file
// Import createErrorBoundaryFallback from '@/components/common/error-boundary-fallback'

// Initialize error monitoring
if (typeof window !== 'undefined') {
  errorMonitor.initialize();
}