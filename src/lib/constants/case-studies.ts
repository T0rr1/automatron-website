import { CaseStudy, ServiceCategoryType } from '@/types'

// Sample case studies data based on requirements 4.1-4.5
export const caseStudies: CaseStudy[] = [
  {
    id: 'law-firm-file-automation',
    slug: 'law-firm-file-automation',
    title: 'Law Firm Document Organization Automation',
    client: 'Regional Law Practice',
    industry: 'Legal Services',
    serviceCategory: 'basic-scripting',
    challenge: 'A 15-attorney law firm was spending 8+ hours weekly manually organizing client documents, case files, and correspondence. Files were inconsistently named and scattered across multiple folders, making case preparation time-consuming and error-prone.',
    solution: 'Implemented automated file organization system with PowerShell scripts that sort documents by case number, client name, and document type. Added automated backup routines and standardized naming conventions across all case files.',
    results: {
      timeSavedPerWeek: 8,
      successRate: 98,
      turnaroundTime: '3 days',
      clientSatisfaction: 5,
      businessImpact: 'Reduced case preparation time by 60% and eliminated lost document incidents'
    },
    deliverables: [
      'PowerShell file organization scripts',
      'Automated backup system',
      'Standardized naming convention guide',
      'Training documentation for staff',
      'Execution logs and monitoring'
    ],
    testimonial: 'This automation has been a game-changer for our practice. We\'ve gone from spending entire afternoons organizing files to having everything automatically sorted and backed up. Our case preparation is now 60% faster.',
    metrics: [
      { label: 'Time Saved', value: 8, unit: 'hours/week', improvement: '+60%' },
      { label: 'Success Rate', value: 98, unit: '%' },
      { label: 'Files Processed', value: '2,500+', improvement: 'weekly' },
      { label: 'Error Reduction', value: 95, unit: '%', improvement: '+95%' }
    ],
    beforeAfter: {
      before: 'Manual file sorting taking 8+ hours weekly, inconsistent naming, frequent lost documents, case preparation delays',
      after: 'Automated file organization, standardized naming, zero lost documents, 60% faster case preparation'
    },
    createdAt: '2024-01-15T00:00:00Z',
    heroImage: '/images/case-studies/law-firm-hero.jpg'
  },
  {
    id: 'marketing-agency-reporting',
    slug: 'marketing-agency-reporting',
    title: 'Marketing Agency Client Reporting Automation',
    client: 'Digital Marketing Agency',
    industry: 'Marketing & Advertising',
    serviceCategory: 'reporting-lite',
    challenge: 'Agency was manually creating 20+ client reports monthly, each taking 2-3 hours to compile data from multiple platforms, format charts, and generate PDFs. Reports were often delayed and inconsistent in format.',
    solution: 'Built automated reporting system that pulls data from Google Analytics, social media platforms, and ad accounts. Creates formatted Excel reports with charts and generates professional PDF summaries with branded templates.',
    results: {
      timeSavedPerWeek: 15,
      successRate: 96,
      turnaroundTime: '5 days',
      clientSatisfaction: 5,
      businessImpact: 'Increased client retention by 25% due to consistent, timely reporting'
    },
    deliverables: [
      'Automated data collection scripts',
      'Excel report templates with charts',
      'PDF generation with branded design',
      'Email automation for report delivery',
      'Client dashboard setup'
    ],
    testimonial: 'Our client reporting went from being our biggest time sink to a competitive advantage. Reports are now delivered consistently on time, and clients love the professional format and detailed insights.',
    metrics: [
      { label: 'Time Saved', value: 15, unit: 'hours/week', improvement: '+75%' },
      { label: 'Reports Generated', value: 20, unit: 'monthly' },
      { label: 'Client Retention', value: 25, unit: '%', improvement: '+25%' },
      { label: 'Delivery Consistency', value: 100, unit: '%', improvement: '+100%' }
    ],
    beforeAfter: {
      before: 'Manual report creation taking 40+ hours monthly, inconsistent formats, frequent delays, client complaints',
      after: 'Automated report generation, consistent professional format, on-time delivery, improved client satisfaction'
    },
    createdAt: '2024-02-01T00:00:00Z',
    heroImage: '/images/case-studies/marketing-agency-hero.jpg'
  },
  {
    id: 'healthcare-email-automation',
    slug: 'healthcare-email-automation',
    title: 'Healthcare Practice Email & Document Management',
    client: 'Family Medical Practice',
    industry: 'Healthcare',
    serviceCategory: 'email-file-hygiene',
    challenge: 'Medical practice receiving 200+ emails daily with patient documents, insurance forms, and lab results. Staff spent 3+ hours daily manually sorting emails and saving attachments to correct patient folders.',
    solution: 'Implemented Outlook rules and PowerShell scripts to automatically sort emails by sender and content, save attachments to patient-specific folders with HIPAA-compliant naming, and create daily processing reports.',
    results: {
      timeSavedPerWeek: 15,
      successRate: 99,
      turnaroundTime: '2 days',
      clientSatisfaction: 5,
      businessImpact: 'Improved patient care response time by 40% and eliminated document filing errors'
    },
    deliverables: [
      'Outlook email rules configuration',
      'HIPAA-compliant file naming system',
      'Automated attachment processing',
      'Daily processing reports',
      'Staff training materials'
    ],
    testimonial: 'The email automation has transformed our office workflow. We no longer lose patient documents, and our staff can focus on patient care instead of email management. Response times have improved dramatically.',
    metrics: [
      { label: 'Time Saved', value: 15, unit: 'hours/week', improvement: '+75%' },
      { label: 'Emails Processed', value: 200, unit: 'daily' },
      { label: 'Filing Accuracy', value: 99, unit: '%', improvement: '+99%' },
      { label: 'Response Time', value: 40, unit: '%', improvement: '+40%' }
    ],
    beforeAfter: {
      before: 'Manual email sorting taking 15+ hours weekly, frequent misfiled documents, delayed patient responses',
      after: 'Automated email processing, perfect filing accuracy, 40% faster patient response times'
    },
    createdAt: '2024-01-28T00:00:00Z',
    heroImage: '/images/case-studies/healthcare-hero.jpg'
  },
  {
    id: 'consulting-firm-website',
    slug: 'consulting-firm-website',
    title: 'Consulting Firm Professional Website Launch',
    client: 'Business Strategy Consultants',
    industry: 'Professional Services',
    serviceCategory: 'websites-landing',
    challenge: 'Established consulting firm had no web presence, losing potential clients to competitors. Needed professional website with service descriptions, case studies, and lead capture forms within tight 1-week deadline.',
    solution: 'Built responsive static website with modern design, service portfolio, client testimonials, and integrated contact forms. Implemented SEO optimization and Google Analytics for lead tracking.',
    results: {
      timeSavedPerWeek: 5,
      successRate: 100,
      turnaroundTime: '6 days',
      clientSatisfaction: 5,
      businessImpact: 'Generated 15 qualified leads in first month, 3 new clients worth $75K'
    },
    deliverables: [
      'Fully responsive website',
      'Contact form with CRM integration',
      'SEO optimization setup',
      'Google Analytics configuration',
      'Content management training'
    ],
    testimonial: 'We went from having no web presence to a professional website that generates quality leads. The quick turnaround was impressive, and the results speak for themselves - 3 new clients in the first month.',
    metrics: [
      { label: 'Setup Time Saved', value: 20, unit: 'hours', improvement: 'vs DIY' },
      { label: 'Leads Generated', value: 15, unit: 'first month' },
      { label: 'New Clients', value: 3, unit: 'first month' },
      { label: 'Revenue Impact', value: '$75K', improvement: 'first quarter' }
    ],
    beforeAfter: {
      before: 'No web presence, losing clients to competitors, manual lead tracking, unprofessional image',
      after: 'Professional website, automated lead capture, improved credibility, measurable ROI'
    },
    createdAt: '2024-02-10T00:00:00Z',
    heroImage: '/images/case-studies/consulting-website-hero.jpg'
  },
  {
    id: 'tech-startup-pc-setup',
    slug: 'tech-startup-pc-setup',
    title: 'Tech Startup Automated PC Onboarding',
    client: 'Growing Software Startup',
    industry: 'Technology',
    serviceCategory: 'pc-helpers',
    challenge: 'Fast-growing startup was spending 6+ hours setting up each new employee\'s computer with development tools, company software, and security configurations. Process was inconsistent and error-prone.',
    solution: 'Created comprehensive PC setup automation with PowerShell scripts for software installation, development environment configuration, security settings, and company-specific customizations. Includes role-based profiles for different team members.',
    results: {
      timeSavedPerWeek: 12,
      successRate: 100,
      turnaroundTime: '4 days',
      clientSatisfaction: 5,
      businessImpact: 'Reduced new hire onboarding time by 80%, improved security compliance'
    },
    deliverables: [
      'Automated software installation scripts',
      'Development environment setup',
      'Security configuration automation',
      'Role-based setup profiles',
      'Onboarding documentation'
    ],
    testimonial: 'New employee onboarding used to be a nightmare - now it\'s completely automated. New hires can be productive on day one instead of waiting for IT setup. It\'s saved us countless hours and improved our security posture.',
    metrics: [
      { label: 'Setup Time Reduced', value: 80, unit: '%', improvement: '+80%' },
      { label: 'Time per Setup', value: 1, unit: 'hour', improvement: 'vs 6 hours' },
      { label: 'Consistency Rate', value: 100, unit: '%', improvement: '+100%' },
      { label: 'Security Compliance', value: 100, unit: '%', improvement: '+100%' }
    ],
    beforeAfter: {
      before: 'Manual 6-hour PC setup per employee, inconsistent configurations, security gaps, delayed productivity',
      after: 'Automated 1-hour setup, consistent configurations, full security compliance, immediate productivity'
    },
    createdAt: '2024-02-05T00:00:00Z',
    heroImage: '/images/case-studies/tech-startup-hero.jpg'
  },
  {
    id: 'retail-chain-templates',
    slug: 'retail-chain-templates',
    title: 'Retail Chain Inventory Management Templates',
    client: 'Regional Retail Chain',
    industry: 'Retail',
    serviceCategory: 'reusable-templates',
    challenge: 'Multi-location retail chain needed consistent inventory reporting across 8 stores. Each location was using different spreadsheets and processes, making consolidated reporting impossible and inventory management inefficient.',
    solution: 'Developed reusable Excel templates with automated calculations, standardized reporting formats, and PowerShell scripts for data consolidation. Created templates for daily sales, inventory counts, and monthly summaries.',
    results: {
      timeSavedPerWeek: 20,
      successRate: 98,
      turnaroundTime: '5 days',
      clientSatisfaction: 5,
      businessImpact: 'Improved inventory accuracy by 35%, reduced stockouts by 50%'
    },
    deliverables: [
      'Standardized Excel templates',
      'Data consolidation scripts',
      'Automated reporting system',
      'Training materials for all locations',
      'Template customization guide'
    ],
    testimonial: 'The templates have standardized our entire inventory process across all locations. We now have real-time visibility into stock levels and can make data-driven purchasing decisions. Stockouts are down 50%.',
    metrics: [
      { label: 'Time Saved', value: 20, unit: 'hours/week', improvement: '+70%' },
      { label: 'Inventory Accuracy', value: 35, unit: '%', improvement: '+35%' },
      { label: 'Stockout Reduction', value: 50, unit: '%', improvement: '+50%' },
      { label: 'Locations Standardized', value: 8, unit: 'stores' }
    ],
    beforeAfter: {
      before: 'Inconsistent inventory tracking across locations, manual consolidation, frequent stockouts, poor visibility',
      after: 'Standardized templates, automated consolidation, improved accuracy, real-time inventory visibility'
    },
    createdAt: '2024-01-20T00:00:00Z',
    heroImage: '/images/case-studies/retail-chain-hero.jpg'
  }
]

