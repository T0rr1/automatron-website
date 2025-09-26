import { ChatbotResponse, ChatSession } from '@/types'

export async function getChatbotResponse(
  message: string,
  conversationHistory: Array<{ role: 'user' | 'assistant', content: string }>,
  userContext: ChatSession['userContext'] = {}
): Promise<ChatbotResponse> {
  try {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory,
        userContext
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    return data

  } catch (error) {
    console.error('Chatbot API client error:', error)
    
    // Return fallback response
    return {
      content: "I'm here to help you discover automation solutions. What time-consuming tasks are you dealing with?",
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
      ]
    }
  }
}