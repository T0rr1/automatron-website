'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Header } from './header'
import { Footer } from './footer'
import { StickyCTA } from './sticky-cta'
import { ChatbotProvider } from './chatbot-provider'
import { SkipLinks } from '@/components/ui/skip-links'

interface LayoutProps {
  children: React.ReactNode
  className?: string
  headerClassName?: string
  footerClassName?: string
  includeHeader?: boolean
  includeFooter?: boolean
}

export function Layout({
  children,
  className,
  headerClassName,
  footerClassName,
  includeHeader = true,
  includeFooter = true,
}: LayoutProps) {
  return (
    <ChatbotProvider>
      <div className={cn('min-h-screen flex flex-col', className)}>
        {/* Enhanced skip links for accessibility */}
        <SkipLinks />
        
        {includeHeader && <Header className={headerClassName} />}
        
        <main id="main-content" className="flex-1 pt-20" tabIndex={-1}>
          {children}
        </main>
        
        {/* Sticky CTA for mobile */}
        <StickyCTA />
        
        {includeFooter && <Footer className={footerClassName} />}
      </div>
    </ChatbotProvider>
  )
}

// Enhanced scroll spy hook for navigation highlighting
export function useScrollSpy(
  sectionIds: string[],
  options: {
    offset?: number
    threshold?: number
    rootMargin?: string
  } = {}
) {
  const [activeSection, setActiveSection] = React.useState<string>('')
  const { offset = 100, threshold = 0.5, rootMargin = '0px 0px -50% 0px' } = options

  React.useEffect(() => {
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin,
        threshold,
      }
    )

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Fallback scroll listener for edge cases
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionIds[i])
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener as fallback
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [sectionIds, offset, threshold, rootMargin])

  return activeSection
}

// Enhanced smooth scroll utility with better UX
export function scrollToSection(sectionId: string, offset: number = 80) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementPosition = element.offsetTop - offset
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    window.scrollTo({
      top: elementPosition,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    })
    
    // Update URL hash without triggering scroll
    if (history.pushState) {
      history.pushState(null, '', `#${sectionId}`)
    }
    
    // Focus management for accessibility
    element.focus({ preventScroll: true })
    element.setAttribute('tabindex', '-1')
  }
}

// Scroll spy navigation component
interface ScrollSpyNavProps {
  sections: Array<{
    id: string
    label: string
  }>
  className?: string
  offset?: number
  threshold?: number
}

export function ScrollSpyNav({ 
  sections, 
  className, 
  offset = 100, 
  threshold = 0.5 
}: ScrollSpyNavProps) {
  const activeSection = useScrollSpy(
    sections.map(s => s.id), 
    { offset, threshold }
  )

  return (
    <nav className={cn('space-y-2', className)}>
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id, offset)}
          className={cn(
            'block w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
            activeSection === section.id
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          )}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}

// Back to top button
interface BackToTopProps {
  className?: string
  showAfter?: number
}

export function BackToTop({ className, showAfter = 400 }: BackToTopProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105',
        className
      )}
      aria-label="Back to top"
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  )
}