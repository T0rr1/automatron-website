'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ServiceCategoryType } from '@/types'
import { serviceCategories, serviceScenarios } from '@/lib/constants/services'

interface ServiceRecommendationCardProps {
  serviceType: ServiceCategoryType
  onViewService: (serviceSlug: string) => void
  onSelectService: (serviceType: ServiceCategoryType) => void
  className?: string
}

export function ServiceRecommendationCard({
  serviceType,
  onViewService,
  onSelectService,
  className
}: ServiceRecommendationCardProps) {
  const service = serviceCategories.find(cat => cat.id === serviceType)
  const scenario = serviceScenarios[serviceType]

  if (!service || !scenario) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="p-3 hover:shadow-md transition-shadow border-l-4 border-l-primary/20">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="text-lg">{service.icon}</div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{service.name}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="text-xs">
                  {scenario.timeSaved}
                </Badge>
                <span>•</span>
                <span>$249-$499</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xs text-muted-foreground line-clamp-2">
            {service.description}
          </p>
          
          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs"
              onClick={() => onViewService(service.slug)}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Learn More
            </Button>
            <Button
              size="sm"
              className="h-7 text-xs"
              onClick={() => onSelectService(serviceType)}
            >
              <ArrowRight className="w-3 h-3 mr-1" />
              Get Started
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}