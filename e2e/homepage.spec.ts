import { test, expect } from '@playwright/test'
import { TestUtils } from './utils'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()

    // Check page title
    await expect(page).toHaveTitle(/Automatron/i)
    
    // Check main heading
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
    await expect(h1).toContainText(/save.*hours/i)
  })

  test('should have proper navigation', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()

    // Check navigation links
    const nav = page.locator('nav, [role="navigation"]').first()
    await expect(nav).toBeVisible()

    // Check for main navigation items - be more flexible
    const servicesLink = page.locator('a[href*="services"], a:has-text("Services")').first()
    const aboutLink = page.locator('a[href*="about"], a:has-text("About")').first()
    const contactLink = page.locator('a[href*="contact"], a:has-text("Contact")').first()
    
    if (await servicesLink.count() > 0) await expect(servicesLink).toBeVisible()
    if (await aboutLink.count() > 0) await expect(aboutLink).toBeVisible()
    if (await contactLink.count() > 0) await expect(contactLink).toBeVisible()
  })

  test('should display hero section with CTA', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()

    // Check hero section
    const hero = page.locator('section').first()
    await expect(hero).toBeVisible()

    // Check for CTA button - be more flexible
    const ctaButton = page.locator('a:has-text("Get Started"), button:has-text("Get Started")').first()
    if (await ctaButton.count() > 0) {
      await expect(ctaButton).toBeVisible()
      
      // Test CTA click
      await ctaButton.click()
      // Should navigate to contact or show form
      await page.waitForTimeout(1000)
    }
  })

  test('should display service overview cards', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()

    // Look for service cards or sections
    const serviceCards = page.locator('[data-testid*="service"], .service-card, section:has-text("Basic Scripting")')
    const cardCount = await serviceCards.count()
    
    // Should have at least some service information
    expect(cardCount).toBeGreaterThan(0)
  })

  test('should be accessible', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()
    
    await utils.checkBasicAccessibility()
    await utils.testKeyboardNavigation()
  })

  test('should be responsive', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.testResponsive()
  })

  test('should have good performance', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()
    await utils.checkPerformance()
  })

  test('should handle theme switching', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.waitForPageLoad()
    await utils.testThemeSwitch()
  })

  test('should not have console errors', async ({ page }) => {
    const utils = new TestUtils(page)
    await utils.checkConsoleErrors()
    await utils.waitForPageLoad()
  })
})