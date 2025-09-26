'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, BarChart3, Target, Zap } from 'lucide-react'
import { Metric } from '@/types'

interface MetricsVisualizationProps {
  metrics: Metric[]
}

export function MetricsVisualization({ metrics }: MetricsVisualizationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <BarChart3 className="h-5 w-5 text-primary" />
          Key Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  metric: Metric
}

function MetricCard({ metric }: MetricCardProps) {
  const getMetricIcon = (label: string) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('time') || lowerLabel.includes('hour')) {
      return <Zap className="h-5 w-5 text-blue-500" />
    }
    if (lowerLabel.includes('success') || lowerLabel.includes('rate') || lowerLabel.includes('accuracy')) {
      return <Target className="h-5 w-5 text-green-500" />
    }
    if (lowerLabel.includes('improvement') || lowerLabel.includes('increase') || lowerLabel.includes('reduction')) {
      return <TrendingUp className="h-5 w-5 text-purple-500" />
    }
    return <BarChart3 className="h-5 w-5 text-primary" />
  }

  const getProgressValue = (value: string | number, unit?: string) => {
    if (typeof value === 'number') {
      if (unit === '%') {
        return Math.min(value, 100)
      }
      if (unit === 'hours/week' || unit === 'hours') {
        return Math.min((value / 20) * 100, 100) // Assuming max 20 hours
      }
    }
    return 75 // Default progress for non-numeric values
  }

  const formatValue = (value: string | number, unit?: string) => {
    if (typeof value === 'number' && unit) {
      return `${value}${unit}`
    }
    return value.toString()
  }

  const progressValue = getProgressValue(metric.value, metric.unit)

  return (
    <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getMetricIcon(metric.label)}
          <span className="font-medium">{metric.label}</span>
        </div>
        {metric.improvement && (
          <Badge variant="secondary" className="text-xs">
            {metric.improvement}
          </Badge>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {formatValue(metric.value, metric.unit)}
          </span>
        </div>
        
        {typeof metric.value === 'number' && metric.unit && (
          <div className="space-y-1">
            <Progress value={progressValue} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Performance indicator
            </div>
          </div>
        )}
      </div>
    </div>
  )
}