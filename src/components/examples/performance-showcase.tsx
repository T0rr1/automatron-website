"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckIcon } from '@/components/ui/icon'

export function PerformanceShowcase() {
  const [themeToggleCount, setThemeToggleCount] = useState(0)
  const [renderTime, setRenderTime] = useState<number | null>(null)

  const handleThemeToggle = () => {
    const start = performance.now()
    
    // Toggle theme
    const html = document.documentElement
    const current = html.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    
    // Measure how long it takes
    requestAnimationFrame(() => {
      const end = performance.now()
      setRenderTime(end - start)
      setThemeToggleCount(prev => prev + 1)
    })
  }

  return (
    <div className="space-y-6 p-6 bg-surface border border-border rounded-lg">
      <h3 className="text-xl font-semibold text-text">Performance Showcase</h3>
      
      {/* Theme Toggle Performance */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-text">Instant Theme Switching</h4>
        <p className="text-muted">
          Zero React rerenders, pure CSS variable updates. Click to test:
        </p>
        
        <div className="flex items-center gap-4">
          <Button onClick={handleThemeToggle}>
            Toggle Theme ({themeToggleCount})
          </Button>
          
          {renderTime !== null && (
            <div className="text-sm">
              <span className="text-muted">Last toggle: </span>
              <span className={`font-mono ${renderTime < 16 ? 'text-success' : 'text-warning'}`}>
                {renderTime.toFixed(2)}ms
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Performance Features */}
      <div className="space-y-3">
        <h4 className="text-lg font-medium text-text">Optimizations Applied</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Semantic CSS variables',
            'Inter Variable font loading',
            'Optimized shadow usage',
            'GPU-accelerated transforms',
            'Reduced motion support',
            'Touch-friendly targets',
            'Focus ring accessibility',
            'Status color system'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckIcon className="text-success" />
              <span className="text-text">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Core Web Vitals Info */}
      <div className="bg-bg border border-border rounded-lg p-4">
        <h5 className="font-medium text-text mb-2">Core Web Vitals Targets</h5>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted">LCP</div>
            <div className="text-success font-mono">&lt; 1.2s</div>
          </div>
          <div>
            <div className="text-muted">FID</div>
            <div className="text-success font-mono">&lt; 100ms</div>
          </div>
          <div>
            <div className="text-muted">CLS</div>
            <div className="text-success font-mono">&lt; 0.1</div>
          </div>
        </div>
      </div>
    </div>
  )
}