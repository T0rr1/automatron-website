/**
 * Updated Service Catalog with New Pricing Structure
 * Based on the new pricing model and service offerings
 */

export interface ServiceItem {
  id: string
  title: {
    en: string
    es: string
  }
  description: {
    en: string
    es: string
  }
  whatItDoes: {
    en: string
    es: string
  }
  idealUseCases: string[]
  inputsNeeded: string[]
  deliverables: string[]
  turnaround: string
  priceRange: {
    min: number
    max: number
    currency: string
  }
  risks: string[]
  upsells: string[]
  category: 'scripts' | 'email' | 'reports' | 'websites' | 'pc-setup' | 'templates'
  icon: string
  slug: string
}

export interface ServicePackage {
  id: string
  name: {
    en: string
    es: string
  }
  scope: string
  inclusions: string[]
  turnaround: string
  priceRange: {
    min: number
    max: number
    currency: string
  }
  whoFor: {
    en: string
    es: string
  }
  tiers?: {
    [key: string]: {
      name: { en: string; es: string }
      price: string
      features: string[]
    }
  }
}

export const servicesCatalog: ServiceItem[] = [
  {
    id: 'file-tidy-script',
    title: {
      en: 'File Tidy Script',
      es: 'Script de Limpieza de Archivos'
    },
    description: {
      en: 'One-click file cleanup.',
      es: 'Limpieza de archivos en un clic.'
    },
    whatItDoes: {
      en: 'Moves/archives messy files by rules (not delete).',
      es: 'Mueve/archiva archivos desordenados por reglas (no elimina).'
    },
    idealUseCases: [
      'Desktop clutter',
      'Shared drives',
      'Download folder management',
      'Project file sorting'
    ],
    inputsNeeded: [
      'Folder sample',
      'File naming patterns',
      'Organization preferences'
    ],
    deliverables: [
      'Script + runbook',
      'Folder structure template',
      'Safety features (dry-run, undo)'
    ],
    turnaround: '2–3 days',
    priceRange: {
      min: 249,
      max: 399,
      currency: 'USD'
    },
    risks: ["Won't restructure complex drives"],
    upsells: ['Add Backup Job'],
    category: 'scripts',
    icon: 'folder-organize',
    slug: 'file-tidy-script'
  },
  {
    id: 'csv-merger',
    title: {
      en: 'CSV Merger',
      es: 'Combinador de CSV'
    },
    description: {
      en: 'Turn many CSVs into one clean file.',
      es: 'Combina múltiples CSV en un archivo limpio.'
    },
    whatItDoes: {
      en: 'Consolidates, sorts, and dedupes CSVs.',
      es: 'Consolida, ordena y elimina duplicados de CSV.'
    },
    idealUseCases: [
      'Sales reports',
      'Export consolidation',
      'Data cleanup',
      'Monthly report preparation'
    ],
    inputsNeeded: [
      'Sample CSVs',
      'Column mapping requirements',
      'Output format preferences'
    ],
    deliverables: [
      'Script + sample output',
      'Configuration guide',
      'Error handling'
    ],
    turnaround: '2–3 days',
    priceRange: {
      min: 249,
      max: 399,
      currency: 'USD'
    },
    risks: ['Limited to ≤50k rows'],
    upsells: ['Add Reporting Lite'],
    category: 'reports',
    icon: 'table',
    slug: 'csv-merger'
  },
  {
    id: 'email-rules-pack',
    title: {
      en: 'Email Rules Pack',
      es: 'Paquete de Reglas de Email'
    },
    description: {
      en: 'Inbox hygiene without stress.',
      es: 'Higiene del correo sin riesgos.'
    },
    whatItDoes: {
      en: 'Auto-folders, save attachments, label spam.',
      es: 'Auto-carpetas, guarda adjuntos, etiqueta spam.'
    },
    idealUseCases: [
      'Solo pros drowning in email',
      'Inbox organization',
      'Attachment management',
      'Spam filtering'
    ],
    inputsNeeded: [
      'Gmail/Outlook access',
      'Email patterns sample',
      'Organization preferences'
    ],
    deliverables: [
      'Rules file + guide',
      'Setup instructions',
      'Customization guide'
    ],
    turnaround: '2 days',
    priceRange: {
      min: 199,
      max: 349,
      currency: 'USD'
    },
    risks: ["Won't fix 3rd-party APIs"],
    upsells: ['Cross-sell Attachment Saver'],
    category: 'email',
    icon: 'mail-check',
    slug: 'email-rules-pack'
  },
  {
    id: 'attachment-saver',
    title: {
      en: 'Attachment Saver',
      es: 'Guardador de Adjuntos'
    },
    description: {
      en: 'Save attachments to folder.',
      es: 'Guarda adjuntos en carpetas.'
    },
    whatItDoes: {
      en: 'Auto-saves attachments to PC/cloud.',
      es: 'Auto-guarda adjuntos en PC/nube.'
    },
    idealUseCases: [
      'Receipts management',
      'Invoice processing',
      'Document archiving',
      'Automated filing'
    ],
    inputsNeeded: [
      'Email login/test',
      'Folder structure preferences',
      'File naming requirements'
    ],
    deliverables: [
      'Script + folder setup',
      'Configuration guide',
      'Scheduling instructions'
    ],
    turnaround: '1–2 days',
    priceRange: {
      min: 199,
      max: 349,
      currency: 'USD'
    },
    risks: ['Not for enterprise mail servers'],
    upsells: ['Upsell Backup Job'],
    category: 'email',
    icon: 'download',
    slug: 'attachment-saver'
  },
  {
    id: 'lite-report-builder',
    title: {
      en: 'Lite Report Builder',
      es: 'Constructor de Reportes Ligeros'
    },
    description: {
      en: 'Basic Excel/PDF with charts.',
      es: 'Reportes básicos en Excel/PDF con gráficas.'
    },
    whatItDoes: {
      en: 'Generates periodic reports.',
      es: 'Genera reportes periódicos.'
    },
    idealUseCases: [
      'Small biz owners',
      'Monthly reporting',
      'KPI tracking',
      'Performance summaries'
    ],
    inputsNeeded: [
      'Sample data',
      'Report format requirements',
      'Chart preferences'
    ],
    deliverables: [
      'Excel + PDF templates',
      'Automation script',
      'Scheduling setup'
    ],
    turnaround: '3–5 days',
    priceRange: {
      min: 349,
      max: 599,
      currency: 'USD'
    },
    risks: ['Limited visuals, no BI'],
    upsells: ['Cross-sell Scheduled Export'],
    category: 'reports',
    icon: 'bar-chart-3',
    slug: 'lite-report-builder'
  },
  {
    id: 'landing-page-basic',
    title: {
      en: 'Landing Page Basic',
      es: 'Página de Aterrizaje Básica'
    },
    description: {
      en: 'Simple 1–3 page site.',
      es: 'Sitio básico de 1–3 páginas.'
    },
    whatItDoes: {
      en: 'Form, SEO basics, analytics.',
      es: 'Formulario, SEO básico, analytics.'
    },
    idealUseCases: [
      'Coaches',
      'Local shops',
      'Service providers',
      'Portfolio sites'
    ],
    inputsNeeded: [
      'Copy content',
      'Logo/branding',
      'Contact information'
    ],
    deliverables: [
      'Live website',
      'Contact form',
      'SEO setup',
      'Analytics integration'
    ],
    turnaround: '7–10 days',
    priceRange: {
      min: 999,
      max: 1499,
      currency: 'USD'
    },
    risks: ['No complex integrations'],
    upsells: ['Add Care Plan'],
    category: 'websites',
    icon: 'globe',
    slug: 'landing-page-basic'
  },
  {
    id: 'pc-onboard-kit',
    title: {
      en: 'PC Onboard Kit',
      es: 'Kit de Configuración de PC'
    },
    description: {
      en: 'PC setup in one run.',
      es: 'Configuración de PC en un clic.'
    },
    whatItDoes: {
      en: 'Installs apps, shortcuts, folders.',
      es: 'Instala apps, accesos directos, carpetas.'
    },
    idealUseCases: [
      'New hire setup',
      'Fresh PC configuration',
      'Standardized environments',
      'IT automation'
    ],
    inputsNeeded: [
      'List of apps',
      'Folder structure requirements',
      'User preferences'
    ],
    deliverables: [
      'Script + guide',
      'App installation list',
      'Configuration templates'
    ],
    turnaround: '2–4 days',
    priceRange: {
      min: 249,
      max: 449,
      currency: 'USD'
    },
    risks: ['Windows only'],
    upsells: ['Bundle with File Tidy'],
    category: 'pc-setup',
    icon: 'settings',
    slug: 'pc-onboard-kit'
  },
  {
    id: 'template-pack',
    title: {
      en: 'Template Pack',
      es: 'Paquete de Plantillas'
    },
    description: {
      en: 'Ready-to-customize scripts.',
      es: 'Scripts listos para personalizar.'
    },
    whatItDoes: {
      en: 'Pre-built common automations.',
      es: 'Automatizaciones comunes pre-construidas.'
    },
    idealUseCases: [
      'DIYers',
      'Learning automation',
      'Quick implementations',
      'Standard workflows'
    ],
    inputsNeeded: [
      'Selection form',
      'Use case requirements',
      'Customization needs'
    ],
    deliverables: [
      'Scripts + docs',
      'Customization guide',
      'Usage examples'
    ],
    turnaround: '1–2 days',
    priceRange: {
      min: 149,
      max: 249,
      currency: 'USD'
    },
    risks: ['Limited support'],
    upsells: ['Upsell custom tweak'],
    category: 'templates',
    icon: 'package',
    slug: 'template-pack'
  }
]

