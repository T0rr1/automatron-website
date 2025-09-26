'use client'

import { Progress } from '@/components/ui/progress'
import { CheckCircle2, Circle } from 'lucide-react'

interface FormProgressProps {
  currentStep: number
  totalSteps: number
  completedSteps: Set<number>
  onStepClick?: (step: number) => void
  canGoToStep?: (step: number) => boolean
}

const STEP_TITLES = [
  'Basic Info',
  'Project Details', 
  'Package & Timeline',
  'Files & Notes'
]

export function FormProgress({ 
  currentStep, 
  totalSteps, 
  completedSteps, 
  onStepClick,
  canGoToStep 
}: FormProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isCompleted = completedSteps.has(stepNumber)
          const isCurrent = stepNumber === currentStep
          const canClick = canGoToStep ? canGoToStep(stepNumber) : true
          
          return (
            <div
              key={stepNumber}
              className={`
                flex flex-col items-center space-y-2 cursor-pointer transition-opacity
                ${canClick ? 'hover:opacity-80' : 'cursor-not-allowed opacity-50'}
              `}
              onClick={() => canClick && onStepClick?.(stepNumber)}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors
                ${isCompleted 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : isCurrent 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 text-blue-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-400'
                }
              `}>
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <span className={`
                text-xs text-center max-w-[80px] leading-tight
                ${isCurrent 
                  ? 'text-blue-600 dark:text-blue-400 font-medium' 
                  : 'text-gray-500 dark:text-gray-400'
                }
              `}>
                {STEP_TITLES[index]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}