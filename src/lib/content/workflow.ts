/**
 * Content Editing Workflow
 * 
 * Utilities for managing content creation, editing, and publishing workflows
 * with validation, review processes, and quality assurance.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { 
  validateServiceContent, 
  validateCaseStudyContent, 
  validateBlogPostContent,
  ServiceSchema,
  CaseStudySchema,
  BlogPostSchema
} from './index';

// Workflow status enum
export enum WorkflowStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  APPROVED = 'approved',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

// Content workflow metadata
export interface WorkflowMetadata {
  status: WorkflowStatus;
  createdBy: string;
  createdAt: string;
  lastModifiedBy?: string;
  lastModifiedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  publishedBy?: string;
  publishedAt?: string;
  version: number;
  notes?: string;
  checklist?: ContentChecklist;
}

// Content checklist for quality assurance
export interface ContentChecklist {
  contentComplete: boolean;
  grammarChecked: boolean;
  linksVerified: boolean;
  imagesOptimized: boolean;
  seoOptimized: boolean;
  accessibilityChecked: boolean;
  technicalAccuracy: boolean;
  brandConsistency: boolean;
  translationReady?: boolean;
}

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}

/**
 * Create new content with workflow metadata
 */
export function createContentWithWorkflow(
  type: 'service' | 'case-study' | 'blog',
  slug: string,
  author: string,
  initialContent: string
): string {
  const workflow: WorkflowMetadata = {
    status: WorkflowStatus.DRAFT,
    createdBy: author,
    createdAt: new Date().toISOString(),
    version: 1,
    checklist: {
      contentComplete: false,
      grammarChecked: false,
      linksVerified: false,
      imagesOptimized: false,
      seoOptimized: false,
      accessibilityChecked: false,
      technicalAccuracy: false,
      brandConsistency: false,
      translationReady: type !== 'blog', // Services and case studies need translation
    },
  };

  const { data: frontmatter, content } = matter(initialContent);
  
  const contentWithWorkflow = matter.stringify(content, {
    ...frontmatter,
    workflow,
  });

  return contentWithWorkflow;
}

/**
 * Update workflow status
 */
export function updateWorkflowStatus(
  contentPath: string,
  newStatus: WorkflowStatus,
  updatedBy: string,
  notes?: string
): void {
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content file not found: ${contentPath}`);
  }

  const fileContent = fs.readFileSync(contentPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  const currentWorkflow = frontmatter.workflow as WorkflowMetadata;
  
  const updatedWorkflow: WorkflowMetadata = {
    ...currentWorkflow,
    status: newStatus,
    lastModifiedBy: updatedBy,
    lastModifiedAt: new Date().toISOString(),
    version: (currentWorkflow.version || 1) + 1,
    ...(notes && { notes }),
    ...(newStatus === WorkflowStatus.REVIEW && {
      reviewedBy: updatedBy,
      reviewedAt: new Date().toISOString(),
    }),
    ...(newStatus === WorkflowStatus.PUBLISHED && {
      publishedBy: updatedBy,
      publishedAt: new Date().toISOString(),
    }),
  };

  const updatedContent = matter.stringify(content, {
    ...frontmatter,
    workflow: updatedWorkflow,
  });

  fs.writeFileSync(contentPath, updatedContent);
}

/**
 * Validate content comprehensively
 */
export function validateContentComprehensively(
  contentPath: string,
  type: 'service' | 'case-study' | 'blog'
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  try {
    const fileContent = fs.readFileSync(contentPath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);

    // Schema validation
    try {
      switch (type) {
        case 'service':
          ServiceSchema.parse(frontmatter);
          break;
        case 'case-study':
          CaseStudySchema.parse(frontmatter);
          break;
        case 'blog':
          BlogPostSchema.parse(frontmatter);
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.push(...error.errors.map(e => `${e.path.join('.')}: ${e.message}`));
      }
    }

    // Content quality checks
    const contentChecks = performContentQualityChecks(content, frontmatter);
    errors.push(...contentChecks.errors);
    warnings.push(...contentChecks.warnings);
    suggestions.push(...contentChecks.suggestions);

    // SEO checks
    const seoChecks = performSEOChecks(frontmatter, content);
    warnings.push(...seoChecks.warnings);
    suggestions.push(...seoChecks.suggestions);

    // Accessibility checks
    const a11yChecks = performAccessibilityChecks(content);
    warnings.push(...a11yChecks.warnings);
    suggestions.push(...a11yChecks.suggestions);

  } catch (error) {
    errors.push(`Failed to read or parse content: ${error}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    suggestions,
  };
}