export const servicePackages: ServicePackage[] = [
  {
    id: 'starter-fix',
    name: {
      en: 'Starter Fix',
      es: 'Arreglo Inicial'
    },
    scope: '1 "quick win"',
    inclusions: ['1 script OR 1-page landing'],
    turnaround: '2–5 days',
    priceRange: {
      min: 349,
      max: 599,
      currency: 'USD'
    },
    whoFor: {
      en: 'Solo pro testing automation',
      es: 'Profesional solo probando automatización'
    }
  },
  {
    id: 'smart-bundle',
    name: {
      en: 'Smart Bundle',
      es: 'Paquete Inteligente'
    },
    scope: '2–3 automations/reports',
    inclusions: ['CSV + Email, or File + Report'],
    turnaround: '~1 week',
    priceRange: {
      min: 999,
      max: 999,
      currency: 'USD'
    },
    whoFor: {
      en: 'Small teams with clear needs',
      es: 'Equipos pequeños con necesidades claras'
    }
  },
  {
    id: 'website-basic',
    name: {
      en: 'Website Basic',
      es: 'Sitio Web Básico'
    },
    scope: '1–3 pages + form + analytics',
    inclusions: ['Landing + SEO basics'],
    turnaround: '1–2 weeks',
    priceRange: {
      min: 999,
      max: 1499,
      currency: 'USD'
    },
    whoFor: {
      en: 'Coaches/local shops',
      es: 'Coaches/tiendas locales'
    }
  },
  {
    id: 'care-plan',
    name: {
      en: 'Care Plan',
      es: 'Plan de Cuidado'
    },
    scope: 'Monthly fixes',
    inclusions: ['1–5 hrs/mo small changes (tiered)'],
    turnaround: 'Ongoing',
    priceRange: {
      min: 199,
      max: 499,
      currency: 'USD'
    },
    whoFor: {
      en: 'Owners wanting "set & forget"',
      es: 'Propietarios que quieren "configurar y olvidar"'
    },
    tiers: {
      lite: {
        name: { en: 'Lite', es: 'Ligero' },
        price: '$199/mo',
        features: ['1 hr/mo small changes']
      },
      standard: {
        name: { en: 'Standard', es: 'Estándar' },
        price: '$349/mo',
        features: ['Up to 3 hrs/mo']
      },
      premium: {
        name: { en: 'Premium', es: 'Premium' },
        price: '$499/mo',
        features: ['Priority + 5 hrs/mo']
      }
    }
  }
]

