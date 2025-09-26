'use client'

import * as React from 'react'

// Re-export ScrollSpyNav from scroll-spy-nav
export { 
  ScrollSpyNav,
  FloatingScrollSpyNav,
  ScrollProgress,
  TableOfContents
} from './scroll-spy-nav'

interface UseScrollSpyOptions {
  offset?: number
  threshold?: number
}

export function useScrollSpy(
  sectionIds: string[],
  options: UseScrollSpyOptions = {}
) {
  const { offset = 100, threshold = 0.5 } = options
  const [activeSection, setActiveSection] = React.useState<string | null>(null)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset

      // Find the section that's currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i]
        const element = document.getElementById(sectionId)
        
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementHeight = rect.height
          
          // Check if the section is in view based on threshold
          if (scrollPosition >= elementTop - offset && 
              scrollPosition < elementTop + elementHeight * threshold) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Initial check
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset, threshold])

  return activeSection
}

export function scrollToSection(sectionId: string, offset: number = 100) {
  const element = document.getElementById(sectionId)
  if (element) {
    const elementTop = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementTop - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Layout component
interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

// Back to top component
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
      className={`fixed bottom-6 right-6 z-50 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity ${className}`}
      aria-label="Back to top"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}