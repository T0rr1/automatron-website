#!/usr/bin/env node

/**
 * Content Management CLI
 * 
 * Command-line tool for creating, validating, and managing content
 * for the Automatron website.
 */

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// Import content utilities (would need to be compiled from TypeScript)
// For now, we'll implement basic functionality directly

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const TEMPLATES = {
  service: `---
title: "{{title}}"
slug: "{{slug}}"
description: "{{description}}"
category: "{{category}}"
icon: "{{icon}}"
order: {{order}}
startingPrice: "{{startingPrice}}"
turnaround: "{{turnaround}}"
useCases:
  - "Use case 1"
  - "Use case 2"
targetAudience:
  - "Target audience 1"
  - "Target audience 2"
deliverables:
  - "Deliverable 1"
  - "Deliverable 2"
inputs:
  - "Input requirement 1"
  - "Input requirement 2"
seo:
  title: "{{title}} | Automatron"
  description: "{{description}}"
  ogImage: "/images/services/{{slug}}-og.jpg"
---

# {{title}}

Brief introduction to the service.

## What This Service Includes

### Feature 1
Description of the first major feature.

### Feature 2
Description of the second major feature.

## Before & After Scenarios

### Scenario 1: Common Use Case
**Before:** Description of manual process.

**After:** Description of automated solution.

## Sample Code Preview

\`\`\`powershell
# Example script
Write-Host "Automation example"
\`\`\`

## Frequently Asked Questions

### How long does implementation take?
Answer about timing.

### What if I need changes later?
Answer about maintenance.

## Ready to Get Started?

Call-to-action text.
`,
  
  'case-study': `---
title: "{{title}}"
slug: "{{slug}}"
client: "{{client}}"
industry: "{{industry}}"
serviceCategory: "{{serviceCategory}}"
challenge: "{{challenge}}"
solution: "{{solution}}"
publishedAt: "{{publishedAt}}"
featured: {{featured}}
results:
  timeSavedPerWeek: {{timeSavedPerWeek}}
  successRate: {{successRate}}
  turnaroundTime: "{{turnaroundTime}}"
  clientSatisfaction: {{clientSatisfaction}}
  businessImpact: "{{businessImpact}}"
deliverables:
  - "Deliverable 1"
  - "Deliverable 2"
metrics:
  - label: "Metric 1"
    value: 100
    unit: "units"
    improvement: "+50%"
beforeAfter:
  before: "{{beforeDescription}}"
  after: "{{afterDescription}}"
seo:
  title: "{{title}} | Case Study"
  description: "{{description}}"
  ogImage: "/images/case-studies/{{slug}}-og.jpg"
---

# {{title}}

## The Challenge

Description of the client's challenge.

## The Solution

Description of the solution implemented.

## Results Achieved

Quantified results and benefits.

## Client Testimonial

> "Client quote about the results."
> 
> **— Client Title, Company**
`,

  blog: `---
title: "{{title}}"
slug: "{{slug}}"
description: "{{description}}"
author: "{{author}}"
publishedAt: "{{publishedAt}}"
tags:
  - "{{tag1}}"
  - "{{tag2}}"
readingTime: {{readingTime}}
excerpt: "{{excerpt}}"
seo:
  title: "{{title}} | Automatron Blog"
  description: "{{description}}"
  ogImage: "/images/blog/{{slug}}-og.jpg"
---

# {{title}}

Introduction paragraph.

## Main Section

Content here.

## Conclusion

Summary and call-to-action.
`
};

// Utility functions
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function replaceTemplateVars(template, vars) {
  let result = template;
  Object.entries(vars).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  });
  return result;
}

// Commands
program
  .name('content-cli')
  .description('Content management CLI for Automatron website')
  .version('1.0.0');

