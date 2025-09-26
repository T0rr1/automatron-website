'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { ContactForm } from './contact-form'
import { ServiceCategoryType } from '@/types'
import { serviceCategories } from '@/lib/constants/services'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ContactFormWrapperProps {
  onServicePreselected?: (service: ServiceCategoryType) => void
}

export function ContactFormWrapper({ onServicePreselected }: ContactFormWrapperProps) {
  const searchParams = useSearchParams()
  const [showNotification, setShowNotification] = useState(false)
  const [preselectedService, setPreselectedService] = useState<ServiceCategoryType | null>(null)
  
  useEffect(() => {
    const serviceParam = searchParams.get('service')
    if (serviceParam && Object.values(ServiceCategoryType).includes(serviceParam as ServiceCategoryType)) {
      const serviceType = serviceParam as ServiceCategoryType
      setPreselectedService(serviceType)
      setShowNotification(true)
      
      if (onServicePreselected) {
        onServicePreselected(serviceType)
      }
    }
  }, [searchParams, onServicePreselected])

  const selectedServiceInfo = preselectedService 
    ? serviceCategories.find(cat => cat.id === preselectedService)
    : null

  return (
    <div className="space-y-4">
      {/* Service Preselection Notification */}
      <AnimatePresence>
        {showNotification && selectedServiceInfo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative"
          >
            <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                <div className="flex-1">
                  <p className="font-medium text-green-800 dark:text-green-200">
                    {selectedServiceInfo.icon} {selectedServiceInfo.name} Selected
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Great choice! This service is pre-selected in the form below. You can modify your selection in Step 2.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotification(false)}
                  className="text-green-600 hover:text-green-700 dark:text-green-400"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form */}
      <ContactForm preselectedService={preselectedService} />
    </div>
  )
}