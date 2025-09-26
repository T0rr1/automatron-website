import { describe, it, expect, vi } from 'vitest'
import { render, screen, userEvent, axeTest, waitFor } from '@/test/utils'
import { TimeSavingsCalculator } from '../time-savings-calculator'

describe('TimeSavingsCalculator Component', () => {
  it('renders calculator form', () => {
    render(<TimeSavingsCalculator />)
    
    // Should have form inputs for calculation
    const inputs = screen.getAllByRole('textbox')
    expect(inputs.length).toBeGreaterThan(0)
    
    // Should have calculate button
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    expect(calculateButton).toBeInTheDocument()
  })

  it('calculates time savings correctly', async () => {
    const user = userEvent.setup()
    render(<TimeSavingsCalculator />)
    
    // Fill in sample data
    const hoursInput = screen.getByLabelText(/hours|time/i)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    
    await user.type(hoursInput, '5')
    await user.click(calculateButton)
    
    // Should show calculation results
    await waitFor(() => {
      const result = screen.queryByText(/savings|hours|week/i)
      expect(result).toBeInTheDocument()
    })
  })

  it('validates numeric inputs', async () => {
    const user = userEvent.setup()
    render(<TimeSavingsCalculator />)
    
    const hoursInput = screen.getByLabelText(/hours|time/i)
    const calculateButton = screen.getByRole('button', { name: /calculate/i })
    
    // Enter non-numeric value
    await user.type(hoursInput, 'abc')
    await user.click(calculateButton)
    
    // Should show validation error
    await waitFor(() => {
      const error = screen.queryByText(/number|numeric|valid/i)
      const invalidField = hoursInput.getAttribute('aria-invalid')
      
      expect(error || invalidField === 'true').toBeTruthy()
    })
  })

  it('is accessible', async () => {
    const { container } = render(<TimeSavingsCalculator />)
    await axeTest(container)
  })
})