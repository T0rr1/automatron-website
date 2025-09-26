'use client'

import { cn } from '@/lib/utils'

interface WorkflowComparisonProps {
  before: string
  after: string
  timeSaved: string
  className?: string
}

export function WorkflowComparison({ before, after, timeSaved, className }: WorkflowComparisonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Before vs After
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          See how automation transforms your workflow
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Before scenario */}
        <div className="relative">
          <div className="rounded-2xl border border-red-200/50 bg-red-50/50 p-6 dark:border-red-800/50 dark:bg-red-900/20">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                😰
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-800 dark:text-red-200">
                  Manual Process
                </h4>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Time-consuming and error-prone
                </p>
              </div>
            </div>
            
            <p className="text-red-700 dark:text-red-300 leading-relaxed">
              {before}
            </p>
            
            {/* Pain points */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>Repetitive manual work</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>High risk of human error</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-red-600 dark:text-red-400">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>Takes valuable time away from core business</span>
              </div>
            </div>
          </div>
          
          {/* Arrow for desktop */}
          <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-automation-500 text-white shadow-lg">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
          
          {/* Arrow for mobile */}
          <div className="flex justify-center lg:hidden">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-brand-500 to-automation-500 text-white shadow-lg">
              <svg className="h-6 w-6 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* After scenario */}
        <div className="relative">
          <div className="rounded-2xl border border-automation-200/50 bg-automation-50/50 p-6 dark:border-automation-800/50 dark:bg-automation-900/20">
            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-automation-500/20 text-automation-600 dark:text-automation-400">
                🚀
              </div>
              <div>
                <h4 className="text-lg font-semibold text-automation-800 dark:text-automation-200">
                  Automated Process
                </h4>
                <p className="text-sm text-automation-600 dark:text-automation-400">
                  Fast, reliable, and consistent
                </p>
              </div>
            </div>
            
            <p className="text-automation-700 dark:text-automation-300 leading-relaxed">
              {after}
            </p>
            
            {/* Benefits */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-automation-600 dark:text-automation-400">
                <div className="h-1.5 w-1.5 rounded-full bg-automation-500" />
                <span>One-click execution</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-automation-600 dark:text-automation-400">
                <div className="h-1.5 w-1.5 rounded-full bg-automation-500" />
                <span>Consistent, error-free results</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-automation-600 dark:text-automation-400">
                <div className="h-1.5 w-1.5 rounded-full bg-automation-500" />
                <span>Focus on high-value activities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time savings highlight */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-3 rounded-full bg-gradient-to-r from-brand-500 to-automation-500 px-6 py-3 text-white shadow-lg">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            ⏱️
          </div>
          <div className="text-left">
            <p className="text-sm font-medium opacity-90">Time Saved</p>
            <p className="text-lg font-bold">{timeSaved}</p>
          </div>
        </div>
      </div>
    </div>
  )
}