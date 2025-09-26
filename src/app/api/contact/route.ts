import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { contactFormSchema } from '@/lib/validations/contact';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { 
  InputSanitizer, 
  FileValidator, 
  validateOrigin, 
  getSecurityHeaders 
} from '@/lib/security';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

// Enhanced validation schema with security measures
const secureContactSchema = contactFormSchema.extend({
  // Honeypot field for bot detection
  website: z.string().max(0, 'Bot detected').optional().default(''),
  // CSRF protection (if implemented)
  _token: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Apply security headers
    const nonce = request.headers.get('X-Nonce') || '';
    const securityHeaders = getSecurityHeaders(nonce);
    
    // Validate request origin
    if (!validateOrigin(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { 
          status: 403,
          headers: securityHeaders
        }
      );
    }

    // Check rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please wait a moment and try again.',
          retryAfter: rateLimitResult.retryAfter 
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            ...getRateLimitHeaders(rateLimitResult)
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Check honeypot field
    if (body.website && body.website.length > 0) {
      // Bot detected, return success but don't process
      return NextResponse.json(
        { success: true, message: 'Thank you for your submission!' },
        { 
          status: 200,
          headers: {
            ...securityHeaders,
            ...getRateLimitHeaders(rateLimitResult)
          }
        }
      );
    }

    // Validate and sanitize input data
    const validationResult = secureContactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        },
        { 
          status: 400,
          headers: {
            ...securityHeaders,
            ...getRateLimitHeaders(rateLimitResult)
          }
        }
      );
    }

    const data = validationResult.data;

    // Sanitize all text inputs
    const sanitizedData = {
      ...data,
      name: InputSanitizer.sanitizeText(data.name),
      email: InputSanitizer.sanitizeEmail(data.email),
      company: data.company ? InputSanitizer.sanitizeText(data.company) : undefined,
      phone: data.phone ? InputSanitizer.sanitizePhone(data.phone) : undefined,
      currentProcess: InputSanitizer.sanitizeText(data.currentProcess),
      desiredOutcome: InputSanitizer.sanitizeText(data.desiredOutcome),
      additionalNotes: data.additionalNotes ? InputSanitizer.sanitizeText(data.additionalNotes) : undefined,
    };

    // Validate uploaded files if any
    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        const fileValidation = FileValidator.validateFile(file);
        if (!fileValidation.isValid) {
          return NextResponse.json(
            { 
              error: 'File validation failed',
              details: fileValidation.errors
            },
            { 
              status: 400,
              headers: {
                ...securityHeaders,
                ...getRateLimitHeaders(rateLimitResult)
              }
            }
          );
        }
      }
    }

    // Send email notification
    await sendContactEmail(sanitizedData);

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission! We\'ll get back to you within 24 hours.' 
      },
      { 
        status: 200,
        headers: {
          ...securityHeaders,
          ...getRateLimitHeaders(rateLimitResult)
        }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { 
        status: 500,
        headers: getSecurityHeaders()
      }
    );
  }
}

async function sendContactEmail(data: any) {
  const emailContent = `
    New Contact Form Submission
    
    Name: ${data.name}
    Email: ${data.email}
    Company: ${data.company || 'Not provided'}
    Phone: ${data.phone || 'Not provided'}
    
    Service Categories: ${data.serviceCategories?.join(', ') || 'Not specified'}
    Service Package: ${data.servicePackage || 'Not specified'}
    Timeline: ${data.timeline || 'Not specified'}
    Budget: ${data.budget || 'Not specified'}
    
    Current Process:
    ${data.currentProcess}
    
    Desired Outcome:
    ${data.desiredOutcome}
    
    Pain Points: ${data.painPoints?.join(', ') || 'Not specified'}
    
    Additional Notes:
    ${data.additionalNotes || 'None'}
    
    Files Uploaded: ${data.files?.length || 0}
    ${data.files?.map((file: any) => `- ${file.name} (${file.type}, ${Math.round(file.size / 1024)}KB)`).join('\n') || ''}
    
    Submitted at: ${new Date().toISOString()}
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@automatron.ai',
      to: process.env.CONTACT_EMAIL || 'contact@automatron.ai',
      subject: `New Contact Form Submission - ${data.name}`,
      text: emailContent,
      replyTo: data.email,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@automatron.ai',
      to: data.email,
      subject: 'Thank you for contacting Automatron.ai',
      text: `
        Hi ${data.name},
        
        Thank you for reaching out to Automatron.ai! We've received your inquiry about our automation services.
        
        We'll review your requirements and get back to you within 24 hours with next steps.
        
        In the meantime, feel free to explore our case studies and service examples on our website.
        
        Best regards,
        The Automatron.ai Team
        
        ---
        This is an automated confirmation. Please do not reply to this email.
      `,
    });
  } catch (emailError) {
    console.error('Failed to send email:', emailError);
    // Don't throw error - form submission should still succeed
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        'Allow': 'POST',
        ...getSecurityHeaders()
      }
    }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        'Allow': 'POST',
        ...getSecurityHeaders()
      }
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { 
      status: 405,
      headers: {
        'Allow': 'POST',
        ...getSecurityHeaders()
      }
    }
  );
}