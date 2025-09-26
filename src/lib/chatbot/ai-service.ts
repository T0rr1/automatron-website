import OpenAI from 'openai'
import { ServiceCategoryType, ChatSession, ChatbotResponse } from '@/types'
import { serviceCategories, serviceScenarios, serviceFaqs } from '@/lib/constants/services'
import { SERVICE_PACKAGES } from '@/lib/constants/contact'

// Initialize OpenAI client (server-side only)
let openai: OpenAI | null = null

try {
  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error)
}

// System prompt that defines the chatbot's personality and knowledge
const SYSTEM_PROMPT = `You are an AI assistant for Automatron.ai, a professional automation service company. Your role is to help potential clients discover how automation can save them 2-5 hours per week.

COMPANY OVERVIEW:
Automatron.ai specializes in practical automation solutions for solo business owners, small teams, and busy professionals. We focus on Windows-first solutions with cross-platform capabilities using PowerShell, Python, and Excel automation.

OUR SERVICES:
1. **Basic Scripting** ($249-$499, 1-3 days)
   - File cleanup, archiving, CSV operations, backup automation
   - Saves 2-5 hours/week typically
   - Use cases: File organization, data processing, scheduled tasks

2. **Email & File Hygiene** ($249-$499, 1-3 days)
   - Inbox rules, attachment management, folder organization
   - Saves 1-3 hours/week typically
   - Use cases: Email automation, file naming, digital cleanup

3. **Reporting Lite** ($249-$499, 1-3 days)
   - CSV cleaning, Excel formatting, PDF report generation
   - Saves 3-6 hours/week typically
   - Use cases: Automated reports, data visualization, dashboard creation

4. **Simple Websites/Landing Pages** ($699-$1,200, 5-7 days)
   - Static sites, WordPress setups, contact forms, SEO basics
   - Saves 10-20 hours setup time
   - Use cases: Business websites, landing pages, online presence

5. **PC Onboarding Helpers** ($249-$499, 1-3 days)
   - Setup scripts, app installation, system configuration
   - Saves 4-8 hours per PC setup
   - Use cases: New employee onboarding, system standardization

6. **Reusable Templates** ($249-$499, 1-3 days)
   - Customizable automation templates for recurring needs
   - Saves 2-4 hours per task
   - Use cases: Process standardization, workflow templates

SERVICE PACKAGES:
- **Starter Package**: $249-$499 (single automation, 1-3 days)
- **Bundle Package**: $699-$1,200 (multiple automations, 3-7 days)
- **Website Basic**: $699-$1,200 (websites/landing pages, 5-7 days)
- **Care Plan**: $149-$399/month (ongoing support and maintenance)

KEY PRINCIPLES:
- Safety-first approach (move-not-delete, dry-run options, comprehensive logging)
- 95%+ success rate with typical 2-5 hours saved per week
- Focus on practical, immediate wins rather than complex enterprise solutions
- Emphasize ROI and time savings in every conversation

YOUR PERSONALITY:
- Friendly, knowledgeable, and solution-oriented
- Ask intelligent follow-up questions to understand their specific needs
- Provide personalized recommendations based on their business type and pain points
- Be conversational but professional
- Always focus on practical benefits and time savings
- Offer specific examples relevant to their situation

HANDLING AGENT/HUMAN REQUESTS:
When users ask to speak with an agent, human, representative, or someone, respond with:
"I'd be happy to connect you with our automation specialists! You have a few options:

**📞 Free Consultation Call**
30-minute assessment to discuss your specific needs and get personalized recommendations.

**📝 Project Form** 
Tell us about your automation needs and we'll respond within 24 hours with a custom proposal.

**📧 Direct Contact**
Email us directly at contact@automatron.ai for any questions.

Which option works best for you?"

CONVERSATION FLOW:
1. Understand their current time-consuming tasks
2. Identify their business type and role
3. Ask about specific pain points and manual processes
4. Recommend relevant services with clear time-saving benefits
5. Offer to calculate potential savings or book a free assessment
6. Provide next steps (calculator, assessment booking, or project form)

IMPORTANT GUIDELINES:
- Always ask follow-up questions to better understand their needs
- Provide specific, actionable advice
- Reference real examples from our service categories
- Mention time savings and ROI whenever possible
- Be helpful even if they're just exploring options
- Never be pushy - focus on providing value
- If they ask about complex enterprise solutions, guide them toward our practical approach
- Always offer multiple next steps (calculator, assessment, or project form)

Remember: Your goal is to help them discover how automation can save them time and make their work life easier. Be genuinely helpful and consultative.`

