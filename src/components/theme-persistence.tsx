'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ThemePersistence() {
  const pathname = usePathname()

  useEffect(() => {
    // Ensure theme is applied on client-side navigation
    const applyTheme = () => {
      try {
        const theme = localStorage.getItem('theme')
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        const resolvedTheme = theme || systemTheme
        
        // Apply theme without transitions
        document.documentElement.classList.add('no-theme-transitions')
        document.documentElement.setAttribute('data-theme', resolvedTheme)
        
        // Apply class for existing Tailwind dark: classes
        if (resolvedTheme === 'dark') {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
        
        document.documentElement.style.colorScheme = resolvedTheme
        
        // Remove no-transitions class after a brief delay
        setTimeout(() => {
          document.documentElement.classList.remove('no-theme-transitions')
        }, 50)
      } catch (e) {
        // Fallback to dark theme
        document.documentElement.setAttribute('data-theme', 'dark')
        document.documentElement.classList.add('dark')
        document.documentElement.style.colorScheme = 'dark'
      }
    }

    // Apply theme on route change
    applyTheme()
  }, [pathname])

  return null
}