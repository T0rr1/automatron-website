'use client'

import Link from 'next/link'
import { ServiceCategory } from '@/types'
import { serviceScenarios, serviceFaqs } from '@/lib/constants'
import { WorkflowComparison } from './workflow-comparison'
import { DeliverablesShowcase } from './deliverables-showcase'
import { PricingTurnaround } from './pricing-turnaround'
import { FaqAccordion } from './faq-accordion'
import { cn } from '@/lib/utils'

interface ServiceDetailPageProps {
  service: ServiceCategory
}

export function ServiceDetailPage({ service }: ServiceDetailPageProps) {
  const scenario = serviceScenarios[service.slug as keyof typeof serviceScenarios]
  const faqs = serviceFaqs[service.slug as keyof typeof serviceFaqs] || []

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 lg:py-24 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" />
          <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-automation-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center space-x-2 text-sm">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <Link 
              href="/services" 
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Services
            </Link>
            <span className="text-gray-400 dark:text-gray-600">/</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {service.name}
            </span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <div className="mb-6 flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-automation-500 text-3xl shadow-lg">
                  {service.icon}
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                    {service.name}
                  </h1>
                  <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                    {service.targetAudience.join(' • ')}
                  </p>
                </div>
              </div>

              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {service.description}
              </p>

              {/* Key benefits */}
              <div className="mb-8 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  What we automate for you:
                </h3>
                <ul className="space-y-2">
                  {service.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-automation-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="rounded-xl bg-gradient-to-r from-brand-500 to-automation-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50">
                  Get Started Today
                </button>
                <button className="rounded-xl border border-gray-300 bg-white/50 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 hover:scale-105 dark:border-gray-600 dark:bg-black/20 dark:text-white dark:hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50">
                  Free Consultation
                </button>
              </div>
            </div>

            {/* Visual/Stats */}
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-glass dark:border-white/10 dark:bg-black/5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Service Highlights
                </h3>
                
                <div className="space-y-6">
                  {scenario && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-3 rounded-full bg-gradient-to-r from-brand-500 to-automation-500 px-4 py-2 text-white">
                        <span className="text-2xl">⏱️</span>
                        <div className="text-left">
                          <p className="text-sm font-medium opacity-90">Time Saved</p>
                          <p className="text-lg font-bold">{scenario.timeSaved}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg bg-automation-50/50 p-4 dark:bg-automation-900/20">
                      <p className="text-2xl font-bold text-automation-600 dark:text-automation-400">95%+</p>
                      <p className="text-sm text-automation-700 dark:text-automation-300">Success Rate</p>
                    </div>
                    <div className="rounded-lg bg-brand-50/50 p-4 dark:bg-brand-900/20">
                      <p className="text-2xl font-bold text-brand-600 dark:text-brand-400">1-7</p>
                      <p className="text-sm text-brand-700 dark:text-brand-300">Days Delivery</p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-gray-50/50 p-4 dark:bg-gray-800/20">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Typical Starting Price
                    </p>
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                      From $249
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Workflow Comparison */}
      {scenario && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <WorkflowComparison
              before={scenario.before}
              after={scenario.after}
              timeSaved={scenario.timeSaved}
            />
          </div>
        </section>
      )}

      {/* Deliverables Showcase */}
      {scenario && (
        <section className="bg-gray-50/50 py-16 lg:py-24 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DeliverablesShowcase deliverables={scenario.deliverables} />
          </div>
        </section>
      )}

      {/* Pricing and Turnaround */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PricingTurnaround />
        </div>
      </section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section className="bg-gray-50/50 py-16 lg:py-24 dark:bg-gray-900/50">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Common questions about {service.name.toLowerCase()} automation
              </p>
            </div>
            
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 lg:p-12 backdrop-blur-md shadow-glass text-center dark:border-white/10 dark:bg-black/5">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Automate Your {service.name}?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses saving 2-5 hours per week with our automation solutions. 
              Get started with a free consultation to discuss your specific needs.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <button className="rounded-xl bg-gradient-to-r from-brand-500 to-automation-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50">
                Start Your Project
              </button>
              <button className="rounded-xl border border-gray-300 bg-white/50 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all duration-200 hover:bg-white/70 hover:scale-105 dark:border-gray-600 dark:bg-black/20 dark:text-white dark:hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-gray-500/50">
                Schedule Free Call
              </button>
            </div>
            
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              30-day satisfaction guarantee • No long-term contracts • Fast turnaround
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}