'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

interface TimeSavingsCalculatorProps {
  className?: string
}

export function TimeSavingsCalculator({ className }: TimeSavingsCalculatorProps = {}) {
  const [hours, setHours] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState('')

  const calculateSavings = (e: React.FormEvent) => {
    e.preventDefault()
    
    const hoursNum = parseFloat(hours)
    
    if (isNaN(hoursNum) || hoursNum <= 0) {
      setError('Please enter a valid number of hours')
      setResult(null)
      return
    }
    
    setError('')
    // Calculate weekly savings (assuming 50% time savings through automation)
    const weeklySavings = hoursNum * 0.5
    setResult(weeklySavings)
  }

  return (
    <div className={`p-6 border rounded-lg ${className || ''}`}>
      <h3 className="text-lg font-semibold mb-4">Time Savings Calculator</h3>
      
      <form onSubmit={calculateSavings} className="space-y-4">
        <div>
          <label htmlFor="hours" className="block text-sm font-medium mb-2">
            Hours spent on repetitive tasks per week
          </label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter hours"
            min="0"
            step="0.5"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'hours-error' : undefined}
          />
          {error && (
            <p id="hours-error" role="alert" className="text-red-600 text-sm mt-1">
              {error}
            </p>
          )}
        </div>
        
        <Button type="submit">Calculate Savings</Button>
      </form>
      
      {result !== null && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h4 className="font-semibold text-green-800">Potential Weekly Savings</h4>
          <p className="text-green-700">
            You could save approximately <strong>{result} hours per week</strong> with automation!
          </p>
        </div>
      )}
    </div>
  )
}