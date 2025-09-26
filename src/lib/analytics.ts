// Plausible Analytics configuration and utilities

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;
  }
}

export interface PlausibleEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

// Analytics configuration
export const analyticsConfig = {
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'automatron.ai',
  apiHost: process.env.NEXT_PUBLIC_PLAUSIBLE_HOST || 'https://plausible.io',
  trackLocalhost: process.env.NODE_ENV === 'development',
  // Respect Do Not Track header
  respectDNT: true,
};

// Custom event tracking
export const trackEvent = (eventName: string, props?: Record<string, string | number | boolean>) => {
  // Only track in browser environment
  if (typeof window === 'undefined') return;
  
  // Respect Do Not Track
  if (navigator.doNotTrack === '1' && analyticsConfig.respectDNT) {
    console.log('Analytics: Respecting Do Not Track preference');
    return;
  }

  // Check if Plausible is loaded
  if (window.plausible) {
    window.plausible(eventName, { props });
  } else {
    console.warn('Plausible analytics not loaded');
  }
};

// Predefined events for consistent tracking
export const analyticsEvents = {
  // CTA interactions
  ctaClick: (location: string, ctaText: string) => 
    trackEvent('CTA Click', { location, cta_text: ctaText }),
  
  // Contact form interactions
  contactFormStart: () => 
    trackEvent('Contact Form Start'),
  
  contactFormSubmit: (serviceType?: string) => 
    trackEvent('Contact Form Submit', serviceType ? { service_type: serviceType } : undefined),
  
  contactFormSuccess: (serviceType?: string) => 
    trackEvent('Contact Form Success', serviceType ? { service_type: serviceType } : undefined),
  
  // Service page interactions
  serviceView: (serviceName: string) => 
    trackEvent('Service View', { service_name: serviceName }),
  
  serviceCtaClick: (serviceName: string) => 
    trackEvent('Service CTA Click', { service_name: serviceName }),
  
  // Calculator interactions
  calculatorUse: (timeSaved: number, roiCalculated: number) => 
    trackEvent('Calculator Use', { 
      time_saved_hours: timeSaved, 
      roi_calculated: roiCalculated 
    }),
  
  // Demo interactions
  demoView: (demoType: string) => 
    trackEvent('Demo View', { demo_type: demoType }),
  
  codeSnippetCopy: (snippetType: string) => 
    trackEvent('Code Snippet Copy', { snippet_type: snippetType }),
  
  // Case study interactions
  caseStudyView: (caseStudyTitle: string) => 
    trackEvent('Case Study View', { case_study: caseStudyTitle }),
  
  // Newsletter signup
  newsletterSignup: (location: string) => 
    trackEvent('Newsletter Signup', { location }),
  
  // Chatbot interactions
  chatbotOpen: () => 
    trackEvent('Chatbot Open'),
  
  chatbotMessage: (messageType: 'user' | 'bot') => 
    trackEvent('Chatbot Message', { message_type: messageType }),
  
  // Language switching
  languageSwitch: (fromLang: string, toLang: string) => 
    trackEvent('Language Switch', { from_language: fromLang, to_language: toLang }),
  
  // Theme switching
  themeSwitch: (theme: 'light' | 'dark') => 
    trackEvent('Theme Switch', { theme }),
  
  // File downloads
  fileDownload: (fileName: string, fileType: string) => 
    trackEvent('File Download', { file_name: fileName, file_type: fileType }),
  
  // External link clicks
  externalLinkClick: (url: string, linkText: string) => 
    trackEvent('External Link Click', { url, link_text: linkText }),
  
  // Search interactions (if implemented)
  search: (query: string, resultsCount: number) => 
    trackEvent('Search', { query, results_count: resultsCount }),
  
  // Error tracking (non-PII)
  error: (errorType: string, errorLocation: string) => 
    trackEvent('Error', { error_type: errorType, error_location: errorLocation }),
};

// Page view tracking (automatic with Plausible script)
export const trackPageView = (url?: string) => {
  if (typeof window === 'undefined') return;
  
  // Plausible automatically tracks page views, but we can manually trigger if needed
  if (window.plausible && url) {
    window.plausible('pageview', { props: { url } });
  }
};

// Conversion tracking for goals
export const trackConversion = (goalName: string, value?: number) => {
  trackEvent(goalName, value ? { value } : undefined);
};

// Utility to check if analytics should be loaded
export const shouldLoadAnalytics = (): boolean => {
  // Don't load in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !analyticsConfig.trackLocalhost) {
    return false;
  }
  
  // Don't load if user has Do Not Track enabled
  if (typeof navigator !== 'undefined' && navigator.doNotTrack === '1' && analyticsConfig.respectDNT) {
    return false;
  }
  
  return true;
};

// Analytics script configuration for Next.js Script component
export const getAnalyticsScript = () => ({
  src: `${analyticsConfig.apiHost}/js/script.js`,
  'data-domain': analyticsConfig.domain,
  defer: true,
  ...(analyticsConfig.trackLocalhost && { 'data-include-localhost': 'true' }),
});