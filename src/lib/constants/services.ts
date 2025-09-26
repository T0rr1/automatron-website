import { ServiceCategoryType, ServiceCategory, Service } from '@/types'

// Service data based on requirements 10.1-10.7
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'basic-scripting',
    slug: 'basic-scripting',
    name: 'Basic Scripting',
    description: 'File cleanup, archiving, CSV operations, and backup automation to streamline your daily tasks',
    icon: '🔧',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'File cleanup and archiving',
      'CSV merge and sort operations',
      'Automated backup routines',
      'Scheduled job automation'
    ],
    targetAudience: ['Solo business owners', 'Small teams', 'Data managers'],
    order: 1
  },
  {
    id: 'email-file-hygiene',
    slug: 'email-file-hygiene',
    name: 'Email & File Hygiene',
    description: 'Inbox rules, attachment management, and folder organization to keep your digital workspace clean',
    icon: '📧',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'Automated inbox rules',
      'Auto-save attachments',
      'Standardized file naming',
      'Folder cleanup automation'
    ],
    targetAudience: ['Busy professionals', 'Administrative staff', 'Project managers'],
    order: 2
  },
  {
    id: 'reporting-lite',
    slug: 'reporting-lite',
    name: 'Reporting Lite',
    description: 'CSV cleaning, Excel formatting, and PDF report generation with charts and data visualization',
    icon: '📊',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'CSV cleaning and merging',
      'Formatted Excel generation',
      'PDF reports with charts',
      'Data visualization dashboards'
    ],
    targetAudience: ['Data analysts', 'Managers', 'Business owners'],
    order: 3
  },
  {
    id: 'websites-landing',
    slug: 'websites-landing',
    name: 'Simple Websites/Landing Pages',
    description: 'Static sites, WordPress setups, contact forms, and SEO basics for your online presence',
    icon: '🌐',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'Static website creation',
      'Basic WordPress setups',
      'Contact form integration',
      'SEO optimization basics',
      'Analytics integration'
    ],
    targetAudience: ['Small businesses', 'Freelancers', 'Startups'],
    order: 4
  },
  {
    id: 'pc-helpers',
    slug: 'pc-helpers',
    name: 'System Onboarding Helpers',
    description: 'Setup scripts for app installation, shortcuts, and system configuration for Windows & Mac systems',
    icon: '💻',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'Automated app installation (Windows & Mac)',
      'Desktop shortcuts creation',
      'Default settings configuration',
      'System optimization scripts',
      'Cross-platform compatibility'
    ],
    targetAudience: ['IT administrators', 'Small businesses', 'Remote teams'],
    order: 5
  },
  {
    id: 'reusable-templates',
    slug: 'reusable-templates',
    name: 'Reusable Templates',
    description: 'Customizable automation templates and scripts that you can adapt for recurring business needs',
    icon: '📋',
    createdAt: new Date().toISOString(),
    services: [],
    useCases: [
      'Template gallery access',
      'Customizable automation scripts',
      'Recurring workflow templates',
      'Business process automation'
    ],
    targetAudience: ['All business types', 'Process managers', 'Efficiency seekers'],
    order: 6
  }
]

// Service packages and pricing information with anchored pricing
export const servicePricing = {
  starter: {
    name: 'Starter Fix',
    priceRange: '$349-$599',
    description: 'Perfect for single automation tasks',
    turnaround: '1-3 days'
  },
  bundle: {
    name: 'Smart Bundle',
    priceRange: '$999-$1,499',
    description: 'Multiple related automation tasks',
    turnaround: '3-7 days'
  },
  websiteBasic: {
    name: 'Website Basic',
    priceRange: '$999-$1,499',
    description: 'Simple websites and landing pages',
    turnaround: '5-7 days'
  },
  carePlan: {
    name: 'Care Plan',
    priceRange: '$199-$499/mo',
    description: 'Ongoing automation support',
    turnaround: 'Ongoing'
  }
}

