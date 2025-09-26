'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Languages } from 'lucide-react'

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLocale, setCurrentLocale] = useState('en')

  // Get current locale from pathname or body data attribute
  useEffect(() => {
    if (pathname.startsWith('/es')) {
      setCurrentLocale('es')
    } else if (pathname.startsWith('/en')) {
      setCurrentLocale('en')
    } else {
      // Fallback to body data attribute
      const bodyLocale = document.body.getAttribute('data-locale')
      if (bodyLocale) {
        setCurrentLocale(bodyLocale)
      }
    }
  }, [pathname])

  const switchLocale = (newLocale: string) => {
    // Remove the current locale from the pathname
    let pathWithoutLocale = pathname
    if (pathname.startsWith('/en')) {
      pathWithoutLocale = pathname.replace('/en', '')
    } else if (pathname.startsWith('/es')) {
      pathWithoutLocale = pathname.replace('/es', '')
    }
    
    // Navigate to the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 gap-1"
          aria-label="Change language"
        >
          <span className="text-sm">{currentLanguage.flag}</span>
          <Languages className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLocale(lang.code)}
            className={currentLocale === lang.code ? 'bg-accent' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}