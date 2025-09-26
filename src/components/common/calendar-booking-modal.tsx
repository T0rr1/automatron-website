'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CalendarBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

interface BookingForm {
  name: string
  email: string
  phone?: string
  company?: string
  timePreference: string
  currentChallenges: string
  preferredDate: string
}

// Mock time slots - in a real implementation, this would come from a calendar API
const TIME_SLOTS = [
  { id: '9am', label: '9:00 AM', available: true },
  { id: '10am', label: '10:00 AM', available: true },
  { id: '11am', label: '11:00 AM', available: false },
  { id: '1pm', label: '1:00 PM', available: true },
  { id: '2pm', label: '2:00 PM', available: true },
  { id: '3pm', label: '3:00 PM', available: true },
  { id: '4pm', label: '4:00 PM', available: false },
]

const ASSESSMENT_BENEFITS = [
  'Identify your biggest time-wasting tasks',
  'Get personalized automation recommendations',
  'Calculate exact time and cost savings',
  'Receive a custom quote and timeline',
  'No obligation or pressure to buy'
]

export function CalendarBookingModal({
  isOpen,
  onClose,
  onSuccess
}: CalendarBookingModalProps) {
  const [step, setStep] = useState<'info' | 'calendar' | 'confirmation'>('info')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState<BookingForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    timePreference: '',
    currentChallenges: '',
    preferredDate: ''
  })

  const handleInputChange = (field: keyof BookingForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmitInfo = () => {
    if (form.name && form.email) {
      setStep('calendar')
    }
  }

  const handleBooking = async () => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setStep('confirmation')
    
    if (onSuccess) {
      onSuccess()
    }
  }

  const handleClose = () => {
    setStep('info')
    setForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      timePreference: '',
      currentChallenges: '',
      preferredDate: ''
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Book Your Free Automation Assessment
          </DialogTitle>
        </DialogHeader>

        {step === 'info' && (
          <div className="space-y-6">
            {/* Benefits */}
            <Card className="p-4 bg-primary/5">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                What You'll Get (30 minutes, completely free)
              </h3>
              <ul className="space-y-2">
                {ASSESSMENT_BENEFITS.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="font-medium">Your Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Your Company"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="challenges">Current Time-Consuming Tasks</Label>
                <Textarea
                  id="challenges"
                  value={form.currentChallenges}
                  onChange={(e) => handleInputChange('currentChallenges', e.target.value)}
                  placeholder="Describe your biggest time-wasting tasks (file management, reporting, email organization, etc.)"
                  rows={3}
                />
              </div>
            </div>

            <Button 
              onClick={handleSubmitInfo} 
              className="w-full"
              disabled={!form.name || !form.email}
            >
              Continue to Calendar
            </Button>
          </div>
        )}

        {step === 'calendar' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-medium mb-2">Choose Your Preferred Time</h3>
              <p className="text-sm text-muted-foreground">
                All times are in your local timezone
              </p>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={form.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <Label>Available Time Slots</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={form.timePreference === slot.id ? 'default' : 'outline'}
                    className="h-12"
                    disabled={!slot.available}
                    onClick={() => handleInputChange('timePreference', slot.id)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {slot.label}
                    {!slot.available && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Booked
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Meeting Details */}
            <Card className="p-4 bg-muted/50">
              <h4 className="font-medium mb-2">Meeting Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>30 minutes via Zoom or phone</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>One-on-one with an automation specialist</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No sales pressure, just helpful advice</span>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep('info')} className="flex-1">
                Back
              </Button>
              <Button 
                onClick={handleBooking} 
                className="flex-1"
                disabled={!form.preferredDate || !form.timePreference || isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Book Assessment'}
              </Button>
            </div>
          </div>
        )}

        {step === 'confirmation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Assessment Booked!</h3>
              <p className="text-muted-foreground">
                Your free automation assessment has been scheduled.
              </p>
            </div>

            <Card className="p-4 text-left">
              <h4 className="font-medium mb-3">Meeting Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date(form.preferredDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span>{TIME_SLOTS.find(slot => slot.id === form.timePreference)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span>30 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span>Zoom call</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                You'll receive a calendar invite and Zoom link via email within 5 minutes.
              </p>
              
              <div className="flex gap-3">
                <Button onClick={handleClose} className="flex-1">
                  Close
                </Button>
                <Button variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Add to Calendar
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}