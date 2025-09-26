'use client';

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { errorMonitor } from '@/lib/error-monitoring';

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
  locale?: string;
}

export function ClientErrorBoundary({ children, locale }: ClientErrorBoundaryProps) {
  const handleError = React.useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    errorMonitor.captureError(error, {
      component: 'RootLayout',
      locale,
      errorInfo: errorInfo.componentStack,
    });
  }, [locale]);

  return (
    <ErrorBoundary onError={handleError}>
      {children}
    </ErrorBoundary>
  );
}