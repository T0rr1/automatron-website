// Analytics event tracking for conversion optimization

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
  }
}

// Track hero CTA clicks
export function trackHeroCTA(type: 'primary' | 'secondary') {
  if (typeof window !== 'undefined') {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', `m_hero_${type}_click`, {
        event_category: 'engagement',
        event_label: 'hero_cta'
      });
    }
    
    // Plausible Analytics
    if (window.plausible) {
      window.plausible(`Hero CTA ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    }
    
    console.log(`Analytics: Hero ${type} CTA clicked`);
  }
}

// Track quick-win pill selections
export function trackPillSelect(filter: string) {
  if (typeof window !== 'undefined') {
    const event = `m_pill_select_${filter}`;
    
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'engagement',
        event_label: 'quick_win_selector'
      });
    }
    
    if (window.plausible) {
      window.plausible(`Pill Select ${filter}`);
    }
    
    console.log(`Analytics: Quick-win pill selected - ${filter}`);
  }
}

// Track service card CTA clicks
export function trackServiceCTA(service: string) {
  if (typeof window !== 'undefined') {
    const event = `m_card_primary_click_${service}`;
    
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'engagement',
        event_label: 'service_cta'
      });
    }
    
    if (window.plausible) {
      window.plausible(`Service CTA ${service}`);
    }
    
    console.log(`Analytics: Service CTA clicked - ${service}`);
  }
}

// Track FAQ interactions
export function trackFAQToggle(topic: string) {
  if (typeof window !== 'undefined') {
    const event = `m_faq_toggle_${topic}`;
    
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'engagement',
        event_label: 'faq_interaction'
      });
    }
    
    if (window.plausible) {
      window.plausible(`FAQ Toggle ${topic}`);
    }
    
    console.log(`Analytics: FAQ toggled - ${topic}`);
  }
}

// Track example interactions
export function trackExampleDownload(name: string) {
  if (typeof window !== 'undefined') {
    const event = `m_example_download_${name}`;
    
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'engagement',
        event_label: 'example_download'
      });
    }
    
    if (window.plausible) {
      window.plausible(`Example Download ${name}`);
    }
    
    console.log(`Analytics: Example downloaded - ${name}`);
  }
}

export function trackExampleUse(name: string) {
  if (typeof window !== 'undefined') {
    const event = `m_example_use_${name}`;
    
    if (window.gtag) {
      window.gtag('event', event, {
        event_category: 'conversion',
        event_label: 'example_use'
      });
    }
    
    if (window.plausible) {
      window.plausible(`Example Use ${name}`);
    }
    
    console.log(`Analytics: Example use clicked - ${name}`);
  }
}

// Track booking flow
export function trackCalendarBooked() {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'm_calendar_booked', {
        event_category: 'conversion',
        event_label: 'booking_flow'
      });
    }
    
    if (window.plausible) {
      window.plausible('Calendar Booked');
    }
    
    console.log('Analytics: Calendar booking completed');
  }
}

export function trackIntakeSubmitted() {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'm_intake_submitted', {
        event_category: 'conversion',
        event_label: 'intake_form'
      });
    }
    
    if (window.plausible) {
      window.plausible('Intake Submitted');
    }
    
    console.log('Analytics: Intake form submitted');
  }
}

// Utility function to track any custom event
export function trackCustomEvent(eventName: string, category: string = 'engagement', label?: string) {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', eventName, {
        event_category: category,
        event_label: label
      });
    }
    
    if (window.plausible) {
      window.plausible(eventName);
    }
    
    console.log(`Analytics: Custom event - ${eventName}`);
  }
}