/**
 * Perform content quality checks
 */
function performContentQualityChecks(
  content: string,
  frontmatter: any
): { errors: string[]; warnings: string[]; suggestions: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check content length
  if (content.length < 500) {
    warnings.push('Content is quite short (less than 500 characters)');
  }

  // Check for proper heading structure
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  if (headings.length === 0) {
    warnings.push('No headings found in content');
  }

  // Check for code blocks in technical content
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  if (frontmatter.category === 'basic-scripting' && codeBlocks.length === 0) {
    suggestions.push('Consider adding code examples for technical content');
  }

  // Check for call-to-action
  const ctaKeywords = ['contact', 'get started', 'learn more', 'book', 'schedule'];
  const hasCTA = ctaKeywords.some(keyword => 
    content.toLowerCase().includes(keyword.toLowerCase())
  );
  if (!hasCTA) {
    suggestions.push('Consider adding a call-to-action to encourage engagement');
  }

  // Check for broken internal links
  const internalLinks = content.match(/\[.*?\]\(\/[^)]+\)/g) || [];
  if (internalLinks.length > 0) {
    suggestions.push('Verify that all internal links are working correctly');
  }

  return { errors, warnings, suggestions };
}

/**
 * Perform SEO checks
 */
function performSEOChecks(
  frontmatter: any,
  content: string
): { warnings: string[]; suggestions: string[] } {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check title length
  if (frontmatter.title && frontmatter.title.length > 60) {
    warnings.push('Title is longer than 60 characters (may be truncated in search results)');
  }

  // Check description length
  if (frontmatter.description) {
    if (frontmatter.description.length > 160) {
      warnings.push('Description is longer than 160 characters (may be truncated in search results)');
    }
    if (frontmatter.description.length < 120) {
      suggestions.push('Consider expanding the description to 120-160 characters for better SEO');
    }
  }

  // Check for SEO metadata
  if (!frontmatter.seo) {
    suggestions.push('Consider adding SEO metadata (title, description, ogImage)');
  }

  // Check for focus keywords
  const title = frontmatter.title?.toLowerCase() || '';
  const description = frontmatter.description?.toLowerCase() || '';
  const contentLower = content.toLowerCase();

  const automationKeywords = ['automation', 'automate', 'script', 'workflow'];
  const hasAutomationKeywords = automationKeywords.some(keyword =>
    title.includes(keyword) || description.includes(keyword) || contentLower.includes(keyword)
  );

  if (!hasAutomationKeywords) {
    suggestions.push('Consider including automation-related keywords for better SEO');
  }

  return { warnings, suggestions };
}

/**
 * Perform accessibility checks
 */
