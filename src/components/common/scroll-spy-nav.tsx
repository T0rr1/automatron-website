'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useScrollSpy, scrollToSection } from './layout'

interface ScrollSpyNavSection {
  id: string
  label: string
  href?: string
}

interface ScrollSpyNavProps {
  sections: ScrollSpyNavSection[]
  className?: string
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  offset?: number
  threshold?: number
  sticky?: boolean
  stickyOffset?: number
}

export function ScrollSpyNav({
  sections,
  className,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  offset = 100,
  threshold = 0.5,
  sticky = false,
  stickyOffset = 80,
}: ScrollSpyNavProps) {
  const activeSection = useScrollSpy(
    sections.map(s => s.id),
    { offset, threshold }
  )

  const handleSectionClick = (section: ScrollSpyNavSection) => {
    if (section.href && section.href.startsWith('http')) {
      // External link
      window.open(section.href, '_blank', 'noopener,noreferrer')
    } else if (section.href && section.href.startsWith('/')) {
      // Internal route
      window.location.href = section.href
    } else {
      // Scroll to section
      scrollToSection(section.id, offset)
    }
  }

  const getVariantClasses = (isActive: boolean) => {
    const baseClasses = 'transition-all duration-200'
    
    switch (variant) {
      case 'pills':
        return cn(
          baseClasses,
          isActive
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        )
      case 'underline':
        return cn(
          baseClasses,
          'relative border-b-2 border-transparent',
          isActive
            ? 'text-primary border-primary'
            : 'text-muted-foreground hover:text-foreground hover:border-muted-foreground/50'
        )
      default:
        return cn(
          baseClasses,
          isActive
            ? 'text-primary font-medium'
            : 'text-muted-foreground hover:text-foreground'
        )
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1.5'
      case 'lg':
        return 'text-lg px-4 py-3'
      default:
        return 'text-base px-3 py-2'
    }
  }

  const containerClasses = cn(
    'flex',
    orientation === 'vertical' ? 'flex-col space-y-1' : 'flex-row space-x-1',
    sticky && `sticky top-[${stickyOffset}px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b`,
    className
  )

  return (
    <nav className={containerClasses} role="navigation" aria-label="Page sections">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        
        return (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section)}
            className={cn(
              'rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              getSizeClasses(),
              getVariantClasses(isActive)
            )}
            aria-current={isActive ? 'page' : undefined}
            title={`Navigate to ${section.label}`}
          >
            {section.label}
          </button>
        )
      })}
    </nav>
  )
}

// Floating scroll spy navigation for long pages
interface FloatingScrollSpyNavProps extends Omit<ScrollSpyNavProps, 'sticky'> {
  position?: 'left' | 'right'
  showAfter?: number
}

export function FloatingScrollSpyNav({
  sections,
  className,
  position = 'right',
  showAfter = 400,
  ...props
}: FloatingScrollSpyNavProps) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfter)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfter])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'fixed top-1/2 -translate-y-1/2 z-50',
        position === 'left' ? 'left-4' : 'right-4',
        className
      )}
    >
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-lg shadow-lg p-2">
        <ScrollSpyNav
          sections={sections}
          orientation="vertical"
          variant="pills"
          size="sm"
          {...props}
        />
      </div>
    </div>
  )
}

// Progress indicator for scroll position
interface ScrollProgressProps {
  className?: string
  height?: number
  color?: string
}

export function ScrollProgress({ 
  className, 
  height = 3, 
  color = 'hsl(var(--primary))' 
}: ScrollProgressProps) {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed top-0 left-0 z-50 bg-muted/20',
        className
      )}
      style={{ 
        width: '100%', 
        height: `${height}px` 
      }}
    >
      <div
        className="h-full transition-all duration-150 ease-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  )
}

// Table of contents component
interface TableOfContentsProps {
  sections: ScrollSpyNavSection[]
  className?: string
  title?: string
  collapsible?: boolean
}

export function TableOfContents({
  sections,
  className,
  title = 'Table of Contents',
  collapsible = false,
}: TableOfContentsProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <div className={cn('border rounded-lg p-4', className)}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          {title}
        </h3>
        {collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand table of contents' : 'Collapse table of contents'}
          >
            <svg
              className={cn('h-4 w-4 transition-transform', isCollapsed && 'rotate-180')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Button>
        )}
      </div>
      
      {!isCollapsed && (
        <ScrollSpyNav
          sections={sections}
          orientation="vertical"
          variant="default"
          size="sm"
        />
      )}
    </div>
  )
}