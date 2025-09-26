/**
 * Content Management System
 * 
 * This module provides utilities for managing MDX content including services,
 * case studies, and blog posts with full TypeScript support and validation.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

// Base content schema
const BaseContentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  featured: z.boolean().optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }).optional(),
});

// Service content schema
export const ServiceSchema = BaseContentSchema.extend({
  category: z.enum([
    'basic-scripting',
    'email-file-hygiene', 
    'reporting-lite',
    'websites-landing',
    'pc-helpers',
    'reusable-templates'
  ]),
  icon: z.string(),
  order: z.number(),
  startingPrice: z.string(),
  turnaround: z.string(),
  useCases: z.array(z.string()),
  targetAudience: z.array(z.string()),
  deliverables: z.array(z.string()),
  inputs: z.array(z.string()),
});

// Case study content schema
export const CaseStudySchema = BaseContentSchema.extend({
  client: z.string(),
  industry: z.string(),
  serviceCategory: z.string(),
  challenge: z.string(),
  solution: z.string(),
  results: z.object({
    timeSavedPerWeek: z.number(),
    successRate: z.number(),
    turnaroundTime: z.string(),
    clientSatisfaction: z.number().min(1).max(5),
    businessImpact: z.string(),
  }),
  deliverables: z.array(z.string()),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
    unit: z.string().optional(),
    improvement: z.string().optional(),
  })),
  beforeAfter: z.object({
    before: z.string(),
    after: z.string(),
  }),
});

// Blog post schema
export const BlogPostSchema = BaseContentSchema.extend({
  author: z.string(),
  tags: z.array(z.string()),
  readingTime: z.number().optional(),
  excerpt: z.string().optional(),
});

// Type definitions
export type Service = z.infer<typeof ServiceSchema>;
export type CaseStudy = z.infer<typeof CaseStudySchema>;
export type BlogPost = z.infer<typeof BlogPostSchema>;

export interface ContentWithBody<T> {
  frontmatter: T;
  content: string;
  slug: string;
}

// Content directories
const CONTENT_DIR = path.join(process.cwd(), 'content');
const SERVICES_DIR = path.join(CONTENT_DIR, 'services');
const CASE_STUDIES_DIR = path.join(CONTENT_DIR, 'case-studies');
const BLOG_DIR = path.join(CONTENT_DIR, 'blog');

/**
 * Generic function to get all content of a specific type
 */
async function getContentByType<T>(
  directory: string,
  schema: z.ZodSchema<T>
): Promise<ContentWithBody<T>[]> {
  try {
    // Ensure directory exists
    if (!fs.existsSync(directory)) {
      console.warn(`Content directory does not exist: ${directory}`);
      return [];
    }

    const files = fs.readdirSync(directory);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));

    const content = await Promise.all(
      mdxFiles.map(async (file) => {
        const filePath = path.join(directory, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        try {
          // Validate frontmatter against schema
          const frontmatter = schema.parse(data);
          const slug = path.basename(file, '.mdx');

          return {
            frontmatter,
            content,
            slug,
          };
        } catch (error) {
          console.error(`Invalid frontmatter in ${file}:`, error);
          throw new Error(`Content validation failed for ${file}`);
        }
      })
    );

    return content;
  } catch (error) {
    console.error(`Error loading content from ${directory}:`, error);
    return [];
  }
}

/**
 * Get single content item by slug
 */
async function getContentBySlug<T>(
  directory: string,
  slug: string,
  schema: z.ZodSchema<T>
): Promise<ContentWithBody<T> | null> {
  try {
    const filePath = path.join(directory, `${slug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const frontmatter = schema.parse(data);

    return {
      frontmatter,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error loading content for slug ${slug}:`, error);
    return null;
  }
}

