import { CalculatorPreset, ServiceCategoryType } from '@/types'

/**
 * Predefined calculator presets for common automation scenarios
 * Based on the six main service categories
 */
export const calculatorPresets: CalculatorPreset[] = [
  {
    id: 'file-cleanup',
    name: 'File Organization',
    description: 'Organizing downloads, documents, and project files',
    icon: '📁',
    serviceCategory: ServiceCategoryType.BASIC_SCRIPTING,
    defaultValues: {
      tasksPerWeek: 5,
      minutesPerTask: 15,
      hourlyRate: 50,
      coverage: 0.9,
      automationEfficiency: 0.95
    }
  },
  {
    id: 'email-management',
    name: 'Email Processing',
    description: 'Sorting emails, saving attachments, organizing inbox',
    icon: '📧',
    serviceCategory: ServiceCategoryType.EMAIL_FILE_HYGIENE,
    defaultValues: {
      tasksPerWeek: 10,
      minutesPerTask: 8,
      hourlyRate: 50,
      coverage: 0.8,
      automationEfficiency: 0.9
    }
  },
  {
    id: 'report-generation',
    name: 'Report Creation',
    description: 'Creating weekly/monthly reports from data',
    icon: '📊',
    serviceCategory: ServiceCategoryType.REPORTING_LITE,
    defaultValues: {
      tasksPerWeek: 2,
      minutesPerTask: 45,
      hourlyRate: 75,
      coverage: 0.85,
      automationEfficiency: 0.92
    }
  },
  {
    id: 'data-processing',
    name: 'Data Processing',
    description: 'CSV merging, cleaning, and formatting',
    icon: '🔄',
    serviceCategory: ServiceCategoryType.BASIC_SCRIPTING,
    defaultValues: {
      tasksPerWeek: 3,
      minutesPerTask: 25,
      hourlyRate: 60,
      coverage: 0.95,
      automationEfficiency: 0.98
    }
  },
  {
    id: 'backup-tasks',
    name: 'Backup & Archiving',
    description: 'Regular file backups and archiving old data',
    icon: '💾',
    serviceCategory: ServiceCategoryType.PC_HELPERS,
    defaultValues: {
      tasksPerWeek: 2,
      minutesPerTask: 20,
      hourlyRate: 40,
      coverage: 1.0,
      automationEfficiency: 0.99
    }
  },
  {
    id: 'system-maintenance',
    name: 'System Maintenance',
    description: 'Software updates, cleanup, and optimization',
    icon: '⚙️',
    serviceCategory: ServiceCategoryType.PC_HELPERS,
    defaultValues: {
      tasksPerWeek: 1,
      minutesPerTask: 60,
      hourlyRate: 50,
      coverage: 0.7,
      automationEfficiency: 0.85
    }
  },
  {
    id: 'custom-task',
    name: 'Custom Task',
    description: 'Enter your own task details',
    icon: '✏️',
    defaultValues: {
      tasksPerWeek: 5,
      minutesPerTask: 15,
      hourlyRate: 50,
      coverage: 0.8,
      automationEfficiency: 0.9
    }
  }
]

/**
 * Get preset by ID
 */
export function getPresetById(id: string): CalculatorPreset | undefined {
  return calculatorPresets.find(preset => preset.id === id)
}

/**
 * Get presets by service category
 */
export function getPresetsByCategory(category: ServiceCategoryType): CalculatorPreset[] {
  return calculatorPresets.filter(preset => preset.serviceCategory === category)
}