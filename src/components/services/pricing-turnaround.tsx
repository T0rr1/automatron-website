'use client'

import { servicePricing } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface PricingTurnaroundProps {
  className?: string
}

export function PricingTurnaround({ className }: PricingTurnaroundProps) {
  const packages = [
    {
      ...servicePricing.starter,
      icon: '🚀',
      features: [
        'Single automation task',
        'Complete documentation',
        'Testing & validation',
        '30-day support'
      ],
      popular: false
    },
    {
      ...servicePricing.bundle,
      icon: '📦',
      features: [
        'Multiple related tasks',
        'Integrated workflow',
        'Priority support',
        '60-day support'
      ],
      popular: true
    },
    {
      ...servicePricing.websiteBasic,
      icon: '🌐',
      features: [
        'Complete website setup',
        'Contact forms',
        'SEO optimization',
        'Analytics integration'
      ],
      popular: false
    },
    {
      ...servicePricing.carePlan,
      icon: '🛡️',
      features: [
        'Ongoing automation support',
        'Monthly optimizations',
        'Priority response',
        'Unlimited consultations'
      ],
      popular: false
    }
  ]

  return (
    <div className={cn('space-y-8', className)}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Service Packages & Pricing
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Choose the package that fits your automation needs
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className={cn(
              'relative rounded-2xl border p-6 backdrop-blur-md shadow-glass',
              pkg.popular
                ? 'border-brand-500/50 bg-gradient-to-br from-brand-50/50 to-automation-50/50 dark:from-brand-900/20 dark:to-automation-900/20'
                : 'border-white/10 bg-white/5 dark:border-white/10 dark:bg-black/5'
            )}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-gradient-to-r from-brand-500 to-automation-500 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/20 to-automation-500/20 text-2xl">
                  {pkg.icon}
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {pkg.name}
              </h4>

              <div className="mb-4">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400">
                  {pkg.priceRange}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {pkg.turnaround}
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {pkg.description}
              </p>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm">
                    <div className="mr-3 h-1.5 w-1.5 rounded-full bg-automation-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  'w-full rounded-xl px-4 py-3 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50',
                  pkg.popular
                    ? 'bg-gradient-to-r from-brand-500 to-automation-500 text-white shadow-lg hover:scale-105 hover:shadow-xl'
                    : 'border border-gray-300 bg-white/50 text-gray-900 backdrop-blur-sm hover:bg-white/70 hover:scale-105 dark:border-gray-600 dark:bg-black/20 dark:text-white dark:hover:bg-black/30'
                )}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Turnaround time explanation */}
      <div className="rounded-xl border border-blue-200/50 bg-blue-50/50 p-6 dark:border-blue-800/50 dark:bg-blue-900/20">
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400">
            ⏰
          </div>
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Fast Turnaround Times
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Most automation tasks are completed within 1-7 days. Complex projects may take longer, 
              but we'll provide a detailed timeline upfront. Rush delivery available for urgent needs.
            </p>
          </div>
        </div>
      </div>

      {/* Money-back guarantee */}
      <div className="rounded-xl border border-green-200/50 bg-green-50/50 p-6 dark:border-green-800/50 dark:bg-green-900/20">
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
            ✅
          </div>
          <div>
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Satisfaction Guarantee
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
              If you're not completely satisfied with your automation solution, we'll work with you 
              to make it right or provide a full refund within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}