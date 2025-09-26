'use client'

import { cn } from '@/lib/utils'

interface DeliverablesShowcaseProps {
  deliverables: string[]
  className?: string
}

const deliverableIcons: Record<string, string> = {
  'PowerShell/Python scripts': '📜',
  'Configuration files': '⚙️',
  'Documentation': '📚',
  'Execution logs': '📋',
  'Email rules configuration': '📧',
  'File organization scripts': '📁',
  'Naming conventions guide': '🏷️',
  'Setup documentation': '📖',
  'Report generation scripts': '📊',
  'Excel templates': '📈',
  'PDF formatting': '📄',
  'Data visualization charts': '📉',
  'Complete website': '🌐',
  'Contact form integration': '📝',
  'SEO setup': '🔍',
  'Analytics configuration': '📈',
  'Installation scripts': '💾',
  'Desktop shortcuts': '🖥️',
  'System optimization': '⚡',
  'Template library': '📋',
  'Customization guides': '🛠️',
  'Example implementations': '💡',
  'Usage documentation': '📚'
}

function getDeliverableIcon(deliverable: string): string {
  // Try exact match first
  if (deliverableIcons[deliverable]) {
    return deliverableIcons[deliverable]
  }
  
  // Try partial matches
  for (const [key, icon] of Object.entries(deliverableIcons)) {
    if (deliverable.toLowerCase().includes(key.toLowerCase()) || 
        key.toLowerCase().includes(deliverable.toLowerCase())) {
      return icon
    }
  }
  
  // Default icon based on content
  if (deliverable.toLowerCase().includes('script')) return '📜'
  if (deliverable.toLowerCase().includes('config')) return '⚙️'
  if (deliverable.toLowerCase().includes('document')) return '📚'
  if (deliverable.toLowerCase().includes('template')) return '📋'
  if (deliverable.toLowerCase().includes('guide')) return '📖'
  if (deliverable.toLowerCase().includes('report')) return '📊'
  if (deliverable.toLowerCase().includes('website')) return '🌐'
  
  return '📦' // Default package icon
}

export function DeliverablesShowcase({ deliverables, className }: DeliverablesShowcaseProps) {
  if (!deliverables || deliverables.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        What You'll Receive
      </h3>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {deliverables.map((deliverable, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm shadow-glass dark:border-white/10 dark:bg-black/5"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500/20 to-automation-500/20 text-lg">
              {getDeliverableIcon(deliverable)}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {deliverable}
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {getDeliverableDescription(deliverable)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Quality guarantee */}
      <div className="mt-6 rounded-xl border border-automation-200/50 bg-automation-50/50 p-4 dark:border-automation-800/50 dark:bg-automation-900/20">
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-automation-500/20 text-automation-600 dark:text-automation-400">
            ✓
          </div>
          <div>
            <h4 className="font-medium text-automation-800 dark:text-automation-200">
              Quality Guarantee
            </h4>
            <p className="mt-1 text-sm text-automation-700 dark:text-automation-300">
              All deliverables include comprehensive documentation, testing logs, and 30-day support for any issues or questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getDeliverableDescription(deliverable: string): string {
  const descriptions: Record<string, string> = {
    'PowerShell/Python scripts': 'Ready-to-run automation scripts with error handling',
    'Configuration files': 'Pre-configured settings for optimal performance',
    'Documentation': 'Step-by-step guides and usage instructions',
    'Execution logs': 'Detailed logs showing what was processed',
    'Email rules configuration': 'Outlook/Gmail rules for automatic organization',
    'File organization scripts': 'Automated file sorting and cleanup routines',
    'Naming conventions guide': 'Standardized naming patterns for consistency',
    'Setup documentation': 'Installation and configuration instructions',
    'Report generation scripts': 'Automated report creation and formatting',
    'Excel templates': 'Pre-formatted spreadsheets with formulas',
    'PDF formatting': 'Professional report layouts and styling',
    'Data visualization charts': 'Interactive charts and graphs',
    'Complete website': 'Fully functional website ready to deploy',
    'Contact form integration': 'Working contact forms with spam protection',
    'SEO setup': 'Search engine optimization configuration',
    'Analytics configuration': 'Google Analytics and tracking setup',
    'Installation scripts': 'One-click software installation routines',
    'Desktop shortcuts': 'Organized desktop with useful shortcuts',
    'System optimization': 'Performance tweaks and security settings',
    'Template library': 'Reusable automation templates',
    'Customization guides': 'Instructions for adapting to your needs',
    'Example implementations': 'Working examples you can modify',
    'Usage documentation': 'How-to guides and best practices'
  }
  
  return descriptions[deliverable] || 'Professional deliverable with documentation'
}