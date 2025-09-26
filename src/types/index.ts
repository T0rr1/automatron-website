// Base content interface
export interface Slugged {
  slug: string
  createdAt: string
  updatedAt?: string
  heroImage?: string
  seo?: {
    title?: string
    description?: string
    ogImage?: string
  }
}

// Service category types
export enum ServiceCategoryType {
  BASIC_SCRIPTING = 'basic-scripting',
  EMAIL_FILE_HYGIENE = 'email-file-hygiene',
  REPORTING_LITE = 'reporting-lite',
  WEBSITES_LANDING = 'websites-landing',
  PC_HELPERS = 'pc-helpers',
  REUSABLE_TEMPLATES = 'reusable-templates'
}

// Service interfaces
export interface ServiceCategory extends Slugged {
  id: string
  name: string
  description: string
  icon: string
  services: Service[]
  useCases: string[]
  targetAudience: string[]
  order?: number
}

export interface Service extends Slugged {
  id: string
  name: string
  description: string
  whatItDoes: string
  idealUseCases: string[]
  inputs: string[]
  deliverables: string[]
  turnaround: string
  startingPrice: string
  examples: ServiceExample[]
  faq?: FaqItem[]
  ctaLabel?: string
  category: ServiceCategoryType
}

export interface ServiceExample {
  title: string
  beforeScenario: string
  afterScenario: string
  timeSaved: string
  deliverables: string[]
  sampleCodePath?: string
}

export interface FaqItem {
  q: string
  a: string
}

// Case study interfaces
export interface CaseStudy extends Slugged {
  id: string
  title: string
  client: string
  industry: string
  serviceCategory: string
  challenge: string
  solution: string
  results: {
    timeSavedPerWeek: number
    successRate: number
    turnaroundTime: string
    clientSatisfaction: number
    businessImpact: string
  }
  deliverables: string[]
  testimonial?: string
  metrics: Metric[]
  beforeAfter: {
    before: string
    after: string
  }
}

export interface Metric {
  label: string
  value: string | number
  unit?: string
  improvement?: string
}

// Time Savings Calculator interfaces
export interface TimeSavingsInput {
  tasksPerWeek: number
  minutesPerTask: number
  hourlyRate: number
  coverage?: number // percentage of tasks that can be automated (0-1)
  automationEfficiency?: number // how much faster automation is (0-1)
}

export interface TimeSavingsResult {
  manualHours: number
  automatedHours: number
  hoursSaved: number
  roiPerWeek: number
  roiPerMonth: number
  roiPerYear: number
  paybackPeriod: number // in weeks
  efficiency: number // percentage improvement
}

export interface CalculatorPreset {
  id: string
  name: string
  description: string
  icon: string
  defaultValues: TimeSavingsInput
  serviceCategory?: ServiceCategoryType
}

// Contact and Project Initiation types
export enum ServicePackageType {
  STARTER = 'starter',
  BUNDLE = 'bundle',
  WEBSITE_BASIC = 'website-basic',
  CARE_PLAN = 'care-plan'
}

export interface ServicePackage {
  id: ServicePackageType
  name: string
  description: string
  priceRange: string
  features: string[]
  turnaround: string
  bestFor: string[]
}

export enum ProjectTimelineType {
  ASAP = 'asap',
  ONE_WEEK = '1-week',
  TWO_WEEKS = '2-weeks',
  FLEXIBLE = 'flexible'
}

export interface ProjectTimeline {
  id: ProjectTimelineType
  name: string
  description: string
  turnaround: string
}

export interface ContactFormData {
  // Step 1: Basic Information
  name: string
  email: string
  company?: string
  phone?: string
  
  // Step 2: Project Details
  serviceCategories: ServiceCategoryType[]
  currentProcess: string
  desiredOutcome: string
  painPoints: string[]
  
  // Step 3: Service Package & Timeline
  servicePackage: ServicePackageType
  timeline: ProjectTimelineType
  budget?: string
  
  // Step 4: File Uploads (optional)
  files?: File[]
  additionalNotes?: string
}

export interface FormStep {
  id: number
  title: string
  description: string
  isComplete: boolean
  isValid: boolean
}

export interface FormSubmissionResult {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

// Chatbot interfaces
export interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  metadata?: {
    serviceRecommendations?: ServiceCategoryType[]
    timeSavingsEstimate?: TimeSavingsResult
    quickActions?: ChatQuickAction[]
  }
}

export interface ChatQuickAction {
  id: string
  label: string
  action: 'service_info' | 'calculate_savings' | 'book_assessment' | 'contact_form' | 'select_service' | 'view_service'
  data?: any
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  userContext: {
    name?: string
    email?: string
    businessType?: string
    currentPainPoints?: string[]
    interestedServices?: ServiceCategoryType[]
    estimatedTasksPerWeek?: number
    estimatedMinutesPerTask?: number
    hourlyRate?: number
  }
  startedAt: Date
  lastActivity: Date
}

export interface ChatbotResponse {
  content: string
  quickActions?: ChatQuickAction[]
  serviceRecommendations?: ServiceCategoryType[]
  timeSavingsEstimate?: TimeSavingsResult
  shouldCollectInfo?: {
    field: keyof ChatSession['userContext']
    prompt: string
  }
}