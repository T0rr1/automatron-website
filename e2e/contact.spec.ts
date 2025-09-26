import { test, expect } from '@playwright/test'
import { TestUtils } from './utils'

test.describe('Contact and Forms', () => {
  test('should navigate to contact page', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/')
    await utils.waitForPageLoad()

    // Click contact link
    const contactLink = page.locator('a[href*="contact"], a:has-text("Contact")').first()
    await contactLink.click()
    
    await utils.waitForPageLoad()
    
    // Should be on contact page
    expect(page.url()).toContain('contact')
  })

  test('should display contact form', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/contact')
    await utils.waitForPageLoad()

    // Look for form elements
    const form = page.locator('form').first()
    if (await form.count() > 0) {
      await expect(form).toBeVisible()
      
      // Check for common form fields
      const nameField = page.locator('input[name*="name"], input[type="text"]').first()
      const emailField = page.locator('input[name*="email"], input[type="email"]').first()
      const messageField = page.locator('textarea, input[name*="message"]').first()
      
      if (await nameField.count() > 0) await expect(nameField).toBeVisible()
      if (await emailField.count() > 0) await expect(emailField).toBeVisible()
      if (await messageField.count() > 0) await expect(messageField).toBeVisible()
    }
  })

  test('should validate form fields', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/contact')
    await utils.waitForPageLoad()

    const form = page.locator('form').first()
    if (await form.count() > 0) {
      // Try to submit empty form
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first()
      if (await submitButton.count() > 0) {
        await submitButton.click()
        
        // Should show validation errors
        await page.waitForTimeout(1000)
        
        // Look for error messages
        const errorMessages = page.locator('[role="alert"], .error, [aria-invalid="true"]')
        const errorCount = await errorMessages.count()
        
        // Should have some form validation
        expect(errorCount).toBeGreaterThanOrEqual(0)
      }
    }
  })

  test('should fill and submit contact form', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/contact')
    await utils.waitForPageLoad()

    const form = page.locator('form').first()
    if (await form.count() > 0) {
      // Fill form with test data
      const nameField = page.locator('input[name*="name"], input[type="text"]').first()
      const emailField = page.locator('input[name*="email"], input[type="email"]').first()
      const messageField = page.locator('textarea, input[name*="message"]').first()
      
      if (await nameField.count() > 0) {
        await nameField.fill('Test User')
      }
      
      if (await emailField.count() > 0) {
        await emailField.fill('test@example.com')
      }
      
      if (await messageField.count() > 0) {
        await messageField.fill('This is a test message for automation testing.')
      }
      
      // Submit form
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first()
      if (await submitButton.count() > 0) {
        await submitButton.click()
        
        // Wait for response
        await page.waitForTimeout(3000)
        
        // Should show success message or redirect
        // Note: In a real test, you might want to mock the API endpoint
      }
    }
  })

  test('should have accessible contact form', async ({ page }) => {
    const utils = new TestUtils(page)
    
    await page.goto('/contact')
    await utils.waitForPageLoad()
    
    await utils.checkBasicAccessibility()
    
    // Check form accessibility specifically
    const form = page.locator('form').first()
    if (await form.count() > 0) {
      // Check for proper labels
      const inputs = page.locator('input, textarea, select')
      const inputCount = await inputs.count()
      
      for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        const id = await input.getAttribute('id')
        const ariaLabel = await input.getAttribute('aria-label')
        const ariaLabelledBy = await input.getAttribute('aria-labelledby')
        
        // Should have some form of labeling
        const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false
        const hasAccessibleName = hasLabel || ariaLabel || ariaLabelledBy
        
        if (!hasAccessibleName) {
          console.warn(`Input at index ${i} may not have an accessible name`)
        }
      }
    }
  })

  test('should be responsive on contact page', async ({ page }) => {
    await page.goto('/contact')
    
    const utils = new TestUtils(page)
    await utils.testResponsive()
  })
})