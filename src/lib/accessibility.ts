/**
 * Accessibility utilities for Automatron.ai
 * Provides WCAG AA compliant utilities and helpers
 */

import * as React from 'react'

// ARIA utilities
export const aria = {
  /**
   * Generate unique IDs for ARIA relationships
   */
  generateId: (prefix = 'aria'): string => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  },
  
  /**
   * Create ARIA label props
   */
  label: (label: string) => ({
    'aria-label': label,
  }),
  
  /**
   * Create ARIA labelledby props
   */
  labelledBy: (id: string) => ({
    'aria-labelledby': id,
  }),
  
  /**
   * Create ARIA describedby props
   */
  describedBy: (id: string) => ({
    'aria-describedby': id,
  }),
  
  /**
   * Create ARIA expanded props for collapsible content
   */
  expanded: (isExpanded: boolean) => ({
    'aria-expanded': isExpanded,
  }),
  
  /**
   * Create ARIA selected props for selectable items
   */
  selected: (isSelected: boolean) => ({
    'aria-selected': isSelected,
  }),
  
  /**
   * Create ARIA checked props for checkable items
   */
  checked: (isChecked: boolean | 'mixed') => ({
    'aria-checked': isChecked,
  }),
  
  /**
   * Create ARIA disabled props
   */
  disabled: (isDisabled: boolean) => ({
    'aria-disabled': isDisabled,
  }),
  
  /**
   * Create ARIA hidden props for decorative elements
   */
  hidden: (isHidden: boolean = true) => ({
    'aria-hidden': isHidden,
  }),
  
  /**
   * Create ARIA live region props
   */
  live: (politeness: 'polite' | 'assertive' | 'off' = 'polite') => ({
    'aria-live': politeness,
  }),
  
  /**
   * Create ARIA current props for navigation
   */
  current: (current: 'page' | 'step' | 'location' | 'date' | 'time' | boolean) => ({
    'aria-current': current,
  }),
  
  /**
   * Create ARIA invalid props for form validation
   */
  invalid: (isInvalid: boolean) => ({
    'aria-invalid': isInvalid,
  }),
  
  /**
   * Create ARIA required props for form fields
   */
  required: (isRequired: boolean) => ({
    'aria-required': isRequired,
  }),
} as const

// Focus management utilities
export const focus = {
  /**
   * Focus trap for modals and dialogs
   */
  trapFocus: (container: HTMLElement): (() => void) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }
    
    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  },
  
  /**
   * Get all focusable elements within a container
   */
  getFocusableElements: (container: HTMLElement): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(', ')
    
    return Array.from(container.querySelectorAll(selector))
  },
  
  /**
   * Check if element is focusable
   */
  isFocusable: (element: HTMLElement): boolean => {
    const focusableElements = focus.getFocusableElements(document.body)
    return focusableElements.includes(element)
  },
  
  /**
   * Focus first focusable element in container
   */
  focusFirst: (container: HTMLElement): void => {
    const focusableElements = focus.getFocusableElements(container)
    focusableElements[0]?.focus()
  },
  
  /**
   * Focus last focusable element in container
   */
  focusLast: (container: HTMLElement): void => {
    const focusableElements = focus.getFocusableElements(container)
    focusableElements[focusableElements.length - 1]?.focus()
  },
  
  /**
   * Save and restore focus
   */
  saveFocus: (): (() => void) => {
    const activeElement = document.activeElement as HTMLElement
    
    return () => {
      if (activeElement && typeof activeElement.focus === 'function') {
        activeElement.focus()
      }
    }
  },
} as const

// Keyboard navigation utilities
export const keyboard = {
  /**
   * Common keyboard event handlers
   */
  handlers: {
    onEnterOrSpace: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        callback()
      }
    },
    
    onEscape: (callback: () => void) => (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        callback()
      }
    },
    
    onArrowKeys: (callbacks: {
      up?: () => void
      down?: () => void
      left?: () => void
      right?: () => void
    }) => (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          callbacks.up?.()
          break
        case 'ArrowDown':
          e.preventDefault()
          callbacks.down?.()
          break
        case 'ArrowLeft':
          e.preventDefault()
          callbacks.left?.()
          break
        case 'ArrowRight':
          e.preventDefault()
          callbacks.right?.()
          break
      }
    },
  },
  
  /**
   * Navigation keys
   */
  keys: {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
  } as const,
} as const

// Screen reader utilities
export const screenReader = {
  /**
   * Announce message to screen readers
   */
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite'): void => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },
  
  /**
   * Create visually hidden text for screen readers
   */
  onlyText: (text: string): React.ReactElement => {
    return React.createElement('span', { className: 'sr-only' }, text)
  },
} as const

