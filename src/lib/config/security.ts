// Security configuration constants and utilities

export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5'),
    WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  },
  
  // File upload limits
  FILE_UPLOAD: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_FILES: 5,
    ALLOWED_TYPES: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ],
    ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt', '.csv', '.xls', '.xlsx']
  },
  
  // Input validation
  INPUT_LIMITS: {
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 254,
    COMPANY_MAX_LENGTH: 100,
    PHONE_MAX_LENGTH: 20,
    TEXT_MAX_LENGTH: 2000,
    NOTES_MAX_LENGTH: 2000
  },
  
  // Security patterns
  DANGEROUS_PATTERNS: [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /vbscript:/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<link/i,
    /<meta/i
  ],
  
  // Allowed origins for CORS
  ALLOWED_ORIGINS: [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3000',
    'https://localhost:3000'
  ].filter(Boolean),
  
  // CSP configuration
  CSP: {
    DEFAULT_SRC: ["'self'"],
    SCRIPT_SRC: [
      "'self'",
      "'nonce-{NONCE}'",
      "https://plausible.io",
      ...(process.env.NODE_ENV === 'development' ? ["'unsafe-eval'"] : [])
    ],
    STYLE_SRC: [
      "'self'",
      "'nonce-{NONCE}'",
      "'unsafe-inline'" // Required for Tailwind CSS
    ],
    IMG_SRC: ["'self'", "data:", "blob:", "https:"],
    FONT_SRC: ["'self'", "data:"],
    CONNECT_SRC: [
      "'self'",
      "https://plausible.io",
      "https://api.resend.com",
      "https://vitals.vercel-insights.com"
    ],
    MEDIA_SRC: ["'self'", "data:", "blob:"],
    WORKER_SRC: ["'self'", "blob:"],
    CHILD_SRC: ["'self'"],
    FRAME_SRC: ["'none'"],
    OBJECT_SRC: ["'none'"],
    BASE_URI: ["'self'"],
    FORM_ACTION: ["'self'"],
    FRAME_ANCESTORS: ["'none'"],
    UPGRADE_INSECURE_REQUESTS: true
  }
} as const;

// Helper function to generate CSP string
export function generateCSP(nonce: string): string {
  const csp = SECURITY_CONFIG.CSP;
  
  const directives = [
    `default-src ${csp.DEFAULT_SRC.join(' ')}`,
    `script-src ${csp.SCRIPT_SRC.join(' ').replace('{NONCE}', nonce)}`,
    `style-src ${csp.STYLE_SRC.join(' ').replace('{NONCE}', nonce)}`,
    `img-src ${csp.IMG_SRC.join(' ')}`,
    `font-src ${csp.FONT_SRC.join(' ')}`,
    `connect-src ${csp.CONNECT_SRC.join(' ')}`,
    `media-src ${csp.MEDIA_SRC.join(' ')}`,
    `worker-src ${csp.WORKER_SRC.join(' ')}`,
    `child-src ${csp.CHILD_SRC.join(' ')}`,
    `frame-src ${csp.FRAME_SRC.join(' ')}`,
    `object-src ${csp.OBJECT_SRC.join(' ')}`,
    `base-uri ${csp.BASE_URI.join(' ')}`,
    `form-action ${csp.FORM_ACTION.join(' ')}`,
    `frame-ancestors ${csp.FRAME_ANCESTORS.join(' ')}`
  ];
  
  if (csp.UPGRADE_INSECURE_REQUESTS) {
    directives.push('upgrade-insecure-requests');
  }
  
  return directives.join('; ');
}

// Validate environment variables
export function validateSecurityConfig(): void {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'RESEND_API_KEY',
    'CONTACT_EMAIL'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.warn('Missing security-related environment variables:', missing);
  }
  
  // Validate rate limit configuration
  if (SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS < 1 || SECURITY_CONFIG.RATE_LIMIT.MAX_REQUESTS > 100) {
    console.warn('Rate limit max requests should be between 1 and 100');
  }
  
  if (SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS < 1000 || SECURITY_CONFIG.RATE_LIMIT.WINDOW_MS > 3600000) {
    console.warn('Rate limit window should be between 1 second and 1 hour');
  }
}

// Security headers for API routes
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=(), payment=(), usb=()',
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0'
} as const;

// Production-only headers
export const PRODUCTION_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
} as const;