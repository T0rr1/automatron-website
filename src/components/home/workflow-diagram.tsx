'use client'

import { Typography } from '@/components/ui/typography'
import { 
  ArrowRight, 
  ArrowDown,
  FileInput, 
  Settings, 
  FileOutput,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

interface WorkflowStep {
  title: string
  description: string
  type: 'input' | 'process' | 'output'
}

interface WorkflowDiagramProps {
  workflow: {
    steps: WorkflowStep[]
  }
}

export function WorkflowDiagram({ workflow }: WorkflowDiagramProps) {
  const getStepIcon = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'input':
        return <FileInput className="w-5 h-5" />
      case 'process':
        return <Settings className="w-5 h-5" />
      case 'output':
        return <FileOutput className="w-5 h-5" />
      default:
        return <Settings className="w-5 h-5" />
    }
  }

  const getStepColor = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'input':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300'
      case 'process':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300'
      case 'output':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300'
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300'
    }
  }

  const getStepLabel = (type: WorkflowStep['type']) => {
    switch (type) {
      case 'input':
        return 'Input'
      case 'process':
        return 'Process'
      case 'output':
        return 'Output'
      default:
        return 'Step'
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Typography variant="h3" className="text-xl font-semibold mb-2">
          Automation Workflow
        </Typography>
        <Typography variant="p" className="text-muted-foreground">
          Step-by-step process showing how the automation works
        </Typography>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between">
          {workflow.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              {/* Step */}
              <div className="flex flex-col items-center space-y-4 min-w-[200px]">
                {/* Step Number and Icon */}
                <div className={`relative p-4 rounded-full border-2 ${getStepColor(step.type)}`}>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-current rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  {getStepIcon(step.type)}
                </div>

                {/* Step Content */}
                <div className="text-center space-y-2">
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStepColor(step.type)}`}>
                    {getStepLabel(step.type)}
                  </div>
                  
                  <Typography variant="h4" className="font-semibold text-sm">
                    {step.title}
                  </Typography>
                  
                  <Typography variant="small" className="text-muted-foreground text-xs leading-relaxed">
                    {step.description}
                  </Typography>
                </div>
              </div>

              {/* Arrow (except for last step) */}
              {index < workflow.steps.length - 1 && (
                <div className="flex-1 flex justify-center px-4">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/Tablet Layout - Vertical */}
      <div className="lg:hidden space-y-6">
        {workflow.steps.map((step, index) => (
          <div key={index} className="space-y-4">
            {/* Step */}
            <div className="flex items-start gap-4">
              {/* Step Icon and Number */}
              <div className={`relative p-3 rounded-full border-2 flex-shrink-0 ${getStepColor(step.type)}`}>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-current rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
                {getStepIcon(step.type)}
              </div>

              {/* Step Content */}
              <div className="flex-1 space-y-2">
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStepColor(step.type)}`}>
                  {getStepLabel(step.type)}
                </div>
                
                <Typography variant="h4" className="font-semibold">
                  {step.title}
                </Typography>
                
                <Typography variant="small" className="text-muted-foreground">
                  {step.description}
                </Typography>
              </div>
            </div>

            {/* Arrow (except for last step) */}
            {index < workflow.steps.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Workflow Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t">
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
          <div>
            <Typography variant="small" className="font-medium text-green-800 dark:text-green-200">
              Reliable Process
            </Typography>
            <Typography variant="small" className="text-green-700 dark:text-green-300 text-xs">
              Consistent results every time
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <div>
            <Typography variant="small" className="font-medium text-blue-800 dark:text-blue-200">
              Time Efficient
            </Typography>
            <Typography variant="small" className="text-blue-700 dark:text-blue-300 text-xs">
              Runs in minutes, not hours
            </Typography>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
          <div>
            <Typography variant="small" className="font-medium text-orange-800 dark:text-orange-200">
              Safety First
            </Typography>
            <Typography variant="small" className="text-orange-700 dark:text-orange-300 text-xs">
              Dry-run mode and backups
            </Typography>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="p-6 bg-muted/50 border rounded-lg">
        <Typography variant="h4" className="font-medium mb-4">
          What You Get
        </Typography>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Typography variant="small" className="font-medium">
              📜 Complete Script
            </Typography>
            <Typography variant="small" className="text-muted-foreground text-xs">
              Fully commented code with error handling and logging
            </Typography>
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" className="font-medium">
              ⚙️ Configuration File
            </Typography>
            <Typography variant="small" className="text-muted-foreground text-xs">
              Easy-to-modify settings for your specific needs
            </Typography>
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" className="font-medium">
              📖 Documentation
            </Typography>
            <Typography variant="small" className="text-muted-foreground text-xs">
              Step-by-step setup and usage instructions
            </Typography>
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" className="font-medium">
              🔍 Activity Logs
            </Typography>
            <Typography variant="small" className="text-muted-foreground text-xs">
              Detailed logs of what was processed and when
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}