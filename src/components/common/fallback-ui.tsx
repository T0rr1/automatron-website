'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertTriangle, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Clock, 
  FileX,
  Image as ImageIcon,
  Mail,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FallbackUIProps {
  className?: string;
  onRetry?: () => void;
  retryLabel?: string;
  showRetry?: boolean;
}

interface ErrorFallbackProps extends FallbackUIProps {
  error?: Error;
  title?: string;
  description?: string;
  variant?: 'default' | 'minimal' | 'card';
}

interface LoadingFallbackProps extends FallbackUIProps {
  title?: string;
  description?: string;
  variant?: 'spinner' | 'skeleton' | 'pulse';
}

// Generic Error Fallback
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  variant = 'default',
  className,
  onRetry,
  retryLabel = 'Try Again',
  showRetry = true,
}) => {
  const content = (
    <>
      <AlertTriangle className="h-8 w-8 text-destructive mb-3" />
      <h3 className="font-semibold text-destructive mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="mb-4 text-left">
          <summary className="cursor-pointer text-xs text-muted-foreground">
            Error Details (Development)
          </summary>
          <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-w-sm">
            {error.message}
          </pre>
        </details>
      )}
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {retryLabel}
        </Button>
      )}
    </>
  );

  if (variant === 'card') {
    return (
      <Card className={cn('w-full max-w-md mx-auto', className)}>
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          {content}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center gap-2 text-sm text-muted-foreground', className)}>
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span>{title}</span>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="ghost" size="sm" className="h-auto p-1">
            <RefreshCw className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      {content}
    </div>
  );
};

// Network Error Fallback
export const NetworkErrorFallback: React.FC<FallbackUIProps> = ({
  className,
  onRetry,
  retryLabel = 'Retry',
  showRetry = true,
}) => (
  <ErrorFallback
    title="Connection Problem"
    description="Unable to connect to the server. Please check your internet connection and try again."
    className={className}
    onRetry={onRetry}
    retryLabel={retryLabel}
    showRetry={showRetry}
  />
);

// Timeout Error Fallback
export const TimeoutErrorFallback: React.FC<FallbackUIProps> = ({
  className,
  onRetry,
  retryLabel = 'Try Again',
  showRetry = true,
}) => (
  <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
    <Clock className="h-8 w-8 text-warning mb-3" />
    <h3 className="font-semibold text-warning mb-2">Request Timed Out</h3>
    <p className="text-sm text-muted-foreground mb-4 max-w-sm">
      The request took too long to complete. Please try again.
    </p>
    {showRetry && onRetry && (
      <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="h-4 w-4" />
        {retryLabel}
      </Button>
    )}
  </div>
);

// Loading Fallback with different variants
export const LoadingFallback: React.FC<LoadingFallbackProps> = ({
  title = 'Loading...',
  description,
  variant = 'spinner',
  className,
}) => {
  if (variant === 'skeleton') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={cn('bg-muted rounded-lg animate-pulse', className)} 
           style={{ minHeight: '200px' }} />
    );
  }

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3" />
      <h3 className="font-medium mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

// Specific fallbacks for different content types
export const ImageLoadErrorFallback: React.FC<FallbackUIProps> = ({
  className,
  onRetry,
}) => (
  <div className={cn('flex flex-col items-center justify-center bg-muted rounded-lg p-4 min-h-[200px]', className)}>
    <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground mb-3">Failed to load image</p>
    {onRetry && (
      <Button onClick={onRetry} variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        Retry
      </Button>
    )}
  </div>
);

export const FormSubmissionErrorFallback: React.FC<FallbackUIProps & { 
  isNetworkError?: boolean;
}> = ({
  className,
  onRetry,
  isNetworkError = false,
}) => (
  <div className={cn('rounded-lg border border-destructive/20 bg-destructive/5 p-4', className)}>
    <div className="flex items-start gap-3">
      {isNetworkError ? (
        <WifiOff className="h-5 w-5 text-destructive mt-0.5" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
      )}
      <div className="flex-1">
        <h4 className="font-medium text-destructive mb-1">
          {isNetworkError ? 'Connection Error' : 'Submission Failed'}
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          {isNetworkError 
            ? 'Unable to submit form. Please check your connection and try again.'
            : 'There was a problem submitting your form. Please try again.'
          }
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  </div>
);

export const ContactFormErrorFallback: React.FC<FallbackUIProps> = ({
  className,
  onRetry,
}) => (
  <Card className={cn('w-full max-w-md mx-auto', className)}>
    <CardHeader className="text-center">
      <Mail className="h-8 w-8 text-destructive mx-auto mb-2" />
      <CardTitle className="text-destructive">Message Not Sent</CardTitle>
      <CardDescription>
        We couldn't send your message right now. Please try again or contact us directly.
      </CardDescription>
    </CardHeader>
    <CardContent className="text-center space-y-3">
      {onRetry && (
        <Button onClick={onRetry} className="w-full">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Sending Again
        </Button>
      )}
      <div className="text-sm text-muted-foreground">
        <p>Alternative: <a href="mailto:hello@automatron.ai" className="text-primary hover:underline">hello@automatron.ai</a></p>
      </div>
    </CardContent>
  </Card>
);

export const ChatbotErrorFallback: React.FC<FallbackUIProps> = ({
  className,
  onRetry,
}) => (
  <div className={cn('flex items-center gap-3 p-3 rounded-lg bg-muted', className)}>
    <MessageSquare className="h-5 w-5 text-muted-foreground" />
    <div className="flex-1">
      <p className="text-sm text-muted-foreground">
        Chatbot is temporarily unavailable
      </p>
    </div>
    {onRetry && (
      <Button onClick={onRetry} variant="ghost" size="sm">
        <RefreshCw className="h-4 w-4" />
      </Button>
    )}
  </div>
);

// Empty state fallbacks
export const EmptyStateFallback: React.FC<{
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
  className?: string;
}> = ({
  title,
  description,
  action,
  icon = <FileX className="h-8 w-8 text-muted-foreground" />,
  className,
}) => (
  <div className={cn('flex flex-col items-center justify-center p-8 text-center', className)}>
    {icon}
    <h3 className="font-medium mt-3 mb-1">{title}</h3>
    {description && (
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">{description}</p>
    )}
    {action && (
      <Button onClick={action.onClick} variant="outline">
        {action.label}
      </Button>
    )}
  </div>
);