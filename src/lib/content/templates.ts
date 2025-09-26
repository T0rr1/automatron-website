/**
 * Content Templates
 * 
 * Templates for creating new content with proper frontmatter structure
 * and validation for services, case studies, and blog posts.
 */

import { Service, CaseStudy, BlogPost } from './index';

// Service template
export const serviceTemplate = `---
title: "Service Name"
slug: "service-slug"
description: "Brief description of the service and its benefits"
category: "basic-scripting" # basic-scripting | email-file-hygiene | reporting-lite | websites-landing | pc-helpers | reusable-templates
icon: "terminal" # lucide icon name
order: 1
startingPrice: "$249"
turnaround: "1-3 days"
useCases:
  - "Use case 1"
  - "Use case 2"
  - "Use case 3"
targetAudience:
  - "Solo business owners"
  - "Small teams"
  - "Administrative professionals"
deliverables:
  - "PowerShell or Python scripts"
  - "Configuration files"
  - "Detailed documentation"
  - "Support and maintenance guide"
inputs:
  - "Sample files or data"
  - "Current process description"
  - "Requirements specification"
  - "System information"
seo:
  title: "Service Name | Automatron"
  description: "SEO-optimized description for search engines"
  ogImage: "/images/services/service-og.jpg"
---

# Service Name

Brief introduction to the service and what it accomplishes.

## What This Service Includes

### Feature 1
Description of the first major feature or capability.

### Feature 2
Description of the second major feature or capability.

## Before & After Scenarios

### Scenario 1: Common Use Case
**Before:** Description of the manual process and pain points.

**After:** Description of the automated solution and benefits.

## Sample Code Preview

\`\`\`powershell
# Example script snippet
param(
    [string]$InputPath,
    [string]$OutputPath
)

# Main logic here
Write-Host "Processing automation..."
\`\`\`

## Frequently Asked Questions

### How long does implementation take?
Answer to common timing questions.

### What if I need changes later?
Answer about maintenance and updates.

## Ready to Get Started?

Call-to-action text encouraging contact.
`;

// Case study template
export const caseStudyTemplate = `---
title: "Case Study Title"
slug: "case-study-slug"
client: "Anonymized Client Name"
industry: "Industry Sector"
serviceCategory: "basic-scripting" # Must match service category
challenge: "Brief description of the main challenge or problem"
solution: "Brief description of the automation solution implemented"
publishedAt: "2024-09-25"
featured: true
results:
  timeSavedPerWeek: 8
  successRate: 98
  turnaroundTime: "3 days"
  clientSatisfaction: 5
  businessImpact: "Quantified business impact description"
deliverables:
  - "Specific deliverable 1"
  - "Specific deliverable 2"
  - "Specific deliverable 3"
metrics:
  - label: "Metric Name"
    value: 100
    unit: "units"
    improvement: "+50%"
  - label: "Another Metric"
    value: "Qualitative Value"
    improvement: "85% improvement"
beforeAfter:
  before: "Detailed description of the manual process and its problems"
  after: "Detailed description of the automated solution and its benefits"
seo:
  title: "Case Study Title | X Hours Saved Weekly"
  description: "SEO description highlighting key results and benefits"
  ogImage: "/images/case-studies/case-study-og.jpg"
---

# Case Study Title

## The Challenge

Detailed description of the client's situation, pain points, and business impact.

### Pain Points
- Specific problem 1
- Specific problem 2
- Specific problem 3

### Business Impact
Description of how these problems affected the business.

## The Solution

Detailed description of the automation solution implemented.

### Key Features Implemented

1. **Feature 1**
   - Technical details
   - Implementation approach
   - Benefits achieved

2. **Feature 2**
   - Technical details
   - Implementation approach
   - Benefits achieved

## Implementation Process

### Week 1: Analysis & Planning
Description of the analysis phase.

### Week 2: Development & Testing
Description of the development phase.

### Week 3: Deployment & Training
Description of the deployment phase.

## Results Achieved

### Quantitative Improvements

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Processing Time | X hours | Y hours | Z% reduction |
| Accuracy Rate | X% | Y% | Z% improvement |

### Qualitative Benefits

- Benefit 1
- Benefit 2
- Benefit 3

## Client Testimonial

> "Quote from the client about the impact and results."
> 
> **— Client Title, Company Name**

## Technical Architecture

Description of the technical implementation.

## Lessons Learned

Key insights and success factors from the project.

## ROI Analysis

Financial impact and return on investment details.
`;

// Blog post template
export const blogPostTemplate = `---
title: "Blog Post Title"
slug: "blog-post-slug"
description: "Brief description of the blog post content"
author: "Author Name"
publishedAt: "2024-09-25"
updatedAt: "2024-09-25"
featured: false
tags:
  - "automation"
  - "productivity"
  - "business-efficiency"
readingTime: 5
excerpt: "Brief excerpt that appears in listings and social shares"
seo:
  title: "Blog Post Title | Automatron Blog"
  description: "SEO-optimized description for search engines"
  ogImage: "/images/blog/blog-post-og.jpg"
---

# Blog Post Title

Introduction paragraph that hooks the reader and explains what they'll learn.

## Main Section 1

Content for the first main section.

### Subsection
More detailed content with examples.

## Main Section 2

Content for the second main section.

## Conclusion

Summary and call-to-action for readers.
`;