// Generate AI response using OpenAI
export async function generateAIResponse(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant', content: string }>,
  userContext: ChatSession['userContext'] = {}
): Promise<ChatbotResponse> {
  try {
    // Check if OpenAI client is properly initialized
    if (!openai) {
      throw new Error('OpenAI client not initialized')
    }

    // Build context about the user if available
    let contextInfo = ''
    if (userContext.businessType) {
      contextInfo += `User's business type: ${userContext.businessType}\n`
    }
    if (userContext.currentPainPoints && userContext.currentPainPoints.length > 0) {
      contextInfo += `Known pain points: ${userContext.currentPainPoints.join(', ')}\n`
    }
    if (userContext.interestedServices && userContext.interestedServices.length > 0) {
      contextInfo += `Interested services: ${userContext.interestedServices.join(', ')}\n`
    }

    // Prepare messages for OpenAI
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + (contextInfo ? `\n\nCURRENT USER CONTEXT:\n${contextInfo}` : '')
      },
      ...conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      {
        role: 'user',
        content: userMessage
      }
    ]

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    })

    const aiResponse = completion.choices[0]?.message?.content || 
      "I'm here to help you discover automation solutions. What time-consuming tasks are you dealing with?"

    // Analyze the response to determine appropriate quick actions and service recommendations
    const quickActions = determineQuickActions(aiResponse, userMessage)
    const serviceRecommendations = determineServiceRecommendations(aiResponse, userMessage, userContext)

    return {
      content: aiResponse,
      quickActions,
      serviceRecommendations
    }

  } catch (error: any) {
    console.error('AI Response Error:', error)
    
    // Check for specific OpenAI errors (silently handle for production)
    
    // Fallback to rule-based response if AI fails
    return generateFallbackResponse(userMessage, userContext)
  }
}

// Determine appropriate quick actions based on AI response and user input
function determineQuickActions(aiResponse: string, userMessage: string): Array<{
  id: string
  label: string
  action: 'calculate_savings' | 'book_assessment' | 'contact_form' | 'service_info'
}> {
  const actions = []
  const response = aiResponse.toLowerCase()
  const input = userMessage.toLowerCase()

  // Handle agent/human requests - HIGH PRIORITY
  if (input.includes('agent') || input.includes('human') || input.includes('speak with') || 
      input.includes('talk to') || input.includes('representative') || input.includes('someone') ||
      response.includes('consultation') || response.includes('connect you')) {
    actions.push({
      id: 'book_assessment',
      label: 'Book Call',
      action: 'book_assessment' as const
    })
    actions.push({
      id: 'contact_form',
      label: 'Fill Form',
      action: 'contact_form' as const
    })
    return actions // Return early for agent requests
  }

  // Always offer calculator if discussing time or savings
  if (response.includes('time') || response.includes('save') || response.includes('hour') || 
      input.includes('time') || input.includes('save') || input.includes('hour')) {
    actions.push({
      id: 'calculate_savings',
      label: 'Calculate My Savings',
      action: 'calculate_savings' as const
    })
  }

  // Offer assessment if discussing specific needs or recommendations
  if (response.includes('assess') || response.includes('discuss') || response.includes('call') ||
      response.includes('recommend') || input.includes('help') || input.includes('need')) {
    actions.push({
      id: 'book_assessment',
      label: 'Book Free Assessment',
      action: 'book_assessment' as const
    })
  }

  // Offer project form if ready to start
  if (response.includes('start') || response.includes('project') || response.includes('quote') ||
      input.includes('start') || input.includes('ready') || input.includes('begin')) {
    actions.push({
      id: 'contact_form',
      label: 'Start Project',
      action: 'contact_form' as const
    })
  }

  // Offer service info if discussing services
  if (response.includes('service') || response.includes('automation') || 
      input.includes('service') || input.includes('what do you')) {
    actions.push({
      id: 'view_services',
      label: 'View All Services',
      action: 'service_info' as const
    })
  }

  // Limit to 2-3 most relevant actions
  return actions.slice(0, 3)
}

