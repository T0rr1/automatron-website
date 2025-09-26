import { NextRequest } from 'next/server';

// In-memory store for rate limiting (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = process.env.NODE_ENV === 'development' ? 20 : 5; // More lenient in development

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter?: number;
}

export async function rateLimit(request: NextRequest): Promise<RateLimitResult> {
  // Get client IP address
  const ip = getClientIP(request);
  const now = Date.now();
  const key = `rate_limit:${ip}`;
  
  // Clean up expired entries
  cleanupExpiredEntries(now);
  
  // Get current rate limit data
  const current = rateLimitStore.get(key);
  
  if (!current || now > current.resetTime) {
    // First request or window expired, create new entry
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    
    return {
      success: true,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      reset: now + RATE_LIMIT_WINDOW
    };
  }
  
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    // Rate limit exceeded
    return {
      success: false,
      limit: RATE_LIMIT_MAX_REQUESTS,
      remaining: 0,
      reset: current.resetTime,
      retryAfter: Math.ceil((current.resetTime - now) / 1000)
    };
  }
  
  // Increment counter
  current.count++;
  rateLimitStore.set(key, current);
  
  return {
    success: true,
    limit: RATE_LIMIT_MAX_REQUESTS,
    remaining: RATE_LIMIT_MAX_REQUESTS - current.count,
    reset: current.resetTime
  };
}

function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (for proxies/CDNs)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (cfConnectingIP) return cfConnectingIP;
  if (realIP) return realIP;
  if (forwarded) return forwarded.split(',')[0].trim();
  
  // Fallback - Edge Runtime doesn't have request.ip
  return 'unknown';
}

function cleanupExpiredEntries(now: number) {
  // Clean up expired entries to prevent memory leaks
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Helper function to check if request is rate limited
export function isRateLimited(result: RateLimitResult): boolean {
  return !result.success;
}

// Helper function to get rate limit headers
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.toString(),
    ...(result.retryAfter && { 'Retry-After': result.retryAfter.toString() })
  };
}