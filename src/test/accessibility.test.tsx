import { describe, it, expect } from 'vitest'
import { render, axeTest } from '@/test/utils'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

describe('Accessibility Tests', () => {
  describe('Common Components', () => {
    it('Header component is accessible', async () => {
      const { container } = render(<Header />)
      await axeTest(container)
    })

    it('Footer component is accessible', async () => {
      const { container } = render(<Footer />)
      await axeTest(container)
    })
  })

  describe('UI Components', () => {
    it('Button component is accessible', async () => {
      const { container } = render(<Button>Test Button</Button>)
      await axeTest(container)
    })

    it('Button with different variants are accessible', async () => {
      const variants = ['default', 'destructive', 'outline', 'secondary', 'ghost'] as const
      
      for (const variant of variants) {
        const { container } = render(<Button variant={variant}>Test Button</Button>)
        await axeTest(container)
      }
    })

    it('Disabled button is accessible', async () => {
      const { container } = render(<Button disabled>Disabled Button</Button>)
      await axeTest(container)
    })

    it('ThemeToggle component is accessible', async () => {
      const { container } = render(<ThemeToggle />)
      await axeTest(container)
    })
  })

  describe('Form Components', () => {
    it('Form inputs have proper labels', () => {
      const { container } = render(
        <form>
          <label htmlFor="test-input">Test Input</label>
          <input id="test-input" type="text" />
          
          <label htmlFor="test-email">Email</label>
          <input id="test-email" type="email" />
          
          <label htmlFor="test-textarea">Message</label>
          <textarea id="test-textarea" />
          
          <button type="submit">Submit</button>
        </form>
      )
      
      return axeTest(container)
    })

    it('Form with validation errors is accessible', async () => {
      const { container } = render(
        <form>
          <label htmlFor="error-input">Required Field</label>
          <input 
            id="error-input" 
            type="text" 
            aria-invalid="true"
            aria-describedby="error-message"
          />
          <div id="error-message" role="alert">
            This field is required
          </div>
          
          <button type="submit">Submit</button>
        </form>
      )
      
      await axeTest(container)
    })
  })

  describe('Navigation and Landmarks', () => {
    it('Page structure with landmarks is accessible', async () => {
      const { container } = render(
        <div>
          <header role="banner">
            <nav role="navigation">
              <a href="/">Home</a>
              <a href="/services">Services</a>
              <a href="/contact">Contact</a>
            </nav>
          </header>
          
          <main role="main">
            <h1>Page Title</h1>
            <p>Page content</p>
          </main>
          
          <footer role="contentinfo">
            <p>&copy; 2024 Automatron</p>
          </footer>
        </div>
      )
      
      await axeTest(container)
    })

    it('Skip links are accessible', async () => {
      const { container } = render(
        <div>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <nav>
            <a href="/">Home</a>
            <a href="/services">Services</a>
          </nav>
          <main id="main-content">
            <h1>Main Content</h1>
          </main>
        </div>
      )
      
      await axeTest(container)
    })
  })

  describe('Interactive Elements', () => {
    it('Modal dialogs are accessible', async () => {
      const { container } = render(
        <div>
          <button aria-haspopup="dialog" aria-expanded="false">
            Open Modal
          </button>
          
          <div 
            role="dialog" 
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            aria-modal="true"
          >
            <h2 id="modal-title">Modal Title</h2>
            <p id="modal-description">Modal description</p>
            <button>Close</button>
          </div>
        </div>
      )
      
      await axeTest(container)
    })

    it('Dropdown menus are accessible', async () => {
      const { container } = render(
        <div>
          <button 
            aria-haspopup="menu" 
            aria-expanded="false"
            aria-controls="dropdown-menu"
          >
            Menu
          </button>
          
          <ul id="dropdown-menu" role="menu">
            <li role="menuitem">
              <a href="/option1">Option 1</a>
            </li>
            <li role="menuitem">
              <a href="/option2">Option 2</a>
            </li>
          </ul>
        </div>
      )
      
      await axeTest(container)
    })
  })

  describe('Content Structure', () => {
    it('Heading hierarchy is accessible', async () => {
      const { container } = render(
        <div>
          <h1>Main Title</h1>
          <h2>Section Title</h2>
          <h3>Subsection Title</h3>
          <h2>Another Section</h2>
          <h3>Another Subsection</h3>
        </div>
      )
      
      await axeTest(container)
    })

    it('Lists are accessible', async () => {
      const { container } = render(
        <div>
          <ul>
            <li>Unordered list item 1</li>
            <li>Unordered list item 2</li>
          </ul>
          
          <ol>
            <li>Ordered list item 1</li>
            <li>Ordered list item 2</li>
          </ol>
          
          <dl>
            <dt>Term 1</dt>
            <dd>Definition 1</dd>
            <dt>Term 2</dt>
            <dd>Definition 2</dd>
          </dl>
        </div>
      )
      
      await axeTest(container)
    })

    it('Images with alt text are accessible', async () => {
      const { container } = render(
        <div>
          <img src="/test.jpg" alt="Descriptive alt text" />
          <img src="/decorative.jpg" alt="" role="presentation" />
        </div>
      )
      
      await axeTest(container)
    })
  })
})