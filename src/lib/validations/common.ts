import { z } from 'zod';

// Common validation patterns
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(254, 'Email must be less than 254 characters'); // RFC 5321 limit

export const phoneSchema = z
  .string()
  .regex(
    /^[\+]?[1-9][\d]{0,15}$/,
    'Please enter a valid phone number (10-16 digits, optional country code)'
  )
  .optional()
  .or(z.literal(''));

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, apostrophes, and periods');

export const companySchema = z
  .string()
  .max(100, 'Company name must be less than 100 characters')
  .optional();

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .max(2048, 'URL must be less than 2048 characters')
  .optional()
  .or(z.literal(''));

// File validation
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

export const fileSchema = z.object({
  name: z.string().min(1, 'File name is required'),
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 5MB'),
  type: z.string().refine(
    (type) => ACCEPTED_FILE_TYPES.includes(type),
    'Only PDF, DOC, DOCX, TXT, CSV, XLS, and XLSX files are allowed'
  )
});

// Text content validation
export const shortTextSchema = z
  .string()
  .min(1, 'This field is required')
  .max(100, 'Text must be less than 100 characters')
  .trim();

export const mediumTextSchema = z
  .string()
  .min(10, 'Please provide at least 10 characters')
  .max(500, 'Text must be less than 500 characters')
  .trim();

export const longTextSchema = z
  .string()
  .min(10, 'Please provide at least 10 characters')
  .max(2000, 'Text must be less than 2000 characters')
  .trim();

// Honeypot field for bot detection
export const honeypotSchema = z
  .string()
  .max(0, 'This field should be empty')
  .optional();

// Rate limiting validation
export const rateLimitSchema = z.object({
  timestamp: z.number(),
  ip: z.string().ip(),
  userAgent: z.string().optional(),
});

// Common error messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'File type not supported',
  TEXT_TOO_SHORT: 'Please provide more details',
  TEXT_TOO_LONG: 'Text is too long',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment and try again.',
} as const;

// Validation result types
export type ValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: {
    message: string;
    field?: string;
    code?: string;
  };
};

// Helper function to safely validate data
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  try {
    const result = schema.safeParse(data);
    
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      const firstError = result.error.errors[0];
      return {
        success: false,
        error: {
          message: firstError.message,
          field: firstError.path.join('.'),
          code: firstError.code,
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      error: {
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        code: 'VALIDATION_EXCEPTION',
      },
    };
  }
}

// Helper to format Zod errors for user display
export function formatZodError(error: z.ZodError): Record<string, string> {
  const formattedErrors: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });
  
  return formattedErrors;
}