// Content validation functions
export function validateServiceTemplate(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for required frontmatter fields
  const requiredFields = ['title', 'slug', 'description', 'category', 'startingPrice', 'turnaround'];
  
  requiredFields.forEach(field => {
    if (!content.includes(`${field}:`)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Check for valid category
  const validCategories = [
    'basic-scripting',
    'email-file-hygiene', 
    'reporting-lite',
    'websites-landing',
    'pc-helpers',
    'reusable-templates'
  ];
  
  const categoryMatch = content.match(/category:\s*["']?([^"'\n]+)["']?/);
  if (categoryMatch && !validCategories.includes(categoryMatch[1])) {
    errors.push(`Invalid category: ${categoryMatch[1]}. Must be one of: ${validCategories.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateCaseStudyTemplate(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for required frontmatter fields
  const requiredFields = ['title', 'slug', 'client', 'industry', 'serviceCategory', 'challenge', 'solution'];
  
  requiredFields.forEach(field => {
    if (!content.includes(`${field}:`)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Check for results section
  if (!content.includes('results:')) {
    errors.push('Missing required results section');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateBlogPostTemplate(content: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check for required frontmatter fields
  const requiredFields = ['title', 'slug', 'description', 'author', 'publishedAt'];
  
  requiredFields.forEach(field => {
    if (!content.includes(`${field}:`)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Content creation helpers
export function createServiceContent(data: Partial<Service>): string {
  let template = serviceTemplate;
  
  // Replace template placeholders with actual data
  if (data.title) {
    template = template.replace('title: "Service Name"', `title: "${data.title}"`);
    template = template.replace('# Service Name', `# ${data.title}`);
  }
  
  if (data.slug) {
    template = template.replace('slug: "service-slug"', `slug: "${data.slug}"`);
  }
  
  if (data.description) {
    template = template.replace('description: "Brief description of the service and its benefits"', `description: "${data.description}"`);
  }
  
  if (data.category) {
    template = template.replace('category: "basic-scripting"', `category: "${data.category}"`);
  }
  
  if (data.startingPrice) {
    template = template.replace('startingPrice: "$249"', `startingPrice: "${data.startingPrice}"`);
  }
  
  if (data.turnaround) {
    template = template.replace('turnaround: "1-3 days"', `turnaround: "${data.turnaround}"`);
  }
  
  return template;
}

export function createCaseStudyContent(data: Partial<CaseStudy>): string {
  let template = caseStudyTemplate;
  
  // Replace template placeholders with actual data
  if (data.title) {
    template = template.replace('title: "Case Study Title"', `title: "${data.title}"`);
    template = template.replace('# Case Study Title', `# ${data.title}`);
  }
  
  if (data.slug) {
    template = template.replace('slug: "case-study-slug"', `slug: "${data.slug}"`);
  }
  
  if (data.client) {
    template = template.replace('client: "Anonymized Client Name"', `client: "${data.client}"`);
  }
  
  if (data.industry) {
    template = template.replace('industry: "Industry Sector"', `industry: "${data.industry}"`);
  }
  
  if (data.serviceCategory) {
    template = template.replace('serviceCategory: "basic-scripting"', `serviceCategory: "${data.serviceCategory}"`);
  }
  
  return template;
}

export function createBlogPostContent(data: Partial<BlogPost>): string {
  let template = blogPostTemplate;
  
  // Replace template placeholders with actual data
  if (data.title) {
    template = template.replace('title: "Blog Post Title"', `title: "${data.title}"`);
    template = template.replace('# Blog Post Title', `# ${data.title}`);
  }
  
  if (data.slug) {
    template = template.replace('slug: "blog-post-slug"', `slug: "${data.slug}"`);
  }
  
  if (data.description) {
    template = template.replace('description: "Brief description of the blog post content"', `description: "${data.description}"`);
  }
  
  if (data.author) {
    template = template.replace('author: "Author Name"', `author: "${data.author}"`);
  }
  
  return template;
}

// Content governance utilities
export function generateContentChecklist(type: 'service' | 'case-study' | 'blog'): string[] {
  const baseChecklist = [
    'Frontmatter is complete and valid',
    'Title is descriptive and SEO-friendly',
    'Description is compelling and accurate',
    'Content is well-structured with proper headings',
    'Links are working and relevant',
    'Images have alt text and proper sizing',
    'SEO metadata is optimized',
  ];
  
  switch (type) {
    case 'service':
      return [
        ...baseChecklist,
        'Service category is correct',
        'Pricing information is current',
        'Turnaround time is realistic',
        'Use cases are relevant and specific',
        'Deliverables are clearly listed',
        'Code examples are functional',
        'FAQ section addresses common concerns',
      ];
      
    case 'case-study':
      return [
        ...baseChecklist,
        'Client information is anonymized',
        'Results are quantified and accurate',
        'Before/after comparison is clear',
        'Technical details are sufficient',
        'Testimonial is authentic',
        'Metrics are properly formatted',
        'Implementation timeline is realistic',
      ];
      
    case 'blog':
      return [
        ...baseChecklist,
        'Content is original and valuable',
        'Reading time is accurate',
        'Tags are relevant and consistent',
        'Excerpt is engaging',
        'Call-to-action is appropriate',
        'Content is up-to-date',
      ];
      
    default:
      return baseChecklist;
  }
}