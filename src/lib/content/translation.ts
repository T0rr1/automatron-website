/**
 * Translation Workflow Utilities
 * 
 * Utilities for managing content translation workflows,
 * validation, and synchronization between English and Spanish content.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// Translation status tracking
export interface TranslationStatus {
  slug: string;
  type: 'service' | 'case-study' | 'blog';
  englishExists: boolean;
  spanishExists: boolean;
  englishLastModified?: Date;
  spanishLastModified?: Date;
  needsTranslation: boolean;
  needsUpdate: boolean;
}

// Translation metadata schema
const TranslationMetaSchema = z.object({
  translatedFrom: z.string().optional(),
  translatedAt: z.string().optional(),
  translator: z.string().optional(),
  reviewedBy: z.string().optional(),
  reviewedAt: z.string().optional(),
  translationNotes: z.string().optional(),
});

export type TranslationMeta = z.infer<typeof TranslationMetaSchema>;

// Content directories for both languages
const CONTENT_DIRS = {
  en: {
    services: path.join(process.cwd(), 'content/services'),
    caseStudies: path.join(process.cwd(), 'content/case-studies'),
    blog: path.join(process.cwd(), 'content/blog'),
  },
  es: {
    services: path.join(process.cwd(), 'content/es/services'),
    caseStudies: path.join(process.cwd(), 'content/es/case-studies'),
    blog: path.join(process.cwd(), 'content/es/blog'),
  },
};

/**
 * Get translation status for all content
 */
export async function getTranslationStatus(): Promise<TranslationStatus[]> {
  const status: TranslationStatus[] = [];
  
  // Check services
  const serviceStatus = await getContentTypeTranslationStatus('services');
  status.push(...serviceStatus);
  
  // Check case studies
  const caseStudyStatus = await getContentTypeTranslationStatus('case-studies');
  status.push(...caseStudyStatus);
  
  // Check blog posts
  const blogStatus = await getContentTypeTranslationStatus('blog');
  status.push(...blogStatus);
  
  return status;
}

/**
 * Get translation status for a specific content type
 */
async function getContentTypeTranslationStatus(
  contentType: 'services' | 'case-studies' | 'blog'
): Promise<TranslationStatus[]> {
  const status: TranslationStatus[] = [];
  const type = contentType === 'case-studies' ? 'case-study' : contentType.slice(0, -1) as 'service' | 'blog';
  
  // Get English content directory
  const enDir = contentType === 'case-studies' 
    ? CONTENT_DIRS.en.caseStudies 
    : CONTENT_DIRS.en[contentType as keyof typeof CONTENT_DIRS.en];
    
  const esDir = contentType === 'case-studies'
    ? CONTENT_DIRS.es.caseStudies
    : CONTENT_DIRS.es[contentType as keyof typeof CONTENT_DIRS.es];
  
  // Ensure directories exist
  if (!fs.existsSync(enDir)) {
    return status;
  }
  
  if (!fs.existsSync(esDir)) {
    fs.mkdirSync(esDir, { recursive: true });
  }
  
  // Get all English files
  const enFiles = fs.readdirSync(enDir).filter(file => file.endsWith('.mdx'));
  const esFiles = fs.readdirSync(esDir).filter(file => file.endsWith('.mdx'));
  
  // Create status for each English file
  for (const enFile of enFiles) {
    const slug = path.basename(enFile, '.mdx');
    const esFile = `${slug}.mdx`;
    
    const enPath = path.join(enDir, enFile);
    const esPath = path.join(esDir, esFile);
    
    const enStats = fs.statSync(enPath);
    const esExists = fs.existsSync(esPath);
    const esStats = esExists ? fs.statSync(esPath) : null;
    
    const needsTranslation = !esExists;
    const needsUpdate = esExists && esStats && enStats.mtime > esStats.mtime;
    
    status.push({
      slug,
      type,
      englishExists: true,
      spanishExists: esExists,
      englishLastModified: enStats.mtime,
      spanishLastModified: esStats?.mtime,
      needsTranslation,
      needsUpdate,
    });
  }
  
  return status;
}

/**
 * Create translation template from English content
 */
export async function createTranslationTemplate(
  slug: string,
  contentType: 'service' | 'case-study' | 'blog'
): Promise<string> {
  const enDir = getEnglishDir(contentType);
  const enPath = path.join(enDir, `${slug}.mdx`);
  
  if (!fs.existsSync(enPath)) {
    throw new Error(`English content not found: ${slug}`);
  }
  
  const enContent = fs.readFileSync(enPath, 'utf8');
  const { data: frontmatter, content } = matter(enContent);
  
  // Add translation metadata
  const translationMeta: TranslationMeta = {
    translatedFrom: slug,
    translatedAt: new Date().toISOString(),
    translationNotes: 'Please review and update all content for Spanish audience',
  };
  
  // Create Spanish frontmatter with translation notes
  const esFrontmatter = {
    ...frontmatter,
    translation: translationMeta,
    // Add Spanish-specific SEO if exists
    ...(frontmatter.seo && {
      seo: {
        ...frontmatter.seo,
        title: `[TRANSLATE] ${frontmatter.seo.title}`,
        description: `[TRANSLATE] ${frontmatter.seo.description}`,
      }
    }),
  };
  
  // Create template with translation placeholders
  const translationTemplate = `---
${Object.entries(esFrontmatter)
  .map(([key, value]) => `${key}: ${JSON.stringify(value, null, 2)}`)
  .join('\n')}
---

<!-- TRANSLATION NOTES:
1. Translate all content while maintaining technical accuracy
2. Adapt cultural references for Spanish-speaking audience
3. Update pricing to local currency if applicable
4. Review technical terminology for Spanish business context
5. Ensure all links and references are appropriate
-->

${content.replace(/^#/gm, '# [TRANSLATE]')}

<!-- END TRANSLATION TEMPLATE -->`;
  
  return translationTemplate;
}

