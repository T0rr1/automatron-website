"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="rounded-md border border-border bg-surface px-3 py-2"
        disabled
        aria-label="Toggle theme"
      >
        Theme
      </button>
    )
  }

  const current = theme === "system" ? resolvedTheme : theme

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="rounded-md border border-border bg-surface px-3 py-2 text-text hover:bg-bg transition-colors"
    >
      {current === "dark" ? "Light" : "Dark"}
    </button>
  )
}