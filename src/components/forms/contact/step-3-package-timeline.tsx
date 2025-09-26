'use client'

import { useFormContext, Controller } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { ContactFormData } from '@/lib/validations/contact'
import { SERVICE_PACKAGES, PROJECT_TIMELINES } from '@/lib/constants/contact'
import { ServicePackageType, ProjectTimelineType } from '@/types'
import { CheckCircle2, Circle, Clock, DollarSign, Users, Zap } from 'lucide-react'

export function Step3PackageTimeline() {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<ContactFormData>()

  const selectedPackage = watch('servicePackage')
  const selectedTimeline = watch('timeline')

  const selectPackage = (packageType: ServicePackageType) => {
    setValue('servicePackage', packageType, { shouldValidate: true })
  }

  const selectTimeline = (timeline: ProjectTimelineType) => {
    setValue('timeline', timeline, { shouldValidate: true })
  }

  const getPackageIcon = (packageType: ServicePackageType) => {
    switch (packageType) {
      case ServicePackageType.STARTER:
        return <Zap className="h-5 w-5" />
      case ServicePackageType.BUNDLE:
        return <Users className="h-5 w-5" />
      case ServicePackageType.WEBSITE_BASIC:
        return <Globe className="h-5 w-5" />
      case ServicePackageType.CARE_PLAN:
        return <Clock className="h-5 w-5" />
      default:
        return <DollarSign className="h-5 w-5" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Package & Timeline</CardTitle>
        <CardDescription>
          Choose the service package that best fits your needs and preferred timeline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Packages */}
        <div className="space-y-3">
          <Label>
            Select a service package <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICE_PACKAGES.map((pkg) => {
              const isSelected = selectedPackage === pkg.id
              
              return (
                <div
                  key={pkg.id}
                  onClick={() => selectPackage(pkg.id)}
                  className={`
                    relative p-4 rounded-lg border cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 ring-2 ring-blue-500/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      {getPackageIcon(pkg.id)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm">{pkg.name}</h3>
                        {isSelected ? (
                          <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {pkg.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">
                          {pkg.priceRange}
                        </span>
                        <span className="text-xs text-gray-500">
                          {pkg.turnaround}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                      <div className="space-y-2">
                        <h4 className="text-xs font-medium text-blue-800 dark:text-blue-200">Features:</h4>
                        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          {errors.servicePackage && (
            <p className="text-sm text-red-500" role="alert">
              {errors.servicePackage.message}
            </p>
          )}
        </div>

        {/* Timeline Selection */}
        <div className="space-y-3">
          <Label>
            Preferred timeline <span className="text-red-500">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_TIMELINES.map((timeline) => {
              const isSelected = selectedTimeline === timeline.id
              
              return (
                <div
                  key={timeline.id}
                  onClick={() => selectTimeline(timeline.id)}
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
                  <div className="flex-1">
                    <div className="font-medium text-sm">{timeline.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {timeline.description}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {timeline.turnaround}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {errors.timeline && (
            <p className="text-sm text-red-500" role="alert">
              {errors.timeline.message}
            </p>
          )}
        </div>

        {/* Budget (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="budget">Budget considerations (Optional)</Label>
          <Input
            id="budget"
            placeholder="Any specific budget constraints or considerations?"
            {...register('budget')}
            aria-invalid={errors.budget ? 'true' : 'false'}
            className={errors.budget ? 'border-red-500' : ''}
          />
          {errors.budget && (
            <p className="text-sm text-red-500" role="alert">
              {errors.budget.message}
            </p>
          )}
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> Final pricing will be provided after we review your specific requirements. The ranges shown are typical starting points.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Add missing Globe import
import { Globe } from 'lucide-react'