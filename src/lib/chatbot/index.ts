// Chatbot core functionality
export {
  generateId,
  createChatSession,
  addUserMessage,
  addBotResponse,
  handleQuickAction,
  updateUserContext,
  getConversationSummary
} from './chatbot'

// Response generation and logic
export {
  QUICK_ACTIONS,
  GREETING_RESPONSES,
  getServiceRecommendations,
  generateChatbotResponse,
  estimateTimeSavingsForChat
} from './responses'

// AI service and API client
export {
  generateAIResponse,
  isAIServiceAvailable
} from './ai-service'

export {
  getChatbotResponse
} from './api-client'