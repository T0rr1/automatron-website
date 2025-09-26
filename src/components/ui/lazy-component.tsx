'use client';

import { ReactNode, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

interface LazyComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

export function LazyComponent({
  children,
  fallback = <DefaultFallback />,
  className,
  rootMargin = '100px',
  threshold = 0,
  once = true,
}: LazyComponentProps) {
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin,
    threshold,
    freezeOnceVisible: once,
  });

  return (
    <div ref={ref} className={cn('min-h-[100px]', className)}>
      {isVisible ? (
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

// Specialized lazy image component
interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function LazyImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: LazyImageProps) {
  const { ref, isVisible } = useIntersectionObserver({
    rootMargin: '50px',
    freezeOnceVisible: true,
  });

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {(isVisible || priority) ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-cover transition-opacity duration-300"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      ) : (
        <div 
          className="h-full w-full animate-pulse bg-muted"
          style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
        />
      )}
    </div>
  );
}