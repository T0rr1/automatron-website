/**
 * Performance utilities for optimal website performance
 * Implements all performance optimizations from task 15
 */

import React from 'react';

// Image optimization utilities
export const imageOptimization = {
  /**
   * Get optimized image props for Next.js Image component
   */
  getOptimizedImageProps: (
    src: string,
    alt: string,
    options: {
      width?: number;
      height?: number;
      priority?: boolean;
      quality?: number;
    } = {}
  ) => {
    const { width, height, priority = false, quality = 85 } = options;
    
    return {
      src,
      alt,
      width,
      height,
      priority,
      quality,
      format: 'webp' as const,
      placeholder: 'blur' as const,
      blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      sizes: width && height 
        ? `(max-width: 768px) ${Math.min(width, 768)}px, ${width}px`
        : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    };
  },

  /**
   * Preload critical images
   */
  preloadImages: (imageSrcs: string[]) => {
    if (typeof window === 'undefined') return;

    imageSrcs.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });
  },
};

// Code splitting utilities
export const codeSplitting = {
  /**
   * Dynamically import a component with loading state
   */
  createDynamicComponent: <T = any>(
    importFn: () => Promise<{ default: React.ComponentType<T> }>,
    options: {
      loading?: React.ComponentType;
      ssr?: boolean;
    } = {}
  ) => {
    const dynamic = require('next/dynamic');
    return dynamic(importFn, {
      loading: options.loading || (() => 
        React.createElement('div', { className: 'flex items-center justify-center p-8' },
          React.createElement('div', { className: 'h-8 w-8 animate-spin-gpu rounded-full border-4 border-primary border-t-transparent' })
        )
      ),
      ssr: options.ssr ?? true,
    });
  },

  /**
   * Preload component modules
   */
  preloadComponents: (importFns: Array<() => Promise<any>>) => {
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback for better performance
    const preload = () => {
      importFns.forEach((importFn) => {
        importFn().catch(() => {
          // Silently handle preload failures
        });
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(preload);
    } else {
      setTimeout(preload, 100);
    }
  },
};

// Lazy loading utilities
export const lazyLoading = {
  /**
   * Create intersection observer for lazy loading
   */
  createLazyObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options: IntersectionObserverInit = {}
  ) => {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver(callback, defaultOptions);
  },

  /**
   * Lazy load images with intersection observer
   */
  lazyLoadImages: () => {
    if (typeof window === 'undefined') return;

    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px',
    });

    images.forEach((img) => imageObserver.observe(img));
  },
};

// Critical CSS and resource preloading
export const resourceOptimization = {
  /**
   * Preload critical resources
   */
  preloadCriticalResources: () => {
    if (typeof window === 'undefined') return;

    const criticalResources = [
      { href: '/fonts/inter-var.woff2', as: 'font', type: 'font/woff2' },
      { href: '/images/hero-bg.webp', as: 'image' },
      { href: '/images/logo.svg', as: 'image' },
    ];

    criticalResources.forEach(({ href, as, type }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      if (type) link.type = type;
      if (as === 'font') link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  },

  /**
   * Add DNS prefetch for external resources
   */
  addDNSPrefetch: (domains: string[]) => {
    if (typeof window === 'undefined') return;

    domains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  },

  /**
   * Preconnect to critical third-party origins
   */
  preconnectOrigins: (origins: string[]) => {
    if (typeof window === 'undefined') return;

    origins.forEach((origin) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      document.head.appendChild(link);
    });
  },
};

// Animation performance utilities
export const animationOptimization = {
  /**
   * Optimize element for animations
   */
  optimizeForAnimation: (element: HTMLElement, properties: string[] = ['transform', 'opacity']) => {
    element.style.willChange = properties.join(', ');
    element.style.transform = 'translate3d(0, 0, 0)'; // Force GPU layer
    element.style.backfaceVisibility = 'hidden';
  },

  /**
   * Clean up animation optimizations
   */
  cleanupAnimationOptimizations: (element: HTMLElement) => {
    element.style.willChange = 'auto';
  },

  /**
   * Check if animations should be reduced
   */
  shouldReduceAnimations: (): boolean => {
    if (typeof window === 'undefined') return false;
    
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
           navigator.hardwareConcurrency <= 2 ||
           (navigator as any).connection?.effectiveType === 'slow-2g';
  },

  /**
   * Apply performance-optimized animation classes
   */
  applyOptimizedAnimation: (
    element: HTMLElement, 
    animationType: 'fadeInUp' | 'scaleIn' | 'slideInLeft' | 'slideInRight'
  ) => {
    if (animationOptimization.shouldReduceAnimations()) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    element.classList.add(`animate-${animationType}-gpu`, 'gpu-accelerated');
    
    // Clean up after animation
    element.addEventListener('animationend', () => {
      animationOptimization.cleanupAnimationOptimizations(element);
    }, { once: true });
  },
};

// Bundle size monitoring
export const bundleOptimization = {
  /**
   * Monitor bundle size in development
   */
  monitorBundleSize: () => {
    if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;

    const scripts = Array.from(document.querySelectorAll('script[src]'));
    let totalSize = 0;

    Promise.all(
      scripts
        .filter(script => (script as HTMLScriptElement).src.includes('/_next/static/'))
        .map(async (script) => {
          try {
            const response = await fetch((script as HTMLScriptElement).src, { method: 'HEAD' });
            const size = parseInt(response.headers.get('content-length') || '0');
            totalSize += size;
            return { src: (script as HTMLScriptElement).src, size };
          } catch {
            return { src: (script as HTMLScriptElement).src, size: 0 };
          }
        })
    ).then((results) => {
      console.group('Bundle Analysis');
      results.forEach(({ src, size }) => {
        console.log(`${src.split('/').pop()}: ${(size / 1024).toFixed(2)}KB`);
      });
      console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
      console.groupEnd();
    });
  },

  /**
   * Tree shake unused code (build-time utility)
   */
  getTreeShakingConfig: () => ({
    sideEffects: false,
    usedExports: true,
    optimization: {
      usedExports: true,
      sideEffects: false,
    },
  }),
};

// Core Web Vitals monitoring
export const webVitalsMonitoring = {
  /**
   * Monitor Core Web Vitals
   */
  monitorWebVitals: () => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    // Monitor LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log('LCP:', entry.startTime);
      });
    });

    // Monitor FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });

    // Monitor CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          console.log('CLS:', entry.value);
        }
      });
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Some performance observers not supported');
    }
  },

  /**
   * Report web vitals to analytics
   */
  reportWebVitals: (metric: any) => {
    // This would integrate with your analytics service
    console.log('Web Vital:', metric);
  },
};

// Main performance initialization function
export const initializeAllPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Initialize all performance optimizations
  resourceOptimization.preloadCriticalResources();
  resourceOptimization.addDNSPrefetch(['//api.resend.com', '//plausible.io']);
  resourceOptimization.preconnectOrigins(['https://api.resend.com']);
  
  lazyLoading.lazyLoadImages();
  webVitalsMonitoring.monitorWebVitals();
  bundleOptimization.monitorBundleSize();
  
  // Optimize animations based on device capabilities
  if (animationOptimization.shouldReduceAnimations()) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.classList.add('reduce-animations');
  }
};

export default {
  imageOptimization,
  codeSplitting,
  lazyLoading,
  resourceOptimization,
  animationOptimization,
  bundleOptimization,
  webVitalsMonitoring,
  initializeAllPerformanceOptimizations,
};