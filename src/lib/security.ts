import { z } from 'zod';

// Input sanitization utilities
export class InputSanitizer {
  /**
   * Remove HTML tags and potentially dangerous characters
   */
  static sanitizeHTML(input: string): string {
    return input
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, '') // Remove event handlers
      .replace(/&lt;script&gt;/gi, '') // Remove encoded script tags
      .replace(/&lt;\/script&gt;/gi, '')
      .trim();
  }

  /**
   * Sanitize text input for safe storage and display
   */
  static sanitizeText(input: string): string {
    return this.sanitizeHTML(input)
      .replace(/[<>'"&]/g, (char) => {
        const entities: Record<string, string> = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return entities[char] || char;
      });
  }

  /**
   * Sanitize email input
   */
  static sanitizeEmail(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^\w@.-]/g, ''); // Only allow word chars, @, ., and -
  }

  /**
   * Sanitize phone number input
   */
  static sanitizePhone(input: string): string {
    return input.replace(/[^\d+\-\s()]/g, '').trim();
  }

  /**
   * Sanitize URL input
   */
  static sanitizeURL(input: string): string {
    try {
      const url = new URL(input);
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new Error('Invalid protocol');
      }
      return url.toString();
    } catch {
      return '';
    }
  }

  /**
   * Sanitize file name
   */
  static sanitizeFileName(input: string): string {
    return input
      .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace invalid chars with underscore
      .replace(/_{2,}/g, '_') // Replace multiple underscores with single
      .substring(0, 255); // Limit length
  }
}

// File validation and security
export class FileValidator {
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  private static readonly ALLOWED_EXTENSIONS = [
    '.pdf', '.doc', '.docx', '.txt', '.csv', '.xls', '.xlsx'
  ];

  /**
   * Validate file size
   */
  static validateSize(size: number): boolean {
    return size > 0 && size <= this.MAX_FILE_SIZE;
  }

  /**
   * Validate MIME type
   */
  static validateMimeType(mimeType: string): boolean {
    return this.ALLOWED_MIME_TYPES.includes(mimeType.toLowerCase());
  }

  /**
   * Validate file extension
   */
  static validateExtension(fileName: string): boolean {
    const extension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'));
    return this.ALLOWED_EXTENSIONS.includes(extension);
  }

  /**
   * Comprehensive file validation
   */
  static validateFile(file: { name: string; size: number; type: string }): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!this.validateSize(file.size)) {
      errors.push('File size must be less than 5MB');
    }

    if (!this.validateMimeType(file.type)) {
      errors.push('File type not supported. Only PDF, DOC, DOCX, TXT, CSV, XLS, and XLSX files are allowed');
    }

    if (!this.validateExtension(file.name)) {
      errors.push('File extension not allowed');
    }

    // Check for potentially dangerous file names
    if (this.isDangerousFileName(file.name)) {
      errors.push('File name contains potentially dangerous characters');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Check for dangerous file names
   */
  private static isDangerousFileName(fileName: string): boolean {
    const dangerousPatterns = [
      /\.\./,           // Directory traversal
      /[<>:"|?*]/,      // Windows invalid chars
      /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i, // Windows reserved names
      /^\./,            // Hidden files
      /\.(exe|bat|cmd|scr|pif|com|dll|vbs|js|jar|app)$/i // Executable extensions
    ];

    return dangerousPatterns.some(pattern => pattern.test(fileName));
  }
}

// Security validation schemas
export const securitySchemas = {
  // Enhanced email validation with security checks
  secureEmail: z
    .string()
    .min(1, 'Email is required')
    .max(254, 'Email must be less than 254 characters')
    .email('Please enter a valid email address')
    .refine((email) => {
      // Additional security checks
      const suspiciousPatterns = [
        /javascript:/i,
        /<script/i,
        /on\w+\s*=/i,
        /data:text\/html/i
      ];
      return !suspiciousPatterns.some(pattern => pattern.test(email));
    }, 'Email contains invalid characters'),

  // Secure text input validation
  secureText: z
    .string()
    .min(1, 'This field is required')
    .max(2000, 'Text must be less than 2000 characters')
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
    }, 'Text contains potentially dangerous content')
    .transform(InputSanitizer.sanitizeText),

  // Secure URL validation
  secureURL: z
    .string()
    .optional()
    .refine((url) => {
      if (!url) return true;
      try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Please enter a valid HTTP or HTTPS URL')
    .transform((url) => url ? InputSanitizer.sanitizeURL(url) : ''),

  // Honeypot field for bot detection
  honeypot: z
    .string()
    .max(0, 'This field should be empty')
    .optional()
    .default(''),

  // CSRF token validation
  csrfToken: z
    .string()
    .min(1, 'CSRF token is required')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Invalid CSRF token format'),
};

// CSRF protection utilities
export class CSRFProtection {
  private static readonly TOKEN_LENGTH = 32;

  /**
   * Generate a CSRF token
   */
  static generateToken(): string {
    const array = new Uint8Array(this.TOKEN_LENGTH);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string, expectedToken: string): boolean {
    if (!token || !expectedToken) return false;
    if (token.length !== expectedToken.length) return false;
    
    // Constant-time comparison to prevent timing attacks
    let result = 0;
    for (let i = 0; i < token.length; i++) {
      result |= token.charCodeAt(i) ^ expectedToken.charCodeAt(i);
    }
    return result === 0;
  }
}

// Request origin validation
export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    'http://localhost:3000',
    'https://localhost:3000'
  ].filter(Boolean);

  // Check origin header
  if (origin && !allowedOrigins.includes(origin)) {
    return false;
  }

  // Check referer header as fallback
  if (!origin && referer) {
    try {
      const refererURL = new URL(referer);
      const refererOrigin = `${refererURL.protocol}//${refererURL.host}`;
      return allowedOrigins.includes(refererOrigin);
    } catch {
      return false;
    }
  }

  return true;
}

// Security headers utility
export function getSecurityHeaders(nonce?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()'
  };

  if (process.env.NODE_ENV === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  if (nonce) {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "upgrade-insecure-requests",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      `style-src 'self' 'nonce-${nonce}' 'unsafe-inline'`,
      `script-src 'self' 'nonce-${nonce}' https://plausible.io`,
      "connect-src 'self' https://plausible.io https://api.resend.com https://vitals.vercel-insights.com",
      "media-src 'self' data: blob:",
      "worker-src 'self' blob:",
      "child-src 'self'",
      "frame-src 'none'"
    ].join('; ');
    
    headers['Content-Security-Policy'] = csp;
  }

  return headers;
}