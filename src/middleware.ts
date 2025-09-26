import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales } from './i18n';
import { rateLimit, getRateLimitHeaders } from './lib/rate-limit';
import { generateCSP, SECURITY_HEADERS, PRODUCTION_HEADERS } from './lib/config/security';

// Create the internationalization middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always show the locale in the URL
  localePrefix: 'always'
});

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  
  // Generate nonce for CSP
  const nonce = crypto.randomUUID();
  
  // Apply security headers
  applySecurityHeaders(response, nonce);
  
  // Apply rate limiting for API routes and form submissions
  if (request.nextUrl.pathname.startsWith('/api/') || 
      request.nextUrl.pathname.includes('/contact')) {
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Too many requests. Please wait a moment and try again.',
          retryAfter: rateLimitResult.retryAfter 
        }),
        { 
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            ...getRateLimitHeaders(rateLimitResult),
            ...SECURITY_HEADERS
          }
        }
      );
    }
  }
  
  // Pass nonce to the response for use in components
  response.headers.set('X-Nonce', nonce);
  
  return response;
}

function applySecurityHeaders(response: NextResponse, nonce: string) {
  // Apply CSP with nonce
  const csp = generateCSP(nonce);
  response.headers.set('Content-Security-Policy', csp);
  
  // Apply standard security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  
  // Apply production-only headers
  if (process.env.NODE_ENV === 'production') {
    Object.entries(PRODUCTION_HEADERS).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }
  
  // Secure cookie settings
  const existingCookie = response.headers.get('Set-Cookie');
  if (existingCookie) {
    const secureCookie = existingCookie
      .replace(/SameSite=\w+/g, 'SameSite=Strict')
      .replace(/(?<!Secure)(;|$)/g, '; Secure$1');
    response.headers.set('Set-Cookie', secureCookie);
  }
}

export const config = {
  // Match all routes except static files and Next.js internals
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(es|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // Include API routes for rate limiting
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};