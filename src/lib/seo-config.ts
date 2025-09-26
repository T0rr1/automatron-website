// Comprehensive SEO configuration and utilities

import { Metadata } from 'next';
import { generateOGImageUrl } from './og-utils';
import { 
  organizationSchema, 
  serviceSchema, 
  generateFAQSchema, 
  generateServiceStructuredData,
  generateCaseStudyStructuredData 
} from './structured-data';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  structuredData?: Record<string, any>[];
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://automatron.ai';

/**
 * Generate comprehensive metadata for Next.js pages
 */
export function generatePageMetadata(
  config: SEOConfig,
  locale: string = 'en'
): Metadata {
  const isSpanish = locale === 'es';
  const canonicalUrl = config.canonical || baseUrl;
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    robots: {
      index: !config.noindex,
      follow: !config.nofollow,
      googleBot: {
        index: !config.noindex,
        follow: !config.nofollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    authors: [{ name: 'Automatron.ai' }],
    creator: 'Automatron.ai',
    publisher: 'Automatron.ai',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': canonicalUrl.replace('/es/', '/en/').replace('/es', '/en'),
        'es-ES': canonicalUrl.replace('/en/', '/es/').replace('/en', '/es'),
        'x-default': canonicalUrl.replace(/\/(en|es)/, ''),
      },
    },
    openGraph: {
      type: 'website',
      locale: isSpanish ? 'es_ES' : 'en_US',
      url: canonicalUrl,
      title: config.title,
      description: config.description,
      siteName: 'Automatron.ai',
      images: config.ogImage ? [
        {
          url: config.ogImage.url,
          width: config.ogImage.width || 1200,
          height: config.ogImage.height || 630,
          alt: config.ogImage.alt,
        }
      ] : [
        {
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: 'Automatron.ai - Professional Automation Services',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage.url] : [`${baseUrl}/og-default.png`],
    },
  };
}

/**
 * SEO configurations for different page types
 */
export const seoConfigs = {
  home: (locale: string = 'en'): SEOConfig => {
    const isSpanish = locale === 'es';
    return {
      title: isSpanish 
        ? 'Automatron.ai - Ahorra 2-5 Horas Por Semana Con Automatización'
        : 'Automatron.ai - Save 2-5 Hours Per Week Through Automation',
      description: isSpanish
        ? 'Servicios profesionales de automatización para dueños de negocios individuales y equipos pequeños. Soluciones PowerShell, Python y Excel que ahorran 2-5 horas semanales.'
        : 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions that save 2-5 hours weekly.',
      keywords: isSpanish
        ? ['automatización', 'PowerShell', 'Python', 'Excel', 'automatización empresarial', 'ahorro de tiempo', 'productividad', 'pequeñas empresas']
        : ['automation', 'PowerShell', 'Python', 'Excel', 'business automation', 'workflow automation', 'time saving', 'productivity', 'small business'],
      canonical: `${baseUrl}/${locale}`,
      ogImage: {
        url: generateOGImageUrl({
          title: isSpanish ? 'Ahorra 2-5 Horas Por Semana Con Automatización' : 'Save 2-5 Hours Per Week Through Automation',
          description: isSpanish ? 'Servicios profesionales de automatización' : 'Professional automation services',
          type: 'website',
        }),
        alt: 'Automatron.ai Homepage',
      },
      structuredData: [organizationSchema, serviceSchema],
    };
  },

  services: (locale: string = 'en'): SEOConfig => {
    const isSpanish = locale === 'es';
    return {
      title: isSpanish
        ? 'Servicios de Automatización - Soluciones PowerShell, Python y Excel | Automatron.ai'
        : 'Automation Services - PowerShell, Python & Excel Solutions | Automatron.ai',
      description: isSpanish
        ? 'Servicios completos de automatización incluyendo Scripting Básico, Higiene de Email, Reportes, Desarrollo Web y Configuración de PC. Desde $249.'
        : 'Comprehensive automation services including Basic Scripting, Email Hygiene, Reporting, Website Development, and PC Setup. Starting at $249.',
      keywords: isSpanish
        ? ['servicios de automatización', 'scripting PowerShell', 'automatización Python', 'automatización de procesos empresariales', 'optimización de flujo de trabajo']
        : ['automation services', 'PowerShell scripting', 'Python automation', 'business process automation', 'workflow optimization'],
      canonical: `${baseUrl}/${locale}/services`,
      ogImage: {
        url: generateOGImageUrl({
          title: isSpanish ? 'Servicios de Automatización Profesional' : 'Professional Automation Services',
          description: isSpanish ? 'Desde $249 con entrega en 1-7 días' : 'Starting at $249 with 1-7 day delivery',
          type: 'service',
        }),
        alt: 'Automatron.ai Services',
      },
      structuredData: [serviceSchema],
    };
  },

  about: (locale: string = 'en'): SEOConfig => {
    const isSpanish = locale === 'es';
    return {
      title: isSpanish
        ? 'Acerca de Automatron.ai - Expertos Profesionales en Automatización'
        : 'About Automatron.ai - Professional Automation Experts',
      description: isSpanish
        ? 'Conoce nuestra misión de ahorrar a profesionales ocupados 2-5 horas por semana a través de soluciones prácticas de automatización. Enfoque Windows-first con capacidades multiplataforma.'
        : 'Learn about our mission to save busy professionals 2-5 hours per week through practical automation solutions. Windows-first approach with cross-platform capabilities.',
      keywords: isSpanish
        ? ['expertos en automatización', 'especialistas PowerShell', 'desarrolladores Python', 'consultores de automatización empresarial']
        : ['automation experts', 'PowerShell specialists', 'Python developers', 'business automation consultants'],
      canonical: `${baseUrl}/${locale}/about`,
      ogImage: {
        url: generateOGImageUrl({
          title: isSpanish ? 'Expertos Profesionales en Automatización' : 'Professional Automation Experts',
          description: isSpanish ? 'Nuestra misión de ahorrar tiempo a través de automatización práctica' : 'Our mission to save time through practical automation',
          type: 'about',
        }),
        alt: 'About Automatron.ai',
      },
      structuredData: [organizationSchema],
    };
  },

  contact: (locale: string = 'en'): SEOConfig => {
    const isSpanish = locale === 'es';
    return {
      title: isSpanish
        ? 'Contactar Automatron.ai - Inicia Tu Proyecto de Automatización'
        : 'Contact Automatron.ai - Start Your Automation Project',
      description: isSpanish
        ? 'Comienza con servicios profesionales de automatización. Consulta gratuita y evaluación de proyecto. Tiempo típico de entrega: 1-7 días.'
        : 'Get started with professional automation services. Free consultation and project assessment. Typical turnaround: 1-7 days.',
      keywords: isSpanish
        ? ['contactar expertos en automatización', 'consulta de automatización', 'servicios de automatización empresarial', 'obtener cotización de automatización']
        : ['contact automation experts', 'automation consultation', 'business automation services', 'get automation quote'],
      canonical: `${baseUrl}/${locale}/contact`,
      ogImage: {
        url: generateOGImageUrl({
          title: isSpanish ? 'Inicia Tu Proyecto de Automatización' : 'Start Your Automation Project',
          description: isSpanish ? 'Consulta gratuita disponible' : 'Free consultation available',
          type: 'contact',
        }),
        alt: 'Contact Automatron.ai',
      },
    };
  },

  work: (locale: string = 'en'): SEOConfig => {
    const isSpanish = locale === 'es';
    return {
      title: isSpanish
        ? 'Casos de Estudio - Historias Reales de Éxito en Automatización | Automatron.ai'
        : 'Case Studies - Real Automation Success Stories | Automatron.ai',
      description: isSpanish
        ? 'Ve cómo hemos ayudado a empresas a ahorrar 2-5 horas por semana a través de automatización. Casos de estudio reales con resultados medibles.'
        : 'See how we\'ve helped businesses save 2-5 hours per week through automation. Real case studies with measurable results.',
      keywords: isSpanish
        ? ['casos de estudio de automatización', 'éxito en automatización empresarial', 'ahorro de tiempo', 'mejora de productividad']
        : ['automation case studies', 'business automation success', 'time savings', 'productivity improvement'],
      canonical: `${baseUrl}/${locale}/work`,
      ogImage: {
        url: generateOGImageUrl({
          title: isSpanish ? 'Historias Reales de Éxito en Automatización' : 'Real Automation Success Stories',
          description: isSpanish ? 'Casos de estudio con resultados medibles' : 'Case studies with measurable results',
          type: 'case-study',
        }),
        alt: 'Automatron.ai Case Studies',
      },
    };
  },
};

