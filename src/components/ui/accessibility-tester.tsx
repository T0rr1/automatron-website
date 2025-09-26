'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { testing } from '@/lib/accessibility'

interface AccessibilityIssue {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
}

interface AccessibilityTesterProps {
  className?: string
  targetSelector?: string
}

export function AccessibilityTester({ 
  className, 
  targetSelector = 'body' 
}: AccessibilityTesterProps) {
  const [issues, setIssues] = React.useState<AccessibilityIssue[]>([])
  const [isRunning, setIsRunning] = React.useState(false)
  const [lastRun, setLastRun] = React.useState<Date | null>(null)

  const runAccessibilityAudit = React.useCallback(async () => {
    setIsRunning(true)
    const foundIssues: AccessibilityIssue[] = []

    try {
      const targetElement = document.querySelector(targetSelector) as HTMLElement
      if (!targetElement) {
        foundIssues.push({
          type: 'error',
          message: `Target element "${targetSelector}" not found`,
        })
        return
      }

      // Use our existing accessibility testing utility
      const basicIssues = testing.audit(targetElement)
      foundIssues.push(...basicIssues.map(issue => ({
        type: 'warning' as const,
        message: issue,
      })))

      // Additional custom checks
      await performCustomChecks(targetElement, foundIssues)

    } catch (error) {
      foundIssues.push({
        type: 'error',
        message: `Error running accessibility audit: ${error}`,
      })
    } finally {
      setIssues(foundIssues)
      setLastRun(new Date())
      setIsRunning(false)
    }
  }, [targetSelector])

  const performCustomChecks = async (
    element: HTMLElement, 
    issues: AccessibilityIssue[]
  ) => {
    // Check for missing skip links
    const skipLinks = document.querySelectorAll('a[href^="#"]')
    if (skipLinks.length === 0) {
      issues.push({
        type: 'warning',
        message: 'No skip links found',
        suggestion: 'Add skip links for keyboard navigation',
      })
    }

    // Check for proper heading hierarchy
    const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    let previousLevel = 0
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1))
      
      if (index === 0 && level !== 1) {
        issues.push({
          type: 'warning',
          message: 'Page should start with an h1 heading',
          element: heading.tagName.toLowerCase(),
        })
      }
      
      if (level > previousLevel + 1) {
        issues.push({
          type: 'warning',
          message: `Heading level jumps from h${previousLevel} to h${level}`,
          element: heading.tagName.toLowerCase(),
          suggestion: 'Heading levels should increase by one',
        })
      }
      
      previousLevel = level
    })

    // Check for interactive elements without proper focus indicators
    const interactiveElements = element.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    interactiveElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      if (styles.outline === 'none' && !el.classList.contains('focus-visible')) {
        issues.push({
          type: 'warning',
          message: 'Interactive element may lack focus indicator',
          element: el.tagName.toLowerCase(),
          suggestion: 'Ensure focus indicators are visible',
        })
      }
    })

    // Check for images without alt text
    const images = element.querySelectorAll('img')
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-hidden')) {
        issues.push({
          type: 'error',
          message: `Image ${index + 1} missing alt text`,
          element: 'img',
          suggestion: 'Add descriptive alt text or aria-hidden="true" for decorative images',
        })
      }
    })

    // Check for form inputs without labels
    const inputs = element.querySelectorAll('input, select, textarea')
    inputs.forEach((input, index) => {
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      element.querySelector(`label[for="${input.id}"]`) ||
                      input.closest('label')
      
      if (!hasLabel) {
        issues.push({
          type: 'error',
          message: `Form input ${index + 1} missing label`,
          element: input.tagName.toLowerCase(),
          suggestion: 'Add a label element or aria-label attribute',
        })
      }
    })

    // Check for proper landmark usage
    const landmarks = element.querySelectorAll('main, nav, aside, section, article, header, footer')
    if (landmarks.length === 0) {
      issues.push({
        type: 'info',
        message: 'No semantic landmarks found',
        suggestion: 'Use semantic HTML elements like main, nav, aside for better structure',
      })
    }

    // Check for color contrast (simplified)
    const textElements = element.querySelectorAll('p, span, div, a, button, h1, h2, h3, h4, h5, h6')
    let lowContrastCount = 0
    
    textElements.forEach((el) => {
      const styles = window.getComputedStyle(el)
      const color = styles.color
      const backgroundColor = styles.backgroundColor
      
      // This is a simplified check - in production you'd want more robust color parsing
      if (color === 'rgb(128, 128, 128)' || color.includes('rgba(128, 128, 128')) {
        lowContrastCount++
      }
    })
    
    if (lowContrastCount > 0) {
      issues.push({
        type: 'warning',
        message: `${lowContrastCount} elements may have low color contrast`,
        suggestion: 'Ensure text has sufficient contrast ratio (4.5:1 for normal text)',
      })
    }
  }

  const getIssueIcon = (type: AccessibilityIssue['type']) => {
    switch (type) {
      case 'error':
        return '🚨'
      case 'warning':
        return '⚠️'
      case 'info':
        return 'ℹ️'
      default:
        return '•'
    }
  }

  const getIssueColor = (type: AccessibilityIssue['type']) => {
    switch (type) {
      case 'error':
        return 'destructive'
      case 'warning':
        return 'secondary'
      case 'info':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const errorCount = issues.filter(i => i.type === 'error').length
  const warningCount = issues.filter(i => i.type === 'warning').length
  const infoCount = issues.filter(i => i.type === 'info').length

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Accessibility Audit
          <Button 
            onClick={runAccessibilityAudit} 
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? 'Running...' : 'Run Audit'}
          </Button>
        </CardTitle>
        <CardDescription>
          Test the current page for accessibility issues
          {lastRun && (
            <span className="block text-xs mt-1">
              Last run: {lastRun.toLocaleTimeString()}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {issues.length === 0 && !isRunning && (
          <p className="text-muted-foreground text-center py-8">
            Click "Run Audit" to check for accessibility issues
          </p>
        )}
        
        {isRunning && (
          <p className="text-muted-foreground text-center py-8">
            Running accessibility audit...
          </p>
        )}
        
        {issues.length > 0 && (
          <>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{errorCount} Errors</Badge>
                <Badge variant="secondary">{warningCount} Warnings</Badge>
                <Badge variant="outline">{infoCount} Info</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {issues.map((issue, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-lg border">
                  <span className="text-lg" role="img" aria-label={issue.type}>
                    {getIssueIcon(issue.type)}
                  </span>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{issue.message}</p>
                      <Badge variant={getIssueColor(issue.type)} className="text-xs">
                        {issue.type}
                      </Badge>
                    </div>
                    {issue.element && (
                      <p className="text-xs text-muted-foreground">
                        Element: <code className="bg-muted px-1 rounded">{issue.element}</code>
                      </p>
                    )}
                    {issue.suggestion && (
                      <p className="text-xs text-muted-foreground">
                        💡 {issue.suggestion}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

// Development-only component that shows accessibility info
export function AccessibilityDevTools() {
  const [isVisible, setIsVisible] = React.useState(false)

  // Only show in development
  React.useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development')
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <AccessibilityTester />
    </div>
  )
}