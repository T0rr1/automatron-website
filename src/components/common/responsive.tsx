"use client"

import * as React from "react"
import { useBreakpoint, useMediaQuery } from "@/lib/hooks/use-breakpoint"

interface ShowProps {
  children: React.ReactNode
  above?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  below?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  only?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'mobile' | 'tablet' | 'desktop'
}

// Show component based on breakpoints
export function Show({ children, above, below, only }: ShowProps) {
  const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint()
  
  if (only) {
    if (only === 'mobile' && !isMobile) return null
    if (only === 'tablet' && !isTablet) return null
    if (only === 'desktop' && !isDesktop) return null
    if (only !== 'mobile' && only !== 'tablet' && only !== 'desktop' && breakpoint !== only) return null
  }
  
  if (above) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpoints.indexOf(breakpoint)
    const aboveIndex = breakpoints.indexOf(above)
    if (currentIndex < aboveIndex) return null
  }
  
  if (below) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpoints.indexOf(breakpoint)
    const belowIndex = breakpoints.indexOf(below)
    if (currentIndex >= belowIndex) return null
  }
  
  return <>{children}</>
}

// Hide component based on breakpoints
export function Hide({ children, above, below, only }: ShowProps) {
  const { breakpoint, isMobile, isTablet, isDesktop } = useBreakpoint()
  
  if (only) {
    if (only === 'mobile' && isMobile) return null
    if (only === 'tablet' && isTablet) return null
    if (only === 'desktop' && isDesktop) return null
    if (only !== 'mobile' && only !== 'tablet' && only !== 'desktop' && breakpoint === only) return null
  }
  
  if (above) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpoints.indexOf(breakpoint)
    const aboveIndex = breakpoints.indexOf(above)
    if (currentIndex >= aboveIndex) return null
  }
  
  if (below) {
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    const currentIndex = breakpoints.indexOf(breakpoint)
    const belowIndex = breakpoints.indexOf(below)
    if (currentIndex < belowIndex) return null
  }
  
  return <>{children}</>
}

// Responsive component that renders different content based on breakpoints
interface ResponsiveProps {
  children: React.ReactNode
  mobile?: React.ReactNode
  tablet?: React.ReactNode
  desktop?: React.ReactNode
}

export function Responsive({ children, mobile, tablet, desktop }: ResponsiveProps) {
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  
  if (isMobile && mobile) return <>{mobile}</>
  if (isTablet && tablet) return <>{tablet}</>
  if (isDesktop && desktop) return <>{desktop}</>
  
  return <>{children}</>
}

// Hook-based responsive utilities
export function useResponsive() {
  const breakpointData = useBreakpoint()
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  return {
    ...breakpointData,
    isTouchDevice,
    prefersReducedMotion,
    prefersDarkMode,
    // Utility functions
    showOn: (breakpoints: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'mobile' | 'tablet' | 'desktop'>) => {
      if (breakpoints.includes('mobile') && breakpointData.isMobile) return true
      if (breakpoints.includes('tablet') && breakpointData.isTablet) return true
      if (breakpoints.includes('desktop') && breakpointData.isDesktop) return true
      return breakpoints.includes(breakpointData.breakpoint)
    },
    hideOn: (breakpoints: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'mobile' | 'tablet' | 'desktop'>) => {
      if (breakpoints.includes('mobile') && breakpointData.isMobile) return false
      if (breakpoints.includes('tablet') && breakpointData.isTablet) return false
      if (breakpoints.includes('desktop') && breakpointData.isDesktop) return false
      return !breakpoints.includes(breakpointData.breakpoint)
    },
  }
}