'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

// Safe locale detection function
function getLocaleFromPath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) return 'es'
  }
  return 'en'
}

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const locale = getLocaleFromPath()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      const footer = document.querySelector('footer')
      const footerRect = footer?.getBoundingClientRect()
      const isFooterVisible = footerRect && footerRect.top < window.innerHeight

      // Show after 25% scroll, hide when footer is visible
      setIsVisible(scrollPercent > 25 && !isFooterVisible)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const ctaText = locale === 'es' ? 'Ahorra Mis Horas Ahora' : 'Save My Hours Now'

  if (!isVisible) return null

  return (
    <div className="sticky-cta fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="p-3 bg-gradient-to-t from-background/95 via-background/90 to-transparent backdrop-blur-sm border-t">
        <Link href="/contact" className="block">
          <Button 
            className="w-full h-[56px] text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 text-white group"
            style={{ backgroundColor: '#059669' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}