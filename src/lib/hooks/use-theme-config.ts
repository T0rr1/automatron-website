'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Enhanced theme hook with additional configuration
 */
export function useThemeConfig() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get the actual theme being used
  const currentTheme = mounted ? resolvedTheme : 'light'
  const isDark = currentTheme === 'dark'
  const isLight = currentTheme === 'light'
  const isSystem = theme === 'system'

  // Theme utilities
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  const setLightTheme = () => setTheme('light')
  const setDarkTheme = () => setTheme('dark')
  const setSystemTheme = () => setTheme('system')

  // Get theme-specific values
  const getThemeValue = <T>(lightValue: T, darkValue: T): T => {
    return isDark ? darkValue : lightValue
  }

  // CSS custom properties for theme
  const themeVars = {
    '--theme-background': isDark ? '222.2 84% 4.9%' : '0 0% 100%',
    '--theme-foreground': isDark ? '210 40% 98%' : '222.2 84% 4.9%',
    '--theme-primary': '200 98% 39%',
    '--theme-glass-bg': isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
    '--theme-glass-border': isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
  }

  return {
    // Theme state
    theme,
    resolvedTheme,
    systemTheme,
    currentTheme,
    mounted,
    
    // Theme checks
    isDark,
    isLight,
    isSystem,
    
    // Theme actions
    setTheme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
    
    // Utilities
    getThemeValue,
    themeVars,
  }
}

/**
 * Hook for theme-aware animations
 */
export function useThemeAnimation() {
  const { isDark, mounted } = useThemeConfig()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!mounted) return

    setIsAnimating(true)
    const timer = setTimeout(() => setIsAnimating(false), 200)
    
    return () => clearTimeout(timer)
  }, [isDark, mounted])

  return {
    isAnimating,
    shouldAnimate: mounted && !isAnimating,
  }
}

/**
 * Hook for theme-aware colors
 */
export function useThemeColors() {
  const { isDark, getThemeValue } = useThemeConfig()

  const colors = {
    // Background colors
    background: getThemeValue('hsl(0 0% 100%)', 'hsl(222.2 84% 4.9%)'),
    foreground: getThemeValue('hsl(222.2 84% 4.9%)', 'hsl(210 40% 98%)'),
    
    // Card colors
    card: getThemeValue('hsl(0 0% 100%)', 'hsl(222.2 84% 4.9%)'),
    cardForeground: getThemeValue('hsl(222.2 84% 4.9%)', 'hsl(210 40% 98%)'),
    
    // Muted colors
    muted: getThemeValue('hsl(210 40% 96%)', 'hsl(217.2 32.6% 17.5%)'),
    mutedForeground: getThemeValue('hsl(215.4 16.3% 46.9%)', 'hsl(215 20.2% 65.1%)'),
    
    // Border colors
    border: getThemeValue('hsl(214.3 31.8% 91.4%)', 'hsl(217.2 32.6% 17.5%)'),
    
    // Glass colors
    glass: {
      background: getThemeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)'),
      border: getThemeValue('rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)'),
    },
    
    // Brand colors (theme-independent)
    brand: {
      primary: 'hsl(200 98% 39%)',
      secondary: 'hsl(142 76% 36%)',
    },
  }

  return colors
}

/**
 * Hook for theme-aware CSS variables
 */
export function useThemeVariables() {
  const { themeVars } = useThemeConfig()
  
  useEffect(() => {
    const root = document.documentElement
    
    Object.entries(themeVars).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
    
    return () => {
      Object.keys(themeVars).forEach(property => {
        root.style.removeProperty(property)
      })
    }
  }, [themeVars])

  return themeVars
}

export default useThemeConfig