'use client'

import * as React from 'react'

interface FocusManagementOptions {
  restoreFocus?: boolean
  trapFocus?: boolean
  autoFocus?: boolean
}

export function useFocusManagement(
  containerRef: React.RefObject<HTMLElement>,
  isActive: boolean = true,
  options: FocusManagementOptions = {}
) {
  const { restoreFocus = true, trapFocus = false, autoFocus = false } = options
  const previousActiveElement = React.useRef<HTMLElement | null>(null)

  // Get all focusable elements within the container
  const getFocusableElements = React.useCallback(() => {
    if (!containerRef.current) return []
    
    const selector = [
      'button:not([disabled])',
      '[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
      'details summary',
      'audio[controls]',
      'video[controls]',
    ].join(', ')
    
    return Array.from(containerRef.current.querySelectorAll(selector)) as HTMLElement[]
  }, [containerRef])

  // Focus the first focusable element
  const focusFirst = React.useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }, [getFocusableElements])

  // Focus the last focusable element
  const focusLast = React.useCallback(() => {
    const focusableElements = getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[focusableElements.length - 1].focus()
    }
  }, [getFocusableElements])

  // Handle tab key for focus trapping
  const handleTabKey = React.useCallback((e: KeyboardEvent) => {
    if (!trapFocus || e.key !== 'Tab') return

    const focusableElements = getFocusableElements()
    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }, [trapFocus, getFocusableElements])

  // Handle escape key
  const handleEscapeKey = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && restoreFocus && previousActiveElement.current) {
      previousActiveElement.current.focus()
    }
  }, [restoreFocus])

  // Set up focus management when component becomes active
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return

    // Save the currently focused element
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement as HTMLElement
    }

    // Auto focus the first element if requested
    if (autoFocus) {
      focusFirst()
    }

    // Add event listeners for focus trapping
    if (trapFocus) {
      document.addEventListener('keydown', handleTabKey)
    }

    // Add escape key listener
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive, autoFocus, trapFocus, restoreFocus, handleTabKey, handleEscapeKey, focusFirst])

  // Restore focus when component becomes inactive
  React.useEffect(() => {
    return () => {
      if (restoreFocus && previousActiveElement.current) {
        // Small delay to ensure the element is still in the DOM
        setTimeout(() => {
          if (previousActiveElement.current && document.contains(previousActiveElement.current)) {
            previousActiveElement.current.focus()
          }
        }, 0)
      }
    }
  }, [restoreFocus])

  return {
    focusFirst,
    focusLast,
    getFocusableElements,
  }
}

// Hook for managing focus announcements to screen readers
export function useFocusAnnouncement() {
  const announce = React.useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message
    
    document.body.appendChild(announcement)
    
    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
  }, [])

  return { announce }
}

// Hook for managing focus visible state
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false)
  const [hadKeyboardEvent, setHadKeyboardEvent] = React.useState(false)

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.altKey || e.ctrlKey) return
      setHadKeyboardEvent(true)
    }

    const handlePointerDown = () => {
      setHadKeyboardEvent(false)
    }

    const handleFocus = () => {
      setIsFocusVisible(hadKeyboardEvent)
    }

    const handleBlur = () => {
      setIsFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('mousedown', handlePointerDown, true)
    document.addEventListener('pointerdown', handlePointerDown, true)
    document.addEventListener('touchstart', handlePointerDown, true)
    document.addEventListener('focus', handleFocus, true)
    document.addEventListener('blur', handleBlur, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('mousedown', handlePointerDown, true)
      document.removeEventListener('pointerdown', handlePointerDown, true)
      document.removeEventListener('touchstart', handlePointerDown, true)
      document.removeEventListener('focus', handleFocus, true)
      document.removeEventListener('blur', handleBlur, true)
    }
  }, [hadKeyboardEvent])

  return isFocusVisible
}

// Hook for managing roving tabindex (useful for toolbars, menus, etc.)
export function useRovingTabIndex(
  containerRef: React.RefObject<HTMLElement>,
  activeIndex: number = 0
) {
  React.useEffect(() => {
    if (!containerRef.current) return

    const focusableElements = Array.from(
      containerRef.current.querySelectorAll('[role="menuitem"], [role="tab"], [role="option"], button, [tabindex]')
    ) as HTMLElement[]

    focusableElements.forEach((element, index) => {
      if (index === activeIndex) {
        element.setAttribute('tabindex', '0')
        if (document.activeElement === containerRef.current) {
          element.focus()
        }
      } else {
        element.setAttribute('tabindex', '-1')
      }
    })
  }, [containerRef, activeIndex])
}