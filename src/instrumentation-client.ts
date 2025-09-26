// Skip Sentry initialization if DSN is not properly configured
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN.includes('your_')) {
  try {
    import('@sentry/nextjs').then((Sentry) => {
      Sentry.init({
        dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
        debug: false, // Disable debug to avoid bundle issues
        environment: process.env.NODE_ENV,
        release: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      });
    });
  } catch (error) {
    console.warn('Failed to initialize Sentry on client:', error);
  }
}

// Export router transition hook for navigation instrumentation
export const onRouterTransitionStart = () => {};