function performAccessibilityChecks(
  content: string
): { warnings: string[]; suggestions: string[] } {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  // Check for images without alt text
  const images = content.match(/!\[([^\]]*)\]\([^)]+\)/g) || [];
  const imagesWithoutAlt = images.filter(img => {
    const altMatch = img.match(/!\[([^\]]*)\]/);
    return !altMatch || !altMatch[1] || altMatch[1].trim() === '';
  });

  if (imagesWithoutAlt.length > 0) {
    warnings.push(`${imagesWithoutAlt.length} image(s) missing alt text`);
  }

  // Check for proper heading hierarchy
  const headings = content.match(/^(#{1,6})\s+.+$/gm) || [];
  let previousLevel = 0;
  let hasSkippedLevel = false;

  headings.forEach(heading => {
    const level = heading.match(/^#{1,6}/)?.[0].length || 0;
    if (level > previousLevel + 1) {
      hasSkippedLevel = true;
    }
    previousLevel = level;
  });

  if (hasSkippedLevel) {
    warnings.push('Heading hierarchy skips levels (may affect screen readers)');
  }

  // Check for descriptive link text
  const links = content.match(/\[([^\]]+)\]\([^)]+\)/g) || [];
  const genericLinkText = ['click here', 'read more', 'here', 'link'];
  const hasGenericLinks = links.some(link => {
    const linkText = link.match(/\[([^\]]+)\]/)?.[1]?.toLowerCase() || '';
    return genericLinkText.includes(linkText);
  });

  if (hasGenericLinks) {
    suggestions.push('Use descriptive link text instead of generic phrases like "click here"');
  }

  return { warnings, suggestions };
}

/**
 * Generate content quality report
 */
export function generateContentQualityReport(
  contentDir: string,
  type: 'service' | 'case-study' | 'blog'
): {
  summary: {
    totalFiles: number;
    validFiles: number;
    filesWithErrors: number;
    filesWithWarnings: number;
  };
  details: Array<{
    file: string;
    validation: ValidationResult;
  }>;
} {
  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.mdx'));
  const details: Array<{ file: string; validation: ValidationResult }> = [];

  let validFiles = 0;
  let filesWithErrors = 0;
  let filesWithWarnings = 0;

  files.forEach(file => {
    const filePath = path.join(contentDir, file);
    const validation = validateContentComprehensively(filePath, type);
    
    details.push({ file, validation });

    if (validation.isValid) {
      validFiles++;
    }
    if (validation.errors.length > 0) {
      filesWithErrors++;
    }
    if (validation.warnings.length > 0) {
      filesWithWarnings++;
    }
  });

  return {
    summary: {
      totalFiles: files.length,
      validFiles,
      filesWithErrors,
      filesWithWarnings,
    },
    details,
  };
}

/**
 * Update content checklist
 */
export function updateContentChecklist(
  contentPath: string,
  checklistUpdates: Partial<ContentChecklist>,
  updatedBy: string
): void {
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content file not found: ${contentPath}`);
  }

  const fileContent = fs.readFileSync(contentPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContent);

  const currentWorkflow = frontmatter.workflow as WorkflowMetadata;
  const currentChecklist = currentWorkflow.checklist || {};

  const updatedWorkflow: WorkflowMetadata = {
    ...currentWorkflow,
    lastModifiedBy: updatedBy,
    lastModifiedAt: new Date().toISOString(),
    checklist: {
      ...currentChecklist,
      ...checklistUpdates,
    },
  };

  const updatedContent = matter.stringify(content, {
    ...frontmatter,
    workflow: updatedWorkflow,
  });

  fs.writeFileSync(contentPath, updatedContent);
}

/**
 * Check if content is ready for publication
 */
export function isReadyForPublication(contentPath: string): {
  ready: boolean;
  missingRequirements: string[];
} {
  const fileContent = fs.readFileSync(contentPath, 'utf8');
  const { data: frontmatter } = matter(fileContent);
  
  const workflow = frontmatter.workflow as WorkflowMetadata;
  const checklist = workflow?.checklist;
  
  const missingRequirements: string[] = [];

  if (!checklist?.contentComplete) {
    missingRequirements.push('Content completion');
  }
  if (!checklist?.grammarChecked) {
    missingRequirements.push('Grammar check');
  }
  if (!checklist?.seoOptimized) {
    missingRequirements.push('SEO optimization');
  }
  if (!checklist?.technicalAccuracy) {
    missingRequirements.push('Technical accuracy review');
  }

  return {
    ready: missingRequirements.length === 0,
    missingRequirements,
  };
}