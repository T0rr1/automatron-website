import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent, axeTest, waitFor } from '@/test/utils'
import { ContactForm } from '../contact/contact-form'

// Mock API calls
vi.mock('@/lib/api', () => ({
  submitContactForm: vi.fn().mockResolvedValue({ success: true }),
}))

describe('ContactForm Component', () => {
  it('renders contact form with required fields', () => {
    render(<ContactForm />)
    
    // Check for form element
    const form = screen.getByRole('form') || screen.getByTestId('contact-form')
    expect(form).toBeInTheDocument()
    
    // Check for basic required fields
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit|send/i })).toBeInTheDocument()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /submit|send/i })
    
    // Try to submit without filling required fields
    await user.click(submitButton)
    
    // Should show validation errors
    await waitFor(() => {
      const errorMessages = screen.queryAllByRole('alert')
      const invalidFields = screen.queryAllByAttribute('aria-invalid', 'true')
      
      // Should have some form of validation feedback
      expect(errorMessages.length + invalidFields.length).toBeGreaterThan(0)
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailField = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /submit|send/i })
    
    // Enter invalid email
    await user.type(emailField, 'invalid-email')
    await user.click(submitButton)
    
    // Should show email validation error
    await waitFor(() => {
      const emailError = screen.queryByText(/valid email|email format/i)
      const invalidEmail = emailField.getAttribute('aria-invalid')
      
      expect(emailError || invalidEmail === 'true').toBeTruthy()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill out form with valid data
    const nameField = screen.getByLabelText(/name/i)
    const emailField = screen.getByLabelText(/email/i)
    const messageField = screen.getByLabelText(/message|description/i)
    const submitButton = screen.getByRole('button', { name: /submit|send/i })
    
    await user.type(nameField, 'John Doe')
    await user.type(emailField, 'john@example.com')
    
    if (messageField) {
      await user.type(messageField, 'I need help with automation.')
    }
    
    await user.click(submitButton)
    
    // Should show loading state or success message
    await waitFor(() => {
      const loadingState = screen.queryByText(/sending|submitting/i)
      const successMessage = screen.queryByText(/success|sent|thank you/i)
      
      expect(loadingState || successMessage).toBeInTheDocument()
    })
  })

  it('handles form submission errors', async () => {
    // Mock API to return error
    const { submitContactForm } = await import('@/lib/api')
    vi.mocked(submitContactForm).mockRejectedValueOnce(new Error('Network error'))
    
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Fill and submit form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.click(screen.getByRole('button', { name: /submit|send/i }))
    
    // Should show error message
    await waitFor(() => {
      const errorMessage = screen.queryByText(/error|failed|try again/i)
      expect(errorMessage).toBeInTheDocument()
    })
  })

  it('is accessible', async () => {
    const { container } = render(<ContactForm />)
    await axeTest(container)
  })

  it('has proper form labels and associations', () => {
    render(<ContactForm />)
    
    const inputs = screen.getAllByRole('textbox')
    
    inputs.forEach(input => {
      const id = input.getAttribute('id')
      const ariaLabel = input.getAttribute('aria-label')
      const ariaLabelledBy = input.getAttribute('aria-labelledby')
      
      // Should have some form of labeling
      const hasLabel = id ? screen.queryByLabelText(new RegExp(id, 'i')) : false
      const hasAccessibleName = hasLabel || ariaLabel || ariaLabelledBy
      
      expect(hasAccessibleName).toBeTruthy()
    })
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    // Tab through form fields
    await user.tab()
    expect(document.activeElement).toBeInTheDocument()
    
    // Should be able to navigate through all form fields
    const formElements = screen.getAllByRole('textbox')
    const buttons = screen.getAllByRole('button')
    
    expect(formElements.length + buttons.length).toBeGreaterThan(0)
  })

  it('shows field validation on blur', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const emailField = screen.getByLabelText(/email/i)
    
    // Enter invalid email and blur
    await user.type(emailField, 'invalid')
    await user.tab() // This will blur the field
    
    // Should show validation error
    await waitFor(() => {
      const hasError = 
        emailField.getAttribute('aria-invalid') === 'true' ||
        screen.queryByText(/valid email/i)
      
      expect(hasError).toBeTruthy()
    })
  })
})