import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  
  // Launch browser and create a new page
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // Wait for the development server to be ready
    console.log(`Waiting for ${baseURL} to be ready...`)
    await page.goto(baseURL || 'http://localhost:3000')
    await page.waitForLoadState('networkidle')
    console.log('Development server is ready!')
  } catch (error) {
    console.error('Failed to connect to development server:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup