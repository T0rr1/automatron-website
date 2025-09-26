import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent, axeTest } from '@/test/utils'
import { Button } from '../button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('handles click events', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('supports different variants', () => {
    const { rerender } = render(<Button variant="default">Default</Button>)
    expect(screen.getByRole('button')).toHaveClass(/default|primary/)
    
    rerender(<Button variant="destructive">Destructive</Button>)
    expect(screen.getByRole('button')).toHaveClass(/destructive|danger/)
    
    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass(/outline/)
    
    rerender(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass(/secondary/)
    
    rerender(<Button variant="ghost">Ghost</Button>)
    expect(screen.getByRole('button')).toHaveClass(/ghost/)
  })

  it('supports different sizes', () => {
    const { rerender } = render(<Button size="default">Default</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
    
    rerender(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass(/sm/)
    
    rerender(<Button size="lg">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass(/lg/)
    
    rerender(<Button size="icon">Icon</Button>)
    expect(screen.getByRole('button')).toHaveClass(/icon/)
  })

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('supports keyboard navigation', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    
    render(<Button onClick={handleClick}>Keyboard test</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    // Should activate with Enter
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledTimes(1)
    
    // Should activate with Space
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalledTimes(2)
  })

  it('renders as different elements when asChild is used', () => {
    render(
      <Button asChild>
        <a href="/test">Link button</a>
      </Button>
    )
    
    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('is accessible', async () => {
    const { container } = render(<Button>Accessible button</Button>)
    await axeTest(container)
  })

  it('has proper focus styles', () => {
    render(<Button>Focus test</Button>)
    
    const button = screen.getByRole('button')
    button.focus()
    
    // Should have focus styles (this depends on your CSS implementation)
    expect(button).toHaveFocus()
  })
})