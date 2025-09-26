/**
 * Callout Component
 * 
 * Styled callout boxes for highlighting important information,
 * tips, warnings, and other notable content in MDX.
 */

import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Lightbulb,
  Zap,
  Clock,
  DollarSign
} from 'lucide-react';

type CalloutType = 
  | 'info' 
  | 'warning' 
  | 'success' 
  | 'error' 
  | 'tip' 
  | 'performance'
  | 'time-saving'
  | 'cost-saving';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100',
    iconClassName: 'text-blue-600 dark:text-blue-400',
    defaultTitle: 'Information',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    defaultTitle: 'Warning',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100',
    iconClassName: 'text-green-600 dark:text-green-400',
    defaultTitle: 'Success',
  },
  error: {
    icon: XCircle,
    className: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100',
    iconClassName: 'text-red-600 dark:text-red-400',
    defaultTitle: 'Error',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-purple-200 bg-purple-50 text-purple-900 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-100',
    iconClassName: 'text-purple-600 dark:text-purple-400',
    defaultTitle: 'Tip',
  },
  performance: {
    icon: Zap,
    className: 'border-orange-200 bg-orange-50 text-orange-900 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-100',
    iconClassName: 'text-orange-600 dark:text-orange-400',
    defaultTitle: 'Performance',
  },
  'time-saving': {
    icon: Clock,
    className: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100',
    iconClassName: 'text-emerald-600 dark:text-emerald-400',
    defaultTitle: 'Time Saving',
  },
  'cost-saving': {
    icon: DollarSign,
    className: 'border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:text-teal-100',
    iconClassName: 'text-teal-600 dark:text-teal-400',
    defaultTitle: 'Cost Saving',
  },
};

export function Callout({ 
  type = 'info', 
  title, 
  children, 
  className 
}: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  return (
    <div
      className={cn(
        'mb-6 rounded-lg border p-4',
        config.className,
        className
      )}
      role="note"
      aria-label={`${displayTitle} callout`}
    >
      <div className="flex items-start gap-3">
        <Icon 
          className={cn('mt-0.5 h-5 w-5 flex-shrink-0', config.iconClassName)}
          aria-hidden="true"
        />
        <div className="flex-1 space-y-2">
          <div className="font-semibold">{displayTitle}</div>
          <div className="text-sm leading-relaxed [&>*:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Specialized callout components for common use cases
export function TimeSavingCallout({ 
  hours, 
  frequency = 'weekly',
  children 
}: { 
  hours: number; 
  frequency?: 'daily' | 'weekly' | 'monthly';
  children?: React.ReactNode;
}) {
  return (
    <Callout type="time-saving" title={`Save ${hours} hours ${frequency}`}>
      {children || `This automation can save you approximately ${hours} hours ${frequency} by eliminating manual processes.`}
    </Callout>
  );
}

export function CostSavingCallout({ 
  amount, 
  period = 'monthly',
  children 
}: { 
  amount: string; 
  period?: 'monthly' | 'annually';
  children?: React.ReactNode;
}) {
  return (
    <Callout type="cost-saving" title={`Save ${amount} ${period}`}>
      {children || `Potential cost savings of ${amount} ${period} through automation and efficiency improvements.`}
    </Callout>
  );
}

export function PerformanceCallout({ 
  improvement, 
  children 
}: { 
  improvement: string; 
  children?: React.ReactNode;
}) {
  return (
    <Callout type="performance" title={`${improvement} performance improvement`}>
      {children || `This optimization can improve performance by ${improvement}.`}
    </Callout>
  );
}

export function TipCallout({ 
  title = 'Pro Tip', 
  children 
}: { 
  title?: string; 
  children: React.ReactNode;
}) {
  return (
    <Callout type="tip" title={title}>
      {children}
    </Callout>
  );
}