// Category-specific pricing with outcome-focused headlines
export const categoryPricing: Record<string, {
  priceRange: string
  valueStatement: string
  ctaText: string
  ctaTextEs: string
  outcomeHeadline: string
}> = {
  'basic-scripting': {
    priceRange: '$349-$599',
    valueStatement: 'Saves 2-5 hrs/week ($200+ value)',
    ctaText: 'Get My Script',
    ctaTextEs: 'Obtener Script',
    outcomeHeadline: 'Clean Files, One Click'
  },
  'email-file-hygiene': {
    priceRange: '$299-$499',
    valueStatement: 'Saves 1-3 hrs/week ($150+ value)',
    ctaText: 'Fix My Inbox',
    ctaTextEs: 'Arreglar Bandeja',
    outcomeHeadline: 'Inbox Rules That Work'
  },
  'reporting-lite': {
    priceRange: '$499-$799',
    valueStatement: 'Saves 3-6 hrs/week ($300+ value)',
    ctaText: 'Automate Reports',
    ctaTextEs: 'Automatizar Reportes',
    outcomeHeadline: 'Reports Without Spreadsheets'
  },
  'websites-landing': {
    priceRange: '$999-$1,499',
    valueStatement: 'Saves 10-20 hrs setup',
    ctaText: 'Build My Site',
    ctaTextEs: 'Construir Sitio',
    outcomeHeadline: 'Online in Days, Not Weeks'
  },
  'pc-helpers': {
    priceRange: '$399-$699',
    valueStatement: 'Saves 4-8 hrs per system',
    ctaText: 'Setup Systems',
    ctaTextEs: 'Configurar Sistemas',
    outcomeHeadline: 'New PCs Ready, One Click'
  },
  'reusable-templates': {
    priceRange: '$199-$399',
    valueStatement: 'Saves 2-4 hrs per task',
    ctaText: 'Get Templates',
    ctaTextEs: 'Obtener Plantillas',
    outcomeHeadline: 'Templates That Adapt'
  }
}

// Before/after scenarios for each service category with improved messaging
export const serviceScenarios: Record<string, {
  before: string
  after: string
  timeSaved: string
  deliverables: string[]
  safetyNote: string
  scopeNote: string
}> = {
  'basic-scripting': {
    before: 'Manually sorting through hundreds of files, spending 2+ hours weekly on repetitive CSV tasks',
    after: 'Your messy folders auto-organized every day. Safe scripts (move-not-delete) save you 2-5 hrs/week ($200+ value).',
    timeSaved: '2-5 hrs/week',
    deliverables: ['PowerShell/Python scripts (cross-platform)', 'Configuration files', 'Documentation', 'Execution logs'],
    safetyNote: 'Safe scripts: dry-run first, move-not-delete.',
    scopeNote: 'Note: no complex APIs or enterprise systems.'
  },
  'email-file-hygiene': {
    before: 'Cluttered inbox with attachments scattered across folders, manual file naming inconsistencies',
    after: 'Your inbox stays clean automatically — zero clicks, zero stress. Attachments organized, files properly named.',
    timeSaved: '1-3 hrs/week',
    deliverables: ['Email rules configuration', 'File organization scripts', 'Naming conventions guide', 'Setup documentation'],
    safetyNote: 'Safe scripts: dry-run first, move-not-delete.',
    scopeNote: 'Note: no complex integrations or enterprise systems.'
  },
  'reporting-lite': {
    before: 'Manual Excel formatting, copying data between spreadsheets, creating charts from scratch',
    after: 'Professional reports generate themselves — formatted Excel, polished PDFs, zero manual work.',
    timeSaved: '3-6 hrs/week',
    deliverables: ['Report generation scripts', 'Excel templates', 'PDF formatting', 'Data visualization charts'],
    safetyNote: 'Safe scripts: dry-run first, move-not-delete.',
    scopeNote: 'Note: no complex APIs or enterprise systems.'
  },
  'websites-landing': {
    before: 'No online presence or outdated website, missing contact forms and basic SEO',
    after: 'Professional website live in days — mobile-ready, SEO-optimized, contact forms working.',
    timeSaved: '10-20 hrs setup',
    deliverables: ['Complete website', 'Contact form integration', 'SEO setup', 'Analytics configuration'],
    safetyNote: 'Safe deployment: staging first, backup included.',
    scopeNote: 'Note: no complex e-commerce or custom applications.'
  },
  'pc-helpers': {
    before: 'Hours spent manually installing software and configuring settings on new Windows & Mac systems',
    after: 'New systems ready in minutes — all apps installed, settings configured, shortcuts created.',
    timeSaved: '4-8 hrs per system',
    deliverables: ['Cross-platform installation scripts', 'Configuration files', 'Desktop shortcuts', 'System optimization'],
    safetyNote: 'Safe scripts: dry-run first, move-not-delete.',
    scopeNote: 'Note: no complex enterprise software or custom applications.'
  },
  'reusable-templates': {
    before: 'Recreating automation solutions from scratch for similar business processes',
    after: 'Ready-made templates adapt to your needs — customize once, use forever.',
    timeSaved: '2-4 hrs per task',
    deliverables: ['Template library', 'Customization guides', 'Example implementations', 'Usage documentation'],
    safetyNote: 'Safe templates: tested and documented.',
    scopeNote: 'Note: templates for common business processes only.'
  }
}

