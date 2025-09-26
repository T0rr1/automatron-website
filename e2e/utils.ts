import { Page, expect } from '@playwright/test'

export class TestUtils {
  constructor(private page: Page) {}

  /**
   * Wait for page to be fully loaded including all async content
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle')
    // Wait for any potential hydration
    await this.page.waitForTimeout(1000)
  }

  /**
   * Check basic accessibility requirements
   */
  async checkBasicAccessibility() {
    // Check for skip links
    const skipLink = this.page.locator('a[href="#main-content"], a[href="#main"]').first()
    if (await skipLink.count() > 0) {
      await expect(skipLink).toBeVisible()
    }

    // Check for proper heading hierarchy
    const h1Count = await this.page.locator('h1').count()
    expect(h1Count).toBeGreaterThanOrEqual(1)
    expect(h1Count).toBeLessThanOrEqual(1) // Should have exactly one h1

    // Check for alt text on images
    const images = this.page.locator('img')
    const imageCount = await images.count()
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeDefined()
    }
  }

  /**
   * Test keyboard navigation
   */
  async testKeyboardNavigation() {
    // Focus first interactive element
    await this.page.keyboard.press('Tab')
    
    // Check that focus is visible
    const focusedElement = await this.page.evaluate(() => document.activeElement?.tagName)
    expect(focusedElement).toBeTruthy()
    
    // Test escape key functionality if modal/dropdown is open
    await this.page.keyboard.press('Escape')
  }

  /**
   * Test responsive behavior
   */
  async testResponsive() {
    // Test mobile viewport
    await this.page.setViewportSize({ width: 375, height: 667 })
    await this.waitForPageLoad()
    
    // Check mobile navigation
    const mobileMenu = this.page.locator('[aria-label*="menu"], [aria-label*="navigation"]').first()
    if (await mobileMenu.count() > 0) {
      await expect(mobileMenu).toBeVisible()
    }
    
    // Test tablet viewport
    await this.page.setViewportSize({ width: 768, height: 1024 })
    await this.waitForPageLoad()
    
    // Test desktop viewport
    await this.page.setViewportSize({ width: 1280, height: 720 })
    await this.waitForPageLoad()
  }

  /**
   * Fill and submit a form
   */
  async fillAndSubmitForm(formData: Record<string, string>, submitSelector: string = 'button[type="submit"]') {
    for (const [label, value] of Object.entries(formData)) {
      const field = this.page.locator(`input[name="${label}"], textarea[name="${label}"], select[name="${label}"]`).first()
      await field.fill(value)
    }
    
    await this.page.locator(submitSelector).click()
  }

  /**
   * Check for performance issues
   */
  async checkPerformance() {
    // Check for layout shifts
    const cls = await this.page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              clsValue += (entry as any).value
            }
          }
          resolve(clsValue)
        }).observe({ type: 'layout-shift', buffered: true })
        
        // Resolve after a short delay if no layout shifts
        setTimeout(() => resolve(clsValue), 2000)
      })
    })
    
    expect(cls).toBeLessThan(0.1) // Good CLS score
  }

  /**
   * Test theme switching
   */
  async testThemeSwitch() {
    const themeToggle = this.page.locator('[aria-label*="theme"], [data-testid="theme-toggle"]').first()
    
    if (await themeToggle.count() > 0) {
      await themeToggle.click()
      await this.page.waitForTimeout(500) // Wait for theme transition
      
      // Check that theme actually changed
      const htmlClass = await this.page.locator('html').getAttribute('class')
      expect(htmlClass).toContain('dark')
      
      // Switch back
      await themeToggle.click()
      await this.page.waitForTimeout(500)
    }
  }

  /**
   * Check for console errors
   */
  async checkConsoleErrors() {
    const errors: string[] = []
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    // Allow some time for any errors to surface
    await this.page.waitForTimeout(2000)
    
    // Filter out known acceptable errors
    const filteredErrors = errors.filter(error => 
      !error.includes('favicon.ico') &&
      !error.includes('ResizeObserver loop limit exceeded') &&
      !error.includes('Non-passive event listener')
    )
    
    expect(filteredErrors).toHaveLength(0)
  }
}