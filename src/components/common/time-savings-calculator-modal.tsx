'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, DollarSign, TrendingUp, X, Calendar } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TimeSavingsInput, TimeSavingsResult } from '@/types'
import { SERVICE_PACKAGES } from '@/lib/constants/contact'

interface TimeSavingsCalculatorModalProps {
  isOpen: boolean
  onClose: () => void
  onBookAssessment?: () => void
  onStartProject?: () => void
}

export function TimeSavingsCalculatorModal({
  isOpen,
  onClose,
  onBookAssessment,
  onStartProject
}: TimeSavingsCalculatorModalProps) {
  const [input, setInput] = useState<TimeSavingsInput>({
    tasksPerWeek: 10,
    minutesPerTask: 30,
    hourlyRate: 50,
    coverage: 0.7,
    automationEfficiency: 0.8
  })
  
  const [result, setResult] = useState<TimeSavingsResult | null>(null)

  const calculateSavings = () => {
    const coverage = input.coverage || 0.7
    const efficiency = input.automationEfficiency || 0.8
    
    const manualHours = (input.tasksPerWeek * input.minutesPerTask) / 60
    const automatedHours = manualHours * coverage * (1 - efficiency)
    const hoursSaved = manualHours * coverage - automatedHours
    const roiPerWeek = hoursSaved * input.hourlyRate
    const roiPerMonth = roiPerWeek * 4.33
    const roiPerYear = roiPerMonth * 12
    
    // Calculate payback period based on starter package average cost
    const averageCost = 374 // Average of $249-$499
    const paybackPeriod = averageCost / roiPerWeek
    const efficiency_percentage = (hoursSaved / manualHours) * 100

    const calculatedResult: TimeSavingsResult = {
      manualHours,
      automatedHours,
      hoursSaved,
      roiPerWeek,
      roiPerMonth,
      roiPerYear,
      paybackPeriod,
      efficiency: efficiency_percentage
    }
    
    setResult(calculatedResult)
  }

  const handleInputChange = (field: keyof TimeSavingsInput, value: number) => {
    setInput(prev => ({ ...prev, [field]: value }))
    // Auto-calculate when inputs change
    if (result) {
      setTimeout(calculateSavings, 100)
    }
  }

  React.useEffect(() => {
    if (isOpen && !result) {
      calculateSavings()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Time Savings Calculator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tasksPerWeek">Repetitive tasks per week</Label>
              <Input
                id="tasksPerWeek"
                type="number"
                min="1"
                max="100"
                value={input.tasksPerWeek}
                onChange={(e) => handleInputChange('tasksPerWeek', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="minutesPerTask">Minutes per task</Label>
              <Input
                id="minutesPerTask"
                type="number"
                min="1"
                max="480"
                value={input.minutesPerTask}
                onChange={(e) => handleInputChange('minutesPerTask', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Your hourly rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                min="10"
                max="500"
                value={input.hourlyRate}
                onChange={(e) => handleInputChange('hourlyRate', parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="coverage">Automation coverage (%)</Label>
              <Input
                id="coverage"
                type="number"
                min="10"
                max="100"
                value={Math.round((input.coverage || 0.7) * 100)}
                onChange={(e) => handleInputChange('coverage', (parseInt(e.target.value) || 70) / 100)}
              />
              <p className="text-xs text-muted-foreground">
                Percentage of tasks that can be automated
              </p>
            </div>
          </div>

          {/* Calculate Button */}
          <Button onClick={calculateSavings} className="w-full">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate My Savings
          </Button>

          {/* Results Section */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Potential Savings
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Time Saved</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {result.hoursSaved.toFixed(1)} hrs/week
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {(result.hoursSaved * 4.33).toFixed(1)} hrs/month
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="font-medium">Weekly Value</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${result.roiPerWeek.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${result.roiPerMonth.toFixed(0)}/month
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">Annual ROI</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">
                    ${result.roiPerYear.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {result.efficiency.toFixed(0)}% efficiency gain
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-orange-500" />
                    <span className="font-medium">Payback Period</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.ceil(result.paybackPeriod)} weeks
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based on Starter package
                  </div>
                </Card>
              </div>

              {/* Service Package Recommendations */}
              <div className="space-y-3">
                <h4 className="font-medium">Recommended Service Package</h4>
                <div className="grid gap-3">
                  {SERVICE_PACKAGES.slice(0, 2).map((pkg) => {
                    const avgCost = pkg.id === 'starter' ? 374 : 950
                    const weeksToROI = Math.ceil(avgCost / result.roiPerWeek)
                    
                    return (
                      <Card key={pkg.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">{pkg.name}</h5>
                            <p className="text-sm text-muted-foreground">{pkg.description}</p>
                          </div>
                          <Badge variant={pkg.id === 'starter' ? 'default' : 'secondary'}>
                            {pkg.priceRange}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">ROI in {weeksToROI} weeks</span>
                          <span className="text-muted-foreground"> • {pkg.turnaround}</span>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex gap-3 pt-4">
                <Button onClick={onBookAssessment} className="flex-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Free Assessment
                </Button>
                <Button onClick={onStartProject} variant="outline" className="flex-1">
                  Start Project
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}