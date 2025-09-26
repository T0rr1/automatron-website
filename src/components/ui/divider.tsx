import { cn } from '@/lib/utils'

interface DividerProps {
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

export function Divider({ className, orientation = 'horizontal' }: DividerProps) {
  return (
    <div 
      className={cn(
        'hr',
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  )
}

export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex justify-center my-16', className)}>
      <Divider className="max-w-xs" />
    </div>
  )
}