'use client'

import * as React from 'react'
import { Header } from './header'
import { Footer } from './footer'

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
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const height = rect.height
        if (scrollPosition >= top - offset && scrollPosition < top + height * (1 - (1 - threshold))) {
          setActiveSection(sectionIds[i])
          return
        }
      }
      setActiveSection(null)
    }

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

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={className}>
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-background px-3 py-2 rounded z-50"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="pt-24">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  )
}

interface BackToTopProps {
  className?: string
  showAfter?: number
}

export function BackToTop({ className = '', showAfter = 400 }: BackToTopProps) {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > showAfter)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [showAfter])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-opacity bg-accent text-accent-foreground hover:opacity-90 ${className}`}
      aria-label="Back to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}