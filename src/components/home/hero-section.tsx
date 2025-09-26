'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Typography, DisplayText, GradientText } from '@/components/ui/typography'
import { Container, Section } from '@/components/common'
import { ArrowRight, Clock, CheckCircle, TrendingUp, Zap, FileText, Mail, BarChart3, Globe, Settings } from 'lucide-react'
import { trackHeroCTA } from '@/lib/analytics-events'

interface MetricProps {
  value: string
  label: string
  icon: React.ReactNode
  delay?: number
}

function AnimatedMetric({ value, label, icon, delay = 0 }: MetricProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValue, setAnimatedValue] = useState('0')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      
      // Animate numeric values
      if (value.includes('%') || value.includes('hrs') || value.includes('days')) {
        const numericPart = value.match(/\d+/)?.[0]
        if (numericPart) {
          const targetNum = parseInt(numericPart)
          let currentNum = 0
          const increment = Math.ceil(targetNum / 20)
          
          const countTimer = setInterval(() => {
            currentNum += increment
            if (currentNum >= targetNum) {
              currentNum = targetNum
              clearInterval(countTimer)
            }
            setAnimatedValue(value.replace(/\d+/, currentNum.toString()))
          }, 50)
        }
      } else {
        setAnimatedValue(value)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, value])

  return (
    <div 
      className={`flex flex-col items-center space-y-3 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="flex items-center space-x-3 text-brand-600 dark:text-brand-400">
        <div className="p-2 rounded-full bg-brand-100 dark:bg-brand-900/30">
          {icon}
        </div>
        <Typography variant="h3" className="font-bold text-2xl lg:text-3xl">
          {animatedValue}
        </Typography>
      </div>
      <Typography variant="small" className="text-muted-foreground text-center font-medium">
        {label}
      </Typography>
    </div>
  )
}

function AutomationBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const automationIcons = [
    // Top row - well spaced across the top
    { Icon: FileText, color: 'automation', positionClass: 'top-[15%] left-[8%]', animation: 'animate-float-slow', delay: '0s' },
    { Icon: Settings, color: 'brand', positionClass: 'top-[12%] right-[12%]', animation: 'animate-float-medium', delay: '1s' },
    
    // Middle row - positioned to avoid main content area
    { Icon: Mail, color: 'automation', positionClass: 'top-[45%] left-[5%]', animation: 'animate-float-fast', delay: '2s' },
    { Icon: Globe, color: 'brand', positionClass: 'top-[40%] right-[8%]', animation: 'animate-float-slow', delay: '3s' },
    
    // Bottom row - spread out at the bottom
    { Icon: BarChart3, color: 'automation', positionClass: 'bottom-[25%] left-[12%]', animation: 'animate-float-medium', delay: '4s' },
    { Icon: Zap, color: 'brand', positionClass: 'bottom-[20%] right-[15%]', animation: 'animate-float-fast', delay: '5s' },
    
    // Additional subtle icons for depth
    { Icon: FileText, color: 'automation', positionClass: 'top-[65%] left-[3%]', animation: 'animate-float-slow', delay: '6s' },
    { Icon: Settings, color: 'brand', positionClass: 'top-[75%] right-[5%]', animation: 'animate-float-medium', delay: '7s' },
  ]

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient mesh */}
      <div 
        className="absolute inset-0 opacity-30 dark:opacity-20 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(14, 165, 233, 0.1) 0%, 
            rgba(34, 197, 94, 0.05) 50%, 
            transparent 100%)`
        }}
      />
      
      {/* Grid pattern - Removed to fix horizontal line issue */}
      
      {/* Floating automation icons */}
      <div className="absolute inset-0 hidden lg:block pointer-events-none">
        {/* Test icon - top left */}
        <div className="absolute top-[15%] left-[8%] animate-float-slow opacity-60 z-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/10 to-brand-600/20 border border-brand-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <FileText className="w-5 h-5 text-brand-500/70" />
          </div>
        </div>
        
        {/* Test icon - top right */}
        <div className="absolute top-[12%] right-[12%] animate-float-medium opacity-60 z-10" style={{ animationDelay: '1s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-automation-500/10 to-automation-600/20 border border-automation-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <Settings className="w-5 h-5 text-automation-500/70" />
          </div>
        </div>
        
        {/* Test icon - middle left */}
        <div className="absolute top-[45%] left-[5%] animate-float-fast opacity-60 z-10" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-automation-500/10 to-automation-600/20 border border-automation-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <Mail className="w-5 h-5 text-automation-500/70" />
          </div>
        </div>
        
        {/* Test icon - middle right */}
        <div className="absolute top-[40%] right-[8%] animate-float-slow opacity-60 z-10" style={{ animationDelay: '3s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/10 to-brand-600/20 border border-brand-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <Globe className="w-5 h-5 text-brand-500/70" />
          </div>
        </div>
        
        {/* Test icon - bottom left */}
        <div className="absolute bottom-[25%] left-[12%] animate-float-medium opacity-60 z-10" style={{ animationDelay: '4s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-automation-500/10 to-automation-600/20 border border-automation-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <BarChart3 className="w-5 h-5 text-automation-500/70" />
          </div>
        </div>
        
        {/* Test icon - bottom right */}
        <div className="absolute bottom-[20%] right-[15%] animate-float-fast opacity-60 z-10" style={{ animationDelay: '5s' }}>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/10 to-brand-600/20 border border-brand-500/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
            <Zap className="w-5 h-5 text-brand-500/70" />
          </div>
        </div>
      </div>
      
      {/* Workflow connection lines - Removed to fix horizontal line issue */}
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 via-transparent to-automation-50/30 dark:from-brand-950/30 dark:to-automation-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  )
}

export function HomepageHero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <Section 
      as="section"
      padding="lg" 
      background="default" 
      className="hero relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      <AutomationBackground />
      
      <Container className="relative z-10">
        <div className="text-container text-center space-y-8 lg:space-y-12 max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8" role="banner">
          {/* Badge */}
          <div 
            className={`transition-all duration-700 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Badge 
              variant="automation" 
              className="mb-6 text-sm lg:text-base px-4 py-2 bg-automation-100 dark:bg-automation-900/30 text-automation-800 dark:text-automation-200 border-automation-200 dark:border-automation-800"
            >
              ⚡ AI Automation Studio
            </Badge>
          </div>
          
          {/* Main Headline - Mobile-optimized hierarchy */}
          <div 
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <DisplayText 
              size="xl" 
              className="hero-h1 leading-[1.15] text-[34px] sm:text-[48px] lg:text-[56px] font-bold tracking-tight max-w-[22ch] sm:max-w-[640px] mx-auto"
            >
              Simple automations. Real time saved.
            </DisplayText>
            
            <Typography 
              variant="lead" 
              className="hero-subhead max-w-[36ch] sm:max-w-[640px] mx-auto text-muted-foreground text-[16px] sm:text-lg leading-[1.65] sm:leading-[1.6]"
            >
              Bilingual scripts, reports, and sites that save 2–5 hrs/week. Safe runs.
            </Typography>

            {/* Proof bullets - one line on desktop */}
            <div className="proof-row flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center text-[13px] sm:text-sm font-medium leading-[1.4]">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0 hidden sm:block" />
                <span>95% success</span>
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0 hidden sm:block" />
                <span>3 hrs saved/wk</span>
              </div>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <CheckCircle className="w-3 h-3 text-emerald-600 flex-shrink-0 hidden sm:block" />
                <span>3-day turnaround</span>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons - Mobile-first approach */}
          <div 
            className={`space-y-4 transition-all duration-700 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* Primary CTA - Full width on mobile */}
              <Link href="/contact" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full group px-8 py-4 text-lg font-bold h-[56px] shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-white"
                  style={{ backgroundColor: '#059669' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#047857'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                  onClick={() => trackHeroCTA('primary')}
                  aria-label="Save my hours now - book automation consultation"
                >
                  Save My Hours Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Button>
              </Link>
              
              {/* Secondary CTA - Link style to reduce competition */}
              <Link 
                href="/contact" 
                className="btn-secondary-link font-semibold"
                onClick={() => trackHeroCTA('secondary')}
              >
                Get free assessment
              </Link>
            </div>

            {/* Micro-subtext under primary CTA - reduces friction */}
            <div className="text-center cta-subtext px-4 w-full">
              <div className="text-center w-full">
                <Typography variant="small" className="cta-sub text-center block w-full">
                  Book a 15-min quick-win call (EN/ES). No prep needed.
                </Typography>
              </div>
            </div>

            {/* Trust line - directly under CTAs, smaller text */}
            <div className="text-center trust-line px-4 w-full">
              <div className="text-center w-full">
                <Typography variant="small" className="text-xs text-gray-500 dark:text-gray-400 text-center block w-full">
                  Dry-run first • Move-not-delete • 7-day bug fix
                </Typography>
              </div>
            </div>
          </div>
          
          {/* Metrics Display */}
          <div 
            className={`grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 pt-16 lg:pt-20 transition-all duration-700 delay-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            role="region"
            aria-label="Key metrics and statistics"
          >
            <AnimatedMetric
              value="95%"
              label="Success Rate"
              icon={<CheckCircle className="w-6 h-6 lg:w-7 lg:h-7" />}
              delay={800}
            />
            <AnimatedMetric
              value="3hrs"
              label="Saved Per Week"
              icon={<Clock className="w-6 h-6 lg:w-7 lg:h-7" />}
              delay={1000}
            />
            <AnimatedMetric
              value="3days"
              label="Typical Turnaround"
              icon={<TrendingUp className="w-6 h-6 lg:w-7 lg:h-7" />}
              delay={1200}
            />
          </div>

          {/* Social Proof */}
          <div 
            className={`social-proof pt-12 lg:pt-16 transition-all duration-700 delay-800 text-center ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="text-center w-full">
              <Typography variant="small" className="text-muted-foreground mb-6 text-center block w-full">
                Cross-platform automation for Windows & Mac
              </Typography>
            </div>
            {/* Technology Icons - Clean 3-on-top, 2-below layout */}
            <div className="flex flex-col items-center space-y-6">
              {/* Top row - 3 icons */}
              <div className="flex justify-center items-center space-x-8 lg:space-x-12">
                {/* PowerShell Icon */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2 2v20h20V2H2zm18 18H4V4h16v16zM6 6v2l4 2-4 2v2l6-3V9l-6-3zm6 8h4v2h-4v-2z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">PowerShell</span>
                </div>
                
                {/* Python Icon */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <svg className="w-7 h-7 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="none">
                      <path d="M12.001 0C8.318 0 5.267 1.177 5.267 4.175v3.825h6.734v.85H4.267C1.177 8.85 0 11.901 0 15.584c0 3.683 1.177 6.734 4.175 6.734h2.683v-3.567c0-3.683 3.051-6.734 6.734-6.734h6.734c2.998 0 4.175-3.051 4.175-6.049V4.175C24.501 1.177 21.45 0 17.767 0h-5.766zm-2.683 2.267c.85 0 1.533.683 1.533 1.533s-.683 1.533-1.533 1.533-1.533-.683-1.533-1.533.683-1.533 1.533-1.533z" fill="#3776ab"/>
                      <path d="M19.834 8.85v3.567c0 3.683-3.051 6.734-6.734 6.734H6.366c-2.998 0-4.175 3.051-4.175 6.049v1.793c0 2.998 3.051 4.175 6.049 4.175h5.766c3.683 0 6.734-1.177 6.734-4.175v-3.825h-6.734v-.85h8.934c2.998 0 4.175-3.051 4.175-6.734 0-3.683-1.177-6.734-4.175-6.734h-2.506zm-5.766 13.6c.85 0 1.533.683 1.533 1.533s-.683 1.533-1.533 1.533-1.533-.683-1.533-1.533.683-1.533 1.533-1.533z" fill="#ffd43b"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Python</span>
                </div>
                
                {/* Excel Icon */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM9 17H7v-2h2v2zm0-3H7v-2h2v2zm0-3H7V9h2v2zm0-3H7V6h2v2zm4 9h-2v-2h2v2zm0-3h-2v-2h2v2zm0-3h-2V9h2v2zm0-3h-2V6h2v2zm4 9h-2v-2h2v2zm0-3h-2v-2h2v2zm0-3h-2V9h2v2zm0-3h-2V6h2v2z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Excel</span>
                </div>
              </div>
              
              {/* Bottom row - 2 icons */}
              <div className="flex justify-center items-center space-x-12 lg:space-x-16">
                {/* Windows Icon */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.351"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Windows</span>
                </div>
                
                {/* Mac Icon */}
                <div className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gray-100 dark:bg-gray-800/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-sm">
                    <svg className="w-7 h-7 lg:w-8 lg:h-8 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">macOS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`pt-8 lg:pt-12 transition-all duration-700 delay-1000 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex flex-col items-center space-y-2 animate-bounce-subtle">
              <Typography variant="small" className="text-muted-foreground text-xs">
                Scroll to explore
              </Typography>
              <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-muted-foreground/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}