/**
 * Validate translated content
 */
export function validateTranslation(
  originalContent: string,
  translatedContent: string
): { isValid: boolean; warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  const originalMatter = matter(originalContent);
  const translatedMatter = matter(translatedContent);
  
  // Check if translation markers still exist
  if (translatedContent.includes('[TRANSLATE]')) {
    warnings.push('Content contains untranslated [TRANSLATE] markers');
  }
  
  // Check frontmatter completeness
  const requiredFields = ['title', 'description'];
  for (const field of requiredFields) {
    if (!translatedMatter.data[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  }
  
  // Check for translation metadata
  if (!translatedMatter.data.translation) {
    warnings.push('Missing translation metadata');
  }
  
  // Check content length (translated content should be reasonably similar in length)
  const originalLength = originalMatter.content.length;
  const translatedLength = translatedMatter.content.length;
  const lengthRatio = translatedLength / originalLength;
  
  if (lengthRatio < 0.7 || lengthRatio > 1.5) {
    warnings.push(`Content length differs significantly from original (${Math.round(lengthRatio * 100)}% of original)`);
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Generate translation report
 */
export async function generateTranslationReport(): Promise<{
  summary: {
    totalContent: number;
    translated: number;
    needsTranslation: number;
    needsUpdate: number;
    translationProgress: number;
  };
  details: TranslationStatus[];
}> {
  const details = await getTranslationStatus();
  
  const totalContent = details.length;
  const translated = details.filter(item => item.spanishExists).length;
  const needsTranslation = details.filter(item => item.needsTranslation).length;
  const needsUpdate = details.filter(item => item.needsUpdate).length;
  const translationProgress = totalContent > 0 ? (translated / totalContent) * 100 : 0;
  
  return {
    summary: {
      totalContent,
      translated,
      needsTranslation,
      needsUpdate,
      translationProgress: Math.round(translationProgress),
    },
    details,
  };
}

/**
 * Create Spanish content directories if they don't exist
 */
export function ensureSpanishDirectories(): void {
  Object.values(CONTENT_DIRS.es).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created Spanish content directory: ${dir}`);
    }
  });
}

/**
 * Get content directory for English content
 */
function getEnglishDir(contentType: 'service' | 'case-study' | 'blog'): string {
  switch (contentType) {
    case 'service':
      return CONTENT_DIRS.en.services;
    case 'case-study':
      return CONTENT_DIRS.en.caseStudies;
    case 'blog':
      return CONTENT_DIRS.en.blog;
    default:
      throw new Error(`Unknown content type: ${contentType}`);
  }
}

/**
 * Get content directory for Spanish content
 */
function getSpanishDir(contentType: 'service' | 'case-study' | 'blog'): string {
  switch (contentType) {
    case 'service':
      return CONTENT_DIRS.es.services;
    case 'case-study':
      return CONTENT_DIRS.es.caseStudies;
    case 'blog':
      return CONTENT_DIRS.es.blog;
    default:
      throw new Error(`Unknown content type: ${contentType}`);
  }
}

/**
 * Spanish business terminology dictionary for automation concepts
 */
export const spanishTerminology = {
  // Core automation terms
  'automation': 'automatización',
  'workflow': 'flujo de trabajo',
  'script': 'script / guión',
  'process': 'proceso',
  'efficiency': 'eficiencia',
  'productivity': 'productividad',
  
  // Business terms
  'time saving': 'ahorro de tiempo',
  'cost saving': 'ahorro de costos',
  'ROI': 'ROI / retorno de inversión',
  'deliverables': 'entregables',
  'turnaround time': 'tiempo de entrega',
  'implementation': 'implementación',
  
  // Technical terms
  'PowerShell': 'PowerShell',
  'Python': 'Python',
  'CSV': 'CSV',
  'database': 'base de datos',
  'API': 'API',
  'integration': 'integración',
  
  // Service categories
  'Basic Scripting': 'Scripting Básico',
  'Email & File Hygiene': 'Higiene de Archivos y Correo',
  'Reporting Lite': 'Reportes Ligeros',
  'Simple Websites/Landing Pages': 'Sitios Web Simples/Páginas de Aterrizaje',
  'PC Onboarding Helpers': 'Asistentes de Configuración de PC',
  'Reusable Templates': 'Plantillas Reutilizables',
};

/**
 * Get Spanish translation for common terms
 */
export function getSpanishTerm(englishTerm: string): string {
  return spanishTerminology[englishTerm as keyof typeof spanishTerminology] || englishTerm;
}