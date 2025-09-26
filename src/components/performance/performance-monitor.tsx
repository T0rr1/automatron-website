"use client"

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  lcp?: number
  fid?: number
  cls?: number
  ttfb?: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Measure Core Web Vitals
    const measurePerformance = () => {
      // Time to First Byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart
        }))
      }

      // Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            setMetrics(prev => ({
              ...prev,
              lcp: lastEntry.startTime
            }))
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value
              }
            }
            setMetrics(prev => ({
              ...prev,
              cls: clsValue
            }))
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })
        } catch (e) {
          console.log('Performance Observer not supported')
        }
      }
    }

    measurePerformance()
  }, [])

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 bg-surface border border-border rounded-lg p-3 text-xs font-mono shadow-card z-50">
      <div className="text-text font-semibold mb-2">Performance</div>
      <div className="space-y-1 text-muted">
        {metrics.lcp && (
          <div className={metrics.lcp > 2500 ? 'text-error' : metrics.lcp > 1200 ? 'text-warning' : 'text-success'}>
            LCP: {Math.round(metrics.lcp)}ms
          </div>
        )}
        {metrics.ttfb && (
          <div className={metrics.ttfb > 800 ? 'text-error' : metrics.ttfb > 200 ? 'text-warning' : 'text-success'}>
            TTFB: {Math.round(metrics.ttfb)}ms
          </div>
        )}
        {metrics.cls !== undefined && (
          <div className={metrics.cls > 0.25 ? 'text-error' : metrics.cls > 0.1 ? 'text-warning' : 'text-success'}>
            CLS: {metrics.cls.toFixed(3)}
          </div>
        )}
      </div>
    </div>
  )
}