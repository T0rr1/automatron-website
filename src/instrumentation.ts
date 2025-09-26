export async function register() {
  // Skip Sentry initialization if DSN is not properly configured
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN.includes('your_')) {
    console.log('Sentry DSN not configured, skipping initialization');
    return;
  }

  try {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      // Server-side instrumentation
      const { init } = await import('@sentry/nextjs');
      
      init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false, // Disable debug to avoid bundle issues
        environment: process.env.NODE_ENV,
        release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      });
    }

    if (process.env.NEXT_RUNTIME === 'edge') {
      // Edge runtime instrumentation
      const { init } = await import('@sentry/nextjs');
      
      init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false,
        environment: process.env.NODE_ENV,
        release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      });
    }
  } catch (error) {
    console.warn('Failed to initialize Sentry:', error);
  }
}