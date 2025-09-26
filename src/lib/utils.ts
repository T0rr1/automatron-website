import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTimeSavings(
  hoursPerWeek: number,
  hourlyRate: number,
  automationEfficiency?: number
): {
  weeklyTimeSaved: number
  weeklyCostSavings: number
  monthlyCostSavings: number
  yearlyCostSavings: number
  hoursSaved: number
  roiPerWeek: number
  roiPerYear: number
  efficiency: number
}

export function calculateTimeSavings(params: {
  tasksPerWeek: number
  minutesPerTask: number
  hourlyRate: number
  coverage?: number
  automationEfficiency?: number
  automationCost?: number
}): {
  weeklyTimeSaved: number
  weeklyCostSavings: number
  monthlyCostSavings: number
  yearlyCostSavings: number
  hoursSaved: number
  roiPerWeek: number
  roiPerYear: number
  efficiency: number
}

export function calculateTimeSavings(
  hoursPerWeekOrParams: number | {
    tasksPerWeek: number
    minutesPerTask: number
    hourlyRate: number
    coverage?: number
    automationEfficiency?: number
    automationCost?: number
  },
  hourlyRate?: number,
  automationEfficiency = 0.8
) {
  let hoursPerWeek: number
  let rate: number
  let efficiency: number

  if (typeof hoursPerWeekOrParams === 'object') {
    const { tasksPerWeek, minutesPerTask, hourlyRate: paramRate, coverage = 0.8, automationEfficiency: paramEfficiency = 0.9 } = hoursPerWeekOrParams
    hoursPerWeek = (tasksPerWeek * minutesPerTask) / 60
    rate = paramRate
    efficiency = paramEfficiency * coverage
  } else {
    hoursPerWeek = hoursPerWeekOrParams
    rate = hourlyRate!
    efficiency = automationEfficiency
  }

  const weeklyTimeSaved = hoursPerWeek * efficiency
  const weeklyCostSavings = weeklyTimeSaved * rate
  const monthlyCostSavings = weeklyCostSavings * 4.33 // Average weeks per month
  const yearlyCostSavings = weeklyCostSavings * 52

  return {
    weeklyTimeSaved,
    weeklyCostSavings,
    monthlyCostSavings,
    yearlyCostSavings,
    hoursSaved: weeklyTimeSaved,
    roiPerWeek: weeklyCostSavings,
    roiPerYear: yearlyCostSavings,
    efficiency: efficiency * 100,
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`
  }
  return `${hours.toFixed(1)} hours`
}