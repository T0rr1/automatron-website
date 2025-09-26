import { DefaultSeoProps } from 'next-seo';

export const defaultSEO: DefaultSeoProps = {
  title: 'Automatron.ai - Save 2-5 Hours Per Week Through Automation',
  description: 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions that save 2-5 hours weekly.',
  canonical: 'https://automatron.ai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://automatron.ai',
    siteName: 'Automatron.ai',
    title: 'Automatron.ai - Save 2-5 Hours Per Week Through Automation',
    description: 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions that save 2-5 hours weekly.',
    images: [
      {
        url: 'https://automatron.ai/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Automatron.ai - Automation Services',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    handle: '@automatronai',
    site: '@automatronai',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#0066cc',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
    {
      name: 'author',
      content: 'Automatron.ai',
    },
    {
      name: 'keywords',
      content: 'automation, PowerShell, Python, Excel, business automation, workflow automation, time saving, productivity',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

// SEO configurations for different page types
export const pageSEO = {
  home: {
    title: 'Automatron.ai - Save 2-5 Hours Per Week Through Automation',
    description: 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions that save 2-5 hours weekly.',
    canonical: 'https://automatron.ai',
  },
  services: {
    title: 'Automation Services - PowerShell, Python & Excel Solutions | Automatron.ai',
    description: 'Comprehensive automation services including Basic Scripting, Email Hygiene, Reporting, Website Development, and PC Setup. Starting at $249.',
    canonical: 'https://automatron.ai/services',
  },
  about: {
    title: 'About Automatron.ai - Professional Automation Experts',
    description: 'Learn about our mission to save busy professionals 2-5 hours per week through practical automation solutions. Windows-first with cross-platform capabilities.',
    canonical: 'https://automatron.ai/about',
  },
  contact: {
    title: 'Contact Automatron.ai - Start Your Automation Project',
    description: 'Get started with professional automation services. Free consultation and project assessment. Typical turnaround: 1-7 days.',
    canonical: 'https://automatron.ai/contact',
  },
  work: {
    title: 'Case Studies - Real Automation Success Stories | Automatron.ai',
    description: 'See how we\'ve helped businesses save 2-5 hours per week through automation. Real case studies with measurable results.',
    canonical: 'https://automatron.ai/work',
  },
};

// Generate dynamic SEO for service pages
export const generateServiceSEO = (serviceName: string, serviceDescription: string, serviceSlug: string) => ({
  title: `${serviceName} - Professional Automation Service | Automatron.ai`,
  description: `${serviceDescription} Professional automation service with 1-7 day turnaround. Starting at $249.`,
  canonical: `https://automatron.ai/services/${serviceSlug}`,
  openGraph: {
    title: `${serviceName} - Professional Automation Service | Automatron.ai`,
    description: `${serviceDescription} Professional automation service with 1-7 day turnaround.`,
    url: `https://automatron.ai/services/${serviceSlug}`,
  },
});

// Generate dynamic SEO for case study pages
export const generateCaseStudySEO = (title: string, description: string, slug: string) => ({
  title: `${title} - Case Study | Automatron.ai`,
  description: `${description} See how we helped save time through automation.`,
  canonical: `https://automatron.ai/work/${slug}`,
  openGraph: {
    title: `${title} - Case Study | Automatron.ai`,
    description: `${description} See how we helped save time through automation.`,
    url: `https://automatron.ai/work/${slug}`,
  },
});