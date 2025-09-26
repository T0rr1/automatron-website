import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { z } from 'zod'
import { 
  createApiRoute, 
  validateRequestBody, 
  createSuccessResponse, 
  ApiError, 
  ApiErrorCode 
} from '@/lib/api-error-handler'
import { captureError, addBreadcrumb } from '@/lib/error-monitoring'

// Rate limiting (simple in-memory implementation)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>()
const RATE_LIMIT_MAX = 5 // 5 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit) {
    rateLimitMap.set(ip, { count: 1, lastReset: now })
    return true
  }

  if (now - userLimit.lastReset > RATE_LIMIT_WINDOW) {
    userLimit.count = 1
    userLimit.lastReset = now
    return true
  }

  if (userLimit.count >= RATE_LIMIT_MAX) {
    return false
  }

  userLimit.count++
  return true
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  return 'unknown'
}

function sanitizeInput(input: string): string {
  // Remove HTML tags and limit length
  return input.replace(/<[^>]*>/g, '').trim().slice(0, 2000)
}

async function handleContactSubmission(request: NextRequest) {
  // Add breadcrumb for tracking
  addBreadcrumb('Contact form submission started', 'api', 'info', {
    method: request.method,
    url: request.url,
  });

  // Verify origin for security
  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && !origin.includes(host || '')) {
    throw new ApiError(
      'Invalid origin',
      ApiErrorCode.FORBIDDEN,
      403
    );
  }

  try {
    const formData = await request.formData()
    
    // Extract form fields
    const data = {
      name: sanitizeInput(formData.get('name') as string || ''),
      email: sanitizeInput(formData.get('email') as string || ''),
      company: sanitizeInput(formData.get('company') as string || ''),
      phone: sanitizeInput(formData.get('phone') as string || ''),
      serviceCategories: JSON.parse(formData.get('serviceCategories') as string || '[]'),
      currentProcess: sanitizeInput(formData.get('currentProcess') as string || ''),
      desiredOutcome: sanitizeInput(formData.get('desiredOutcome') as string || ''),
      painPoints: JSON.parse(formData.get('painPoints') as string || '[]'),
      servicePackage: formData.get('servicePackage') as string,
      timeline: formData.get('timeline') as string,
      budget: sanitizeInput(formData.get('budget') as string || ''),
      additionalNotes: sanitizeInput(formData.get('additionalNotes') as string || '')
    }

    // Handle file uploads
    const fileCount = parseInt(formData.get('fileCount') as string || '0')
    const files = []
    for (let i = 0; i < fileCount; i++) {
      const file = formData.get(`file_${i}`) as File
      if (file) {
        files.push({
          name: file.name,
          size: file.size,
          type: file.type
        })
      }
    }

    // Validate the data
    const validatedData = contactFormSchema.parse({
      ...data,
      files: files.length > 0 ? files : undefined
    })

    addBreadcrumb('Contact form validation successful', 'api', 'info', {
      serviceCategories: validatedData.serviceCategories,
      servicePackage: validatedData.servicePackage,
      fileCount: files.length,
    });

    // Send emails
    await sendEmails(validatedData, files)

    addBreadcrumb('Contact form submission completed', 'api', 'info', {
      email: validatedData.email,
      success: true,
    });

    return createSuccessResponse(
      { submissionId: crypto.randomUUID() },
      'Your request has been submitted successfully. We\'ll get back to you within 24 hours.'
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ApiError(
        'Validation failed',
        ApiErrorCode.VALIDATION_ERROR,
        400,
        { errors: error.flatten().fieldErrors }
      );
    }
    
    // Re-throw other errors to be handled by the error handler
    throw error;
  }
}

// Export the wrapped handler with error handling and rate limiting
export const POST = createApiRoute(handleContactSubmission, {
  methods: ['POST'],
  rateLimit: { limit: 5, windowMs: 60000 }, // 5 requests per minute
});

// Email sending with Resend (or fallback to simulation)
async function sendEmails(data: any, files: any[]) {
  // Check if Resend is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)
      
      // Send notification email to team
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@automatron.ai',
        to: process.env.CONTACT_EMAIL || 'contact@automatron.ai',
        subject: `New Project Request from ${data.name}`,
        html: generateEmailTemplate(data, files)
      })
      
      // Send confirmation email to user
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'noreply@automatron.ai',
        to: data.email,
        subject: 'Your Automation Project Request - Received',
        html: generateConfirmationTemplate(data)
      })
      
      console.log('Emails sent successfully via Resend')
    } catch (error) {
      console.error('Failed to send emails via Resend:', error)
      // Fall back to logging
      console.log('Email content (fallback):', {
        to: data.email,
        subject: 'New Project Request',
        data: data
      })
    }
  } else {
    // Development mode - just log the email content
    console.log('Email sending (development mode):', {
      notification: {
        to: 'contact@automatron.ai',
        subject: `New Project Request from ${data.name}`,
        content: generateEmailTemplate(data, files)
      },
      confirmation: {
        to: data.email,
        subject: 'Your Automation Project Request - Received',
        content: generateConfirmationTemplate(data)
      }
    })
  }
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500))
}

// Email template generators (implement based on your needs)
function generateEmailTemplate(data: any, files: any[]): string {
  return `
    <h2>New Project Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    
    <h3>Project Details</h3>
    <p><strong>Service Categories:</strong> ${data.serviceCategories.join(', ')}</p>
    <p><strong>Current Process:</strong> ${data.currentProcess}</p>
    <p><strong>Desired Outcome:</strong> ${data.desiredOutcome}</p>
    <p><strong>Pain Points:</strong> ${data.painPoints.join(', ')}</p>
    
    <h3>Package & Timeline</h3>
    <p><strong>Service Package:</strong> ${data.servicePackage}</p>
    <p><strong>Timeline:</strong> ${data.timeline}</p>
    <p><strong>Budget:</strong> ${data.budget || 'Not specified'}</p>
    
    ${files.length > 0 ? `
      <h3>Uploaded Files</h3>
      <ul>
        ${files.map(file => `<li>${file.name} (${file.size} bytes)</li>`).join('')}
      </ul>
    ` : ''}
    
    ${data.additionalNotes ? `
      <h3>Additional Notes</h3>
      <p>${data.additionalNotes}</p>
    ` : ''}
  `
}

function generateConfirmationTemplate(data: any): string {
  return `
    <h2>Thank you for your project request!</h2>
    <p>Hi ${data.name},</p>
    <p>We've received your automation project request and will review it carefully. Our team will get back to you within 24 hours with a detailed proposal and next steps.</p>
    
    <h3>What you can expect:</h3>
    <ul>
      <li>A detailed analysis of your requirements</li>
      <li>A custom solution proposal</li>
      <li>Timeline and pricing information</li>
      <li>A brief call to discuss details and answer questions</li>
    </ul>
    
    <p>If you have any urgent questions, feel free to reply to this email.</p>
    
    <p>Best regards,<br>The Automatron Team</p>
  `
}