// Success metrics for display
export const successMetrics = {
  successRate: '95%+',
  averageTimeSaved: '2-5 hours/week ($200+ value)',
  typicalTurnaround: '1-7 days',
  clientSatisfaction: '4.9/5'
}

// FAQ data for each service category
export const serviceFaqs: Record<string, Array<{ q: string; a: string }>> = {
  'basic-scripting': [
    {
      q: 'What types of files can you help organize and clean up?',
      a: 'We can automate organization for virtually any file type - documents, images, videos, spreadsheets, and more. Our scripts can sort by date, file type, size, or custom naming patterns, and safely move (never delete) files to organized folder structures.'
    },
    {
      q: 'How do CSV merge and sort operations work?',
      a: 'Our scripts can combine multiple CSV files, remove duplicates, sort by any column, and apply data cleaning rules. We handle different formats, encoding issues, and can merge files with different column structures while preserving data integrity.'
    },
    {
      q: 'Can you create backup automation for my specific needs?',
      a: 'Yes! We create custom backup scripts that can run on schedules, backup to multiple locations (local drives, cloud storage), and include verification to ensure backups completed successfully. All with detailed logging and email notifications.'
    },
    {
      q: 'What if I need to modify the scripts later?',
      a: 'All scripts come with clear documentation and are written to be easily modifiable. We also provide 30-day support for any adjustments needed, and can create additional versions for different scenarios.'
    }
  ],
  'email-file-hygiene': [
    {
      q: 'Which email platforms do you support for automation?',
      a: 'We primarily work with Outlook and Gmail, creating rules and filters that automatically organize emails, save attachments, and maintain clean inboxes. We can also work with other platforms that support rule-based automation.'
    },
    {
      q: 'How does automatic attachment saving work?',
      a: 'We set up rules that automatically save attachments from specific senders or with certain keywords to designated folders, with organized naming conventions. This works for invoices, reports, contracts, and any recurring document types.'
    },
    {
      q: 'Can you help standardize file naming across my organization?',
      a: 'Absolutely! We create scripts that rename files according to your standards, and can set up folder monitoring to automatically rename new files. We also provide naming convention guides for your team to follow.'
    },
    {
      q: 'What about cleaning up years of disorganized files?',
      a: 'We specialize in this! Our scripts can analyze existing file structures, identify patterns, and safely reorganize thousands of files. We always use move operations (never delete) and provide detailed logs of all changes made.'
    }
  ],
  'reporting-lite': [
    {
      q: 'What types of reports can you automate?',
      a: 'We can automate financial reports, sales dashboards, inventory summaries, project status reports, and any recurring report that pulls from spreadsheets or databases. Output formats include Excel, PDF, and web dashboards.'
    },
    {
      q: 'How do you handle data from multiple sources?',
      a: 'Our scripts can pull data from various sources - multiple Excel files, CSV exports, databases, and even web APIs. We clean, merge, and format everything into professional reports with consistent styling and charts.'
    },
    {
      q: 'Can you create interactive charts and visualizations?',
      a: 'Yes! We create dynamic charts in Excel and can generate web-based dashboards with interactive elements. Charts automatically update when new data is added, and we can set up automated email delivery of reports.'
    },
    {
      q: 'What if my data format changes?',
      a: 'We build flexibility into our scripts to handle common format variations. If significant changes occur, we provide 30-day support to adjust the automation, and can create more robust solutions for frequently changing data sources.'
    }
  ],
  'websites-landing': [
    {
      q: 'What\'s included in a basic website setup?',
      a: 'A complete responsive website with your content, contact forms, basic SEO optimization, mobile-friendly design, and hosting setup. We also include Google Analytics integration and basic security measures.'
    },
    {
      q: 'Do you work with existing WordPress sites?',
      a: 'Yes! We can optimize existing WordPress sites, add functionality, improve performance, set up automated backups, and enhance security. We also handle plugin management and updates.'
    },
    {
      q: 'How do contact forms work and where do submissions go?',
      a: 'We set up secure contact forms that deliver submissions to your email, with spam protection and automated responses. We can also integrate with CRM systems or create simple lead management solutions.'
    },
    {
      q: 'What ongoing maintenance is required?',
      a: 'Static sites require minimal maintenance. WordPress sites benefit from regular updates, which we can automate or handle through our Care Plan service. We provide documentation for basic content updates you can do yourself.'
    }
  ],
  'pc-helpers': [
    {
      q: 'What software can you automate installation for?',
      a: 'We can automate installation of most business software - Office suites, browsers, PDF readers, antivirus, development tools, and industry-specific applications. We handle both standard installers and custom configurations.'
    },
    {
      q: 'How do you handle different PC configurations?',
      a: 'Our scripts detect system specifications and adapt accordingly. We can create different profiles for different roles (admin, sales, development) and handle both Windows and Mac environments with appropriate variations.'
    },
    {
      q: 'Can you set up automated system maintenance?',
      a: 'Yes! We create scripts for disk cleanup, temporary file removal, software updates, and system optimization. These can run on schedules and include reporting on system health and maintenance activities performed.'
    },
    {
      q: 'What about security and compliance requirements?',
      a: 'We incorporate security best practices including antivirus setup, firewall configuration, automatic updates, and user account management. We can also implement compliance-specific settings for industries with regulatory requirements.'
    }
  ],
  'reusable-templates': [
    {
      q: 'How do reusable templates work?',
      a: 'Templates are pre-built automation solutions that can be customized for your specific needs. They include the core logic, documentation, and configuration files that you can adapt rather than building from scratch.'
    },
    {
      q: 'What types of templates are available?',
      a: 'We have templates for common business processes: invoice processing, report generation, file organization, email automation, data backup, and system maintenance. New templates are added based on client needs.'
    },
    {
      q: 'How much customization is typically needed?',
      a: 'Most templates need 20-30% customization for specific business needs - adjusting file paths, email addresses, data formats, or business rules. We provide clear customization guides and examples.'
    },
    {
      q: 'Do templates come with ongoing updates?',
      a: 'Yes! Templates are updated for compatibility, security, and new features. Care Plan subscribers get automatic updates, while others can purchase updated versions or upgrade services as needed.'
    }
  ]
}