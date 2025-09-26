import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'lead' | 'large' | 'small' | 'muted'
  as?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', as, children, ...props }, ref) => {
    const Component = as || getDefaultElement(variant)
    
    return (
      <Component
        ref={ref}
        className={cn(getVariantClasses(variant), className)}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = "Typography"

function getDefaultElement(variant: TypographyProps['variant']) {
  switch (variant) {
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return variant
    case 'lead':
    case 'large':
    case 'small':
    case 'muted':
    case 'p':
    default:
      return 'p'
  }
}

function getVariantClasses(variant: TypographyProps['variant']) {
  switch (variant) {
    case 'h1':
      return 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'
    case 'h2':
      return 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'
    case 'h3':
      return 'scroll-m-20 text-2xl font-semibold tracking-tight'
    case 'h4':
      return 'scroll-m-20 text-xl font-semibold tracking-tight'
    case 'h5':
      return 'scroll-m-20 text-lg font-semibold tracking-tight'
    case 'h6':
      return 'scroll-m-20 text-base font-semibold tracking-tight'
    case 'p':
      return 'leading-7 [&:not(:first-child)]:mt-6'
    case 'lead':
      return 'text-xl text-muted-foreground'
    case 'large':
      return 'text-lg font-semibold'
    case 'small':
      return 'text-sm font-medium leading-none'
    case 'muted':
      return 'text-sm text-muted-foreground'
    default:
      return ''
  }
}

// Display typography variants for hero sections
const DisplayText = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }
>(({ className, size = 'md', ...props }, ref) => {
  const sizeClasses = {
    sm: 'text-display-sm',
    md: 'text-display-md',
    lg: 'text-display-lg',
    xl: 'text-display-xl',
  }
  
  return (
    <h1
      ref={ref}
      className={cn(
        'font-display font-bold tracking-tight text-balance',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
})

DisplayText.displayName = "DisplayText"

// Gradient text component
const GradientText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-gradient', className)}
    {...props}
  />
))

GradientText.displayName = "GradientText"

export { Typography, DisplayText, GradientText }