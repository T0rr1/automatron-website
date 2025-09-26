// Performance utilities and monitoring

// Critical resource preloading
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/images/hero-bg.webp',
    '/images/logo.svg',
    '/images/automation-workflow.webp',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Resource hints for better loading
export function addResourceHints() {
  if (typeof window === 'undefined') return;

  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//api.resend.com' },
    { rel: 'preconnect', href: 'https://api.resend.com' },
  ];

  hints.forEach(({ rel, href }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  });
}

// Performance monitoring
export function measurePerformance() {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  // Measure Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
      }
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as any;
        console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
      }
      if (entry.entryType === 'layout-shift') {
        const clsEntry = entry as any;
        if (!clsEntry.hadRecentInput) {
          console.log('CLS:', clsEntry.value);
        }
      }
    });
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Fallback for browsers that don't support all entry types
    console.warn('Performance observer not fully supported');
  }
}

// Optimize animations for 60fps
export function optimizeAnimations() {
  if (typeof window === 'undefined') return;

  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }

  // Add will-change hints for animated elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach((element) => {
    (element as HTMLElement).style.willChange = 'transform, opacity';
  });
}

// Bundle size monitoring (development only)
export function monitorBundleSize() {
  if (process.env.NODE_ENV !== 'development' || typeof window === 'undefined') return;

  // Monitor script loading
  const scripts = document.querySelectorAll('script[src]');
  let totalSize = 0;

  scripts.forEach(async (script) => {
    const src = (script as HTMLScriptElement).src;
    if (src.includes('/_next/static/')) {
      try {
        const response = await fetch(src, { method: 'HEAD' });
        const size = parseInt(response.headers.get('content-length') || '0');
        totalSize += size;
        console.log(`Script ${src}: ${(size / 1024).toFixed(2)}KB`);
      } catch (e) {
        console.warn('Could not measure script size:', src);
      }
    }
  });

  console.log(`Total bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
}

// Initialize performance optimizations
export function initializePerformanceOptimizations() {
  if (typeof window === 'undefined') return;

  // Import and use the comprehensive performance utilities
  import('./performance-utils').then(({ initializeAllPerformanceOptimizations }) => {
    initializeAllPerformanceOptimizations();
  });

  // Run optimizations after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      preloadCriticalResources();
      addResourceHints();
      optimizeAnimations();
      measurePerformance();
      monitorBundleSize();
    });
  } else {
    preloadCriticalResources();
    addResourceHints();
    optimizeAnimations();
    measurePerformance();
    monitorBundleSize();
  }
}