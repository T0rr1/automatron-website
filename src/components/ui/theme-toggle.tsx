import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from './button'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder to avoid hydration mismatch
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        disabled
      >
        <span className="sr-only">Toggle theme</span>
        🌙
      </Button>
    )
  }

  const handleToggle = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light'
    
    // Add theme-change class for smooth transitions
    document.documentElement.classList.add('theme-change')
    
    // Update data-theme attribute (for new CSS variables)
    document.documentElement.setAttribute('data-theme', newTheme)
    
    // Update class attribute (for existing Tailwind dark: classes)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Update localStorage
    localStorage.setItem('theme', newTheme)
    
    // Update color-scheme
    document.documentElement.style.colorScheme = newTheme
    
    // Update next-themes state
    setTheme(newTheme)
    
    // Remove theme-change class after transition completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-change')
    }, 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {resolvedTheme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}