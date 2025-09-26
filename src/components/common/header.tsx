'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { cn } from '@/lib/utils'
import { X, Menu } from 'lucide-react'

// Safe locale detection function
function getLocaleFromPath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) return 'es'
  }
  return 'en'
}

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const locale = getLocaleFromPath()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const ctaText = locale === 'es' ? 'Ahorra Mis Horas Ahora' : 'Save My Hours Now'

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
        "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800",
        isScrolled
          ? "py-2 shadow-md"
          : "py-4 backdrop-blur-sm",
        className
      )}
      style={{
        backgroundColor: 'var(--surface, #ffffff)',
        borderColor: 'var(--border, #e5e7eb)',
        color: 'var(--text, #111827)'
      }}
    >
      <nav role="navigation" className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors"
            style={{ color: 'var(--text, #111827)' }}
          >
            Automatron.ai
          </Link>

          {/* Desktop Navigation - Only show on lg screens (1024px) and up */}
          {!isMobile && (
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                <Link
                  href={`/${locale}/services/custom-scripts`}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium"
                  style={{ color: 'var(--text, #374151)' }}
                >
                  Custom Scripts
                </Link>
                <Link
                  href={`/${locale}/work`}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium"
                  style={{ color: 'var(--text, #374151)' }}
                >
                  Work
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium"
                  style={{ color: 'var(--text, #374151)' }}
                >
                  About
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium"
                  style={{ color: 'var(--text, #374151)' }}
                >
                  Contact
                </Link>
              </div>

              {/* Language & Theme */}
              <div className="flex items-center space-x-3">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              {/* Primary CTA */}
              <Link href={`/${locale}/contact`}>
                <Button
                  className="font-bold px-6 py-2 shadow-md hover:shadow-glow transition-all duration-200 hover:scale-105 text-accent-foreground bg-accent hover:shadow-glow border-accent"
                  size="sm"
                >
                  {ctaText}
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button and Controls - Show on screens smaller than lg (1024px) */}
          {isMobile && (
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <Link href={`/${locale}/contact`} className="hidden sm:block">
                <Button
                  className="font-bold px-3 py-2 text-xs text-accent-foreground bg-accent hover:shadow-glow border-accent"
                  size="sm"
                >
                  {locale === 'es' ? 'Ahorra Horas' : 'Save Hours'}
                </Button>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
                style={{ color: 'var(--text, #374151)' }}
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu - Only show when menu is open and on mobile */}
        {isMobileMenuOpen && isMobile && (
          <div
            className="mt-4 pb-4 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            style={{ backgroundColor: 'var(--surface, #ffffff)', borderColor: 'var(--border, #e5e7eb)' }}
          >
            <div className="flex flex-col space-y-3 pt-4">
              <Link
                href={`/${locale}/services/custom-scripts`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: 'var(--text, #374151)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Scripts
              </Link>
              <Link
                href={`/${locale}/work`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: 'var(--text, #374151)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Work
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: 'var(--text, #374151)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition-colors font-medium py-2 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                style={{ color: 'var(--text, #374151)' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile CTA Button - Show on very small screens */}
              <div className="sm:hidden pt-2">
                <Link href={`/${locale}/contact`} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    className="w-full font-bold py-2 text-white bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700"
                    size="sm"
                  >
                    {locale === 'es' ? 'Ahorra Horas' : 'Save Hours'}
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <span
                  className="text-sm text-gray-500 dark:text-gray-400"
                  style={{ color: 'var(--muted, #6b7280)' }}
                >
                  Theme:
                </span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}