/**
 * Generate service-specific SEO config
 */
export function generateServiceSEO(
  serviceName: string,
  serviceDescription: string,
  serviceSlug: string,
  locale: string = 'en'
): SEOConfig {
  const isSpanish = locale === 'es';
  
  return {
    title: isSpanish
      ? `${serviceName} - Servicio Profesional de Automatización | Automatron.ai`
      : `${serviceName} - Professional Automation Service | Automatron.ai`,
    description: isSpanish
      ? `${serviceDescription} Servicio profesional de automatización con entrega en 1-7 días. Desde $249.`
      : `${serviceDescription} Professional automation service with 1-7 day turnaround. Starting at $249.`,
    keywords: isSpanish
      ? ['servicio de automatización', 'scripting PowerShell', 'automatización Python', 'automatización de procesos empresariales']
      : ['automation service', 'PowerShell scripting', 'Python automation', 'business process automation'],
    canonical: `${baseUrl}/${locale}/services/${serviceSlug}`,
    ogImage: {
      url: generateOGImageUrl({
        title: `${serviceName} - Professional Automation Service`,
        description: `${serviceDescription} Starting at $249.`,
        type: 'service',
        serviceName,
      }),
      alt: `${serviceName} Service`,
    },
    structuredData: [
      generateServiceStructuredData(
        serviceName,
        serviceDescription,
        `${baseUrl}/${locale}/services/${serviceSlug}`,
        '$249+',
        '1-7 days'
      )
    ],
  };
}

/**
 * Generate case study SEO config
 */
export function generateCaseStudySEO(
  title: string,
  description: string,
  industry: string,
  timeSaved: string,
  slug: string,
  locale: string = 'en'
): SEOConfig {
  const isSpanish = locale === 'es';
  
  return {
    title: isSpanish
      ? `${title} - Caso de Estudio | Automatron.ai`
      : `${title} - Case Study | Automatron.ai`,
    description: isSpanish
      ? `${description} Ve cómo ayudamos a ahorrar tiempo a través de automatización.`
      : `${description} See how we helped save time through automation.`,
    keywords: isSpanish
      ? ['caso de estudio de automatización', 'éxito en automatización empresarial', 'ahorro de tiempo', 'mejora de productividad']
      : ['automation case study', 'business automation success', 'time savings', 'productivity improvement'],
    canonical: `${baseUrl}/${locale}/work/${slug}`,
    ogImage: {
      url: generateOGImageUrl({
        title,
        description: `${industry} business saved ${timeSaved} through automation`,
        type: 'case-study',
        industry,
        timeSaved,
      }),
      alt: `${title} Case Study`,
    },
    structuredData: [
      generateCaseStudyStructuredData(
        title,
        description,
        timeSaved,
        industry,
        `${baseUrl}/${locale}/work/${slug}`
      )
    ],
  };
}