export const guarantees = {
  en: [
    'Dry-run first',
    'Move not delete',
    'Free bug fix within 7 days',
    'Clear scope (no deep custom API builds)'
  ],
  es: [
    'Ejecución en seco primero',
    'Mover no eliminar',
    'Corrección gratuita de errores en 7 días',
    'Alcance claro (sin construcciones API personalizadas profundas)'
  ]
}

export const howItWorks = {
  en: [
    'Pick your quick win',
    'Fill short form',
    'Get script/site + runbook'
  ],
  es: [
    'Elige tu victoria rápida',
    'Llena formulario corto',
    'Recibe script/sitio + manual'
  ]
}

export const serviceSummaries = {
  en: {
    scripts: 'Clean files, merge data, save hours.',
    emailHygiene: 'Inbox rules that work.',
    reports: 'Easy Excel/PDF with charts.',
    websites: '1–3 page landing sites.',
    pcSetup: 'Onboarding in a click.',
    templates: 'Ready-to-use packs.'
  },
  es: {
    scripts: 'Ordena archivos, combina datos, ahorra horas.',
    emailHygiene: 'Reglas de correo que funcionan.',
    reports: 'Excel/PDF fáciles con gráficas.',
    websites: 'Sitios de 1–3 páginas.',
    pcSetup: 'Onboarding en un clic.',
    templates: 'Paquetes listos para usar.'
  }
}