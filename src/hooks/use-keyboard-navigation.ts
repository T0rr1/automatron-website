'use client'

import * as React from 'react'

interface KeyboardNavigationOptions {
  onEnter?: () => void
  onSpace?: () => void
  onEscape?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onHome?: () => void
  onEnd?: () => void
  onTab?: (e: KeyboardEvent) => void
  preventDefault?: string[] // Keys to prevent default for
  stopPropagation?: string[] // Keys to stop propagation for
}

export function useKeyboardNavigation(
  elementRef: React.RefObject<HTMLElement>,
  options: KeyboardNavigationOptions = {}
) {
  const {
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onTab,
    preventDefault = [],
    stopPropagation = [],
  } = options

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if we should prevent default
      if (preventDefault.includes(e.key)) {
        e.preventDefault()
      }

      // Check if we should stop propagation
      if (stopPropagation.includes(e.key)) {
        e.stopPropagation()
      }

      switch (e.key) {
        case 'Enter':
          if (onEnter) {
            e.preventDefault()
            onEnter()
          }
          break
        case ' ':
          if (onSpace) {
            e.preventDefault()
            onSpace()
          }
          break
        case 'Escape':
          if (onEscape) {
            e.preventDefault()
            onEscape()
          }
          break
        case 'ArrowUp':
          if (onArrowUp) {
            e.preventDefault()
            onArrowUp()
          }
          break
        case 'ArrowDown':
          if (onArrowDown) {
            e.preventDefault()
            onArrowDown()
          }
          break
        case 'ArrowLeft':
          if (onArrowLeft) {
            e.preventDefault()
            onArrowLeft()
          }
          break
        case 'ArrowRight':
          if (onArrowRight) {
            e.preventDefault()
            onArrowRight()
          }
          break
        case 'Home':
          if (onHome) {
            e.preventDefault()
            onHome()
          }
          break
        case 'End':
          if (onEnd) {
            e.preventDefault()
            onEnd()
          }
          break
        case 'Tab':
          if (onTab) {
            onTab(e)
          }
          break
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    return () => element.removeEventListener('keydown', handleKeyDown)
  }, [
    elementRef,
    onEnter,
    onSpace,
    onEscape,
    onArrowUp,
    onArrowDown,
    onArrowLeft,
    onArrowRight,
    onHome,
    onEnd,
    onTab,
    preventDefault,
    stopPropagation,
  ])
}

// Hook for managing list navigation (like menus, dropdowns, etc.)
export function useListNavigation(
  containerRef: React.RefObject<HTMLElement>,
  options: {
    itemSelector?: string
    activeIndex?: number
    onActiveIndexChange?: (index: number) => void
    onSelect?: (index: number) => void
    loop?: boolean
    orientation?: 'vertical' | 'horizontal'
  } = {}
) {
  const {
    itemSelector = '[role="menuitem"], [role="option"], button, a',
    activeIndex = 0,
    onActiveIndexChange,
    onSelect,
    loop = true,
    orientation = 'vertical',
  } = options

  const getItems = React.useCallback(() => {
    if (!containerRef.current) return []
    return Array.from(containerRef.current.querySelectorAll(itemSelector)) as HTMLElement[]
  }, [containerRef, itemSelector])

  const focusItem = React.useCallback((index: number) => {
    const items = getItems()
    if (items[index]) {
      items[index].focus()
      onActiveIndexChange?.(index)
    }
  }, [getItems, onActiveIndexChange])

  const moveNext = React.useCallback(() => {
    const items = getItems()
    const nextIndex = activeIndex + 1
    
    if (nextIndex < items.length) {
      focusItem(nextIndex)
    } else if (loop) {
      focusItem(0)
    }
  }, [activeIndex, getItems, focusItem, loop])

  const movePrevious = React.useCallback(() => {
    const items = getItems()
    const prevIndex = activeIndex - 1
    
    if (prevIndex >= 0) {
      focusItem(prevIndex)
    } else if (loop) {
      focusItem(items.length - 1)
    }
  }, [activeIndex, getItems, focusItem, loop])

  const moveFirst = React.useCallback(() => {
    focusItem(0)
  }, [focusItem])

  const moveLast = React.useCallback(() => {
    const items = getItems()
    focusItem(items.length - 1)
  }, [getItems, focusItem])

  const selectCurrent = React.useCallback(() => {
    onSelect?.(activeIndex)
  }, [onSelect, activeIndex])

  useKeyboardNavigation(containerRef, {
    onArrowUp: orientation === 'vertical' ? movePrevious : undefined,
    onArrowDown: orientation === 'vertical' ? moveNext : undefined,
    onArrowLeft: orientation === 'horizontal' ? movePrevious : undefined,
    onArrowRight: orientation === 'horizontal' ? moveNext : undefined,
    onHome: moveFirst,
    onEnd: moveLast,
    onEnter: selectCurrent,
    onSpace: selectCurrent,
    preventDefault: ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', ' '],
  })

  return {
    moveNext,
    movePrevious,
    moveFirst,
    moveLast,
    selectCurrent,
    focusItem,
    getItems,
  }
}

// Hook for managing tab navigation within a component
export function useTabNavigation(
  containerRef: React.RefObject<HTMLElement>,
  options: {
    tabs: Array<{ id: string; label: string }>
    activeTabId: string
    onTabChange: (tabId: string) => void
    orientation?: 'horizontal' | 'vertical'
  }
) {
  const { tabs, activeTabId, onTabChange, orientation = 'horizontal' } = options
  const activeIndex = tabs.findIndex(tab => tab.id === activeTabId)

  const moveToTab = React.useCallback((index: number) => {
    if (index >= 0 && index < tabs.length) {
      onTabChange(tabs[index].id)
    }
  }, [tabs, onTabChange])

  const moveNext = React.useCallback(() => {
    const nextIndex = (activeIndex + 1) % tabs.length
    moveToTab(nextIndex)
  }, [activeIndex, tabs.length, moveToTab])

  const movePrevious = React.useCallback(() => {
    const prevIndex = activeIndex === 0 ? tabs.length - 1 : activeIndex - 1
    moveToTab(prevIndex)
  }, [activeIndex, tabs.length, moveToTab])

  const moveFirst = React.useCallback(() => {
    moveToTab(0)
  }, [moveToTab])

  const moveLast = React.useCallback(() => {
    moveToTab(tabs.length - 1)
  }, [tabs.length, moveToTab])

  useKeyboardNavigation(containerRef, {
    onArrowLeft: orientation === 'horizontal' ? movePrevious : undefined,
    onArrowRight: orientation === 'horizontal' ? moveNext : undefined,
    onArrowUp: orientation === 'vertical' ? movePrevious : undefined,
    onArrowDown: orientation === 'vertical' ? moveNext : undefined,
    onHome: moveFirst,
    onEnd: moveLast,
    preventDefault: ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'],
  })

  return {
    moveNext,
    movePrevious,
    moveFirst,
    moveLast,
    moveToTab,
  }
}

// Hook for managing modal/dialog keyboard interactions
export function useModalKeyboard(
  isOpen: boolean,
  onClose: () => void,
  containerRef?: React.RefObject<HTMLElement>
) {
  React.useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Focus trap for modal
  React.useEffect(() => {
    if (!isOpen || !containerRef?.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isOpen, containerRef])
}