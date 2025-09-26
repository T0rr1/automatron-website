'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Chatbot } from './chatbot'
import { TimeSavingsCalculatorModal } from './time-savings-calculator-modal'
import { CalendarBookingModal } from './calendar-booking-modal'
import { useToast } from '@/hooks/use-toast'

interface ChatbotProviderProps {
  children: React.ReactNode
}

export function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleBookAssessment = () => {
    setIsCalendarOpen(true)
  }

  const handleOpenContactForm = () => {
    router.push('/contact')
  }

  const handleCalculateSavings = () => {
    setIsCalculatorOpen(true)
  }

  const handleAssessmentBooked = () => {
    toast({
      title: "Assessment Booked!",
      description: "You'll receive a calendar invite and Zoom link via email within 5 minutes.",
    })
    setIsCalendarOpen(false)
  }

  const handleStartProject = () => {
    setIsCalculatorOpen(false)
    router.push('/contact')
  }

  return (
    <>
      {children}
      
      {/* Chatbot */}
      <Chatbot
        onBookAssessment={handleBookAssessment}
        onOpenContactForm={handleOpenContactForm}
        onCalculateSavings={handleCalculateSavings}
      />

      {/* Time Savings Calculator Modal */}
      <TimeSavingsCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        onBookAssessment={handleBookAssessment}
        onStartProject={handleStartProject}
      />

      {/* Calendar Booking Modal */}
      <CalendarBookingModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSuccess={handleAssessmentBooked}
      />
    </>
  )
}