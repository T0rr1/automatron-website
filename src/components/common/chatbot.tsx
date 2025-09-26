'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Calculator, Calendar, FileText, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChatSession, ChatMessage, ServiceCategoryType } from '@/types'
import { 
  createChatSession, 
  addUserMessage, 
  addBotResponse, 
  handleQuickAction,
  updateUserContext,
  generateId
} from '@/lib/chatbot/chatbot'
import { serviceCategories } from '@/lib/constants/services'
import { ServiceRecommendationCard } from './service-recommendation-card'

interface ChatbotProps {
  onBookAssessment?: () => void
  onOpenContactForm?: () => void
  onCalculateSavings?: () => void
}

export function Chatbot({ 
  onBookAssessment, 
  onOpenContactForm, 
  onCalculateSavings 
}: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<ChatSession | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Initialize chat session when opened
  useEffect(() => {
    if (isOpen && !session) {
      setSession(createChatSession())
    }
  }, [isOpen, session])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [session?.messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSendMessage = async (message: string) => {
    if (!session || !message.trim()) return

    const newSession = { ...session }
    
    // Add user message
    addUserMessage(newSession, message)
    setSession({ ...newSession })
    setInputValue('')
    
    // Show typing indicator
    setIsTyping(true)
    
    try {
      // Add bot response (now async for AI service)
      await addBotResponse(newSession, message)
      setSession({ ...newSession })
    } catch (error) {
      console.error('Error getting bot response:', error)
      // Add fallback message
      const fallbackMessage: ChatMessage = {
        id: generateId(),
        type: 'bot',
        content: "I'm sorry, I'm having trouble responding right now. Would you like to book a free assessment or view our services?",
        timestamp: new Date(),
        metadata: {
          quickActions: [
            { id: 'book_assessment', label: 'Book Free Assessment', action: 'book_assessment' },
            { id: 'view_services', label: 'View All Services', action: 'service_info' }
          ]
        }
      }
      newSession.messages.push(fallbackMessage)
      setSession({ ...newSession })
    } finally {
      setIsTyping(false)
    }
  }

  const handleQuickActionClick = (actionId: string, data?: any) => {
    if (!session) return

    const newSession = { ...session }
    
    // Handle external actions
    switch (actionId) {
      case 'book_assessment':
        if (onBookAssessment) {
          onBookAssessment()
          setIsOpen(false)
          return
        }
        break
      case 'contact_form':
        if (onOpenContactForm) {
          onOpenContactForm()
          setIsOpen(false)
          return
        }
        break
      case 'calculate_savings':
        if (onCalculateSavings) {
          onCalculateSavings()
          setIsOpen(false)
          return
        }
        break
    }
    
    // Handle internal quick actions
    handleQuickAction(newSession, actionId, data)
    setSession({ ...newSession })
  }

  const handleViewService = (serviceSlug: string) => {
    // Open service page in new tab
    window.open(`/services/${serviceSlug}`, '_blank')
  }

  const handleSelectService = (serviceType: ServiceCategoryType) => {
    // Close chatbot and go to contact form with service pre-selected
    setIsOpen(false)
    const contactUrl = `/contact?service=${serviceType}`
    window.location.href = contactUrl
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  const getServiceIcon = (serviceType: ServiceCategoryType) => {
    const service = serviceCategories.find(cat => cat.id === serviceType)
    return service?.icon || '🔧'
  }

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'calculate_savings': return <Calculator className="w-4 h-4" />
      case 'book_assessment': return <Calendar className="w-4 h-4" />
      case 'contact_form': return <FileText className="w-4 h-4" />
      case 'service_info': return <Zap className="w-4 h-4" />
      default: return <MessageCircle className="w-4 h-4" />
    }
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-background/95 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Automatron Assistant</h3>
                    <p className="text-xs text-muted-foreground">
                      Here to help save you time
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {session?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      
                      {/* Service Recommendations */}
                      {message.metadata?.serviceRecommendations && message.metadata.serviceRecommendations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="text-xs font-medium text-muted-foreground">
                            Recommended Services:
                          </div>
                          {message.metadata.serviceRecommendations.map((serviceType) => (
                            <ServiceRecommendationCard
                              key={serviceType}
                              serviceType={serviceType}
                              onViewService={handleViewService}
                              onSelectService={handleSelectService}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Quick Actions */}
                      {message.metadata?.quickActions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.metadata.quickActions.map((action) => (
                            <Button
                              key={action.id}
                              variant="outline"
                              size="sm"
                              className="h-8 text-xs"
                              onClick={() => handleQuickActionClick(action.action, action.data)}
                            >
                              {getActionIcon(action.action)}
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="text-muted-foreground ml-2">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about automation solutions..."
                    className="flex-1"
                    disabled={isTyping}
                    aria-label="Chat message input"
                  />
                  <Button
                    onClick={() => handleSendMessage(inputValue)}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Press Enter to send • Powered by Automatron.ai
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}