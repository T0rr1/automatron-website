import { ServiceCategoryType, ChatbotResponse, ChatQuickAction, TimeSavingsInput } from '@/types'
import { serviceCategories, serviceScenarios } from '@/lib/constants/services'
import { SERVICE_PACKAGES } from '@/lib/constants/contact'

// Common quick actions
export const QUICK_ACTIONS = {
  CALCULATE_SAVINGS: {
    id: 'calculate_savings',
    label: 'Calculate Time Savings',
    action: 'calculate_savings' as const
  },
  BOOK_ASSESSMENT: {
    id: 'book_assessment',
    label: 'Book Free Assessment',
    action: 'book_assessment' as const
  },
  VIEW_SERVICES: {
    id: 'view_services',
    label: 'View All Services',
    action: 'service_info' as const
  },
  CONTACT_FORM: {
    id: 'contact_form',
    label: 'Start Project',
    action: 'contact_form' as const
  }
} as const

// Greeting responses
export const GREETING_RESPONSES = [
  {
    content: "Hi! I'm here to help you discover how Automatron.ai can save you 2-5 hours per week through automation. What's your biggest time-consuming task right now?",
    quickActions: [QUICK_ACTIONS.CALCULATE_SAVINGS, QUICK_ACTIONS.VIEW_SERVICES]
  },
  {
    content: "Welcome! I can help you find the perfect automation solution for your business. Are you dealing with repetitive file management, email chaos, or manual reporting?",
    quickActions: [QUICK_ACTIONS.VIEW_SERVICES, QUICK_ACTIONS.BOOK_ASSESSMENT]
  }
]

// Service recommendation logic
export function getServiceRecommendations(userInput: string, painPoints: string[] = []): ServiceCategoryType[] {
  const input = userInput.toLowerCase()
  const allPainPoints = [...painPoints, userInput].join(' ').toLowerCase()
  
  const recommendations: ServiceCategoryType[] = []
  
  // Basic Scripting keywords
  if (allPainPoints.match(/file|folder|csv|excel|backup|organize|sort|clean|archive/)) {
    recommendations.push(ServiceCategoryType.BASIC_SCRIPTING)
  }
  
  // Email & File Hygiene keywords
  if (allPainPoints.match(/email|inbox|attachment|outlook|gmail|organize|folder/)) {
    recommendations.push(ServiceCategoryType.EMAIL_FILE_HYGIENE)
  }
  
  // Reporting keywords
  if (allPainPoints.match(/report|chart|dashboard|data|excel|pdf|analysis|visualization/)) {
    recommendations.push(ServiceCategoryType.REPORTING_LITE)
  }
  
  // Website keywords
  if (allPainPoints.match(/website|landing|page|online|web|contact|form|seo/)) {
    recommendations.push(ServiceCategoryType.WEBSITES_LANDING)
  }
  
  // PC Helpers keywords
  if (allPainPoints.match(/computer|pc|setup|install|software|configuration|onboard/)) {
    recommendations.push(ServiceCategoryType.PC_HELPERS)
  }
  
  // If no specific matches, suggest templates for general automation
  if (recommendations.length === 0 || allPainPoints.match(/template|reusable|recurring|process/)) {
    recommendations.push(ServiceCategoryType.REUSABLE_TEMPLATES)
  }
  
  // Remove duplicates and limit to top 3
  return Array.from(new Set(recommendations)).slice(0, 3)
}