// Filter case studies by service category
export function getCaseStudiesByCategory(category?: string): CaseStudy[] {
  if (!category) return caseStudies
  return caseStudies.filter(study => study.serviceCategory === category)
}

// Get case study by slug
export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(study => study.slug === slug)
}

// Get related case studies (same category, excluding current)
export function getRelatedCaseStudies(currentSlug: string, limit: number = 3): CaseStudy[] {
  const current = getCaseStudyBySlug(currentSlug)
  if (!current) return []
  
  return caseStudies
    .filter(study => study.serviceCategory === current.serviceCategory && study.slug !== currentSlug)
    .slice(0, limit)
}

// Get case study statistics
export function getCaseStudyStats() {
  const totalStudies = caseStudies.length
  const avgTimeSaved = Math.round(
    caseStudies.reduce((sum, study) => sum + study.results.timeSavedPerWeek, 0) / totalStudies
  )
  const avgSuccessRate = Math.round(
    caseStudies.reduce((sum, study) => sum + study.results.successRate, 0) / totalStudies
  )
  const avgSatisfaction = (
    caseStudies.reduce((sum, study) => sum + study.results.clientSatisfaction, 0) / totalStudies
  ).toFixed(1)

  return {
    totalStudies,
    avgTimeSaved,
    avgSuccessRate,
    avgSatisfaction,
    industries: Array.from(new Set(caseStudies.map(study => study.industry))).length,
    categories: Array.from(new Set(caseStudies.map(study => study.serviceCategory))).length
  }
}