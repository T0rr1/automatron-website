'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ServiceCategory } from '@/types'
import { serviceScenarios, categoryPricing } from '@/lib/constants/services'
import { FancyCard } from '@/components/ui/FancyCard'
import { cn } from '@/lib/utils'

// Safe locale detection function
function getLocaleFromPath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) return 'es'
  }
  return 'en'
}

interface ServiceCardProps {
  service: ServiceCategory
  className?: string
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const locale = getLocaleFromPath()
  const scenario = serviceScenarios[service.slug as keyof typeof serviceScenarios]
  const pricing = categoryPricing[service.slug as keyof typeof categoryPricing]
  
  // Different colors for different categories
  const categoryColors = {
    'basic-scripting': 'from-blue-500 to-blue-600',
    'email-file-hygiene': 'from-green-500 to-green-600', 
    'reporting-lite': 'from-purple-500 to-purple-600',
    'websites-landing': 'from-orange-500 to-orange-600',
    'pc-helpers': 'from-indigo-500 to-indigo-600',
    'reusable-templates': 'from-pink-500 to-pink-600'
  }
  
  const cardColor = categoryColors[service.slug as keyof typeof categoryColors] || 'from-brand-500 to-automation-500'
  
  // Get the appropriate CTA text based on locale
  const ctaText = locale === 'es' 
    ? (pricing?.ctaTextEs || 'Ahorra Mis Horas Ahora')
    : (pricing?.ctaText || 'Save My Hours Now')

  return (
    <FancyCard className={className}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Recommended tag for best seller only */}
        {service.slug === 'basic-scripting' && (
          <div className="absolute -top-3 -right-3 z-20">
            <div className="pill--recommended px-3 py-1 text-xs font-bold rounded-full shadow-lg whitespace-nowrap">
              Recommended
            </div>
          </div>
        )}

        {/* Header with icon and title - mobile optimized */}
        <div className="mb-4">
          {/* Mobile: Price and badge on same row */}
          <div className="price-badge-row flex justify-between items-start mb-3 lg:hidden">
            <div 
              className="badge px-3 py-1 text-xs font-bold rounded-full shadow-sm"
              style={{ 
                backgroundColor: 'rgba(16,185,129,.12)', 
                color: '#34D399',
                border: '1px solid rgba(16,185,129,.2)'
              }}
            >
              ⏱️ {pricing?.valueStatement || `Saves 2-5 hrs/week`}
            </div>
            <div className="pricing text-right">
              <p className="h-display price text-sm font-semibold text-text">
                {pricing?.priceRange || '$349-$599'}
              </p>
            </div>
          </div>

          {/* Icon and title row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-md bg-gradient-to-br",
                cardColor
              )}>
                {service.icon}
              </div>
              <div>
                <h3 className="text-[20px] lg:text-xl font-semibold text-text leading-[1.25]">
                  {pricing?.outcomeHeadline || service.name}
                </h3>
                <p className="text-sm text-muted">
                  {service.targetAudience[0]}
                </p>
              </div>
            </div>
            
            {/* Desktop pricing - hidden on mobile */}
            <div className="text-right hidden lg:block">
              <p className="h-display price text-sm font-semibold text-text">
                {pricing?.priceRange || '$349-$599'}
              </p>
              <p className="text-xs text-muted">
                depending on scope
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-text leading-relaxed">
          {service.description}
        </p>

        {/* Use cases - max 3 bullets, ≤6 words each */}
        <div className="mb-6">
          <h4 className="mb-3 text-sm font-semibold text-text">
            What we automate:
          </h4>
          <ul className="space-y-1">
            <li className="flex items-center text-sm text-muted">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              File cleanup and archiving
            </li>
            <li className="flex items-center text-sm text-muted">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              CSV merge operations
            </li>
            <li className="flex items-center text-sm text-muted">
              <div className="mr-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Backup routines
            </li>
          </ul>
        </div>

        {/* Footer trust line in card */}
        <div className="trust mb-4 text-center">
          <p className="trust font-medium">
            Safe scripts: dry-run • move-not-delete • logs
          </p>
        </div>

        {/* Enhanced CTA Button - Mobile optimized */}
        <Link
          href="/contact"
          className="w-full group/btn relative flex items-center justify-center rounded-xl px-6 font-bold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transform-gpu focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring text-accent-foreground h-[56px] bg-accent hover:shadow-glow border border-accent my-4"
        >
          <span className="relative z-10 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            {ctaText}
          </span>
          
          {/* Button shine effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-foreground/20 to-transparent opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100" />
        </Link>
      </div>
    </FancyCard>
  )
}