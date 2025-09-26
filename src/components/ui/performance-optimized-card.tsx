'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { performanceAnimations } from '@/lib/animations';
import { LazyComponent } from './lazy-component';

interface PerformanceOptimizedCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  lazy?: boolean;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
}

export function PerformanceOptimizedCard({
  children,
  className,
  animate = true,
  lazy = false,
  hoverEffect = 'scale',
}: PerformanceOptimizedCardProps) {
  const hoverAnimation = hoverEffect !== 'none' 
    ? performanceAnimations.optimizedHover[hoverEffect]
    : {};

  const cardContent = (
    <motion.div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm',
        'gpu-accelerated', // Apply GPU acceleration
        className
      )}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={animate ? {
        duration: 0.5,
        ease: 'easeOut',
      } : undefined}
      style={{ willChange: animate ? 'transform, opacity' : 'auto' }}
      {...hoverAnimation}
    >
      {children}
    </motion.div>
  );

  if (lazy) {
    return (
      <LazyComponent
        fallback={
          <div className="h-32 w-full animate-pulse rounded-lg bg-muted" />
        }
      >
        {cardContent}
      </LazyComponent>
    );
  }

  return cardContent;
}

// CSS-only version for better performance when JS is not needed
export function CSSOptimizedCard({
  children,
  className,
  hoverEffect = 'scale',
}: {
  children: ReactNode;
  className?: string;
  hoverEffect?: 'scale' | 'lift' | 'glow' | 'none';
}) {
  const hoverClass = hoverEffect !== 'none' ? `hover-${hoverEffect}-gpu` : '';

  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm',
        'animate-fade-in-up-gpu gpu-accelerated',
        hoverClass,
        className
      )}
    >
      {children}
    </div>
  );
}