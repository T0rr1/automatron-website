'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkipLink {
  href: string
  label: string
}

interface SkipLinksProps {
  links?: SkipLink[]
  className?: string
}

const defaultSkipLinks: SkipLink[] = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
]

export function SkipLinks({ links = defaultSkipLinks, className }: SkipLinksProps) {
  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    
    const target = document.querySelector(targetId)
    if (target) {
      // Focus the target element
      const element = target as HTMLElement
      element.focus({ preventScroll: false })
      
      // Ensure the element is focusable
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      
      // Scroll to the element
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
      
      // Remove tabindex after focus to maintain natural tab order
      setTimeout(() => {
        if (element.getAttribute('tabindex') === '-1') {
          element.removeAttribute('tabindex')
        }
      }, 100)
    }
  }

  return (
    <div className={cn('sr-only focus-within:not-sr-only', className)}>
      {links.map((link, index) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleSkipClick(e, link.href)}
          className={cn(
            'absolute top-4 z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium transition-all',
            'focus:not-sr-only focus:block',
            'hover:bg-primary/90',
            // Position each link with increasing left offset
            index === 0 ? 'left-4' : `left-[${4 + (index * 140)}px]`
          )}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

// Individual skip link component for more granular control
interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  position?: 'top-left' | 'top-center' | 'top-right'
}

export function SkipLink({ 
  href, 
  children, 
  className,
  position = 'top-left'
}: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    const target = document.querySelector(href)
    if (target) {
      const element = target as HTMLElement
      element.focus({ preventScroll: false })
      
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '-1')
      }
      
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
      
      setTimeout(() => {
        if (element.getAttribute('tabindex') === '-1') {
          element.removeAttribute('tabindex')
        }
      }, 100)
    }
  }

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:z-[100]',
        'bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium',
        'transition-all hover:bg-primary/90',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        positionClasses[position],
        className
      )}
    >
      {children}
    </a>
  )
}