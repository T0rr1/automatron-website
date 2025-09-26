export interface NavigationItem {
  label: string
  href: string
  description?: string
  external?: boolean
}

export interface NavigationServiceCategory {
  label: string
  href: string
  description: string
  services: NavigationItem[]
}

// Main navigation items
export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Services',
    href: '/services',
  },
  {
    label: 'Work',
    href: '/work',
    description: 'Case studies and portfolio',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
]

// Service categories for dropdown navigation
export const navigationServiceCategories: NavigationServiceCategory[] = [
  {
    label: 'Basic Scripting',
    href: '/services/basic-scripting',
    description: 'File cleanup, CSV merging, backup automation',
    services: [
      { label: 'File Cleanup & Archiving', href: '/services/basic-scripting#file-cleanup' },
      { label: 'CSV Merge & Sort', href: '/services/basic-scripting#csv-operations' },
      { label: 'Backup Automation', href: '/services/basic-scripting#backup-automation' },
      { label: 'Scheduled Jobs', href: '/services/basic-scripting#scheduled-jobs' },
    ],
  },
  {
    label: 'Email & File Hygiene',
    href: '/services/email-file-hygiene',
    description: 'Inbox rules, auto-save attachments, folder cleanup',
    services: [
      { label: 'Inbox Rules Setup', href: '/services/email-file-hygiene#inbox-rules' },
      { label: 'Auto-save Attachments', href: '/services/email-file-hygiene#auto-save' },
      { label: 'Folder Cleanup', href: '/services/email-file-hygiene#folder-cleanup' },
      { label: 'Standardized Naming', href: '/services/email-file-hygiene#naming' },
    ],
  },
  {
    label: 'Reporting Lite',
    href: '/services/reporting-lite',
    description: 'CSV cleaning, formatted Excel, PDF reports with charts',
    services: [
      { label: 'CSV Cleaning & Merging', href: '/services/reporting-lite#csv-cleaning' },
      { label: 'Formatted Excel Reports', href: '/services/reporting-lite#excel-reports' },
      { label: 'PDF Reports with Charts', href: '/services/reporting-lite#pdf-reports' },
      { label: 'Data Visualization', href: '/services/reporting-lite#visualization' },
    ],
  },
  {
    label: 'Simple Websites',
    href: '/services/websites-landing',
    description: 'Static sites, WordPress setups, contact forms, SEO basics',
    services: [
      { label: 'Static Sites', href: '/services/websites-landing#static-sites' },
      { label: 'WordPress Setup', href: '/services/websites-landing#wordpress' },
      { label: 'Contact Forms', href: '/services/websites-landing#contact-forms' },
      { label: 'SEO & Analytics', href: '/services/websites-landing#seo-analytics' },
    ],
  },
  {
    label: 'PC Helpers',
    href: '/services/pc-helpers',
    description: 'Setup scripts, app installation, system configuration',
    services: [
      { label: 'App Installation Scripts', href: '/services/pc-helpers#app-installation' },
      { label: 'Shortcuts Creation', href: '/services/pc-helpers#shortcuts' },
      { label: 'Default Settings', href: '/services/pc-helpers#default-settings' },
      { label: 'System Configuration', href: '/services/pc-helpers#system-config' },
    ],
  },
  {
    label: 'Reusable Templates',
    href: '/services/reusable-templates',
    description: 'Template gallery with customizable automation scripts',
    services: [
      { label: 'Script Templates', href: '/services/reusable-templates#script-templates' },
      { label: 'Configuration Templates', href: '/services/reusable-templates#config-templates' },
      { label: 'Workflow Templates', href: '/services/reusable-templates#workflow-templates' },
      { label: 'Custom Templates', href: '/services/reusable-templates#custom-templates' },
    ],
  },
]

// Footer navigation sections
export const footerNavigation = {
  services: {
    title: 'Services',
    items: navigationServiceCategories.map(category => ({
      label: category.label,
      href: category.href,
      description: category.description,
    })),
  },
  company: {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Work', href: '/work' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
  resources: {
    title: 'Resources',
    items: [
      { label: 'Time Savings Calculator', href: '/calculator' },
      { label: 'Free Assessment', href: '/contact#assessment' },
      { label: 'Case Studies', href: '/work' },
      { label: 'FAQ', href: '/about#faq' },
    ],
  },
}

// Social links
export const socialLinks: NavigationItem[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/automatron',
    external: true,
  },
  // Add more social links as needed
]

// Company information
export const companyInfo = {
  name: 'Automatron.ai',
  tagline: 'Save 2-5 Hours Per Week Through Automation',
  description: 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions.',
  email: 'hello@automatron.ai',
  phone: '+1 (555) 123-4567', // Placeholder
  address: {
    street: '123 Automation St',
    city: 'Tech City',
    state: 'TC',
    zip: '12345',
    country: 'USA',
  },
}