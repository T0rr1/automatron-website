'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ContactFormData } from '@/lib/validations/contact'
import { SERVICE_CATEGORY_LABELS, COMMON_PAIN_POINTS } from '@/lib/constants/contact'
import { ServiceCategoryType } from '@/types'
import { CheckCircle2, Circle } from 'lucide-react'

export function Step2ProjectDetails() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<ContactFormData>()

  const selectedCategories = watch('serviceCategories') || []
  const selectedPainPoints = watch('painPoints') || []

  const toggleServiceCategory = (category: ServiceCategoryType) => {
    const current = selectedCategories
    const updated = current.includes(category)
      ? current.filter(c => c !== category)
      : [...current, category]
    setValue('serviceCategories', updated, { shouldValidate: true })
  }

  const togglePainPoint = (painPoint: string) => {
    const current = selectedPainPoints
    const updated = current.includes(painPoint)
      ? current.filter(p => p !== painPoint)
      : [...current, painPoint]
    setValue('painPoints', updated, { shouldValidate: true })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
        <CardDescription>
          Help us understand your automation needs and current challenges.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Categories */}
        <div className="space-y-3">
          <Label>
            Which services are you interested in? <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(SERVICE_CATEGORY_LABELS).map(([key, label]) => {
              const category = key as ServiceCategoryType
              const isSelected = selectedCategories.includes(category)
              
              return (
                <div
                  key={category}
                  onClick={() => toggleServiceCategory(category)}
                  className={`
                    flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  {isSelected ? (
                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                  <span className="text-sm font-medium">{label}</span>
                </div>
              )
            })}
          </div>
          {errors.serviceCategories && (
            <p className="text-sm text-red-500" role="alert">
              {errors.serviceCategories.message}
            </p>
          )}
        </div>

        {/* Current Process */}
        <div className="space-y-2">
          <Label htmlFor="currentProcess">
            Describe your current manual process <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="currentProcess"
            placeholder="Example: Every week I manually download 20+ CSV files from different systems, rename them with dates, merge specific columns, and create a summary report in Excel. This takes me about 3 hours each time..."
            rows={4}
            {...register('currentProcess')}
            aria-invalid={errors.currentProcess ? 'true' : 'false'}
            className={errors.currentProcess ? 'border-red-500' : ''}
          />
          {errors.currentProcess && (
            <p className="text-sm text-red-500" role="alert">
              {errors.currentProcess.message}
            </p>
          )}
        </div>

        {/* Desired Outcome */}
        <div className="space-y-2">
          <Label htmlFor="desiredOutcome">
            What would you like to achieve? <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="desiredOutcome"
            placeholder="Example: I want to click one button and have all files automatically downloaded, renamed, merged, and formatted into a professional report that I can send to my team. Ideally this would save me 2-3 hours per week..."
            rows={4}
            {...register('desiredOutcome')}
            aria-invalid={errors.desiredOutcome ? 'true' : 'false'}
            className={errors.desiredOutcome ? 'border-red-500' : ''}
          />
          {errors.desiredOutcome && (
            <p className="text-sm text-red-500" role="alert">
              {errors.desiredOutcome.message}
            </p>
          )}
        </div>

        {/* Pain Points */}
        <div className="space-y-3">
          <Label>
            What are your biggest pain points? <span className="text-red-500">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {COMMON_PAIN_POINTS.map((painPoint) => {
              const isSelected = selectedPainPoints.includes(painPoint)
              
              return (
                <Badge
                  key={painPoint}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => togglePainPoint(painPoint)}
                >
                  {painPoint}
                </Badge>
              )
            })}
          </div>
          {errors.painPoints && (
            <p className="text-sm text-red-500" role="alert">
              {errors.painPoints.message}
            </p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Tip:</strong> The more specific you are about your current process and desired outcome, the better we can tailor a solution that saves you maximum time.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}