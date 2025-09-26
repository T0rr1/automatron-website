'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Quote, Star, Building, User } from 'lucide-react'

interface TestimonialDisplayProps {
  testimonial: string
  client: string
  industry: string
}

export function TestimonialDisplay({ testimonial, client, industry }: TestimonialDisplayProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
      <CardContent className="pt-8 pb-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
            <Quote className="h-6 w-6 text-primary" />
          </div>

          {/* Star Rating */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-lg md:text-xl leading-relaxed text-foreground mb-6 italic">
            "{testimonial}"
          </blockquote>

          {/* Client Attribution */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium">{client}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <Badge variant="secondary">{industry}</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}