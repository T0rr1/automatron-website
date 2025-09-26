'use client'

import { useEffect, useState } from 'react'

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

/**
 * Hook for breakpoint detection
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm')
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({ width, height })
      
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl')
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl')
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg')
      } else if (width >= breakpoints.md) {
        setBreakpoint('md')
      } else if (width >= breakpoints.sm) {
        setBreakpoint('sm')
      } else {
        setBreakpoint('xs')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.md
  const isTablet = windowSize.width >= breakpoints.md && windowSize.width < breakpoints.lg
  const isDesktop = windowSize.width >= breakpoints.lg

  return {
    breakpoint,
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint: (bp: Breakpoint) => breakpoint === bp,
    isAbove: (bp: Breakpoint) => windowSize.width >= breakpoints[bp],
    isBelow: (bp: Breakpoint) => windowSize.width < breakpoints[bp],
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

export default useBreakpoint