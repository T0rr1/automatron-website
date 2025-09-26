/**
 * Metrics Card Component
 * 
 * Display key metrics and statistics in an attractive card format
 * for case studies and service pages.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';

interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  improvement?: string;
  icon?: string;
}

interface MetricsCardProps {
  title?: string;
  metrics: Metric[];
  className?: string;
  variant?: 'default' | 'compact' | 'highlight';
}

const iconMap = {
  time: Clock,
  cost: DollarSign,
  users: Users,
  success: CheckCircle,
  target: Target,
  performance: Zap,
  chart: BarChart3,
  trending: TrendingUp,
};

function getMetricIcon(iconName?: string, label?: string) {
  if (iconName && iconMap[iconName as keyof typeof iconMap]) {
    return iconMap[iconName as keyof typeof iconMap];
  }
  
  // Auto-detect icon based on label
  const lowerLabel = label?.toLowerCase() || '';
  if (lowerLabel.includes('time') || lowerLabel.includes('hour')) return Clock;
  if (lowerLabel.includes('cost') || lowerLabel.includes('saving') || lowerLabel.includes('$')) return DollarSign;
  if (lowerLabel.includes('user') || lowerLabel.includes('client')) return Users;
  if (lowerLabel.includes('success') || lowerLabel.includes('rate')) return CheckCircle;
  if (lowerLabel.includes('performance') || lowerLabel.includes('speed')) return Zap;
  
  return BarChart3; // Default icon
}

export function MetricsCard({ 
  title = "Key Metrics", 
  metrics, 
  className,
  variant = 'default'
}: MetricsCardProps) {
  if (variant === 'compact') {
    return (
      <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6', className)}>
        {metrics.map((metric, index) => {
          const Icon = getMetricIcon(metric.icon, metric.label);
          return (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-2xl font-bold">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                {metric.improvement && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {metric.improvement}
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  if (variant === 'highlight') {
    return (
      <Card className={cn('mb-6 bg-primary/5 border-primary/20', className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => {
              const Icon = getMetricIcon(metric.icon, metric.label);
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      {metric.unit && (
                        <span className="text-sm text-muted-foreground">{metric.unit}</span>
                      )}
                      {metric.improvement && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {metric.improvement}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn('mb-6', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => {
            const Icon = getMetricIcon(metric.icon, metric.label);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {metric.value}
                    {metric.unit && <span className="text-muted-foreground ml-1">{metric.unit}</span>}
                  </span>
                  {metric.improvement && (
                    <Badge variant="secondary" className="text-xs">
                      {metric.improvement}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Specialized metric components
export function TimeSavingsMetric({ 
  hoursPerWeek, 
  hoursPerMonth, 
  className 
}: { 
  hoursPerWeek?: number; 
  hoursPerMonth?: number;
  className?: string;
}) {
  const metrics: Metric[] = [];
  
  if (hoursPerWeek) {
    metrics.push({
      label: 'Hours Saved Weekly',
      value: hoursPerWeek,
      unit: 'hrs',
      icon: 'time'
    });
  }
  
  if (hoursPerMonth) {
    metrics.push({
      label: 'Hours Saved Monthly', 
      value: hoursPerMonth,
      unit: 'hrs',
      icon: 'time'
    });
  }

  return (
    <MetricsCard 
      title="Time Savings"
      metrics={metrics}
      variant="highlight"
      className={className}
    />
  );
}

export function ROIMetric({ 
  weeklySavings, 
  monthlySavings, 
  annualSavings,
  className 
}: { 
  weeklySavings?: string; 
  monthlySavings?: string;
  annualSavings?: string;
  className?: string;
}) {
  const metrics: Metric[] = [];
  
  if (weeklySavings) {
    metrics.push({
      label: 'Weekly Savings',
      value: weeklySavings,
      icon: 'cost'
    });
  }
  
  if (monthlySavings) {
    metrics.push({
      label: 'Monthly Savings',
      value: monthlySavings,
      icon: 'cost'
    });
  }
  
  if (annualSavings) {
    metrics.push({
      label: 'Annual Savings',
      value: annualSavings,
      icon: 'cost'
    });
  }

  return (
    <MetricsCard 
      title="Cost Savings"
      metrics={metrics}
      variant="highlight"
      className={className}
    />
  );
}

export function ProjectMetrics({ 
  successRate, 
  turnaroundTime, 
  clientSatisfaction,
  className 
}: { 
  successRate?: number; 
  turnaroundTime?: string;
  clientSatisfaction?: number;
  className?: string;
}) {
  const metrics: Metric[] = [];
  
  if (successRate) {
    metrics.push({
      label: 'Success Rate',
      value: successRate,
      unit: '%',
      icon: 'success'
    });
  }
  
  if (turnaroundTime) {
    metrics.push({
      label: 'Turnaround Time',
      value: turnaroundTime,
      icon: 'time'
    });
  }
  
  if (clientSatisfaction) {
    metrics.push({
      label: 'Client Satisfaction',
      value: `${clientSatisfaction}/5`,
      icon: 'target'
    });
  }

  return (
    <MetricsCard 
      title="Project Results"
      metrics={metrics}
      variant="compact"
      className={className}
    />
  );
}