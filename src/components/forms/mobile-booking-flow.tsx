'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react'

// Safe locale detection function
function getLocaleFromPath(): string {
  if (typeof window !== 'undefined') {
    const path = window.location.pathname
    if (path.startsWith('/es')) return 'es'
  }
  return 'en'
}

interface BookingFlowProps {
  className?: string
}

export function MobileBookingFlow({ className }: BookingFlowProps) {
  const [step, setStep] = useState<'calendar' | 'details' | 'confirmation'>('calendar')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    automation: ''
  })
  const locale = getLocaleFromPath()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'calendar') {
      setStep('details')
    } else if (step === 'details') {
      setStep('confirmation')
    }
  }

  const content = {
    en: {
      calendarTitle: 'Pick Your Time',
      calendarSubtitle: 'Choose a 15-minute slot that works for you',
      detailsTitle: 'Quick Details',
      detailsSubtitle: 'Just 3 fields to get started',
      confirmationTitle: 'You\'re All Set!',
      confirmationSubtitle: 'Check your email for details',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'your@email.com',
      automationPlaceholder: 'What do you want to automate?',
      bookButton: 'Book This Slot',
      submitButton: 'Submit & Book',
      rescheduleLink: 'Need to reschedule?',
      prepChecklist: [
        'No prep needed - we\'ll guide you',
        'Bring any messy files or processes',
        'We\'ll identify your biggest quick win'
      ]
    },
    es: {
      calendarTitle: 'Elige Tu Horario',
      calendarSubtitle: 'Escoge 15 minutos que te funcionen',
      detailsTitle: 'Detalles Rápidos',
      detailsSubtitle: 'Solo 3 campos para empezar',
      confirmationTitle: '¡Todo Listo!',
      confirmationSubtitle: 'Revisa tu email para detalles',
      namePlaceholder: 'Tu nombre',
      emailPlaceholder: 'tu@email.com',
      automationPlaceholder: '¿Qué quieres automatizar?',
      bookButton: 'Reservar Este Horario',
      submitButton: 'Enviar y Reservar',
      rescheduleLink: '¿Necesitas reprogramar?',
      prepChecklist: [
        'Sin preparación - te guiaremos',
        'Trae archivos o procesos desordenados',
        'Identificaremos tu mayor ganancia rápida'
      ]
    }
  }

  const t = content[locale as keyof typeof content]

  if (step === 'calendar') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t.calendarTitle}</h2>
          <p className="text-muted-foreground">{t.calendarSubtitle}</p>
        </div>

        {/* Mock calendar slots */}
        <div className="space-y-3">
          {['Today 2:00 PM', 'Today 3:30 PM', 'Tomorrow 10:00 AM', 'Tomorrow 2:00 PM'].map((slot, index) => (
            <button
              key={index}
              onClick={() => setStep('details')}
              className="w-full p-4 text-left border border-gray-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span className="font-medium">{slot}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t.detailsTitle}</h2>
          <p className="text-muted-foreground">{t.detailsSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder={t.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-[56px]"
            autoFocus
            required
          />
          
          <Input
            type="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="h-[56px]"
            inputMode="email"
            required
          />
          
          <Textarea
            placeholder={t.automationPlaceholder}
            value={formData.automation}
            onChange={(e) => setFormData({ ...formData, automation: e.target.value })}
            className="min-h-[100px] resize-none"
            required
          />

          <Button 
            type="submit" 
            className="w-full h-[56px] text-lg font-bold text-white"
            style={{ backgroundColor: '#059669' }}
          >
            {t.submitButton}
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className={`space-y-6 text-center ${className}`}>
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">{t.confirmationTitle}</h2>
        <p className="text-muted-foreground">{t.confirmationSubtitle}</p>
      </div>

      <div className="bg-emerald-50 p-6 rounded-lg text-left">
        <h3 className="font-semibold mb-3">Prep Checklist:</h3>
        <ul className="space-y-2">
          {t.prepChecklist.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button className="text-emerald-600 hover:text-emerald-700 underline">
        {t.rescheduleLink}
      </button>
    </div>
  )
}