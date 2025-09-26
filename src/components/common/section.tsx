import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  background?: 'default' | 'muted' | 'card' | 'transparent'
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    as: Component = 'section',
    containerSize = 'lg',
    padding = 'lg',
    background = 'default',
    children,
    ...props 
  }, ref) => {
    const paddingClasses = {
      none: '',
      sm: 'py-8 lg:py-12',
      md: 'py-12 lg:py-16',
      lg: 'py-16 lg:py-24',
    }

    const backgroundClasses = {
      default: 'bg-background',
      muted: 'bg-muted/50',
      card: 'bg-card',
      transparent: 'bg-transparent',
    }

    return (
      <Component
        ref={ref}
        className={cn(
          'relative',
          paddingClasses[padding],
          backgroundClasses[background],
          className
        )}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </Component>
    )
  }
)

Section.displayName = "Section"

// Hero section variant
const HeroSection = React.forwardRef<
  HTMLElement,
  Omit<SectionProps, 'padding'> & { 
    padding?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ 
  className, 
  padding = 'xl',
  background = 'default',
  ...props 
}, ref) => {
  const heroPaddingClasses = {
    sm: 'py-16 lg:py-20',
    md: 'py-20 lg:py-28',
    lg: 'py-24 lg:py-32',
    xl: 'py-32 lg:py-40',
  }

  return (
    <Section
      ref={ref}
      as="section"
      className={cn(
        'relative overflow-hidden',
        heroPaddingClasses[padding],
        className
      )}
      padding="none"
      background={background}
      {...props}
    />
  )
})

HeroSection.displayName = "HeroSection"

export { Section, HeroSection }