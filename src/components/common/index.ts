// Layout components
export { Container } from './container'
export { Section, HeroSection } from './section'
export { Grid, GridItem, Flex } from './grid'
export { Header } from './header'
export { Footer } from './footer'
export { StickyCTA } from './sticky-cta'
export { 
  Layout, 
  useScrollSpy, 
  scrollToSection, 
  ScrollSpyNav, 
  BackToTop 
} from './layout'

// Enhanced scroll spy navigation
export { 
  ScrollSpyNav as EnhancedScrollSpyNav,
  FloatingScrollSpyNav,
  ScrollProgress,
  TableOfContents
} from './scroll-spy-nav'

// Breadcrumb navigation
export { 
  Breadcrumbs,
  BreadcrumbsStructuredData,
  BreadcrumbsWithSEO
} from './breadcrumbs'

// Chatbot components
export { Chatbot } from './chatbot'
export { ChatbotProvider } from './chatbot-provider'
export { TimeSavingsCalculatorModal } from './time-savings-calculator-modal'
export { CalendarBookingModal } from './calendar-booking-modal'
export { ServiceRecommendationCard } from './service-recommendation-card'

// Responsive utilities
export { Show, Hide, Responsive, useResponsive } from './responsive'