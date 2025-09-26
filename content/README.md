# Content Management System Documentation

This directory contains all MDX content for the Automatron website, organized by content type and language.

## Directory Structure

```
content/
├── services/           # Service pages (English)
├── case-studies/       # Case study content (English)
├── blog/              # Blog posts (English)
├── es/                # Spanish translations
│   ├── services/      # Servicios (Spanish)
│   ├── case-studies/  # Casos de estudio (Spanish)
│   └── blog/          # Blog (Spanish)
└── README.md          # This file
```

## Content Types

### Services
Service pages describe our automation offerings with detailed information about:
- Service capabilities and features
- Before/after scenarios
- Code examples and deliverables
- Pricing and turnaround times
- FAQ sections

**Required frontmatter fields:**
- `title`, `slug`, `description`, `category`, `icon`, `order`
- `startingPrice`, `turnaround`, `useCases`, `targetAudience`
- `deliverables`, `inputs`, `seo`

### Case Studies
Case studies showcase real client projects and results:
- Problem description and business impact
- Solution implementation details
- Quantified results and metrics
- Client testimonials
- Technical architecture

**Required frontmatter fields:**
- `title`, `slug`, `client`, `industry`, `serviceCategory`
- `challenge`, `solution`, `results`, `deliverables`
- `metrics`, `beforeAfter`, `seo`

### Blog Posts
Educational and thought leadership content:
- Automation best practices
- Industry insights
- Technical tutorials
- Company updates

**Required frontmatter fields:**
- `title`, `slug`, `description`, `author`, `publishedAt`
- `tags`, `readingTime`, `excerpt`, `seo`

## Content Creation Workflow

### 1. Planning
- Identify content topic and target audience
- Research keywords and SEO opportunities
- Create content outline and structure
- Assign author and reviewer

### 2. Creation
- Use appropriate content template
- Follow style guide and brand guidelines
- Include required frontmatter fields
- Add relevant code examples and visuals

### 3. Review
- Technical accuracy review
- Grammar and style check
- SEO optimization
- Accessibility compliance
- Brand consistency check

### 4. Translation (Services & Case Studies)
- Create Spanish translation template
- Professional translation review
- Cultural adaptation for Spanish market
- Technical terminology validation

### 5. Publication
- Final quality assurance
- Workflow status update to "published"
- Deploy to production
- Monitor performance and engagement

## Style Guide

### Writing Style
- **Tone**: Professional but approachable, confident without being boastful
- **Voice**: Active voice preferred, clear and direct communication
- **Audience**: Business owners, IT professionals, administrative staff
- **Technical Level**: Accessible to non-technical users while maintaining technical accuracy

### Content Guidelines
- **Headlines**: Clear, benefit-focused, include keywords naturally
- **Paragraphs**: Keep under 4 sentences, use bullet points for lists
- **Code Examples**: Include comments, use realistic scenarios
- **Metrics**: Always quantify benefits (hours saved, cost reduction, etc.)
- **CTAs**: Clear, action-oriented, relevant to content

### SEO Best Practices
- **Title Tags**: 50-60 characters, include primary keyword
- **Meta Descriptions**: 120-160 characters, compelling and descriptive
- **Headings**: Proper H1-H6 hierarchy, include keywords naturally
- **Internal Links**: Link to related services and case studies
- **Images**: Include descriptive alt text, optimize file sizes

## Translation Guidelines

### Spanish Content Standards
- **Business Terminology**: Use established Spanish business terms
- **Technical Terms**: Maintain English terms where commonly used (e.g., "PowerShell", "API")
- **Cultural Adaptation**: Adapt examples and references for Spanish-speaking markets
- **Pricing**: Consider local currency and market conditions
- **Legal**: Ensure compliance with local regulations and standards

### Translation Workflow
1. **Template Creation**: Generate translation template from English content
2. **Professional Translation**: Use qualified business/technical translator
3. **Review Process**: Technical and cultural review by native speaker
4. **Quality Assurance**: Validate against original content for completeness
5. **Maintenance**: Keep translations updated when English content changes

## Quality Assurance Checklist

### Content Quality
- [ ] Content is complete and well-structured
- [ ] Grammar and spelling are correct
- [ ] Technical information is accurate
- [ ] Code examples are functional
- [ ] Links are working and relevant
- [ ] Images have proper alt text

### SEO Optimization
- [ ] Title and description are optimized
- [ ] Headings follow proper hierarchy
- [ ] Keywords are used naturally
- [ ] Internal linking is appropriate
- [ ] Structured data is included

### Accessibility
- [ ] Headings follow logical hierarchy
- [ ] Images have descriptive alt text
- [ ] Links have descriptive text
- [ ] Color contrast meets WCAG AA standards
- [ ] Content is keyboard navigable

### Brand Consistency
- [ ] Tone and voice match brand guidelines
- [ ] Terminology is consistent across content
- [ ] Visual elements follow brand standards
- [ ] CTAs are appropriate and effective

## Content Maintenance

### Regular Reviews
- **Monthly**: Review analytics and update high-traffic content
- **Quarterly**: Comprehensive content audit and optimization
- **Annually**: Major content strategy review and planning

### Update Triggers
- Service offering changes
- Pricing updates
- New case study results
- Industry changes or trends
- SEO performance issues

### Version Control
- All content changes tracked in Git
- Workflow metadata tracks authors and reviewers
- Translation synchronization monitoring
- Backup and recovery procedures

## Tools and Resources

### Content Creation
- **Templates**: Use provided MDX templates for consistency
- **Validation**: Run content validation scripts before publishing
- **Preview**: Use development environment for content preview
- **Analytics**: Monitor performance with Plausible Analytics

### Translation Management
- **Status Tracking**: Use translation utilities to monitor sync status
- **Quality Control**: Validate translations against original content
- **Terminology**: Maintain Spanish business terminology dictionary
- **Workflow**: Follow established translation review process

## Support and Contact

For questions about content creation, translation, or technical issues:

- **Content Strategy**: Contact marketing team
- **Technical Issues**: Contact development team  
- **Translation**: Contact localization team
- **SEO Questions**: Contact digital marketing team

## Performance Metrics

### Content KPIs
- Page views and engagement time
- Conversion rates from content to contact forms
- Search engine rankings for target keywords
- Social sharing and backlink acquisition

### Translation KPIs
- Translation completion percentage
- Time to translate new content
- Quality scores from review process
- Performance of Spanish content vs English

Regular reporting on these metrics helps optimize content strategy and translation workflows.