// Generate response based on user input and context
export function generateChatbotResponse(
  userInput: string,
  userContext: any = {},
  conversationHistory: string[] = []
): ChatbotResponse {
  const input = userInput.toLowerCase()
  
  // Handle greetings
  if (input.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
    const greeting = GREETING_RESPONSES[Math.floor(Math.random() * GREETING_RESPONSES.length)]
    return greeting
  }

  // Handle agent/human contact requests - HIGH PRIORITY
  if (input.match(/agent|human|person|someone|speak with|talk to|representative|support|contact|help me|real person|live chat/)) {
    return {
      content: `I'd be happy to connect you with our automation specialists! You have a few options:

**📞 Free Consultation Call**
30-minute assessment to discuss your specific needs and get personalized recommendations.

**📝 Project Form**
Tell us about your automation needs and we'll respond within 24 hours with a custom proposal.

**📧 Direct Contact**
Email us directly at contact@automatron.ai for any questions.

Which option works best for you?`,
      quickActions: [
        { id: 'book_assessment', label: 'Book Call', action: 'book_assessment' },
        { id: 'contact_form', label: 'Fill Form', action: 'contact_form' }
      ]
    }
  }
  
  // Handle service inquiries
  if (input.match(/service|what do you do|help with|automate/)) {
    const recommendations = getServiceRecommendations(userInput, userContext.currentPainPoints)
    return {
      content: `Based on what you've mentioned, I'd recommend these services that could save you significant time:

${recommendations.map(serviceId => {
  const category = serviceCategories.find(cat => cat.id === serviceId)
  const scenario = serviceScenarios[serviceId]
  return `• **${category?.name}**: ${scenario?.timeSaved} saved - ${category?.description}`
}).join('\n\n')}

Would you like to see detailed examples or calculate potential time savings?`,
      serviceRecommendations: recommendations,
      quickActions: [QUICK_ACTIONS.CALCULATE_SAVINGS, QUICK_ACTIONS.BOOK_ASSESSMENT]
    }
  }
  
  // Handle time savings inquiries
  if (input.match(/time|save|hour|minute|calculate|roi|cost/)) {
    return {
      content: `Great question! Our clients typically save 2-5 hours per week through automation. To give you a personalized estimate, I'd need to know:

• How many repetitive tasks do you do per week?
• How long does each task typically take?
• What's your hourly rate or time value?

I can calculate your potential savings and ROI right now!`,
      quickActions: [QUICK_ACTIONS.CALCULATE_SAVINGS],
      shouldCollectInfo: {
        field: 'estimatedTasksPerWeek',
        prompt: 'How many repetitive tasks do you handle per week?'
      }
    }
  }
  
  // Handle pricing inquiries
  if (input.match(/price|cost|how much|pricing|budget/)) {
    return {
      content: `Our pricing is designed for quick wins and clear ROI:

${SERVICE_PACKAGES.map(pkg => 
  `• **${pkg.name}**: ${pkg.priceRange} (${pkg.turnaround})\n  ${pkg.description}`
).join('\n\n')}

Most clients see ROI within 2-4 weeks. Would you like to calculate your potential savings or book a free assessment to get a custom quote?`,
      quickActions: [QUICK_ACTIONS.CALCULATE_SAVINGS, QUICK_ACTIONS.BOOK_ASSESSMENT]
    }
  }
  
  // Handle specific pain points
  if (input.match(/file|folder|organize|mess|chaos/)) {
    return {
      content: `File organization chaos is one of our most popular solutions! Our Basic Scripting service can:

• Automatically sort files by date, type, or custom rules
• Clean up desktop and download folders
• Create organized folder structures
• Set up automated archiving

**Typical result**: Save 2-5 hours/week, 95%+ success rate

Would you like to see examples or start with a free assessment?`,
      serviceRecommendations: [ServiceCategoryType.BASIC_SCRIPTING],
      quickActions: [QUICK_ACTIONS.BOOK_ASSESSMENT, QUICK_ACTIONS.VIEW_SERVICES]
    }
  }
  
  if (input.match(/email|inbox|outlook|gmail|attachment/)) {
    return {
      content: `Email management is a huge time sink! Our Email & File Hygiene service includes:

• Automated inbox rules and filters
• Attachment auto-saving with organized naming
• Folder cleanup and organization
• Spam and newsletter management

**Typical result**: Save 1-3 hours/week, cleaner inbox in days

Ready to reclaim your inbox?`,
      serviceRecommendations: [ServiceCategoryType.EMAIL_FILE_HYGIENE],
      quickActions: [QUICK_ACTIONS.BOOK_ASSESSMENT, QUICK_ACTIONS.CALCULATE_SAVINGS]
    }
  }
  
  if (input.match(/report|excel|data|chart|dashboard/)) {
    return {
      content: `Manual reporting is so time-consuming! Our Reporting Lite service automates:

• CSV cleaning and merging from multiple sources
• Professional Excel formatting with charts
• Automated PDF report generation
• Data visualization dashboards

**Typical result**: Save 3-6 hours/week on reporting tasks

Want to see examples of automated reports we've created?`,
      serviceRecommendations: [ServiceCategoryType.REPORTING_LITE],
      quickActions: [QUICK_ACTIONS.VIEW_SERVICES, QUICK_ACTIONS.BOOK_ASSESSMENT]
    }
  }
  
  // Handle agent/human contact requests
  if (input.match(/agent|human|person|someone|speak with|talk to|representative|support|help me/)) {
    return {
      content: `I'd be happy to connect you with our automation specialists! You have a few options:

**📞 Free Consultation Call**
30-minute assessment to discuss your specific needs and get personalized recommendations.

**📝 Project Form**
Tell us about your automation needs and we'll respond within 24 hours with a custom proposal.

**📧 Direct Contact**
Email us directly at contact@automatron.ai for any questions.

Which option works best for you?`,
      quickActions: [
        QUICK_ACTIONS.BOOK_ASSESSMENT,
        QUICK_ACTIONS.CONTACT_FORM,
        { id: 'email_contact', label: 'Email Us', action: 'contact_form' as const }
      ]
    }
  }

  // Handle booking requests
  if (input.match(/book|schedule|assessment|consultation|call|meeting/)) {
    return {
      content: `Perfect! I'd love to set up your free automation assessment. This 30-minute call will help us:

• Identify your biggest time-wasting tasks
• Recommend specific automation solutions
• Calculate your potential time and cost savings
• Provide a custom quote and timeline

The assessment is completely free with no obligation. Ready to schedule?`,
      quickActions: [QUICK_ACTIONS.BOOK_ASSESSMENT]
    }
  }
  
  // Handle contact/start project requests
  if (input.match(/start|begin|contact|project|get started|sign up/)) {
    return {
      content: `Excellent! Let's get your automation project started. I can help you:

• Fill out our project requirements form
• Select the right service package for your needs
• Choose your preferred timeline
• Upload any sample files or current processes

This usually takes just 5-10 minutes and helps us deliver exactly what you need.`,
      quickActions: [QUICK_ACTIONS.CONTACT_FORM, QUICK_ACTIONS.BOOK_ASSESSMENT]
    }
  }
  
  // Default response with service recommendations
  const recommendations = getServiceRecommendations(userInput, userContext.currentPainPoints)
  
  return {
    content: `I understand you're dealing with time-consuming tasks. Based on what you've mentioned, here are some ways we could help:

${recommendations.length > 0 ? 
  recommendations.map(serviceId => {
    const category = serviceCategories.find(cat => cat.id === serviceId)
    return `• **${category?.name}**: ${category?.description}`
  }).join('\n') :
  `• **File & Process Automation**: Save 2-5 hours/week on repetitive tasks
• **Email & Data Organization**: Clean up digital chaos automatically
• **Custom Reporting**: Generate professional reports in minutes`
}

Would you like to calculate your potential time savings or book a free assessment to discuss your specific needs?`,
    serviceRecommendations: recommendations.length > 0 ? recommendations : [
      ServiceCategoryType.BASIC_SCRIPTING,
      ServiceCategoryType.EMAIL_FILE_HYGIENE,
      ServiceCategoryType.REPORTING_LITE
    ],
    quickActions: [QUICK_ACTIONS.CALCULATE_SAVINGS, QUICK_ACTIONS.BOOK_ASSESSMENT]
  }
}

// Time savings estimation logic for chatbot
export function estimateTimeSavingsForChat(input: TimeSavingsInput): string {
  const coverage = input.coverage || 0.7 // 70% of tasks can be automated
  const efficiency = input.automationEfficiency || 0.8 // 80% time reduction
  
  const manualHours = (input.tasksPerWeek * input.minutesPerTask) / 60
  const automatedHours = manualHours * coverage * (1 - efficiency)
  const hoursSaved = manualHours * coverage - automatedHours
  const roiPerWeek = hoursSaved * input.hourlyRate
  const roiPerMonth = roiPerWeek * 4.33
  const roiPerYear = roiPerMonth * 12
  
  return `**Your Potential Savings:**
• **Time saved**: ${hoursSaved.toFixed(1)} hours/week
• **Weekly value**: $${roiPerWeek.toFixed(0)}
• **Monthly value**: $${roiPerMonth.toFixed(0)}
• **Annual value**: $${roiPerYear.toFixed(0)}

With our Starter package (${SERVICE_PACKAGES[0].priceRange}), you'd see ROI in ${Math.ceil(499 / roiPerWeek)} weeks!`
}