// Service content functions
export async function getAllServices(): Promise<ContentWithBody<Service>[]> {
  const services = await getContentByType(SERVICES_DIR, ServiceSchema);
  return services.sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export async function getServiceBySlug(slug: string): Promise<ContentWithBody<Service> | null> {
  return getContentBySlug(SERVICES_DIR, slug, ServiceSchema);
}

export async function getServicesByCategory(category: string): Promise<ContentWithBody<Service>[]> {
  const services = await getAllServices();
  return services.filter(service => service.frontmatter.category === category);
}

// Case study content functions
export async function getAllCaseStudies(): Promise<ContentWithBody<CaseStudy>[]> {
  const caseStudies = await getContentByType(CASE_STUDIES_DIR, CaseStudySchema);
  return caseStudies.sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt || '');
    const dateB = new Date(b.frontmatter.publishedAt || '');
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getCaseStudyBySlug(slug: string): Promise<ContentWithBody<CaseStudy> | null> {
  return getContentBySlug(CASE_STUDIES_DIR, slug, CaseStudySchema);
}

export async function getCaseStudiesByCategory(category: string): Promise<ContentWithBody<CaseStudy>[]> {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.filter(study => study.frontmatter.serviceCategory === category);
}

export async function getFeaturedCaseStudies(): Promise<ContentWithBody<CaseStudy>[]> {
  const caseStudies = await getAllCaseStudies();
  return caseStudies.filter(study => study.frontmatter.featured);
}

// Blog content functions
export async function getAllBlogPosts(): Promise<ContentWithBody<BlogPost>[]> {
  const posts = await getContentByType(BLOG_DIR, BlogPostSchema);
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.publishedAt || '');
    const dateB = new Date(b.frontmatter.publishedAt || '');
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getBlogPostBySlug(slug: string): Promise<ContentWithBody<BlogPost> | null> {
  return getContentBySlug(BLOG_DIR, slug, BlogPostSchema);
}

export async function getBlogPostsByTag(tag: string): Promise<ContentWithBody<BlogPost>[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(post => post.frontmatter.tags.includes(tag));
}

// Utility functions
export function generateContentSlugs(directory: string): string[] {
  try {
    if (!fs.existsSync(directory)) {
      return [];
    }
    
    const files = fs.readdirSync(directory);
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => path.basename(file, '.mdx'));
  } catch (error) {
    console.error(`Error generating slugs for ${directory}:`, error);
    return [];
  }
}

export function getServiceSlugs(): string[] {
  return generateContentSlugs(SERVICES_DIR);
}

export function getCaseStudySlugs(): string[] {
  return generateContentSlugs(CASE_STUDIES_DIR);
}

export function getBlogPostSlugs(): string[] {
  return generateContentSlugs(BLOG_DIR);
}

// Content validation utilities
export function validateServiceContent(data: unknown): Service {
  return ServiceSchema.parse(data);
}

export function validateCaseStudyContent(data: unknown): CaseStudy {
  return CaseStudySchema.parse(data);
}

export function validateBlogPostContent(data: unknown): BlogPost {
  return BlogPostSchema.parse(data);
}

// Search functionality
export async function searchContent(query: string): Promise<{
  services: ContentWithBody<Service>[];
  caseStudies: ContentWithBody<CaseStudy>[];
  blogPosts: ContentWithBody<BlogPost>[];
}> {
  const [services, caseStudies, blogPosts] = await Promise.all([
    getAllServices(),
    getAllCaseStudies(),
    getAllBlogPosts(),
  ]);

  const searchTerm = query.toLowerCase();

  const filterByQuery = <T>(items: ContentWithBody<T>[]) =>
    items.filter(item => 
      item.frontmatter.title.toLowerCase().includes(searchTerm) ||
      (item.frontmatter.description && item.frontmatter.description.toLowerCase().includes(searchTerm)) ||
      item.content.toLowerCase().includes(searchTerm)
    );

  return {
    services: filterByQuery(services),
    caseStudies: filterByQuery(caseStudies),
    blogPosts: filterByQuery(blogPosts),
  };
}

// Content statistics
export async function getContentStats() {
  const [services, caseStudies, blogPosts] = await Promise.all([
    getAllServices(),
    getAllCaseStudies(),
    getAllBlogPosts(),
  ]);

  return {
    totalServices: services.length,
    totalCaseStudies: caseStudies.length,
    totalBlogPosts: blogPosts.length,
    serviceCategories: [...new Set(services.map(s => s.frontmatter.category))],
    industries: [...new Set(caseStudies.map(cs => cs.frontmatter.industry))],
    totalTimeSaved: caseStudies.reduce((total, cs) => total + cs.frontmatter.results.timeSavedPerWeek, 0),
  };
}