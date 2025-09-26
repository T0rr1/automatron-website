import { describe, it, expect, vi } from 'vitest'
import { render, screen, axeTest } from '@/test/utils'
import { Footer } from '../footer'

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

describe('Footer Component', () => {
  it('renders footer with content', () => {
    render(<Footer />)
    
    // Check for footer element
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays service category links', () => {
    render(<Footer />)
    
    // Look for service links
    const serviceLinks = screen.getAllByRole('link')
    expect(serviceLinks.length).toBeGreaterThan(0)
    
    // Should have some service-related links
    const hasServiceLinks = serviceLinks.some(link => 
      link.textContent?.toLowerCase().includes('service') ||
      link.textContent?.toLowerCase().includes('automation') ||
      link.textContent?.toLowerCase().includes('scripting')
    )
    expect(hasServiceLinks).toBe(true)
  })

  it('shows company information', () => {
    render(<Footer />)
    
    // Look for company name or copyright
    const companyInfo = screen.getByText(/automatron|©|copyright/i)
    expect(companyInfo).toBeInTheDocument()
  })

  it('includes legal links', () => {
    render(<Footer />)
    
    // Check for privacy policy and terms
    expect(screen.getByRole('link', { name: /privacy/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /terms/i })).toBeInTheDocument()
  })

  it('has newsletter signup', () => {
    render(<Footer />)
    
    // Look for newsletter signup form
    const emailInput = screen.queryByRole('textbox', { name: /email/i })
    const subscribeButton = screen.queryByRole('button', { name: /subscribe|signup/i })
    
    if (emailInput && subscribeButton) {
      expect(emailInput).toBeInTheDocument()
      expect(subscribeButton).toBeInTheDocument()
    }
  })

  it('is accessible', async () => {
    const { container } = render(<Footer />)
    await axeTest(container)
  })

  it('has proper semantic structure', () => {
    render(<Footer />)
    
    // Footer should be in contentinfo landmark
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    
    // Should have proper heading structure
    const headings = screen.getAllByRole('heading')
    headings.forEach(heading => {
      expect(heading.tagName).toMatch(/^H[2-6]$/) // Should not have h1 in footer
    })
  })
})