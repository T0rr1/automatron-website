import * as Sentry from '@sentry/nextjs';

// Timeout configuration
export const TIMEOUT_CONFIG = {
  API_REQUEST: 10000, // 10 seconds
  FORM_SUBMISSION: 15000, // 15 seconds
  FILE_UPLOAD: 30000, // 30 seconds
  IMAGE_LOAD: 5000, // 5 seconds
} as const;

// Async operation states
export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
};

export const createInitialAsyncState = <T>(): AsyncState<T> => ({
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
});

// Timeout wrapper for promises
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage = 'Operation timed out'
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timeoutId);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
}

// Retry wrapper with exponential backoff
export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxAttempts?: number;
    baseDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: Error) => boolean;
  } = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    shouldRetry = (error) => !error.message.includes('400') && !error.message.includes('401'),
  } = options;

  let lastError: Error;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on the last attempt or if shouldRetry returns false
      if (attempt === maxAttempts || !shouldRetry(lastError)) {
        throw lastError;
      }

      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000,
        maxDelay
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Safe async wrapper with error handling and Sentry reporting
export async function safeAsync<T>(
  fn: () => Promise<T>,
  options: {
    timeout?: number;
    retries?: number;
    fallback?: T;
    onError?: (error: Error) => void;
    context?: Record<string, any>;
  } = {}
): Promise<{ data: T | null; error: Error | null }> {
  const {
    timeout = TIMEOUT_CONFIG.API_REQUEST,
    retries = 1,
    fallback = null,
    onError,
    context = {},
  } = options;

  try {
    const result = await withTimeout(
      withRetry(fn, { maxAttempts: retries }),
      timeout
    );

    return { data: result, error: null };
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error(String(error));

    // Report to Sentry with context
    Sentry.captureException(errorObj, {
      extra: context,
      tags: {
        section: 'async_operation',
      },
    });

    // Call custom error handler
    onError?.(errorObj);

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Async operation failed:', errorObj, context);
    }

    return { data: fallback as T, error: errorObj };
  }
}

// Loading state manager
export class LoadingManager {
  private loadingStates = new Map<string, boolean>();
  private listeners = new Set<(states: Record<string, boolean>) => void>();

  setLoading(key: string, loading: boolean) {
    this.loadingStates.set(key, loading);
    this.notifyListeners();
  }

  isLoading(key: string): boolean {
    return this.loadingStates.get(key) ?? false;
  }

  isAnyLoading(): boolean {
    return Array.from(this.loadingStates.values()).some(Boolean);
  }

  subscribe(listener: (states: Record<string, boolean>) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    const states = Object.fromEntries(this.loadingStates);
    this.listeners.forEach((listener) => listener(states));
  }

  clear() {
    this.loadingStates.clear();
    this.notifyListeners();
  }
}

// Global loading manager instance
export const globalLoadingManager = new LoadingManager();

// Hook for managing async operations with loading states
export function useAsyncOperation<T>(
  key: string,
  operation: () => Promise<T>,
  options: {
    timeout?: number;
    retries?: number;
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
  } = {}
) {
  const { timeout, retries, onSuccess, onError } = options;

  const execute = async (): Promise<{ data: T | null; error: Error | null }> => {
    globalLoadingManager.setLoading(key, true);

    try {
      const result = await safeAsync(operation, {
        timeout,
        retries,
        context: { operationKey: key },
      });

      if (result.data && onSuccess) {
        onSuccess(result.data);
      }

      if (result.error && onError) {
        onError(result.error);
      }

      return result;
    } finally {
      globalLoadingManager.setLoading(key, false);
    }
  };

  return {
    execute,
    isLoading: () => globalLoadingManager.isLoading(key),
  };
}

// Debounce utility for preventing rapid successive calls
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number
): T {
  let timeoutId: NodeJS.Timeout;

  return ((...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), waitMs);
  }) as T;
}

// Throttle utility for limiting call frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limitMs: number
): T {
  let inThrottle: boolean;

  return ((...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limitMs);
    }
  }) as T;
}