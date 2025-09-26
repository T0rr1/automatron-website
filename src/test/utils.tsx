import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'

// Mock messages for testing
const messages = {
  common: {
    loading: 'Loading...',
    error: 'An error occurred',
    submit: 'Submit',
    cancel: 'Cancel',
  },
  navigation: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
  },
  hero: {
    title: 'Save 2-5 hours per week with automation',
    subtitle: 'Professional automation solutions for busy professionals',
    cta: 'Get Started',
  },
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string
  theme?: 'light' | 'dark' | 'system'
}

function AllTheProviders({ 
  children, 
  locale = 'en',
  theme = 'light' 
}: { 
  children: React.ReactNode
  locale?: string
  theme?: string
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { locale, theme, ...renderOptions } = options
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders locale={locale} theme={theme}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  })
}

// Accessibility testing helper
export const axeTest = async (container: Element) => {
  const { axe, toHaveNoViolations } = await import('jest-axe')
  expect.extend(toHaveNoViolations)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
}

// Form testing helpers
export const fillForm = async (
  getByLabelText: any,
  userEvent: any,
  formData: Record<string, string>
) => {
  for (const [label, value] of Object.entries(formData)) {
    const field = getByLabelText(new RegExp(label, 'i'))
    await userEvent.clear(field)
    await userEvent.type(field, value)
  }
}

// Wait for async operations
export const waitForLoadingToFinish = () =>
  new Promise((resolve) => setTimeout(resolve, 0))

// Mock intersection observer entry
export const createMockIntersectionObserverEntry = (
  isIntersecting: boolean = true
) => ({
  isIntersecting,
  intersectionRatio: isIntersecting ? 1 : 0,
  target: document.createElement('div'),
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRect: {} as DOMRectReadOnly,
  rootBounds: {} as DOMRectReadOnly,
  time: Date.now(),
})

// Re-export everything
export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
export { customRender as render }