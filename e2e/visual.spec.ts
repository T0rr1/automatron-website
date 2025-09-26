import { test, expect } from '@playwright/test'
import { TestUtils } from './utils'

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for screenshots
    await page.setViewportSize({ width: 1280, height: 720 })
  })

  test('homepage visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/')
    await utils.waitForPageLoad()
    
    // Hide dynamic content that might cause flaky tests
    await page.addStyleTag({
      content: `
        [data-testid="current-time"],
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
      `
    })
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled',
    })
    
    // Take hero section screenshot
    const heroSection = page.locator('section').first()
    await expect(heroSection).toHaveScreenshot('homepage-hero.png', {
      animations: 'disabled',
    })
  })

  test('services page visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/services')
    await utils.waitForPageLoad()
    
    await page.addStyleTag({
      content: `
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
      `
    })
    
    await expect(page).toHaveScreenshot('services-full.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('contact page visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/contact')
    await utils.waitForPageLoad()
    
    await page.addStyleTag({
      content: `
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
      `
    })
    
    await expect(page).toHaveScreenshot('contact-full.png', {
      fullPage: true,
      animations: 'disabled',
    })
    
    // Test form screenshot
    const form = page.locator('form').first()
    if (await form.count() > 0) {
      await expect(form).toHaveScreenshot('contact-form.png', {
        animations: 'disabled',
      })
    }
  })

  test('mobile visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/')
    await utils.waitForPageLoad()
    
    await page.addStyleTag({
      content: `
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
      `
    })
    
    await expect(page).toHaveScreenshot('homepage-mobile.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('dark theme visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/')
    await utils.waitForPageLoad()
    
    // Switch to dark theme
    const themeToggle = page.locator('[aria-label*="theme"], [data-testid="theme-toggle"]').first()
    if (await themeToggle.count() > 0) {
      await themeToggle.click()
      await page.waitForTimeout(500) // Wait for theme transition
    } else {
      // Manually set dark theme if no toggle found
      await page.addStyleTag({
        content: `
          html { color-scheme: dark; }
          body { background: #0a0a0a; color: #fafafa; }
        `
      })
    }
    
    await page.addStyleTag({
      content: `
        .animate-pulse,
        .animate-spin {
          animation: none !important;
        }
      `
    })
    
    await expect(page).toHaveScreenshot('homepage-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('component states visual regression', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/')
    await utils.waitForPageLoad()
    
    // Test button hover states
    const buttons = page.locator('button, a[role="button"]')
    const buttonCount = await buttons.count()
    
    if (buttonCount > 0) {
      const firstButton = buttons.first()
      await firstButton.hover()
      
      await expect(firstButton).toHaveScreenshot('button-hover.png', {
        animations: 'disabled',
      })
    }
    
    // Test form focus states
    await page.goto('/contact')
    await utils.waitForPageLoad()
    
    const inputs = page.locator('input, textarea')
    const inputCount = await inputs.count()
    
    if (inputCount > 0) {
      const firstInput = inputs.first()
      await firstInput.focus()
      
      await expect(firstInput).toHaveScreenshot('input-focus.png', {
        animations: 'disabled',
      })
    }
  })
})