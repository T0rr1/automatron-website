import { NextRequest, NextResponse } from 'next/server'
import { generateAIResponse } from '@/lib/chatbot/ai-service'
import { ChatSession } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory, userContext } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        content: "I'd love to help you find the right automation solution! Can you tell me more about the time-consuming tasks you're dealing with? For example, are you spending too much time on file management, email organization, or creating reports?",
        quickActions: [
          { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
          { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
        ]
      })
    }
    
    // Generate AI response
    const response = await generateAIResponse(
      message,
      conversationHistory || [],
      userContext || {}
    )

    return NextResponse.json(response)

  } catch (error) {
    console.error('Chatbot API Error:', error)
    
    // Return fallback response
    return NextResponse.json({
      content: "I'm here to help you discover automation solutions that can save you time. What specific tasks are taking up too much of your day?",
      quickActions: [
        { id: 'calculate_savings', label: 'Calculate My Savings', action: 'calculate_savings' },
        { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' }
      ]
    })
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}