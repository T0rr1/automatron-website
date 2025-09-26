'use client'

import { useEffect, useState } from 'react'
import { breakpoints } from '../design-tokens'

type Breakpoint = keyof typeof breakpoints | 'base'

/**
 * Hook for responsive design utilities
 */
export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('base')
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })
      
      // Determine current breakpoint
      if (width >= parseInt(breakpoints['2xl'])) {
        setCurrentBreakpoint('2xl')
      } else if (width >= parseInt(breakpoints.xl)) {
        setCurrentBreakpoint('xl')
      } else if (width >= parseInt(breakpoints.lg)) {
        setCurrentBreakpoint('lg')
      } else if (width >= parseInt(breakpoints.md)) {
        setCurrentBreakpoint('md')
      } else if (width >= parseInt(breakpoints.sm)) {
        setCurrentBreakpoint('sm')
      } else if (width >= parseInt(breakpoints.xs)) {
        setCurrentBreakpoint('xs')
      } else {
        setCurrentBreakpoint('base')
      }
    }

    // Set initial values
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Breakpoint checks
  const isBase = currentBreakpoint === 'base'
  const isXs = currentBreakpoint === 'xs'
  const isSm = currentBreakpoint === 'sm'
  const isMd = currentBreakpoint === 'md'
  const isLg = currentBreakpoint === 'lg'
  const isXl = currentBreakpoint === 'xl'
  const is2xl = currentBreakpoint === '2xl'

  // Device type checks
  const isMobile = windowSize.width < parseInt(breakpoints.md)
  const isTablet = windowSize.width >= parseInt(breakpoints.md) && windowSize.width < parseInt(breakpoints.lg)
  const isDesktop = windowSize.width >= parseInt(breakpoints.lg)

  // Utility functions
  const isBreakpoint = (bp: Breakpoint): boolean => currentBreakpoint === bp
  const isBreakpointUp = (bp: keyof typeof breakpoints): boolean => {
    return windowSize.width >= parseInt(breakpoints[bp])
  }
  const isBreakpointDown = (bp: keyof typeof breakpoints): boolean => {
    return windowSize.width < parseInt(breakpoints[bp])
  }

  return {
    // Current state
    currentBreakpoint,
    windowSize,
    
    // Breakpoint checks
    isBase,
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2xl,
    
    // Device checks
    isMobile,
    isTablet,
    isDesktop,
    
    // Utility functions
    isBreakpoint,
    isBreakpointUp,
    isBreakpointDown,
  }
}

/**
 * Hook for media query matching
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * Hook for checking if device supports hover
 */
export function useCanHover(): boolean {
  return useMediaQuery('(hover: hover) and (pointer: fine)')
}

/**
 * Hook for checking if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/**
 * Hook for checking if user prefers dark mode
 */
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

/**
 * Hook for checking if user prefers high contrast
 */
export function usePrefersHighContrast(): boolean {
  return useMediaQuery('(prefers-contrast: high)')
}

/**
 * Hook for orientation detection
 */
export function useOrientation() {
  const isPortrait = useMediaQuery('(orientation: portrait)')
  const isLandscape = useMediaQuery('(orientation: landscape)')

  return {
    isPortrait,
    isLandscape,
    orientation: isPortrait ? 'portrait' : 'landscape',
  }
}

/**
 * Hook for responsive values
 */
export function useResponsiveValue<T>(values: {
  base?: T
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}): T | undefined {
  const { currentBreakpoint } = useResponsive()

  // Return the value for the current breakpoint or the closest smaller one
  const breakpointOrder: Breakpoint[] = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs', 'base']
  const currentIndex = breakpointOrder.indexOf(currentBreakpoint)

  for (let i = currentIndex; i < breakpointOrder.length; i++) {
    const bp = breakpointOrder[i]
    if (values[bp] !== undefined) {
      return values[bp]
    }
  }

  return values.base
}

export default useResponsive