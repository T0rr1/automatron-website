/**
 * Animation utilities for Automatron.ai
 * Provides consistent animation patterns and utilities optimized for 60fps performance
 */

import { duration, timingFunctions } from './design-tokens'

// GPU-accelerated animation properties
const GPU_ACCELERATED_PROPERTIES = ['transform', 'opacity', 'filter'] as const

// Performance-optimized animation configurations
const PERFORMANCE_CONFIG = {
  // Use transform instead of changing layout properties
  preferTransform: true,
  // Enable GPU acceleration
  enableGPU: true,
  // Optimize for 60fps
  targetFPS: 60,
  // Reduce motion for accessibility
  respectReducedMotion: true,
} as const

// Animation variants for common patterns
export const animationVariants = {
  // GPU-accelerated fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { 
      duration: 0.3, 
      ease: 'easeOut',
      // GPU acceleration hint
      willChange: 'opacity',
    },
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      // GPU acceleration for transform
      willChange: 'transform, opacity',
    },
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  
  // Scale animations
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  scaleInBounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.3 },
    transition: { 
      duration: 0.5, 
      ease: [0.68, -0.6, 0.32, 1.6] // Custom bounce easing
    },
  },
  
  // Slide animations
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: 0 },
    exit: { x: '-100%' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  slideInUp: {
    initial: { y: '100%' },
    animate: { y: 0 },
    exit: { y: '100%' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  slideInDown: {
    initial: { y: '-100%' },
    animate: { y: 0 },
    exit: { y: '-100%' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  
  // Stagger animations for lists
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  
  // Hover animations
  hoverScale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  hoverLift: {
    whileHover: { y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  hoverGlow: {
    whileHover: { 
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      borderColor: 'rgba(59, 130, 246, 0.5)',
    },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  // Loading animations
  pulse: {
    animate: {
      opacity: [1, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  
  // Modal animations
  modalBackdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  
  modalContent: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  
  // Toast animations
  toastSlideIn: {
    initial: { opacity: 0, x: '100%' },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: '100%' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
} as const

// CSS animation classes for non-JS animations
export const cssAnimations = {
  // Fade animations
  'animate-fade-in': 'animate-[fadeIn_0.5s_ease-out]',
  'animate-fade-in-up': 'animate-[fadeInUp_0.6s_ease-out]',
  'animate-fade-in-down': 'animate-[fadeInDown_0.6s_ease-out]',
  'animate-fade-in-left': 'animate-[fadeInLeft_0.6s_ease-out]',
  'animate-fade-in-right': 'animate-[fadeInRight_0.6s_ease-out]',
  
  // Scale animations
  'animate-scale-in': 'animate-[scaleIn_0.3s_ease-out]',
  'animate-scale-in-bounce': 'animate-[scaleInBounce_0.5s_cubic-bezier(0.68,-0.6,0.32,1.6)]',
  
  // Slide animations
  'animate-slide-in-left': 'animate-[slideInLeft_0.3s_ease-out]',
  'animate-slide-in-right': 'animate-[slideInRight_0.3s_ease-out]',
  'animate-slide-in-up': 'animate-[slideInUp_0.3s_ease-out]',
  'animate-slide-in-down': 'animate-[slideInDown_0.3s_ease-out]',
  
  // Loading animations
  'animate-pulse-soft': 'animate-[pulseSoft_2s_ease-in-out_infinite]',
  'animate-bounce-subtle': 'animate-[bounceSubtle_2s_ease-in-out_infinite]',
  'animate-shimmer': 'animate-[shimmer_2s_ease-in-out_infinite]',
  
  // Hover animations (applied on hover)
  'hover:animate-scale': 'hover:scale-105 transition-transform duration-200 ease-out',
  'hover:animate-lift': 'hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out',
  'hover:animate-glow': 'hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow duration-200 ease-out',
} as const

// Animation timing utilities
export const animationTimings = {
  fast: 150,
  normal: 200,
  slow: 300,
  slower: 500,
  
  // Semantic timings
  micro: 100,      // For micro-interactions
  quick: 200,      // For quick feedback
  smooth: 300,     // For smooth transitions
  gentle: 500,     // For gentle, noticeable changes
  dramatic: 700,   // For dramatic effects
} as const

// Easing functions
export const easingFunctions = {
  // Standard easing
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom easing
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Bounce easing
  easeOutBounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Elastic easing
  easeOutElastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const

// Utility functions
export const animationUtils = {
  /**
   * Get animation delay for staggered animations
   */
  getStaggerDelay: (index: number, baseDelay = 100): number => {
    return index * baseDelay
  },
  
  /**
   * Create staggered animation styles
   */
  createStaggerStyles: (count: number, baseDelay = 100): Record<string, string> => {
    const styles: Record<string, string> = {}
    
    for (let i = 0; i < count; i++) {
      styles[`.stagger-${i}`] = `animation-delay: ${i * baseDelay}ms`
    }
    
    return styles
  },
  
  /**
   * Check if user prefers reduced motion
   */
  shouldReduceMotion: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  /**
   * Get animation duration based on user preference
   */
  getAnimationDuration: (normalDuration: number): number => {
    return animationUtils.shouldReduceMotion() ? 0 : normalDuration
  },
  
  /**
   * Create CSS custom properties for animations
   */
  createAnimationVars: (animations: Record<string, number | string>): Record<string, string> => {
    const vars: Record<string, string> = {}
    
    Object.entries(animations).forEach(([key, value]) => {
      vars[`--animation-${key}`] = typeof value === 'number' ? `${value}ms` : value
    })
    
    return vars
  },
} as const

// Intersection Observer animation utilities
const defaultScrollOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
} as const

export const scrollAnimations = {
  /**
   * Default intersection observer options
   */
  defaultOptions: defaultScrollOptions,
  
  /**
   * Create intersection observer for scroll animations
   */
  createScrollObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void,
    options = defaultScrollOptions
  ): IntersectionObserver => {
    return new IntersectionObserver(callback, options)
  },
  
  /**
   * Add scroll animation to element
   */
  addScrollAnimation: (
    element: Element,
    animationClass = 'animate-fade-in-up'
  ): void => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass)
          observer.unobserve(entry.target)
        }
      })
    }, defaultScrollOptions)
    
    observer.observe(element)
  },
} as const

export default animationVariants

// Performance-optimized animation utilities
export const performanceAnimations = {
  /**
   * Create GPU-accelerated animation with will-change optimization
   */
  createGPUAnimation: (
    properties: Record<string, any>,
    options: {
      duration?: number;
      ease?: string;
      willChange?: string[];
    } = {}
  ) => {
    const { duration = 0.3, ease = 'easeOut', willChange = ['transform', 'opacity'] } = options;
    
    return {
      ...properties,
      transition: {
        duration,
        ease,
        willChange: willChange.join(', '),
      },
    };
  },

  /**
   * Optimized hover animations that use transform for better performance
   */
  optimizedHover: {
    scale: {
      whileHover: { 
        scale: 1.05,
        transition: { duration: 0.2, ease: 'easeOut' }
      },
      whileTap: { 
        scale: 0.95,
        transition: { duration: 0.1, ease: 'easeOut' }
      },
      style: { willChange: 'transform' },
    },
    
    lift: {
      whileHover: { 
        y: -4,
        transition: { duration: 0.2, ease: 'easeOut' }
      },
      style: { willChange: 'transform' },
    },
    
    glow: {
      whileHover: {
        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
        transition: { duration: 0.2, ease: 'easeOut' }
      },
      style: { willChange: 'filter' },
    },
  },

  /**
   * High-performance loading animations
   */
  optimizedLoading: {
    spinner: {
      animate: {
        rotate: 360,
        transition: {
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        },
      },
      style: { willChange: 'transform' },
    },
    
    pulse: {
      animate: {
        opacity: [1, 0.5, 1],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
      style: { willChange: 'opacity' },
    },
    
    shimmer: {
      animate: {
        backgroundPosition: ['200% 0', '-200% 0'],
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        },
      },
      style: {
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        backgroundSize: '200% 100%',
        willChange: 'background-position',
      },
    },
  },

  /**
   * Staggered animations optimized for performance
   */
  createOptimizedStagger: (itemCount: number, baseDelay = 0.1) => ({
    container: {
      animate: {
        transition: {
          staggerChildren: baseDelay,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
          willChange: 'transform, opacity',
        },
      },
    },
  }),
} as const;

// CSS-based animations for better performance (no JS required)
// CSS-based animations for better performance (no JS required)
export const cssPerformanceAnimations = `
  /* GPU-accelerated keyframes */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: translate3d(0, 0, 0) scale3d(0.9, 0.9, 1);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translate3d(-100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translate3d(100%, 0, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounceSubtle {
    0%, 100% {
      transform: translate3d(0, 0, 0);
    }
    50% {
      transform: translate3d(0, -10px, 0);
    }
  }

  @keyframes pulseSoft {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  /* Performance-optimized animation classes */
  .animate-gpu {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .animate-fade-in-up-gpu {
    animation: fadeInUp 0.6s ease-out;
    will-change: transform, opacity;
  }

  .animate-fade-in-down-gpu {
    animation: fadeInDown 0.6s ease-out;
    will-change: transform, opacity;
  }

  .animate-scale-in-gpu {
    animation: scaleIn 0.3s ease-out;
    will-change: transform, opacity;
  }

  .animate-slide-in-left-gpu {
    animation: slideInLeft 0.3s ease-out;
    will-change: transform;
  }

  .animate-slide-in-right-gpu {
    animation: slideInRight 0.3s ease-out;
    will-change: transform;
  }

  .animate-shimmer-gpu {
    animation: shimmer 2s linear infinite;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    background-size: 200% 100%;
    will-change: background-position;
  }

  .animate-spin-gpu {
    animation: spin 1s linear infinite;
    will-change: transform;
  }

  .animate-bounce-subtle-gpu {
    animation: bounceSubtle 2s ease-in-out infinite;
    will-change: transform;
  }

  .animate-pulse-soft-gpu {
    animation: pulseSoft 2s ease-in-out infinite;
    will-change: opacity;
  }

  /* Hover animations with GPU acceleration */
  .hover-scale-gpu {
    transition: transform 0.2s ease-out;
    will-change: transform;
  }

  .hover-scale-gpu:hover {
    transform: scale3d(1.05, 1.05, 1);
  }

  .hover-lift-gpu {
    transition: transform 0.2s ease-out;
    will-change: transform;
  }

  .hover-lift-gpu:hover {
    transform: translate3d(0, -4px, 0);
  }

  .hover-glow-gpu {
    transition: filter 0.2s ease-out;
    will-change: filter;
  }

  .hover-glow-gpu:hover {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
  }

  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in-up-gpu,
    .animate-fade-in-down-gpu,
    .animate-scale-in-gpu,
    .animate-slide-in-left-gpu,
    .animate-slide-in-right-gpu,
    .animate-shimmer-gpu,
    .animate-spin-gpu,
    .animate-bounce-subtle-gpu,
    .animate-pulse-soft-gpu {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
    }

    .hover-scale-gpu:hover,
    .hover-lift-gpu:hover {
      transform: none !important;
    }

    .hover-glow-gpu:hover {
      filter: none !important;
    }
  }
`;

// Performance monitoring for animations
export const animationPerformance = {
  /**
   * Monitor animation performance
   */
  monitorPerformance: () => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure' && entry.name.includes('animation')) {
          console.log(`Animation ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['measure'] });
    } catch (e) {
      console.warn('Performance observer not supported for animations');
    }
  },

  /**
   * Measure animation frame rate
   */
  measureFrameRate: (callback: (fps: number) => void) => {
    if (typeof window === 'undefined') return;

    let frames = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frames++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        callback(fps);
        frames = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  },

  /**
   * Optimize animations based on device capabilities
   */
  optimizeForDevice: () => {
    if (typeof window === 'undefined') return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency <= 2;
    const isSlowConnection = (navigator as any).connection?.effectiveType === 'slow-2g' || 
                            (navigator as any).connection?.effectiveType === '2g';

    if (prefersReducedMotion || isLowEndDevice || isSlowConnection) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
      document.documentElement.style.setProperty('--transition-duration', '0.01ms');
      document.documentElement.classList.add('reduce-animations');
    }
  },
} as const;