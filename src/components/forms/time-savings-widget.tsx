'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateTimeSavings, formatCurrency, formatHours } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react'

interface TimeSavingsWidgetProps {
  className?: string
  compact?: boolean
  title?: string
  description?: string
}

export function TimeSavingsWidget({
  className,
  compact = false,
  title = 'Quick Savings Calculator',
  description = 'See your potential time and cost savings'
}: TimeSavingsWidgetProps) {
  const [tasksPerWeek, setTasksPerWeek] = useState(5)
  const [minutesPerTask, setMinutesPerTask] = useState(15)
  const [hourlyRate, setHourlyRate] = useState(50)
  const [results, setResults] = useState<ReturnType<typeof calculateTimeSavings> | null>(null)

  // Calculate results in real-time
  useEffect(() => {
    if (tasksPerWeek > 0 && minutesPerTask > 0 && hourlyRate > 0) {
      const calculationResults = calculateTimeSavings({
        tasksPerWeek,
        minutesPerTask,
        hourlyRate,
        coverage: 0.8,
        automationEfficiency: 0.9,
        automationCost: 500
      })
      setResults(calculationResults)
    } else {
      setResults(null)
    }
  }, [tasksPerWeek, minutesPerTask, hourlyRate])

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className={compact ? 'pb-3' : undefined}>
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-brand-600" />
          <CardTitle className={compact ? 'text-lg' : 'text-xl'}>{title}</CardTitle>
        </div>
        {description && !compact && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Input Fields */}
        <div className={cn(
          'grid gap-3',
          compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-3'
        )}>
          <div className="space-y-1">
            <Label htmlFor="tasks" className="text-xs font-medium">
              Tasks/week
            </Label>
            <Input
              id="tasks"
              type="number"
              min="1"
              max="100"
              value={tasksPerWeek}
              onChange={(e) => setTasksPerWeek(Number(e.target.value))}
              className="h-8"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="minutes" className="text-xs font-medium">
              Minutes/task
            </Label>
            <Input
              id="minutes"
              type="number"
              min="1"
              max="480"
              value={minutesPerTask}
              onChange={(e) => setMinutesPerTask(Number(e.target.value))}
              className="h-8"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="rate" className="text-xs font-medium">
              Hourly rate ($)
            </Label>
            <Input
              id="rate"
              type="number"
              min="1"
              max="1000"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="h-8"
            />
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-3">
            <div className={cn(
              'grid gap-2',
              compact ? 'grid-cols-2' : 'grid-cols-3'
            )}>
              <div className="text-center p-2 bg-automation-50 dark:bg-automation-950 rounded-md">
                <Clock className="h-4 w-4 text-automation-600 mx-auto mb-1" />
                <div className="text-sm font-bold text-automation-700 dark:text-automation-300">
                  {formatHours(results.hoursSaved)}
                </div>
                <div className="text-xs text-muted-foreground">saved/week</div>
              </div>

              <div className="text-center p-2 bg-brand-50 dark:bg-brand-950 rounded-md">
                <DollarSign className="h-4 w-4 text-brand-600 mx-auto mb-1" />
                <div className="text-sm font-bold text-brand-700 dark:text-brand-300">
                  {formatCurrency(results.roiPerWeek)}
                </div>
                <div className="text-xs text-muted-foreground">value/week</div>
              </div>

              {!compact && (
                <div className="text-center p-2 bg-neutral-50 dark:bg-neutral-900 rounded-md">
                  <TrendingUp className="h-4 w-4 text-neutral-600 mx-auto mb-1" />
                  <div className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    {results.efficiency.toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">efficiency</div>
                </div>
              )}
            </div>

            {!compact && (
              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground mb-2">
                  Annual savings: <span className="font-semibold text-automation-600">
                    {formatCurrency(results.roiPerYear)}
                  </span>
                </p>
                <Button size="sm" className="text-xs">
                  Get Full Calculator
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}