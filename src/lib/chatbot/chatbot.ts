import { ChatMessage, ChatSession, ChatbotResponse, TimeSavingsInput } from '@/types'
import { generateChatbotResponse, estimateTimeSavingsForChat } from './responses'
import { getChatbotResponse } from './api-client'

// Generate unique ID for messages and sessions
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Create a new chat session
export function createChatSession(): ChatSession {
  const welcomeMessage: ChatMessage = {
    id: generateId(),
    type: 'bot',
    content: "Hi! I'm here to help you discover how Automatron.ai can save you 2-5 hours per week through automation. What's your biggest time-consuming task right now?",
    timestamp: new Date(),
    metadata: {
      quickActions: [
        {
          id: 'calculate_savings',
          label: 'Calculate Time Savings',
          action: 'calculate_savings'
        },
        {
          id: 'view_services',
          label: 'View All Services',
          action: 'service_info'
        }
      ]
    }
  }

  return {
    id: generateId(),
    messages: [welcomeMessage],
    userContext: {},
    startedAt: new Date(),
    lastActivity: new Date()
  }
}

// Add a user message to the session
export function addUserMessage(session: ChatSession, content: string): ChatMessage {
  const message: ChatMessage = {
    id: generateId(),
    type: 'user',
    content: content.trim(),
    timestamp: new Date()
  }

  session.messages.push(message)
  session.lastActivity = new Date()
  
  return message
}

// Generate and add bot response
export async function addBotResponse(session: ChatSession, userMessage: string): Promise<ChatMessage> {
  let response: ChatbotResponse
  
  try {
    // Try AI service via API route
    const conversationHistory = session.messages.map(msg => ({
      role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
      content: msg.content
    }))
    
    response = await getChatbotResponse(userMessage, conversationHistory, session.userContext)
  } catch (error) {
    console.error('AI service failed, falling back to rule-based responses:', error)
    // Fallback to rule-based response
    const conversationHistory = session.messages
      .filter(msg => msg.type === 'user')
      .map(msg => msg.content)
    
    response = generateChatbotResponse(
      userMessage,
      session.userContext,
      conversationHistory
    )
  }
  
  const botMessage: ChatMessage = {
    id: generateId(),
    type: 'bot',
    content: response.content,
    timestamp: new Date(),
    metadata: {
      serviceRecommendations: response.serviceRecommendations,
      timeSavingsEstimate: response.timeSavingsEstimate,
      quickActions: response.quickActions
    }
  }
  
  session.messages.push(botMessage)
  session.lastActivity = new Date()
  
  // Update user context if response suggests collecting info
  if (response.shouldCollectInfo) {
    // This would be handled by the UI component to prompt for specific info
  }
  
  return botMessage
}

// Handle quick actions
export function handleQuickAction(
  session: ChatSession,
  actionId: string,
  data?: any
): ChatMessage {
  let responseContent = ''
  let metadata: ChatMessage['metadata'] = {}
  
  switch (actionId) {
    case 'calculate_savings':
      if (data && data.tasksPerWeek && data.minutesPerTask && data.hourlyRate) {
        const estimate = estimateTimeSavingsForChat(data as TimeSavingsInput)
        responseContent = estimate
        metadata.quickActions = [
          {
            id: 'book_assessment',
            label: 'Book Free Assessment',
            action: 'book_assessment'
          },
          {
            id: 'contact_form',
            label: 'Start Project',
            action: 'contact_form'
          }
        ]
      } else {
        responseContent = `I'd love to calculate your time savings! I need a few quick details:

• How many repetitive tasks do you handle per week?
• How long does each task typically take (in minutes)?
• What's your hourly rate or time value?

Once I have these, I can show you exactly how much time and money automation could save you!`
        
        metadata.quickActions = [
          {
            id: 'book_assessment',
            label: 'Book Assessment Instead',
            action: 'book_assessment'
          }
        ]
      }
      break
      
    case 'service_info':
      responseContent = `Here are our main automation services:

**🔧 Basic Scripting** - File cleanup, CSV operations, backups (Save 2-5 hrs/week)
**📧 Email & File Hygiene** - Inbox rules, attachment management (Save 1-3 hrs/week)  
**📊 Reporting Lite** - Automated Excel/PDF reports with charts (Save 3-6 hrs/week)
**🌐 Simple Websites** - Landing pages, contact forms, SEO setup (10-20 hrs saved)
**💻 PC Helpers** - Automated software installation and setup (4-8 hrs per PC)
**📋 Reusable Templates** - Customizable automation templates (2-4 hrs per task)

Which area interests you most?`
      
      metadata.quickActions = [
        {
          id: 'calculate_savings',
          label: 'Calculate My Savings',
          action: 'calculate_savings'
        },
        {
          id: 'book_assessment',
          label: 'Book Free Assessment',
          action: 'book_assessment'
        }
      ]
      break
      
    case 'book_assessment':
      responseContent = `Perfect! Let's schedule your free 30-minute automation assessment. 

**What we'll cover:**
• Review your current time-consuming tasks
• Identify automation opportunities
• Calculate potential time and cost savings  
• Provide custom recommendations and quotes
• Answer all your questions

**No obligation, completely free!**

I'll redirect you to our calendar to pick a time that works for you.`
      
      metadata.quickActions = [
        {
          id: 'contact_form',
          label: 'Fill Out Project Form Instead',
          action: 'contact_form'
        }
      ]
      break
      
    case 'contact_form':
      responseContent = `Great choice! Our project form helps us understand your needs so we can deliver exactly what you're looking for.

**The form covers:**
• Your current processes and pain points
• Desired outcomes and timeline
• Service package preferences
• File uploads for sample data

It takes about 5-10 minutes and ensures we create the perfect automation solution for you.

I'll redirect you to the project form now!`
      break
      
    default:
      responseContent = "I'm not sure how to help with that. Would you like to calculate time savings or book a free assessment?"
      metadata.quickActions = [
        {
          id: 'calculate_savings',
          label: 'Calculate Time Savings',
          action: 'calculate_savings'
        },
        {
          id: 'book_assessment',
          label: 'Book Free Assessment',
          action: 'book_assessment'
        }
      ]
  }
  
  const botMessage: ChatMessage = {
    id: generateId(),
    type: 'bot',
    content: responseContent,
    timestamp: new Date(),
    metadata
  }
  
  session.messages.push(botMessage)
  session.lastActivity = new Date()
  
  return botMessage
}

// Update user context with collected information
export function updateUserContext(
  session: ChatSession,
  field: keyof ChatSession['userContext'],
  value: any
): void {
  session.userContext[field] = value
  session.lastActivity = new Date()
}

// Get conversation summary for analytics
export function getConversationSummary(session: ChatSession) {
  return {
    sessionId: session.id,
    messageCount: session.messages.length,
    userMessages: session.messages.filter(msg => msg.type === 'user').length,
    duration: session.lastActivity.getTime() - session.startedAt.getTime(),
    userContext: session.userContext,
    serviceRecommendations: session.messages
      .flatMap(msg => msg.metadata?.serviceRecommendations || [])
      .filter((service, index, arr) => arr.indexOf(service) === index),
    quickActionsUsed: session.messages
      .flatMap(msg => msg.metadata?.quickActions?.map(action => action.action) || [])
      .filter((action, index, arr) => arr.indexOf(action) === index)
  }
}