# Common Layout Components

This directory contains the core layout and navigation components for the Automatron.ai website.

## Components Overview

### Layout (`layout.tsx`)
The main layout wrapper that provides the overall page structure.

**Features:**
- Responsive header and footer
- Skip-to-content link for accessibility
- Semantic HTML structure
- Scroll spy navigation
- Smooth scrolling utilities
- Back to top functionality

**Usage:**
```tsx
import { Layout } from '@/components/common'

export default function RootLayout({ children }) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}
```

### Header (`header.tsx`)
Responsive navigation header with mobile menu support.

**Features:**
- Responsive design (desktop/mobile)
- Service category dropdown
- Mobile hamburger menu with slide-in navigation
- Theme toggle integration
- Scroll-based styling changes
- Keyboard navigation support
- ARIA accessibility attributes

**Key Functionality:**
- Auto-closes mobile menu on route changes
- Prevents body scroll when mobile menu is open
- Keyboard navigation (Escape to close)
- Active link highlighting
- Service category previews in dropdown

### Footer (`footer.tsx`)
Comprehensive footer with company information and navigation.

**Features:**
- Company contact information
- Service category links
- Newsletter signup form
- Social media links
- Semantic HTML structure
- Accessibility labels

**Sections:**
- Company info with contact details
- Service categories with descriptions
- Company navigation links
- Resources and newsletter signup

### Scroll Spy Navigation (`layout.tsx`)
Advanced scroll spy functionality for section highlighting.

**Features:**
- Intersection Observer API for performance
- Fallback scroll listener
- Customizable offset and threshold
- Smooth scrolling with reduced motion support
- URL hash updates
- Focus management for accessibility

**Usage:**
```tsx
import { useScrollSpy, ScrollSpyNav } from '@/components/common'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'services', label: 'Services' },
  { id: 'about', label: 'About' },
]

function MyComponent() {
  const activeSection = useScrollSpy(sections.map(s => s.id))
  
  return (
    <ScrollSpyNav 
      sections={sections}
      offset={100}
      threshold={0.5}
    />
  )
}
```

### Back to Top (`layout.tsx`)
Floating back-to-top button with smooth scrolling.

**Features:**
- Appears after scrolling threshold
- Smooth scroll to top
- Accessibility support
- Hover animations

## Accessibility Features

### Keyboard Navigation
- Full keyboard support for all interactive elements
- Escape key closes mobile menu and dropdowns
- Tab navigation follows logical order
- Focus indicators visible

### Screen Reader Support
- Semantic HTML structure (`nav`, `main`, `footer`)
- ARIA labels and attributes
- Skip-to-content link
- Proper heading hierarchy
- Form labels and descriptions

### Motion Preferences
- Respects `prefers-reduced-motion` setting
- Smooth scrolling can be disabled
- Animations are optional

## Responsive Design

### Breakpoints
- Mobile: < 768px (hamburger menu)
- Tablet: 768px - 1024px
- Desktop: > 1024px (full navigation)

### Mobile Features
- Hamburger menu with slide-in navigation
- Touch-optimized interactions
- Collapsible service categories
- Full-width CTA buttons

### Desktop Features
- Horizontal navigation bar
- Service dropdown with previews
- Hover interactions
- Scroll spy navigation

## Performance Optimizations

### Scroll Spy
- Uses Intersection Observer API for better performance
- Passive scroll listeners
- Debounced scroll handlers
- Minimal DOM queries

### Mobile Menu
- Uses Radix UI Sheet component for smooth animations
- Prevents body scroll when open
- Efficient state management

### Image Optimization
- Proper alt text for all images
- Responsive image sizing
- Lazy loading where appropriate

## Testing

### Manual Testing Checklist
- [ ] Header navigation works on all screen sizes
- [ ] Mobile menu opens/closes correctly
- [ ] Service dropdown shows all categories
- [ ] Theme toggle works in header and mobile menu
- [ ] Footer links are functional
- [ ] Newsletter form has proper validation
- [ ] Skip-to-content link works
- [ ] Keyboard navigation is smooth
- [ ] Screen reader announces content correctly

### Automated Testing
- Component tests with React Testing Library
- Accessibility tests with jest-axe
- Visual regression tests
- Performance tests with Lighthouse

## Browser Support
- Chrome/Edge/Firefox/Safari (last 2 versions)
- iOS Safari and Chrome
- Android Chrome
- Progressive enhancement for older browsers

## Dependencies
- Next.js 14+ (App Router)
- Radix UI components
- Lucide React icons
- next-themes for theme switching
- Tailwind CSS for styling

## Future Enhancements
- Internationalization support
- Advanced search functionality
- Breadcrumb navigation
- Mega menu for services
- Progressive Web App features