// Color contrast utilities
export const contrast = {
  /**
   * Calculate relative luminance of a color
   */
  getLuminance: (hex: string): number => {
    const rgb = contrast.hexToRgb(hex)
    if (!rgb) return 0
    
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
      c = c / 255
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  },
  
  /**
   * Convert hex color to RGB
   */
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null
  },
  
  /**
   * Calculate contrast ratio between two colors
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const lum1 = contrast.getLuminance(color1)
    const lum2 = contrast.getLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    
    return (brightest + 0.05) / (darkest + 0.05)
  },
  
  /**
   * Check if contrast ratio meets WCAG standards
   */
  meetsWCAG: (
    color1: string, 
    color2: string, 
    level: 'AA' | 'AAA' = 'AA',
    size: 'normal' | 'large' = 'normal'
  ): boolean => {
    const ratio = contrast.getContrastRatio(color1, color2)
    
    if (level === 'AAA') {
      return size === 'large' ? ratio >= 4.5 : ratio >= 7
    } else {
      return size === 'large' ? ratio >= 3 : ratio >= 4.5
    }
  },
  
  /**
   * Get accessible color suggestions
   */
  getAccessibleColor: (
    backgroundColor: string,
    preferredColor: string,
    level: 'AA' | 'AAA' = 'AA'
  ): string => {
    if (contrast.meetsWCAG(backgroundColor, preferredColor, level)) {
      return preferredColor
    }
    
    // Return high contrast alternatives
    const backgroundLum = contrast.getLuminance(backgroundColor)
    return backgroundLum > 0.5 ? '#000000' : '#ffffff'
  },
} as const

// Form accessibility utilities
export const form = {
  /**
   * Create accessible form field props
   */
  field: (options: {
    id: string
    label?: string
    description?: string
    error?: string
    required?: boolean
  }) => {
    const props: Record<string, any> = {
      id: options.id,
    }
    
    if (options.description) {
      const descId = `${options.id}-description`
      props['aria-describedby'] = descId
    }
    
    if (options.error) {
      const errorId = `${options.id}-error`
      props['aria-describedby'] = props['aria-describedby'] 
        ? `${props['aria-describedby']} ${errorId}`
        : errorId
      props['aria-invalid'] = true
    }
    
    if (options.required) {
      props['aria-required'] = true
    }
    
    return props
  },
  
  /**
   * Create accessible error message props
   */
  error: (fieldId: string) => ({
    id: `${fieldId}-error`,
    role: 'alert',
    'aria-live': 'polite' as const,
  }),
  
  /**
   * Create accessible description props
   */
  description: (fieldId: string) => ({
    id: `${fieldId}-description`,
  }),
} as const

// Skip link utilities
export const skipLinks = {
  /**
   * Create skip link component props
   */
  create: (targetId: string, label: string = 'Skip to main content') => ({
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg',
    children: label,
  }),
} as const

// Common skip links (defined separately to avoid circular reference)
export const commonSkipLinks = {
  mainContent: skipLinks.create('main-content', 'Skip to main content'),
  navigation: skipLinks.create('navigation', 'Skip to navigation'),
  footer: skipLinks.create('footer', 'Skip to footer'),
} as const

// Reduced motion utilities
export const motion = {
  /**
   * Check if user prefers reduced motion
   */
  prefersReduced: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  /**
   * Get animation duration based on user preference
   */
  getDuration: (normalDuration: number): number => {
    return motion.prefersReduced() ? 0 : normalDuration
  },
  
  /**
   * Conditional animation classes
   */
  conditionalClass: (animationClass: string, fallbackClass: string = ''): string => {
    return motion.prefersReduced() ? fallbackClass : animationClass
  },
} as const

// Accessibility testing utilities
export const testing = {
  /**
   * Check for common accessibility issues
   */
  audit: (element: HTMLElement): string[] => {
    const issues: string[] = []
    
    // Check for missing alt text on images
    const images = element.querySelectorAll('img')
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push(`Image ${index + 1} is missing alt text`)
      }
    })
    
    // Check for missing form labels
    const inputs = element.querySelectorAll('input, select, textarea')
    inputs.forEach((input, index) => {
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      element.querySelector(`label[for="${input.id}"]`)
      
      if (!hasLabel) {
        issues.push(`Form field ${index + 1} is missing a label`)
      }
    })
    
    // Check for missing heading structure
    const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6')
    if (headings.length === 0) {
      issues.push('No headings found - page structure may be unclear')
    }
    
    // Check for low contrast (simplified check)
    const textElements = element.querySelectorAll('p, span, div, a, button')
    textElements.forEach((el, index) => {
      const styles = window.getComputedStyle(el)
      const color = styles.color
      const backgroundColor = styles.backgroundColor
      
      // This is a simplified check - in production you'd want more robust color parsing
      if (color === 'rgb(128, 128, 128)' && backgroundColor === 'rgb(255, 255, 255)') {
        issues.push(`Element ${index + 1} may have low contrast`)
      }
    })
    
    return issues
  },
  
  /**
   * Log accessibility audit results
   */
  logAudit: (element: HTMLElement = document.body): void => {
    const issues = testing.audit(element)
    
    if (issues.length === 0) {
      console.log('✅ No accessibility issues found')
    } else {
      console.warn('⚠️ Accessibility issues found:')
      issues.forEach(issue => console.warn(`  - ${issue}`))
    }
  },
} as const

export default {
  aria,
  focus,
  keyboard,
  screenReader,
  contrast,
  form,
  skipLinks,
  motion,
  testing,
}