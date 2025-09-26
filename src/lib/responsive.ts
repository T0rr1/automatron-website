/**
 * Responsive utilities for Automatron.ai
 * Mobile-first responsive design helpers
 */

import { breakpoints } from './design-tokens'

// Breakpoint utilities
export const bp = {
  xs: `@media (min-width: ${breakpoints.xs})`,
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
  
  // Max-width breakpoints (for desktop-first when needed)
  'max-xs': `@media (max-width: ${parseInt(breakpoints.xs) - 1}px)`,
  'max-sm': `@media (max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  'max-md': `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  'max-lg': `@media (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  'max-xl': `@media (max-width: ${parseInt(breakpoints.xl) - 1}px)`,
  'max-2xl': `@media (max-width: ${parseInt(breakpoints['2xl']) - 1}px)`,
  
  // Range breakpoints
  'sm-md': `@media (min-width: ${breakpoints.sm}) and (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  'md-lg': `@media (min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  'lg-xl': `@media (min-width: ${breakpoints.lg}) and (max-width: ${parseInt(breakpoints.xl) - 1}px)`,
} as const

// Device detection utilities
export const device = {
  mobile: `@media (max-width: ${parseInt(breakpoints.md) - 1}px)`,
  tablet: `@media (min-width: ${breakpoints.md}) and (max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  desktop: `@media (min-width: ${breakpoints.lg})`,
  
  // Touch devices
  touch: '@media (hover: none) and (pointer: coarse)',
  hover: '@media (hover: hover) and (pointer: fine)',
  
  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',
  
  // High DPI
  retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)',
} as const

// Accessibility media queries
export const a11y = {
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  noReducedMotion: '@media (prefers-reduced-motion: no-preference)',
  highContrast: '@media (prefers-contrast: high)',
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',
} as const

// Container query utilities (for when container queries are supported)
export const container = {
  xs: '@container (min-width: 20rem)',
  sm: '@container (min-width: 24rem)',
  md: '@container (min-width: 28rem)',
  lg: '@container (min-width: 32rem)',
  xl: '@container (min-width: 36rem)',
  '2xl': '@container (min-width: 42rem)',
} as const

// Responsive value utilities
export type ResponsiveValue<T> = T | {
  base?: T
  xs?: T
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
}

/**
 * Get responsive CSS classes based on breakpoint values
 */
export function getResponsiveClasses<T extends string>(
  property: string,
  values: ResponsiveValue<T>
): string {
  if (typeof values === 'string') {
    return `${property}-${values}`
  }

  const classes: string[] = []
  
  if (values.base) classes.push(`${property}-${values.base}`)
  if (values.xs) classes.push(`xs:${property}-${values.xs}`)
  if (values.sm) classes.push(`sm:${property}-${values.sm}`)
  if (values.md) classes.push(`md:${property}-${values.md}`)
  if (values.lg) classes.push(`lg:${property}-${values.lg}`)
  if (values.xl) classes.push(`xl:${property}-${values.xl}`)
  if (values['2xl']) classes.push(`2xl:${property}-${values['2xl']}`)
  
  return classes.join(' ')
}

/**
 * Get responsive padding classes
 */
export function getResponsivePadding(values: ResponsiveValue<string>): string {
  return getResponsiveClasses('p', values)
}

/**
 * Get responsive margin classes
 */
export function getResponsiveMargin(values: ResponsiveValue<string>): string {
  return getResponsiveClasses('m', values)
}

/**
 * Get responsive text size classes
 */
export function getResponsiveTextSize(values: ResponsiveValue<string>): string {
  return getResponsiveClasses('text', values)
}

/**
 * Get responsive grid column classes
 */
export function getResponsiveColumns(values: ResponsiveValue<string>): string {
  return getResponsiveClasses('grid-cols', values)
}

/**
 * Get responsive gap classes
 */
export function getResponsiveGap(values: ResponsiveValue<string>): string {
  return getResponsiveClasses('gap', values)
}

// Common responsive patterns
export const responsivePatterns = {
  // Container padding
  containerPadding: 'px-4 sm:px-6 lg:px-8',
  
  // Section padding
  sectionPadding: 'py-16 lg:py-24',
  sectionPaddingSmall: 'py-12 lg:py-16',
  sectionPaddingLarge: 'py-20 lg:py-32',
  
  // Grid layouts
  gridAuto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  gridAutoLarge: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  gridHalf: 'grid grid-cols-1 lg:grid-cols-2',
  
  // Flex layouts
  flexStack: 'flex flex-col',
  flexStackSm: 'flex flex-col sm:flex-row',
  flexStackMd: 'flex flex-col md:flex-row',
  flexStackLg: 'flex flex-col lg:flex-row',
  
  // Text sizes
  textHero: 'text-4xl sm:text-5xl lg:text-6xl',
  textHeading: 'text-2xl sm:text-3xl lg:text-4xl',
  textSubheading: 'text-lg sm:text-xl lg:text-2xl',
  textBody: 'text-base sm:text-lg',
  
  // Spacing
  spaceY: 'space-y-8 lg:space-y-12',
  spaceYSmall: 'space-y-4 lg:space-y-6',
  spaceYLarge: 'space-y-12 lg:space-y-16',
  
  // Gaps
  gap: 'gap-6 lg:gap-8',
  gapSmall: 'gap-4 lg:gap-6',
  gapLarge: 'gap-8 lg:gap-12',
  
  // Widths
  widthContent: 'w-full max-w-7xl mx-auto',
  widthContentSmall: 'w-full max-w-4xl mx-auto',
  widthContentLarge: 'w-full max-w-screen-2xl mx-auto',
  
  // Heights
  heightScreen: 'min-h-screen',
  heightHero: 'min-h-[60vh] lg:min-h-[80vh]',
  
  // Positioning
  centerContent: 'flex items-center justify-center',
  centerVertical: 'flex items-center',
  centerHorizontal: 'flex justify-center',
} as const

// Utility functions for responsive design
export const responsive = {
  /**
   * Check if current viewport matches breakpoint
   */
  matches: (breakpoint: keyof typeof breakpoints): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(`(min-width: ${breakpoints[breakpoint]})`).matches
  },
  
  /**
   * Get current breakpoint
   */
  getCurrentBreakpoint: (): keyof typeof breakpoints | 'base' => {
    if (typeof window === 'undefined') return 'base'
    
    const width = window.innerWidth
    
    if (width >= parseInt(breakpoints['2xl'])) return '2xl'
    if (width >= parseInt(breakpoints.xl)) return 'xl'
    if (width >= parseInt(breakpoints.lg)) return 'lg'
    if (width >= parseInt(breakpoints.md)) return 'md'
    if (width >= parseInt(breakpoints.sm)) return 'sm'
    if (width >= parseInt(breakpoints.xs)) return 'xs'
    
    return 'base'
  },
  
  /**
   * Check if device is mobile
   */
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < parseInt(breakpoints.md)
  },
  
  /**
   * Check if device is tablet
   */
  isTablet: (): boolean => {
    if (typeof window === 'undefined') return false
    const width = window.innerWidth
    return width >= parseInt(breakpoints.md) && width < parseInt(breakpoints.lg)
  },
  
  /**
   * Check if device is desktop
   */
  isDesktop: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.innerWidth >= parseInt(breakpoints.lg)
  },
  
  /**
   * Check if device supports hover
   */
  canHover: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(hover: hover)').matches
  },
  
  /**
   * Check if user prefers reduced motion
   */
  prefersReducedMotion: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  },
  
  /**
   * Check if user prefers dark mode
   */
  prefersDarkMode: (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  },
} as const

export default responsive