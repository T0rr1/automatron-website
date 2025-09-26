'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

// Form field wrapper with proper accessibility
interface FormFieldProps {
  children: React.ReactNode
  className?: string
  error?: string
  description?: string
  required?: boolean
}

export function FormField({ 
  children, 
  className, 
  error, 
  description, 
  required 
}: FormFieldProps) {
  const fieldId = React.useId()
  const errorId = error ? `${fieldId}-error` : undefined
  const descriptionId = description ? `${fieldId}-description` : undefined
  
  return (
    <div className={cn('space-y-2', className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Pass accessibility props to form controls
          if (child.type === AccessibleInput || 
              child.type === AccessibleTextarea || 
              child.type === AccessibleSelect) {
            return React.cloneElement(child, {
              id: fieldId,
              'aria-describedby': [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
              'aria-invalid': !!error,
              'aria-required': required,
              error: !!error,
              ...child.props,
            })
          }
          
          // Pass id to labels
          if (child.type === Label) {
            return React.cloneElement(child, {
              htmlFor: fieldId,
              ...child.props,
            })
          }
        }
        return child
      })}
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId} 
          className="text-sm text-destructive" 
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible input component
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  label?: string
  description?: string
  showRequiredIndicator?: boolean
}

export const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ className, error, label, description, showRequiredIndicator, required, ...props }, ref) => {
    const inputId = React.useId()
    const errorId = error ? `${inputId}-error` : undefined
    const descriptionId = description ? `${inputId}-description` : undefined
    
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={inputId} className="flex items-center gap-1">
            {label}
            {(required || showRequiredIndicator) && (
              <span className="text-destructive" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}
        
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        />
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    )
  }
)
AccessibleInput.displayName = 'AccessibleInput'

// Accessible textarea component
interface AccessibleTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  label?: string
  description?: string
  showRequiredIndicator?: boolean
}

export const AccessibleTextarea = React.forwardRef<HTMLTextAreaElement, AccessibleTextareaProps>(
  ({ className, error, label, description, showRequiredIndicator, required, ...props }, ref) => {
    const textareaId = React.useId()
    const errorId = error ? `${textareaId}-error` : undefined
    const descriptionId = description ? `${textareaId}-description` : undefined
    
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={textareaId} className="flex items-center gap-1">
            {label}
            {(required || showRequiredIndicator) && (
              <span className="text-destructive" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}
        
        <Textarea
          ref={ref}
          id={textareaId}
          className={cn(
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        />
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    )
  }
)
AccessibleTextarea.displayName = 'AccessibleTextarea'

// Accessible select component
interface AccessibleSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean
  label?: string
  description?: string
  showRequiredIndicator?: boolean
  options: Array<{ value: string; label: string; disabled?: boolean }>
  placeholder?: string
}

export const AccessibleSelect = React.forwardRef<HTMLSelectElement, AccessibleSelectProps>(
  ({ 
    className, 
    error, 
    label, 
    description, 
    showRequiredIndicator, 
    required, 
    options,
    placeholder,
    ...props 
  }, ref) => {
    const selectId = React.useId()
    const errorId = error ? `${selectId}-error` : undefined
    const descriptionId = description ? `${selectId}-description` : undefined
    
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={selectId} className="flex items-center gap-1">
            {label}
            {(required || showRequiredIndicator) && (
              <span className="text-destructive" aria-label="required">
                *
              </span>
            )}
          </Label>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-destructive focus-visible:ring-destructive',
            className
          )}
          aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error}
          aria-required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    )
  }
)
AccessibleSelect.displayName = 'AccessibleSelect'

// Accessible fieldset for grouping related form controls
interface FieldsetProps {
  legend: string
  children: React.ReactNode
  className?: string
  description?: string
}

export function Fieldset({ legend, children, className, description }: FieldsetProps) {
  const fieldsetId = React.useId()
  const descriptionId = description ? `${fieldsetId}-description` : undefined
  
  return (
    <fieldset 
      className={cn('space-y-4', className)}
      aria-describedby={descriptionId}
    >
      <legend className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {legend}
      </legend>
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      <div className="space-y-4">
        {children}
      </div>
    </fieldset>
  )
}

// Accessible form with proper structure and error handling
interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting?: boolean
  submitLabel?: string
  submitDisabled?: boolean
  errors?: Record<string, string>
  className?: string
}

export function AccessibleForm({
  children,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Submit',
  submitDisabled = false,
  errors = {},
  className,
  ...props
}: AccessibleFormProps) {
  const formRef = React.useRef<HTMLFormElement>(null)
  const hasErrors = Object.keys(errors).length > 0

  // Focus first error field when errors change
  React.useEffect(() => {
    if (hasErrors && formRef.current) {
      const firstErrorField = formRef.current.querySelector('[aria-invalid="true"]') as HTMLElement
      if (firstErrorField) {
        firstErrorField.focus()
      }
    }
  }, [hasErrors])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Announce form submission to screen readers
    const announcement = document.createElement('div')
    announcement.setAttribute('aria-live', 'polite')
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = isSubmitting ? 'Form is being submitted...' : 'Form submitted'
    
    document.body.appendChild(announcement)
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement)
      }
    }, 1000)
    
    onSubmit(e)
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate // We handle validation ourselves for better UX
      {...props}
    >
      {hasErrors && (
        <div 
          role="alert" 
          aria-live="polite"
          className="rounded-md border border-destructive bg-destructive/10 p-4"
        >
          <h3 className="text-sm font-medium text-destructive mb-2">
            Please correct the following errors:
          </h3>
          <ul className="text-sm text-destructive space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field}>• {error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {children}
      
      <Button
        type="submit"
        disabled={isSubmitting || submitDisabled}
        className="w-full sm:w-auto"
        aria-describedby={isSubmitting ? 'submit-status' : undefined}
      >
        {isSubmitting ? 'Submitting...' : submitLabel}
      </Button>
      
      {isSubmitting && (
        <div id="submit-status" className="sr-only" aria-live="polite">
          Form is being submitted, please wait...
        </div>
      )}
    </form>
  )
}