/**
 * Before/After Card Component
 * 
 * Visual comparison component to show the transformation
 * from manual processes to automated workflows.
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, Zap, AlertTriangle, CheckCircle } from 'lucide-react';

interface BeforeAfterCardProps {
  title?: string;
  before: {
    title?: string;
    description: string;
    timeSpent?: string;
    issues?: string[];
  };
  after: {
    title?: string;
    description: string;
    timeSpent?: string;
    benefits?: string[];
  };
  timeSaved?: string;
  className?: string;
}

export function BeforeAfterCard({
  title = "Process Transformation",
  before,
  after,
  timeSaved,
  className
}: BeforeAfterCardProps) {
  return (
    <Card className={cn('mb-6', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        {timeSaved && (
          <Badge variant="secondary" className="w-fit">
            Time Saved: {timeSaved}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Before Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h4 className="font-semibold text-orange-700 dark:text-orange-400">
                {before.title || "Before: Manual Process"}
              </h4>
            </div>
            
            <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 dark:border-orange-800 dark:bg-orange-950">
              <p className="text-sm leading-relaxed text-orange-900 dark:text-orange-100">
                {before.description}
              </p>
              
              {before.timeSpent && (
                <div className="mt-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                    Time Required: {before.timeSpent}
                  </span>
                </div>
              )}
              
              {before.issues && before.issues.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-orange-700 dark:text-orange-300 mb-2">
                    Common Issues:
                  </p>
                  <ul className="space-y-1">
                    {before.issues.map((issue, index) => (
                      <li key={index} className="text-xs text-orange-600 dark:text-orange-400 flex items-start gap-1">
                        <span className="text-orange-500 mt-0.5">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <ArrowRight className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="md:hidden flex items-center justify-center py-2">
            <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
          </div>

          {/* After Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <h4 className="font-semibold text-green-700 dark:text-green-400">
                {after.title || "After: Automated Solution"}
              </h4>
            </div>
            
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950">
              <p className="text-sm leading-relaxed text-green-900 dark:text-green-100">
                {after.description}
              </p>
              
              {after.timeSpent && (
                <div className="mt-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Time Required: {after.timeSpent}
                  </span>
                </div>
              )}
              
              {after.benefits && after.benefits.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-2">
                    Key Benefits:
                  </p>
                  <ul className="space-y-1">
                    {after.benefits.map((benefit, index) => (
                      <li key={index} className="text-xs text-green-600 dark:text-green-400 flex items-start gap-1">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Simplified version for inline use
export function BeforeAfterInline({
  before,
  after,
  className
}: {
  before: string;
  after: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-4 grid gap-4 md:grid-cols-2', className)}>
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-orange-500" />
          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Before</span>
        </div>
        <p className="text-sm text-orange-900 dark:text-orange-100">{before}</p>
      </div>
      
      <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">After</span>
        </div>
        <p className="text-sm text-green-900 dark:text-green-100">{after}</p>
      </div>
    </div>
  );
}

// Process comparison with steps
export function ProcessComparison({
  title,
  manualSteps,
  automatedSteps,
  className
}: {
  title?: string;
  manualSteps: string[];
  automatedSteps: string[];
  className?: string;
}) {
  return (
    <Card className={cn('mb-6', className)}>
      <CardHeader>
        <CardTitle>{title || "Process Comparison"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="flex items-center gap-2 mb-4 font-semibold text-orange-700 dark:text-orange-400">
              <AlertTriangle className="h-4 w-4" />
              Manual Process
            </h4>
            <ol className="space-y-2">
              {manualSteps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-xs font-medium dark:bg-orange-900 dark:text-orange-300">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div>
            <h4 className="flex items-center gap-2 mb-4 font-semibold text-green-700 dark:text-green-400">
              <CheckCircle className="h-4 w-4" />
              Automated Process
            </h4>
            <ol className="space-y-2">
              {automatedSteps.map((step, index) => (
                <li key={index} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-xs font-medium dark:bg-green-900 dark:text-green-300">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}