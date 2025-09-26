'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, Clock, Wifi, WifiOff } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin text-primary',
        sizeClasses[size],
        className
      )} 
    />
  );
};

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  variant?: 'text' | 'card' | 'avatar' | 'button';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 3,
  variant = 'text',
}) => {
  if (variant === 'card') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="h-48 bg-muted rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
    );
  }

  if (variant === 'avatar') {
    return (
      <div className={cn('flex items-center space-x-3', className)}>
        <div className="h-10 w-10 bg-muted rounded-full animate-pulse" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/3" />
        </div>
      </div>
    );
  }

  if (variant === 'button') {
    return (
      <div className={cn('h-10 bg-muted rounded animate-pulse', className)} />
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-4 bg-muted rounded animate-pulse',
            i === lines - 1 && 'w-3/4',
            i === lines - 2 && lines > 2 && 'w-5/6'
          )}
        />
      ))}
    </div>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = 'Loading...',
  className,
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner size="lg" />
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showPercentage = false,
  variant = 'default',
}) => {
  const variantClasses = {
    default: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-1">
        {showPercentage && (
          <span className="text-sm text-muted-foreground">{progress}%</span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300 ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  className,
  disabled,
  onClick,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transition-colors duration-200',
        className
      )}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? loadingText : children}
    </button>
  );
};

interface PulseLoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PulseLoader: React.FC<PulseLoaderProps> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'h-2 w-2',
    md: 'h-3 w-3',
    lg: 'h-4 w-4',
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary rounded-full animate-pulse',
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );
};

interface LoadingCardProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: 'spinner' | 'skeleton' | 'pulse';
}

export const LoadingCard: React.FC<LoadingCardProps> = ({
  title = 'Loading',
  description = 'Please wait while we load the content...',
  className,
  variant = 'spinner',
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center p-8 text-center',
      'border border-border rounded-lg bg-card',
      className
    )}>
      {variant === 'spinner' && <LoadingSpinner size="lg" className="mb-4" />}
      {variant === 'skeleton' && (
        <div className="w-full mb-4">
          <LoadingSkeleton variant="card" />
        </div>
      )}
      {variant === 'pulse' && <PulseLoader size="lg" className="mb-4" />}
      
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
};

interface TimeoutLoaderProps {
  timeout: number; // in milliseconds
  onTimeout: () => void;
  className?: string;
  message?: string;
}

export const TimeoutLoader: React.FC<TimeoutLoaderProps> = ({
  timeout,
  onTimeout,
  className,
  message = 'Loading...',
}) => {
  const [timeLeft, setTimeLeft] = React.useState(timeout);
  const [hasTimedOut, setHasTimedOut] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          setHasTimedOut(true);
          onTimeout();
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeout]);

  if (hasTimedOut) {
    return (
      <div className={cn('flex flex-col items-center gap-3 p-8 text-center', className)}>
        <Clock className="h-8 w-8 text-warning" />
        <p className="text-sm text-muted-foreground">
          Loading is taking longer than expected
        </p>
      </div>
    );
  }

  const progress = ((timeout - timeLeft) / timeout) * 100;

  return (
    <div className={cn('flex flex-col items-center gap-3 p-8 text-center', className)}>
      <LoadingSpinner size="lg" />
      <p className="text-sm text-muted-foreground">{message}</p>
      <ProgressBar 
        progress={progress} 
        className="w-32" 
        showPercentage={false}
      />
      <p className="text-xs text-muted-foreground">
        {Math.ceil(timeLeft / 1000)}s remaining
      </p>
    </div>
  );
};

interface NetworkStatusProps {
  isOnline: boolean;
  className?: string;
}

export const NetworkStatus: React.FC<NetworkStatusProps> = ({
  isOnline,
  className,
}) => {
  if (isOnline) return null;

  return (
    <div className={cn(
      'flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg',
      className
    )}>
      <WifiOff className="h-4 w-4 text-warning" />
      <p className="text-sm text-warning">
        You're currently offline. Some features may not work properly.
      </p>
    </div>
  );
};

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = React.useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}