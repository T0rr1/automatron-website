import { cn } from '@/lib/utils'

interface IconProps {
  children: React.ReactNode
  className?: string
  decorative?: boolean
}

export function Icon({ children, className, decorative = false }: IconProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center",
        decorative ? "text-muted" : "text-accent",
        className
      )}
      aria-hidden={decorative}
    >
      {children}
    </span>
  )
}

// Common icon components with unified stroke weight
export function CheckIcon({ className, decorative = false }: { className?: string, decorative?: boolean }) {
  return (
    <Icon className={className} decorative={decorative}>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </Icon>
  )
}

export function ArrowRightIcon({ className, decorative = false }: { className?: string, decorative?: boolean }) {
  return (
    <Icon className={className} decorative={decorative}>
      <svg 
        className="w-4 h-4" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Icon>
  )
}

export function StarIcon({ className, decorative = false }: { className?: string, decorative?: boolean }) {
  return (
    <Icon className={className} decorative={decorative}>
      <svg 
        className="w-4 h-4" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </Icon>
  )
}