'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalyticsScript, shouldLoadAnalytics, trackPageView } from '@/lib/analytics';

/**
 * Analytics component that loads Plausible Analytics script
 * Respects user privacy preferences and Do Not Track
 */
export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route changes
  useEffect(() => {
    if (shouldLoadAnalytics()) {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  // Don't load analytics if conditions aren't met
  if (!shouldLoadAnalytics()) {
    return null;
  }

  const scriptProps = getAnalyticsScript();

  return (
    <>
      <Script
        {...scriptProps}
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Plausible Analytics loaded');
        }}
        onError={(error) => {
          console.warn('Failed to load Plausible Analytics:', error);
        }}
      />
    </>
  );
}

/**
 * Hook for tracking custom events with analytics
 */
export function useAnalytics() {
  return {
    trackEvent: (eventName: string, props?: Record<string, string | number | boolean>) => {
      if (shouldLoadAnalytics() && typeof window !== 'undefined' && window.plausible) {
        window.plausible(eventName, { props });
      }
    },
    trackConversion: (goalName: string, value?: number) => {
      if (shouldLoadAnalytics() && typeof window !== 'undefined' && window.plausible) {
        window.plausible(goalName, value ? { props: { value } } : undefined);
      }
    },
  };
}

/**
 * Component for tracking specific events on mount
 */
interface EventTrackerProps {
  eventName: string;
  props?: Record<string, string | number | boolean>;
  children?: React.ReactNode;
}

export function EventTracker({ eventName, props, children }: EventTrackerProps) {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent(eventName, props);
  }, [eventName, props, trackEvent]);

  return <>{children}</>;
}

/**
 * Higher-order component for tracking page views
 */
export function withPageTracking<T extends object>(
  Component: React.ComponentType<T>,
  pageName: string
) {
  return function TrackedComponent(props: T) {
    const { trackEvent } = useAnalytics();

    useEffect(() => {
      trackEvent('Page View', { page: pageName });
    }, [trackEvent]);

    return <Component {...props} />;
  };
}