// Determine service recommendations based on conversation
function determineServiceRecommendations(
  aiResponse: string, 
  userMessage: string, 
  userContext: ChatSession['userContext']
): ServiceCategoryType[] {
  const recommendations: ServiceCategoryType[] = []
  const text = (aiResponse + ' ' + userMessage).toLowerCase()

  // Check for service-specific keywords
  if (text.match(/file|folder|csv|excel|backup|organize|sort|clean|archive|data/)) {
    recommendations.push(ServiceCategoryType.BASIC_SCRIPTING)
  }
  
  if (text.match(/email|inbox|attachment|outlook|gmail|mail/)) {
    recommendations.push(ServiceCategoryType.EMAIL_FILE_HYGIENE)
  }
  
  if (text.match(/report|chart|dashboard|analysis|visualization|pdf/)) {
    recommendations.push(ServiceCategoryType.REPORTING_LITE)
  }
  
  if (text.match(/website|landing|page|online|web|site/)) {
    recommendations.push(ServiceCategoryType.WEBSITES_LANDING)
  }
  
  if (text.match(/computer|pc|setup|install|software|onboard/)) {
    recommendations.push(ServiceCategoryType.PC_HELPERS)
  }

  // Add user's interested services
  if (userContext.interestedServices) {
    recommendations.push(...userContext.interestedServices)
  }

  // Remove duplicates and limit to top 3
  return Array.from(new Set(recommendations)).slice(0, 3)
}

