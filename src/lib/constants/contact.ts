import { ServicePackage, ServicePackageType, ProjectTimeline, ProjectTimelineType, ServiceCategoryType } from '@/types'

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: ServicePackageType.STARTER,
    name: 'Starter Package',
    description: 'Perfect for single automation tasks or quick wins',
    priceRange: '$249 - $499',
    turnaround: '1-3 days',
    features: [
      'Single automation script',
      'Basic documentation',
      'Email support',
      'One revision included'
    ],
    bestFor: [
      'File cleanup tasks',
      'Simple CSV operations',
      'Basic email rules',
      'Quick productivity wins'
    ]
  },
  {
    id: ServicePackageType.BUNDLE,
    name: 'Bundle Package',
    description: 'Multiple related automations working together',
    priceRange: '$699 - $1,200',
    turnaround: '3-7 days',
    features: [
      'Multiple automation scripts',
      'Comprehensive documentation',
      'Setup assistance',
      'Two revisions included',
      'Basic training session'
    ],
    bestFor: [
      'Complete workflow automation',
      'Multiple file operations',
      'Integrated reporting solutions',
      'Department-wide improvements'
    ]
  },
  {
    id: ServicePackageType.WEBSITE_BASIC,
    name: 'Website Basic',
    description: 'Simple websites and landing pages',
    priceRange: '$699 - $1,200',
    turnaround: '5-7 days',
    features: [
      'Responsive website design',
      'Contact form integration',
      'Basic SEO setup',
      'Content management',
      'Analytics integration'
    ],
    bestFor: [
      'Business landing pages',
      'Service showcases',
      'Contact collection',
      'Online presence'
    ]
  },
  {
    id: ServicePackageType.CARE_PLAN,
    name: 'Care Plan',
    description: 'Ongoing automation support and maintenance',
    priceRange: '$149 - $399/month',
    turnaround: 'Ongoing',
    features: [
      'Monthly automation review',
      'Script updates and fixes',
      'New automation requests',
      'Priority email support',
      'Performance monitoring'
    ],
    bestFor: [
      'Ongoing automation needs',
      'Regular process improvements',
      'Maintenance and updates',
      'Growing automation requirements'
    ]
  }
]

export const PROJECT_TIMELINES: ProjectTimeline[] = [
  {
    id: ProjectTimelineType.ASAP,
    name: 'ASAP',
    description: 'Need this completed as soon as possible',
    turnaround: '1-2 days (rush fee may apply)'
  },
  {
    id: ProjectTimelineType.ONE_WEEK,
    name: 'Within 1 Week',
    description: 'Standard turnaround time',
    turnaround: '3-7 days'
  },
  {
    id: ProjectTimelineType.TWO_WEEKS,
    name: 'Within 2 Weeks',
    description: 'Flexible timeline for complex projects',
    turnaround: '7-14 days'
  },
  {
    id: ProjectTimelineType.FLEXIBLE,
    name: 'Flexible',
    description: 'No rush, work around your schedule',
    turnaround: '2-4 weeks'
  }
]

export const COMMON_PAIN_POINTS = [
  'Repetitive manual tasks',
  'Time-consuming file management',
  'Inconsistent data formatting',
  'Manual report generation',
  'Email organization issues',
  'Backup and archiving challenges',
  'Data entry and validation',
  'Process documentation gaps'
]

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategoryType, string> = {
  [ServiceCategoryType.BASIC_SCRIPTING]: 'Basic Scripting & Automation',
  [ServiceCategoryType.EMAIL_FILE_HYGIENE]: 'Email & File Hygiene',
  [ServiceCategoryType.REPORTING_LITE]: 'Reporting & Data Processing',
  [ServiceCategoryType.WEBSITES_LANDING]: 'Websites & Landing Pages',
  [ServiceCategoryType.PC_HELPERS]: 'PC Setup & Configuration',
  [ServiceCategoryType.REUSABLE_TEMPLATES]: 'Reusable Templates & Tools'
}