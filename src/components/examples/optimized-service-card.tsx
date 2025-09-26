"use client"

import { useState } from 'react'

interface ServiceCardProps {
  title: string
  description: string
  price: string
  badge?: string
  features: string[]
  ctaText?: string
}

export function OptimizedServiceCard({ 
  title, 
  description, 
  price, 
  badge, 
  features, 
  ctaText = "Get Started" 
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="bg-surface text-text border border-border rounded-lg shadow-card p-6 transition-transform duration-200 ease-out"
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-text">{title}</h3>
          <p className="text-muted mt-1">{description}</p>
        </div>
        {badge && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
            {badge}
          </span>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-text">{price}</span>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-text">
            <svg 
              className="w-4 h-4 text-accent mr-2 flex-shrink-0" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="w-full bg-accent text-accent-foreground rounded-lg px-4 py-3 font-semibold transition-opacity duration-200 hover:opacity-90 focus:shadow-focus">
        {ctaText}
      </button>

      {/* Trust indicator */}
      <p className="text-xs text-muted text-center mt-3">
        No upfront cost • 7-day money-back guarantee
      </p>
    </div>
  )
}

// Example usage component
export function ServiceCardsExample() {
  const services = [
    {
      title: "Basic Scripting",
      description: "Simple automation scripts",
      price: "$150",
      badge: "Popular",
      features: [
        "Custom Python/PowerShell script",
        "Basic error handling",
        "Documentation included",
        "1 revision included"
      ]
    },
    {
      title: "Email Automation",
      description: "Streamline your inbox",
      price: "$200",
      features: [
        "Email rules & filters",
        "Auto-categorization",
        "Template responses",
        "Outlook/Gmail setup"
      ]
    },
    {
      title: "Reporting Suite",
      description: "Automated data reports",
      price: "$300",
      badge: "Best Value",
      features: [
        "Data collection scripts",
        "Automated report generation",
        "Email delivery setup",
        "Dashboard creation"
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {services.map((service, index) => (
        <OptimizedServiceCard key={index} {...service} />
      ))}
    </div>
  )
}