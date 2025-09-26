// Example of how to use SEO components in pages
// This file demonstrates the implementation patterns for different page types

import { Metadata } from 'next';
import { SEO, HomeSEO, ServiceSEO, CaseStudySEO } from '@/components/common/seo';
import { 
  StructuredData, 
  OrganizationStructuredData, 
  ServiceStructuredData, 
  FAQStructuredData 
} from '@/components/common/structured-data';
import { 
  generatePageMetadata, 
  seoConfigs, 
  generateServiceSEO, 
  generateCaseStudySEO 
} from '@/lib/seo-config';
import { 
  organizationSchema, 
  generateServiceStructuredData, 
  generateFAQSchema 
} from '@/lib/structured-data';
import { analyticsEvents } from '@/lib/analytics';

// Example: Homepage with SEO
export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const config = seoConfigs.home(locale);
  return generatePageMetadata(config, locale);
}

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const config = seoConfigs.home(locale);
  
  return (
    <>
      {/* Client-side SEO component */}
      <HomeSEO
        title={config.title}
        description={config.description}
        canonical={config.canonical}
        ogImage={config.ogImage}
      />
      
      {/* Structured data */}
      <OrganizationStructuredData data={organizationSchema} />
      
      {/* Page content */}
      <main>
        <h1>{config.title}</h1>
        <p>{config.description}</p>
        
        <button 
          onClick={() => analyticsEvents.ctaClick('hero', 'Get Started')}
          className="cta-button"
        >
          Get Started
        </button>
      </main>
    </>
  );
}

// Example: Service page with dynamic SEO
interface ServicePageProps {
  params: { 
    locale: string; 
    slug: string; 
  };
}

export async function generateServiceMetadata({ 
  params: { locale, slug } 
}: ServicePageProps): Promise<Metadata> {
  // In a real app, you'd fetch service data here
  const serviceData = {
    name: 'Basic Scripting',
    description: 'File cleanup, CSV processing, backup automation, and scheduled tasks.',
  };
  
  const config = generateServiceSEO(
    serviceData.name,
    serviceData.description,
    slug,
    locale
  );
  
  return generatePageMetadata(config, locale);
}

export function ServicePage({ params: { locale, slug } }: ServicePageProps) {
  // Fetch service data
  const serviceData = {
    name: 'Basic Scripting',
    description: 'File cleanup, CSV processing, backup automation, and scheduled tasks.',
    faqs: [
      {
        question: 'What types of files can you help organize?',
        answer: 'We can help organize any file type including documents, images, videos, and data files.',
      },
      {
        question: 'How long does a basic scripting project take?',
        answer: 'Most basic scripting projects are completed within 1-3 days.',
      },
    ],
  };
  
  const config = generateServiceSEO(
    serviceData.name,
    serviceData.description,
    slug,
    locale
  );
  
  const faqSchema = generateFAQSchema(
    serviceData.faqs.map(faq => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );
  
  const serviceStructuredData = generateServiceStructuredData(
    serviceData.name,
    serviceData.description,
    `https://automatron.ai/${locale}/services/${slug}`,
    '$249+',
    '1-3 days'
  );
  
  return (
    <>
      {/* SEO */}
      <ServiceSEO
        title={config.title}
        description={config.description}
        canonical={config.canonical}
        ogImage={config.ogImage}
      />
      
      {/* Structured data */}
      <ServiceStructuredData data={serviceStructuredData} />
      <FAQStructuredData data={faqSchema} />
      
      {/* Page content */}
      <main>
        <h1>{serviceData.name}</h1>
        <p>{serviceData.description}</p>
        
        <section>
          <h2>Frequently Asked Questions</h2>
          {serviceData.faqs.map((faq, index) => (
            <div key={index}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </div>
          ))}
        </section>
        
        <button 
          onClick={() => analyticsEvents.serviceCtaClick(serviceData.name)}
          className="cta-button"
        >
          Get This Service
        </button>
      </main>
    </>
  );
}

// Example: Case study page with dynamic SEO
interface CaseStudyPageProps {
  params: { 
    locale: string; 
    slug: string; 
  };
}

export async function generateCaseStudyMetadata({ 
  params: { locale, slug } 
}: CaseStudyPageProps): Promise<Metadata> {
  // In a real app, you'd fetch case study data here
  const caseStudyData = {
    title: 'Email Automation Saves Small Business 3 Hours Weekly',
    description: 'How we helped a consulting firm automate their email workflows and save 3 hours per week.',
    industry: 'Consulting',
    timeSaved: '3 hours/week',
  };
  
  const config = generateCaseStudySEO(
    caseStudyData.title,
    caseStudyData.description,
    caseStudyData.industry,
    caseStudyData.timeSaved,
    slug,
    locale
  );
  
  return generatePageMetadata(config, locale);
}

export function CaseStudyPage({ params: { locale, slug } }: CaseStudyPageProps) {
  const caseStudyData = {
    title: 'Email Automation Saves Small Business 3 Hours Weekly',
    description: 'How we helped a consulting firm automate their email workflows and save 3 hours per week.',
    industry: 'Consulting',
    timeSaved: '3 hours/week',
  };
  
  const config = generateCaseStudySEO(
    caseStudyData.title,
    caseStudyData.description,
    caseStudyData.industry,
    caseStudyData.timeSaved,
    slug,
    locale
  );
  
  return (
    <>
      {/* SEO */}
      <CaseStudySEO
        title={config.title}
        description={config.description}
        canonical={config.canonical}
        ogImage={config.ogImage}
      />
      
      {/* Structured data */}
      {config.structuredData && (
        <StructuredData data={config.structuredData} />
      )}
      
      {/* Page content */}
      <main>
        <article>
          <h1>{caseStudyData.title}</h1>
          <p>{caseStudyData.description}</p>
          
          <div className="case-study-metrics">
            <div>Industry: {caseStudyData.industry}</div>
            <div>Time Saved: {caseStudyData.timeSaved}</div>
          </div>
          
          <button 
            onClick={() => analyticsEvents.caseStudyView(caseStudyData.title)}
            className="cta-button"
          >
            Get Similar Results
          </button>
        </article>
      </main>
    </>
  );
}

// Example: Using analytics events
export function ExampleAnalyticsUsage() {
  const handleContactFormSubmit = (serviceType: string) => {
    analyticsEvents.contactFormSubmit(serviceType);
    // Form submission logic...
  };
  
  const handleCalculatorUse = (timeSaved: number, roi: number) => {
    analyticsEvents.calculatorUse(timeSaved, roi);
  };
  
  const handleCodeSnippetCopy = (snippetType: string) => {
    analyticsEvents.codeSnippetCopy(snippetType);
    // Copy to clipboard logic...
  };
  
  return (
    <div>
      {/* Examples of analytics tracking */}
      <button onClick={() => analyticsEvents.ctaClick('header', 'Get Started')}>
        Get Started
      </button>
      
      <button onClick={() => analyticsEvents.newsletterSignup('footer')}>
        Subscribe to Newsletter
      </button>
      
      <button onClick={() => analyticsEvents.themeSwitch('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}