program
  .command('create')
  .description('Create new content')
  .argument('<type>', 'Content type (service, case-study, blog)')
  .argument('<title>', 'Content title')
  .option('-s, --slug <slug>', 'Custom slug (auto-generated if not provided)')
  .option('-c, --category <category>', 'Service category (for services)')
  .option('-a, --author <author>', 'Author name (for blog posts)')
  .option('-l, --lang <lang>', 'Language (en, es)', 'en')
  .action((type, title, options) => {
    const slug = options.slug || slugify(title);
    const lang = options.lang || 'en';
    
    // Determine content directory
    const contentTypeDir = type === 'case-study' ? 'case-studies' : `${type}s`;
    const contentDir = lang === 'en' 
      ? path.join(CONTENT_DIR, contentTypeDir)
      : path.join(CONTENT_DIR, lang, contentTypeDir);
    
    ensureDirectoryExists(contentDir);
    
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      console.error(`Error: File already exists: ${filePath}`);
      process.exit(1);
    }
    
    // Prepare template variables
    const vars = {
      title,
      slug,
      description: `Description for ${title}`,
      publishedAt: getCurrentDate(),
      author: options.author || 'Automatron Team',
      category: options.category || 'basic-scripting',
      icon: 'terminal',
      order: 1,
      startingPrice: '$249',
      turnaround: '1-3 days',
      timeSavedPerWeek: 5,
      successRate: 95,
      clientSatisfaction: 5,
      featured: false,
      client: 'Anonymous Client',
      industry: 'Technology',
      serviceCategory: options.category || 'basic-scripting',
      challenge: 'Brief challenge description',
      solution: 'Brief solution description',
      businessImpact: 'Quantified business impact',
      beforeDescription: 'Manual process description',
      afterDescription: 'Automated process description',
      tag1: 'automation',
      tag2: 'productivity',
      readingTime: 5,
      excerpt: `Brief excerpt for ${title}`,
    };
    
    const template = TEMPLATES[type];
    if (!template) {
      console.error(`Error: Unknown content type: ${type}`);
      console.log('Available types: service, case-study, blog');
      process.exit(1);
    }
    
    const content = replaceTemplateVars(template, vars);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created ${type}: ${filePath}`);
    console.log(`📝 Edit the file to customize the content`);
  });

program
  .command('validate')
  .description('Validate content files')
  .argument('[path]', 'Path to validate (defaults to all content)')
  .option('-t, --type <type>', 'Content type to validate')
  .action((contentPath, options) => {
    console.log('🔍 Validating content...');
    
    // Basic validation - check for required frontmatter fields
    const validateFile = (filePath, expectedType) => {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        
        if (!frontmatterMatch) {
          return [`Missing frontmatter in ${filePath}`];
        }
        
        const errors = [];
        const frontmatter = frontmatterMatch[1];
        
        // Check for required fields based on type
        const requiredFields = {
          service: ['title', 'slug', 'description', 'category', 'startingPrice'],
          'case-study': ['title', 'slug', 'client', 'industry', 'serviceCategory'],
          blog: ['title', 'slug', 'description', 'author', 'publishedAt']
        };
        
        const fields = requiredFields[expectedType] || [];
        fields.forEach(field => {
          if (!frontmatter.includes(`${field}:`)) {
            errors.push(`Missing required field '${field}' in ${filePath}`);
          }
        });
        
        return errors;
      } catch (error) {
        return [`Error reading ${filePath}: ${error.message}`];
      }
    };
    
    let filesToValidate = [];
    
    if (contentPath) {
      filesToValidate = [contentPath];
    } else {
      // Validate all content
      const contentTypes = ['services', 'case-studies', 'blog'];
      contentTypes.forEach(type => {
        const dir = path.join(CONTENT_DIR, type);
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir)
            .filter(file => file.endsWith('.mdx'))
            .map(file => path.join(dir, file));
          filesToValidate.push(...files);
        }
      });
    }
    
    let totalErrors = 0;
    filesToValidate.forEach(file => {
      const relativePath = path.relative(CONTENT_DIR, file);
      const type = relativePath.includes('case-studies') ? 'case-study' : 
                   relativePath.includes('services') ? 'service' : 'blog';
      
      const errors = validateFile(file, type);
      if (errors.length > 0) {
        console.log(`❌ ${relativePath}:`);
        errors.forEach(error => console.log(`   ${error}`));
        totalErrors += errors.length;
      } else {
        console.log(`✅ ${relativePath}`);
      }
    });
    
    if (totalErrors === 0) {
      console.log('🎉 All content files are valid!');
    } else {
      console.log(`⚠️  Found ${totalErrors} validation errors`);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all content files')
  .option('-t, --type <type>', 'Filter by content type')
  .option('-l, --lang <lang>', 'Filter by language (en, es)')
  .action((options) => {
    const listContent = (dir, type, lang = 'en') => {
      if (!fs.existsSync(dir)) return [];
      
      return fs.readdirSync(dir)
        .filter(file => file.endsWith('.mdx'))
        .map(file => {
          const filePath = path.join(dir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
          const title = titleMatch ? titleMatch[1] : file.replace('.mdx', '');
          
          return {
            file: file.replace('.mdx', ''),
            title,
            type,
            lang,
            path: filePath
          };
        });
    };
    
    let allContent = [];
    
    // English content
    if (!options.lang || options.lang === 'en') {
      if (!options.type || options.type === 'service') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'services'), 'service', 'en'));
      }
      if (!options.type || options.type === 'case-study') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'case-studies'), 'case-study', 'en'));
      }
      if (!options.type || options.type === 'blog') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'blog'), 'blog', 'en'));
      }
    }
    
    // Spanish content
    if (!options.lang || options.lang === 'es') {
      if (!options.type || options.type === 'service') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'es', 'services'), 'service', 'es'));
      }
      if (!options.type || options.type === 'case-study') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'es', 'case-studies'), 'case-study', 'es'));
      }
      if (!options.type || options.type === 'blog') {
        allContent.push(...listContent(path.join(CONTENT_DIR, 'es', 'blog'), 'blog', 'es'));
      }
    }
    
    if (allContent.length === 0) {
      console.log('No content found matching the criteria');
      return;
    }
    
    console.log(`Found ${allContent.length} content files:\n`);
    
    allContent.forEach(item => {
      console.log(`📄 ${item.type} (${item.lang}): ${item.title}`);
      console.log(`   File: ${item.file}`);
      console.log('');
    });
  });

program
  .command('translate')
  .description('Create translation template')
  .argument('<slug>', 'Content slug to translate')
  .argument('<type>', 'Content type (service, case-study, blog)')
  .action((slug, type) => {
    const contentTypeDir = type === 'case-study' ? 'case-studies' : `${type}s`;
    const enPath = path.join(CONTENT_DIR, contentTypeDir, `${slug}.mdx`);
    const esDir = path.join(CONTENT_DIR, 'es', contentTypeDir);
    const esPath = path.join(esDir, `${slug}.mdx`);
    
    if (!fs.existsSync(enPath)) {
      console.error(`Error: English content not found: ${enPath}`);
      process.exit(1);
    }
    
    if (fs.existsSync(esPath)) {
      console.error(`Error: Spanish translation already exists: ${esPath}`);
      process.exit(1);
    }
    
    ensureDirectoryExists(esDir);
    
    const enContent = fs.readFileSync(enPath, 'utf8');
    
    // Add translation notes to the content
    const translationTemplate = `<!-- TRANSLATION TEMPLATE
This file was generated from: ${slug}.mdx
Please translate all content while maintaining:
- Technical accuracy
- Professional tone
- Spanish business terminology
- Cultural appropriateness
-->

${enContent}

<!-- END TRANSLATION TEMPLATE -->`;
    
    fs.writeFileSync(esPath, translationTemplate);
    console.log(`✅ Created translation template: ${esPath}`);
    console.log(`📝 Edit the file to complete the Spanish translation`);
  });

// Parse command line arguments
program.parse();