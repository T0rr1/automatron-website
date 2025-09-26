import { useState, useCallback } from 'react'
import { FormStep } from '@/types'

interface UseMultiStepFormProps {
  totalSteps: number
  initialStep?: number
}

export function useMultiStepForm({ totalSteps, initialStep = 1 }: UseMultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([initialStep]))

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step)
      setVisitedSteps(prev => {
        const newSet = new Set(prev)
        newSet.add(step)
        return newSet
      })
    }
  }, [totalSteps])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      const nextStepNumber = currentStep + 1
      setCurrentStep(nextStepNumber)
      setVisitedSteps(prev => {
        const newSet = new Set(prev)
        newSet.add(nextStepNumber)
        return newSet
      })
    }
  }, [currentStep, totalSteps])

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }, [currentStep])

  const markStepComplete = useCallback((step: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      newSet.add(step)
      return newSet
    })
  }, [])

  const markStepIncomplete = useCallback((step: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev)
      newSet.delete(step)
      return newSet
    })
  }, [])

  const isStepComplete = useCallback((step: number) => {
    return completedSteps.has(step)
  }, [completedSteps])

  const isStepVisited = useCallback((step: number) => {
    return visitedSteps.has(step)
  }, [visitedSteps])

  const canGoToStep = useCallback((step: number) => {
    // Can go to current step, previous steps, or next step if current is complete
    return step <= currentStep || (step === currentStep + 1 && isStepComplete(currentStep))
  }, [currentStep, isStepComplete])

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps
  const progress = (currentStep / totalSteps) * 100

  const reset = useCallback(() => {
    setCurrentStep(initialStep)
    setCompletedSteps(new Set())
    setVisitedSteps(new Set([initialStep]))
  }, [initialStep])

  return {
    currentStep,
    totalSteps,
    completedSteps,
    visitedSteps,
    goToStep,
    nextStep,
    prevStep,
    markStepComplete,
    markStepIncomplete,
    isStepComplete,
    isStepVisited,
    canGoToStep,
    isFirstStep,
    isLastStep,
    progress,
    reset
  }
}