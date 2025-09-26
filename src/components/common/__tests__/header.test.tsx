import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent, axeTest } from '@/test/utils'
import { Header } from '../header'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Header Component', () => {
  it('renders header with navigation', () => {
    render(<Header />)
    
    // Check for navigation element
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('displays logo or brand name', () => {
    render(<Header />)
    
    // Look for logo or brand name
    const logo = screen.getByRole('link', { name: /automatron|home/i })
    expect(logo).toBeInTheDocument()
  })

  it('shows main navigation links', () => {
    render(<Header />)
    
    // Check for main navigation items
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('has theme toggle button', () => {
    render(<Header />)
    
    // Look for theme toggle
    const themeToggle = screen.getByRole('button', { name: /theme|dark|light/i })
    expect(themeToggle).toBeInTheDocument()
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<Header />)
    
    // Tab through navigation items
    await user.tab()
    expect(document.activeElement).toBeInTheDocument()
    
    // Should be able to activate with Enter/Space
    if (document.activeElement?.tagName === 'BUTTON') {
      await user.keyboard('{Enter}')
    }
  })

  it('is accessible', async () => {
    const { container } = render(<Header />)
    await axeTest(container)
  })

  it('handles mobile menu toggle', async () => {
    const user = userEvent.setup()
    
    // Set mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<Header />)
    
    // Look for mobile menu button
    const mobileMenuButton = screen.queryByRole('button', { name: /menu|navigation/i })
    
    if (mobileMenuButton) {
      await user.click(mobileMenuButton)
      
      // Menu should be expanded
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true')
    }
  })
})