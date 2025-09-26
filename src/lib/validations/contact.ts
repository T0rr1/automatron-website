import { z } from 'zod'
import { ServiceCategoryType, ServicePackageType, ProjectTimelineType } from '@/types'
import { InputSanitizer, FileValidator } from '@/lib/security'

// File validation schema with enhanced security
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf', 
  'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
  'text/plain',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const fileSchema = z.object({
  name: z.string()
    .min(1, 'File name is required')
    .max(255, 'File name too long')
    .refine((name) => {
      const validation = FileValidator.validateFile({ name, size: 1, type: 'application/pdf' });
      return !validation.errors.some(error => error.includes('dangerous'));
    }, 'File name contains invalid characters'),
  size: z.number()
    .min(1, 'File cannot be empty')
    .max(MAX_FILE_SIZE, 'File size must be less than 5MB'),
  type: z.string().refine(
    (type) => ACCEPTED_FILE_TYPES.includes(type),
    'Only PDF, DOC, DOCX, TXT, CSV, XLS, and XLSX files are allowed'
  )
})

// Step 1: Basic Information with security validation
export const basicInfoSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods')
    .transform(InputSanitizer.sanitizeText),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email must be less than 254 characters')
    .refine((email) => {
      // Additional security checks
      const suspiciousPatterns = [
        /javascript:/i,
        /<script/i,
        /on\w+\s*=/i,
        /data:text\/html/i
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(email));
    }, 'Email contains invalid characters')
    .transform(InputSanitizer.sanitizeEmail),
  company: z.string()
    .max(100, 'Company name must be less than 100 characters')
    .optional()
    .transform((val) => val ? InputSanitizer.sanitizeText(val) : val),
  phone: z.string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal(''))
    .transform((val) => val ? InputSanitizer.sanitizePhone(val) : val),
  // Honeypot field for bot detection
  website: z.string().max(0, 'This field should be empty').optional().default('')
})

// Step 2: Project Details with security validation
export const projectDetailsSchema = z.object({
  serviceCategories: z.array(z.nativeEnum(ServiceCategoryType)).min(1, 'Please select at least one service category'),
  currentProcess: z.string()
    .min(10, 'Please describe your current process (at least 10 characters)')
    .max(2000, 'Description must be less than 2000 characters')
    .refine((text) => {
      // Check for script injection attempts
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /vbscript:/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(text));
    }, 'Description contains potentially dangerous content')
    .transform(InputSanitizer.sanitizeText),
  desiredOutcome: z.string()
    .min(10, 'Please describe your desired outcome (at least 10 characters)')
    .max(2000, 'Description must be less than 2000 characters')
    .refine((text) => {
      // Check for script injection attempts
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /vbscript:/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(text));
    }, 'Description contains potentially dangerous content')
    .transform(InputSanitizer.sanitizeText),
  painPoints: z.array(z.string()).min(1, 'Please select at least one pain point')
})

// Step 3: Service Package & Timeline
export const packageTimelineSchema = z.object({
  servicePackage: z.nativeEnum(ServicePackageType, {
    required_error: 'Please select a service package'
  }),
  timeline: z.nativeEnum(ProjectTimelineType, {
    required_error: 'Please select a timeline'
  }),
  budget: z.string().max(100, 'Budget description must be less than 100 characters').optional()
})

// Step 4: File Uploads & Additional Notes with security validation
export const filesNotesSchema = z.object({
  files: z.array(fileSchema).max(5, 'Maximum 5 files allowed').optional(),
  additionalNotes: z.string()
    .max(2000, 'Additional notes must be less than 2000 characters')
    .optional()
    .refine((text) => {
      if (!text) return true;
      // Check for script injection attempts
      const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i,
        /data:text\/html/i,
        /vbscript:/i
      ];
      return !dangerousPatterns.some(pattern => pattern.test(text));
    }, 'Additional notes contain potentially dangerous content')
    .transform((val) => val ? InputSanitizer.sanitizeText(val) : val)
})

// Complete form schema
export const contactFormSchema = z.object({
  ...basicInfoSchema.shape,
  ...projectDetailsSchema.shape,
  ...packageTimelineSchema.shape,
  ...filesNotesSchema.shape
})

// Individual step schemas for validation
export const stepSchemas = {
  1: basicInfoSchema,
  2: projectDetailsSchema,
  3: packageTimelineSchema,
  4: filesNotesSchema
}

export type ContactFormData = z.infer<typeof contactFormSchema>
export type BasicInfoData = z.infer<typeof basicInfoSchema>
export type ProjectDetailsData = z.infer<typeof projectDetailsSchema>
export type PackageTimelineData = z.infer<typeof packageTimelineSchema>
export type FilesNotesData = z.infer<typeof filesNotesSchema>