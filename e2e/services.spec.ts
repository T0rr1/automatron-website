import { test, expect } from '@playwright/test'
import { TestUtils } from './utils'

test.describe('Services Pages', () => {
  test('should navigate to services from homepage', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/')
    await utils.waitForPageLoad()

    // Click services link
    const servicesLink = page.locator('a[href*="services"], a:has-text("Services")').first()
    await servicesLink.click()
    
    await utils.waitForPageLoad()
    
    // Should be on services page
    expect(page.url()).toContain('services')
    
    // Check page content
    const h1 = page.locator('h1').first()
    await expect(h1).toBeVisible()
  })

  test('should display service categories', async ({ page }) => {
    const utils = new TestUtils(page)
    
    // Try to navigate to services page directly
    await page.goto('/services')
    await utils.waitForPageLoad()

    // Look for service categories mentioned in requirements
    const serviceCategories = [
      'Basic Scripting',
      'Email',
      'Reporting',
      'Website',
      'PC Helper'
    ]

    // Check if at least some service categories are present
    let foundCategories = 0
    for (const category of serviceCategories) {
      const categoryElement = page.locator(`:has-text("${category}")`).first()
      if (await categoryElement.count() > 0) {
        foundCategories++
      }
    }
    
    expect(foundCategories).toBeGreaterThan(0)
  })

  test('should show service details and pricing', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/services')
    await utils.waitForPageLoad()

    // Look for pricing information
    const pricingElements = page.locator(':has-text("$"), :has-text("price"), :has-text("starting")')
    const pricingCount = await pricingElements.count()
    
    // Should have some pricing information
    expect(pricingCount).toBeGreaterThan(0)
  })

  test('should have accessible service pages', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/services')
    await utils.waitForPageLoad()
    
    await utils.checkBasicAccessibility()
  })

  test('should be responsive on services page', async ({ page }) => {
    await page.goto('/services')
    
    const utils = new TestUtils(page)
    await utils.testResponsive()
  })
})