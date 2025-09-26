'use client';

import { useEffect } from 'react';
import { initializePerformanceOptimizations } from '@/lib/performance';
import { animationPerformance } from '@/lib/animations';

export function PerformanceMonitor() {
  useEffect(() => {
    // Initialize performance optimizations
    initializePerformanceOptimizations();
    
    // Monitor animation performance in development
    if (process.env.NODE_ENV === 'development') {
      animationPerformance.monitorPerformance();
      
      // Monitor frame rate for animations
      animationPerformance.measureFrameRate((fps) => {
        if (fps < 50) {
          console.warn(`Low frame rate detected: ${fps}fps`);
        }
      });
    }
    
    // Optimize animations based on device capabilities
    animationPerformance.optimizeForDevice();
    
    // Clean up will-change properties after animations complete
    const cleanupWillChange = () => {
      const elements = document.querySelectorAll('[style*="will-change"]');
      elements.forEach((element) => {
        const htmlElement = element as HTMLElement;
        if (htmlElement.style.willChange) {
          // Reset will-change after a delay to allow animations to complete
          setTimeout(() => {
            htmlElement.style.willChange = 'auto';
          }, 1000);
        }
      });
    };
    
    // Clean up will-change properties periodically
    const cleanupInterval = setInterval(cleanupWillChange, 5000);
    
    return () => {
      clearInterval(cleanupInterval);
    };
  }, []);

  // This component doesn't render anything
  return null;
}