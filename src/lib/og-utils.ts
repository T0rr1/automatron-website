// Utilities for generating Open Graph images

export interface OGImageParams {
  title: string;
  description?: string;
  type?: 'website' | 'service' | 'case-study' | 'about' | 'contact';
  serviceName?: string;
  timeSaved?: string;
  industry?: string;
}

/**
 * Generate Open Graph image URL with parameters
 */
export function generateOGImageUrl(params: OGImageParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://automatron.ai';
  const searchParams = new URLSearchParams();
  
  searchParams.set('title', params.title);
  
  if (params.description) {
    searchParams.set('description', params.description);
  }
  
  if (params.type) {
    searchParams.set('type', params.type);
  }
  
  if (params.serviceName) {
    searchParams.set('service', params.serviceName);
  }
  
  if (params.timeSaved) {
    searchParams.set('timeSaved', params.timeSaved);
  }
  
  if (params.industry) {
    searchParams.set('industry', params.industry);
  }
  
  return `${baseUrl}/api/og?${searchParams.toString()}`;
}

/**
 * Generate service-specific OG image
 */
export function generateServiceOGImage(serviceName: string, description: string): string {
  return generateOGImageUrl({
    title: `${serviceName} - Professional Automation Service`,
    description: `${description} Starting at $249 with 1-7 day turnaround.`,
    type: 'service',
    serviceName,
  });
}

/**
 * Generate case study OG image
 */
export function generateCaseStudyOGImage(
  title: string, 
  industry: string, 
  timeSaved: string
): string {
  return generateOGImageUrl({
    title,
    description: `See how we helped a ${industry} business save ${timeSaved} through automation.`,
    type: 'case-study',
    industry,
    timeSaved,
  });
}

/**
 * Generate homepage OG image
 */
export function generateHomeOGImage(): string {
  return generateOGImageUrl({
    title: 'Save 2-5 Hours Per Week Through Automation',
    description: 'Professional automation services for solo business owners and small teams.',
    type: 'website',
  });
}

/**
 * Generate about page OG image
 */
export function generateAboutOGImage(): string {
  return generateOGImageUrl({
    title: 'About Automatron.ai - Professional Automation Experts',
    description: 'Learn about our mission to save busy professionals time through practical automation.',
    type: 'about',
  });
}

/**
 * Generate contact page OG image
 */
export function generateContactOGImage(): string {
  return generateOGImageUrl({
    title: 'Contact Automatron.ai - Start Your Automation Project',
    description: 'Get started with professional automation services. Free consultation available.',
    type: 'contact',
  });
}

/**
 * Validate OG image parameters
 */
export function validateOGParams(params: OGImageParams): boolean {
  // Title is required and should be reasonable length
  if (!params.title || params.title.length < 10 || params.title.length > 100) {
    return false;
  }
  
  // Description should be reasonable length if provided
  if (params.description && (params.description.length < 20 || params.description.length > 200)) {
    return false;
  }
  
  // Type should be one of the allowed values
  const allowedTypes = ['website', 'service', 'case-study', 'about', 'contact'];
  if (params.type && !allowedTypes.includes(params.type)) {
    return false;
  }
  
  return true;
}

/**
 * Get default OG image fallback
 */
export function getDefaultOGImage(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://automatron.ai';
  return `${baseUrl}/og-default.png`;
}