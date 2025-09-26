'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ServiceCard } from './service-card'
import { serviceCategories, successMetrics } from '@/lib/constants/services'
import { cn } from '@/lib/utils'
import { trackPillSelect } from '@/lib/analytics-events'

// Safe locale detection function
function getLocaleFromPath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) return 'es'
  }
  return 'en'
}

interface ServiceOverviewSectionProps {
  className?: string
}

export function ServiceOverviewSection({ className }: ServiceOverviewSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const locale = getLocaleFromPath()

  // Filter mapping - services can appear in multiple filters
  const filterMapping = {
    'all': [],
    'messy-files': ['basic-scripting', 'pc-helpers', 'reusable-templates'], // PC setup + file templates
    'messy-inbox': ['email-file-hygiene', 'reusable-templates'], // Email rules + email templates
    'reports': ['reporting-lite', 'reusable-templates'], // Reports + report templates
    'website': ['websites-landing']
  }

  // Get filtered services
  const filteredServices = selectedFilter === 'all' 
    ? serviceCategories 
    : serviceCategories.filter(service => 
        filterMapping[selectedFilter as keyof typeof filterMapping]?.includes(service.slug)
      )

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards(prev => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const cards = sectionRef.current?.querySelectorAll('.service-card')
    cards?.forEach((card) => {
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className={cn(
        'section relative overflow-hidden',
        // Clean white background for services
        'bg-white',
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-brand-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-automation-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16 text-center animate-fade-in-up">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Our Automation Services
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Six specialized automation services designed to save you 2-5 hours per week ($200+ value).
            Safe scripts with dry-run testing — we move files, never delete them.
          </p>
          
          {/* Success metrics */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-automation-500" />
              <span className="font-semibold text-automation-600 dark:text-automation-400">
                {successMetrics.successRate} Success Rate
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-brand-500" />
              <span className="font-semibold text-brand-600 dark:text-brand-400">
                {successMetrics.averageTimeSaved} Saved Weekly
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-500" />
              <span className="font-semibold text-gray-600 dark:text-gray-400">
                {successMetrics.typicalTurnaround} Turnaround
              </span>
            </div>
          </div>
        </div>

        {/* Quick win selector with horizontal scroll on mobile */}
        <div className="mb-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What's your quick win?
          </h3>
          <div className="pills flex justify-center gap-2 overflow-x-auto scroll-snap-type-x-mandatory pb-2 lg:flex-wrap lg:overflow-visible">
            <button 
              className={cn(
                "pill flex-shrink-0 px-4 h-[44px] text-sm font-medium rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 scroll-snap-align-start",
                selectedFilter === 'all' 
                  ? "pill--active bg-emerald-600 text-white border-emerald-600" 
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              )}
              onClick={() => {
                setSelectedFilter('all')
                trackPillSelect('all')
                // Scroll to services and pulse
                const grid = document.getElementById('services-grid')
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth' })
                  // Pulse effect
                  setTimeout(() => {
                    grid.style.animation = 'pulse-border 300ms cubic-bezier(.2,.8,.2,1)'
                    setTimeout(() => grid.style.animation = '', 300)
                  }, 500)
                }
              }}
            >
              All services
            </button>
            <button 
              className={cn(
                "pill flex-shrink-0 px-4 h-[44px] text-sm font-medium rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 scroll-snap-align-start",
                selectedFilter === 'messy-files' 
                  ? "pill--active bg-emerald-600 text-white border-emerald-600" 
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              )}
              onClick={() => {
                setSelectedFilter('messy-files')
                const grid = document.getElementById('services-grid')
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => {
                    grid.style.animation = 'pulse-border 300ms cubic-bezier(.2,.8,.2,1)'
                    setTimeout(() => grid.style.animation = '', 300)
                  }, 500)
                }
              }}
            >
              Messy files
            </button>
            <button 
              className={cn(
                "pill flex-shrink-0 px-4 h-[44px] text-sm font-medium rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 scroll-snap-align-start",
                selectedFilter === 'messy-inbox' 
                  ? "pill--active bg-emerald-600 text-white border-emerald-600" 
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              )}
              onClick={() => {
                setSelectedFilter('messy-inbox')
                const grid = document.getElementById('services-grid')
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => {
                    grid.style.animation = 'pulse-border 300ms cubic-bezier(.2,.8,.2,1)'
                    setTimeout(() => grid.style.animation = '', 300)
                  }, 500)
                }
              }}
            >
              Messy inbox
            </button>
            <button 
              className={cn(
                "pill flex-shrink-0 px-4 h-[44px] text-sm font-medium rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 scroll-snap-align-start",
                selectedFilter === 'reports' 
                  ? "pill--active bg-emerald-600 text-white border-emerald-600" 
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              )}
              onClick={() => {
                setSelectedFilter('reports')
                const grid = document.getElementById('services-grid')
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => {
                    grid.style.animation = 'pulse-border 300ms cubic-bezier(.2,.8,.2,1)'
                    setTimeout(() => grid.style.animation = '', 300)
                  }, 500)
                }
              }}
            >
              Reports
            </button>
            <button 
              className={cn(
                "pill flex-shrink-0 px-4 h-[44px] text-sm font-medium rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50 scroll-snap-align-start",
                selectedFilter === 'website' 
                  ? "pill--active bg-emerald-600 text-white border-emerald-600" 
                  : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              )}
              onClick={() => {
                setSelectedFilter('website')
                const grid = document.getElementById('services-grid')
                if (grid) {
                  grid.scrollIntoView({ behavior: 'smooth' })
                  setTimeout(() => {
                    grid.style.animation = 'pulse-border 300ms cubic-bezier(.2,.8,.2,1)'
                    setTimeout(() => grid.style.animation = '', 300)
                  }, 500)
                }
              }}
            >
              Website
            </button>
          </div>
        </div>

        {/* Service cards grid - mobile optimized */}
        <div 
          id="services-grid"
          className={cn(
            "services-grid transition-all duration-500",
            // Adaptive grid based on number of filtered services
            filteredServices.length === 1 
              ? "grid-cols-1 max-w-2xl mx-auto" // Single card - centered, larger
              : filteredServices.length === 2 
              ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" // Two cards - centered
              : filteredServices.length === 3
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto" // Three cards - better spacing
              : "" // Use services-grid default
          )}
        >
          {filteredServices
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((service, index) => (
              <div
                key={service.id}
                id={service.slug}
                data-index={index}
                className={cn(
                  'service-card transition-all duration-500 ease-out',
                  'opacity-100 translate-y-0', // Always show filtered cards
                  // Make cards slightly larger when there are fewer of them
                  filteredServices.length <= 2 && "transform scale-105"
                )}
              >
                <ServiceCard service={service} />
              </div>
            ))}
        </div>

        {/* Show message when no services match filter */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No services match your selection. Try selecting "All services" to see everything.
            </p>
          </div>
        )}

        {/* Slim FAQ - 3 accordions only */}
        <div className="section--alt mt-16 mb-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Quick Questions
            </h3>
            <div className="faq space-y-4">
              <details className="faq-item group border border-gray-200 dark:border-gray-700 rounded-lg">
                <summary className="item flex justify-between items-center p-4 cursor-pointer font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[48px]">
                  <div>
                    <span>Safety</span>
                    <span className="hint block text-[13px] font-normal text-gray-500 dark:text-gray-400">Dry run. Move-not-delete. Logs.</span>
                  </div>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  We test with a dry-run and never delete—only move or copy.
                </div>
              </details>
              
              <details className="faq-item group border border-gray-200 dark:border-gray-700 rounded-lg">
                <summary className="item flex justify-between items-center p-4 cursor-pointer font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[48px]">
                  <div>
                    <span>Timeline</span>
                    <span className="hint block text-[13px] font-normal text-gray-500 dark:text-gray-400">Most deliver in 2–5 days.</span>
                  </div>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  Most quick wins deliver in 2–5 days.
                </div>
              </details>
              
              <details className="faq-item group border border-gray-200 dark:border-gray-700 rounded-lg">
                <summary className="item flex justify-between items-center p-4 cursor-pointer font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 min-h-[48px]">
                  <div>
                    <span>What's included</span>
                    <span className="hint block text-[13px] font-normal text-gray-500 dark:text-gray-400">Script, runbook, 1 tweak, 7-day bug fix.</span>
                  </div>
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="p-4 pt-0 text-gray-600 dark:text-gray-400">
                  Script, runbook, 1 tweak, 7-day bug fix.
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Pricing Psychology Block */}
        <div className="mt-16 mb-16">
          <div className="pricing-cta mx-auto max-w-3xl rounded-2xl p-8">
            <h3 className="mb-4 text-xl font-bold text-emerald-900 dark:text-emerald-100">
              Why these prices make sense
            </h3>
            <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
              Think of Automatron as "time on sale." If a $349 script saves 5 hours/month and your time is $30/hr, 
              that's $150/month back—the script pays for itself in weeks.
            </p>
          </div>
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-glass dark:border-white/10 dark:bg-black/5 animate-fade-in-up">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Ready to save 2–5 hours per week?
            </h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Get a free automation assessment (EN/ES). We'll identify your fastest win in 15 minutes.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white bg-emerald-600 hover:bg-emerald-700 border border-emerald-600 hover:border-emerald-700 whitespace-nowrap">
                Save My Hours Now
              </Link>
              <div className="text-center">
                <Link href="/services" className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors underline">
                  View all services
                </Link>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                No upfront cost • 7-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}