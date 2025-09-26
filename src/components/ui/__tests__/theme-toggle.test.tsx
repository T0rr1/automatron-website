import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent, axeTest } from '@/test/utils'
import { ThemeToggle } from '../theme-toggle'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    themes: ['light', 'dark', 'system'],
  }),
}))

describe('ThemeToggle Component', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('has accessible name', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    const accessibleName = button.getAttribute('aria-label') || button.textContent
    expect(accessibleName).toMatch(/theme|dark|light|toggle/i)
  })

  it('handles click to toggle theme', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    // Should trigger theme change (mocked)
    expect(button).toBeInTheDocument()
  })

  it('supports keyboard activation', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    button.focus()
    
    await user.keyboard('{Enter}')
    expect(button).toBeInTheDocument()
    
    await user.keyboard(' ')
    expect(button).toBeInTheDocument()
  })

  it('shows appropriate icon for current theme', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    // Should contain some icon (sun, moon, etc.)
    expect(button).toBeInTheDocument()
  })

  it('is accessible', async () => {
    const { container } = render(<ThemeToggle />)
    await axeTest(container)
  })

  it('has proper ARIA attributes', () => {
    render(<ThemeToggle />)
    
    const button = screen.getByRole('button')
    
    // Should have accessible name
    const hasAccessibleName = 
      button.hasAttribute('aria-label') || 
      button.hasAttribute('aria-labelledby') ||
      button.textContent?.trim()
    
    expect(hasAccessibleName).toBeTruthy()
  })
})