// Enhanced fallback response if AI service fails
function generateFallbackResponse(userMessage: string, userContext: ChatSession['userContext']): ChatbotResponse {
  const input = userMessage.toLowerCase()
  
  // Handle greetings
  if (input.match(/^(hi|hello|hey|good morning|good afternoon)/)) {
    return {
      content: "Hi! I'm here to help you discover how Automatron.ai can save you 2-5 hours per week through automation. What's your biggest time-consuming task right now?",
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate Time Savings', action: 'calculate_savings' },
        { id: 'view_services', label: 'View All Services', action: 'service_info' }
      ]
    }
  }

  // Handle file organization specifically
  if (input.match(/file|folder|organize|mess|chaos|desktop|download|document/)) {
    return {
      content: "File organization is one of our most popular automation solutions! Our Basic Scripting service can automatically:\n\n• Sort files by date, type, or custom rules\n• Clean up desktop and download folders\n• Create organized folder structures\n• Set up automated archiving\n\n**Typical result**: Save 2-5 hours/week with 95%+ success rate\n\nWould you like to calculate your potential time savings or book a free assessment?",
      serviceRecommendations: [ServiceCategoryType.BASIC_SCRIPTING],
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
      ]
    }
  }

  // Handle email issues
  if (input.match(/email|inbox|outlook|gmail|attachment|mail/)) {
    return {
      content: "Email management can be such a time drain! Our Email & File Hygiene service includes:\n\n• Automated inbox rules and filters\n• Attachment auto-saving with organized naming\n• Folder cleanup and organization\n• Spam and newsletter management\n\n**Typical result**: Save 1-3 hours/week, cleaner inbox in days\n\nReady to reclaim your inbox?",
      serviceRecommendations: [ServiceCategoryType.EMAIL_FILE_HYGIENE],
      quickActions: [
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' },
        { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' }
      ]
    }
  }

  // Handle reporting tasks
  if (input.match(/report|excel|data|chart|dashboard|csv|spreadsheet/)) {
    return {
      content: "Manual reporting takes forever! Our Reporting Lite service automates:\n\n• CSV cleaning and merging from multiple sources\n• Professional Excel formatting with charts\n• Automated PDF report generation\n• Data visualization dashboards\n\n**Typical result**: Save 3-6 hours/week on reporting tasks\n\nWant to see examples of automated reports we've created?",
      serviceRecommendations: [ServiceCategoryType.REPORTING_LITE],
      quickActions: [
        { id: 'view_services', label: 'View Examples', action: 'service_info' },
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
      ]
    }
  }

  // Handle time/savings inquiries
  if (input.match(/time|save|hour|minute|calculate|roi|cost|money/)) {
    return {
      content: "Great question! Our clients typically save 2-5 hours per week through automation. Here's how we calculate your potential savings:\n\n• **Time saved**: Based on your repetitive tasks\n• **Weekly value**: Your hourly rate × hours saved\n• **ROI timeline**: Most clients see payback in 2-4 weeks\n\nI can calculate your personalized savings right now!",
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
      ]
    }
  }

  // Handle agent/human contact requests
  if (input.match(/agent|human|person|someone|speak with|talk to|representative|support|help me/)) {
    return {
      content: "I'd be happy to connect you with our automation specialists! You have a few options:\n\n**📞 Free Consultation Call**\n30-minute assessment to discuss your specific needs and get personalized recommendations.\n\n**📝 Project Form**\nTell us about your automation needs and we'll respond within 24 hours with a custom proposal.\n\n**📧 Direct Contact**\nEmail us directly at contact@automatron.ai for any questions.\n\nWhich option works best for you?",
      quickActions: [
        { id: 'book_assessment', label: 'Book Call', action: 'book_assessment' },
        { id: 'contact_form', label: 'Fill Form', action: 'contact_form' }
      ]
    }
  }

  // Handle pricing inquiries
  if (input.match(/price|cost|how much|pricing|budget|expensive/)) {
    return {
      content: "Our pricing is designed for quick wins and clear ROI:\n\n• **Starter Package**: $249-$499 (1-3 days) - Single automation\n• **Bundle Package**: $699-$1,200 (3-7 days) - Multiple automations\n• **Website Basic**: $699-$1,200 (5-7 days) - Landing pages\n• **Care Plan**: $149-$399/month - Ongoing support\n\nMost clients see ROI within 2-4 weeks. Want to calculate your potential savings?",
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate ROI', action: 'calculate_savings' },
        { id: 'book_assessment', label: 'Get Custom Quote', action: 'book_assessment' }
      ]
    }
  }

  // Default response with service recommendations based on input
  const recommendations = determineServiceRecommendations(userMessage, userMessage, userContext)
  
  return {
    content: "I understand you're dealing with time-consuming tasks. Based on what you've mentioned, here are some ways we could help:\n\n" +
      (recommendations.length > 0 ? 
        recommendations.map((serviceId: ServiceCategoryType) => {
          const category = serviceCategories.find(cat => cat.id === serviceId)
          const scenario = serviceScenarios[serviceId]
          return `• **${category?.name}**: ${scenario?.timeSaved} saved - ${category?.description}`
        }).join('\n\n') :
        `• **File & Process Automation**: Save 2-5 hours/week on repetitive tasks\n• **Email & Data Organization**: Clean up digital chaos automatically\n• **Custom Reporting**: Generate professional reports in minutes`
      ) +
      "\n\nWould you like to calculate your potential time savings or book a free assessment to discuss your specific needs?",
    serviceRecommendations: recommendations.length > 0 ? recommendations : [
      ServiceCategoryType.BASIC_SCRIPTING,
      ServiceCategoryType.EMAIL_FILE_HYGIENE,
      ServiceCategoryType.REPORTING_LITE
    ],
    quickActions: [
      { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
      { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
    ]
  }
}

// Check if AI service is available
export function isAIServiceAvailable(): boolean {
  return !!process.env.OPENAI_API_KEY
}