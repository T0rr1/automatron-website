// JSON-LD structured data schemas for SEO

export interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate: string;
  contactPoint: {
    '@type': string;
    contactType: string;
    email: string;
    url: string;
  };
  sameAs: string[];
  address?: {
    '@type': string;
    addressCountry: string;
    addressRegion: string;
  };
  areaServed: string[];
  knowsAbout: string[];
}

export interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  serviceType: string;
  areaServed: string[];
  hasOfferCatalog: {
    '@type': string;
    name: string;
    itemListElement: Array<{
      '@type': string;
      name: string;
      description: string;
      url: string;
    }>;
  };
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface WebsiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

// Organization structured data
export const organizationSchema: OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Automatron.ai',
  url: 'https://automatron.ai',
  logo: 'https://automatron.ai/logo.png',
  description: 'Professional automation services for solo business owners and small teams. Specializing in PowerShell, Python, and Excel automation solutions.',
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'hello@automatron.ai',
    url: 'https://automatron.ai/contact',
  },
  sameAs: [
    'https://www.linkedin.com/company/automatron-ai',
    'https://twitter.com/automatronai',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'US',
    addressRegion: 'Remote',
  },
  areaServed: ['United States', 'Canada', 'Remote'],
  knowsAbout: [
    'PowerShell Automation',
    'Python Scripting',
    'Excel Automation',
    'Business Process Automation',
    'Workflow Optimization',
    'File Management Automation',
    'Email Automation',
    'Report Generation',
  ],
};

// Website structured data
export const websiteSchema: WebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Automatron.ai',
  url: 'https://automatron.ai',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://automatron.ai/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

// Service catalog structured data
export const serviceSchema: ServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Business Automation Services',
  description: 'Professional automation services including PowerShell scripting, Python automation, Excel solutions, and workflow optimization.',
  provider: {
    '@type': 'Organization',
    name: 'Automatron.ai',
    url: 'https://automatron.ai',
  },
  serviceType: 'Business Process Automation',
  areaServed: ['United States', 'Canada', 'Remote'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Automation Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Basic Scripting',
        description: 'File cleanup, CSV processing, backup automation, and scheduled tasks.',
        url: 'https://automatron.ai/services/basic-scripting',
      },
      {
        '@type': 'Offer',
        name: 'Email & File Hygiene',
        description: 'Inbox rules, attachment management, folder organization, and file cleanup.',
        url: 'https://automatron.ai/services/email-file-hygiene',
      },
      {
        '@type': 'Offer',
        name: 'Reporting Lite',
        description: 'CSV processing, Excel report generation, PDF creation, and data visualization.',
        url: 'https://automatron.ai/services/reporting-lite',
      },
      {
        '@type': 'Offer',
        name: 'Simple Websites & Landing Pages',
        description: 'Static websites, WordPress setup, contact forms, and SEO optimization.',
        url: 'https://automatron.ai/services/websites-landing',
      },
      {
        '@type': 'Offer',
        name: 'PC Onboarding Helpers',
        description: 'Setup scripts, application installation, system configuration, and shortcuts.',
        url: 'https://automatron.ai/services/pc-helpers',
      },
      {
        '@type': 'Offer',
        name: 'Reusable Templates',
        description: 'Customizable automation templates and script libraries.',
        url: 'https://automatron.ai/services/reusable-templates',
      },
    ],
  },
};

// Generate FAQ structured data
export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): FAQSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

// Generate service-specific structured data
export const generateServiceStructuredData = (
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string,
  startingPrice?: string,
  turnaroundTime?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  url: serviceUrl,
  provider: {
    '@type': 'Organization',
    name: 'Automatron.ai',
    url: 'https://automatron.ai',
  },
  serviceType: 'Business Process Automation',
  areaServed: ['United States', 'Canada', 'Remote'],
  ...(startingPrice && {
    offers: {
      '@type': 'Offer',
      price: startingPrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }),
  ...(turnaroundTime && {
    serviceOutput: {
      '@type': 'Thing',
      name: 'Automation Solution',
      description: `Delivered within ${turnaroundTime}`,
    },
  }),
});

// Generate case study structured data
export const generateCaseStudyStructuredData = (
  title: string,
  description: string,
  timeSaved: string,
  industry: string,
  url: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  url: url,
  author: {
    '@type': 'Organization',
    name: 'Automatron.ai',
    url: 'https://automatron.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Automatron.ai',
    url: 'https://automatron.ai',
    logo: {
      '@type': 'ImageObject',
      url: 'https://automatron.ai/logo.png',
    },
  },
  about: {
    '@type': 'Thing',
    name: 'Business Process Automation',
    description: `Automation case study in ${industry} industry`,
  },
  mainEntity: {
    '@type': 'Thing',
    name: 'Time Savings',
    description: `Achieved ${timeSaved} time savings through automation`,
  },
});