import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

import React from 'react';

// Loading component for dynamic imports
const LoadingSpinner = () => (
  React.createElement('div', { className: 'flex items-center justify-center p-8' },
    React.createElement('div', { className: 'h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent' })
  )
);

// Example dynamic imports - these will be created when the actual components exist
// export const DynamicTimeCalculator = dynamic(
//   () => import('@/components/home/time-calculator').then(mod => ({ default: mod.TimeCalculator })),
//   {
//     loading: LoadingSpinner,
//     ssr: false, // Calculator is interactive and doesn't need SSR
//   }
// );

// export const DynamicChatbot = dynamic(
//   () => import('@/components/forms/chatbot').then(mod => ({ default: mod.Chatbot })),
//   {
//     loading: LoadingSpinner,
//     ssr: false, // Chatbot is interactive
//   }
// );

// Placeholder dynamic component for demonstration
export const DynamicPlaceholder = dynamic(
  () => Promise.resolve({ default: () => React.createElement('div', { className: 'p-4 text-center' }, 'Dynamic Component Loaded') }),
  {
    loading: LoadingSpinner,
    ssr: false,
  }
);

// Utility function for creating dynamic imports with consistent loading states
export function createDynamicImport<T = any>(
  importFn: () => Promise<{ default: ComponentType<T> }>,
  options: {
    loading?: () => React.ReactElement;
    ssr?: boolean;
  } = {}
) {
  return dynamic(importFn, {
    loading: options.loading || LoadingSpinner,
    ssr: options.ssr ?? true,
  });
}

// Preload critical dynamic components
export function preloadCriticalComponents() {
  if (typeof window !== 'undefined') {
    // Preload components that are likely to be needed soon
    // These will be uncommented when the actual components exist
    // import('@/components/forms/contact-form');
    // import('@/components/home/time-calculator');
    console.log('Preloading critical components...');
  }
}