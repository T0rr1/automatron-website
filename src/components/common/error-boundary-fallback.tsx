'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { captureError, ErrorType, ErrorSeverity } from '@/lib/error-monitoring';

interface ErrorBoundaryFallbackProps {
  error: Error;
  resetError: () => void;
  componentName?: string;
  customMessage?: string;
}

export const ErrorBoundaryFallback: React.FC<ErrorBoundaryFallbackProps> = ({
  error,
  resetError,
  componentName = 'Component',
  customMessage,
}) => {
  React.useEffect(() => {
    // Capture error with component context
    captureError(error, ErrorType.CLIENT, ErrorSeverity.HIGH, {
      component: componentName,
      boundaryType: 'react_error_boundary',
    });
  }, [error, componentName]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="h-8 w-8 text-destructive mb-3" />
      <h3 className="text-lg font-semibold text-destructive mb-2">
        {customMessage || `Error in ${componentName}`}
      </h3>
      <p className="text-muted-foreground mb-4">
        Something went wrong while loading this component.
      </p>
      <Button onClick={resetError} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

// Helper function to create error boundary fallbacks
export function createErrorBoundaryFallback(
  componentName: string,
  customMessage?: string
) {
  return function CustomErrorFallback({ error, resetError }: {
    error: Error;
    resetError: () => void;
  }) {
    return (
      <ErrorBoundaryFallback
        error={error}
        resetError={resetError}
        componentName={componentName}
        customMessage={customMessage}
      />
    );
  };
}