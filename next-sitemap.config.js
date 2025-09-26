/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://automatron.ai',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // For smaller sites, we don't need index sitemap
  exclude: [
    '/api/*',
    '/admin/*',
    '/private/*',
    '/_next/*',
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://automatron.ai/sitemap.xml',
    ],
  },
  // Transform function to add alternateRefs for i18n
  transform: async (config, path) => {
    // Default entry
    const entry = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };

    // Add alternate language versions
    if (!path.includes('/api/') && !path.includes('/_next/')) {
      entry.alternateRefs = [
        {
          href: `${config.siteUrl}/en${path}`,
          hreflang: 'en',
        },
        {
          href: `${config.siteUrl}/es${path}`,
          hreflang: 'es',
        },
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'x-default',
        },
      ];
    }

    return entry;
  },
  // Additional paths for dynamic routes
  additionalPaths: async (config) => {
    const paths = [];
    
    // Service pages
    const services = [
      'basic-scripting',
      'email-file-hygiene', 
      'reporting-lite',
      'websites-landing',
      'pc-helpers',
      'reusable-templates',
    ];
    
    services.forEach(service => {
      paths.push({
        loc: `/services/${service}`,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    // Case study pages (example - in production you'd fetch from your data source)
    const caseStudies = [
      'email-automation-small-business',
      'file-cleanup-consulting-firm',
      'report-generation-nonprofit',
    ];
    
    caseStudies.forEach(study => {
      paths.push({
        loc: `/work/${study}`,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    return paths;
  },
  // Priority and changefreq by route pattern
  priority: 1.0,
  changefreq: 'daily',
  // Custom priority and changefreq for specific routes
  transform: async (config, path) => {
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Service pages are important
    else if (path.includes('/services')) {
      priority = 0.8;
      changefreq = 'weekly';
    }
    // Case studies
    else if (path.includes('/work')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    // About and contact pages
    else if (path.includes('/about') || path.includes('/contact')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Legal pages
    else if (path.includes('/privacy') || path.includes('/terms')) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: [
        {
          href: `${config.siteUrl}/en${path}`,
          hreflang: 'en',
        },
        {
          href: `${config.siteUrl}/es${path}`,
          hreflang: 'es',
        },
        {
          href: `${config.siteUrl}${path}`,
          hreflang: 'x-default',
        },
      ],
    };
  },
};