'use client';

import { NextSeo, NextSeoProps } from 'next-seo';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { defaultSEO } from '@/lib/seo';

interface SEOProps extends Partial<NextSeoProps> {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogImage?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  structuredData?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title,
  description,
  canonical,
  noindex = false,
  nofollow = false,
  ogImage,
  structuredData,
  ...props
}: SEOProps) {
  const pathname = usePathname();
  const locale = useLocale();
  
  // Build canonical URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://automatron.ai';
  const canonicalUrl = canonical || `${baseUrl}${pathname}`;
  
  // Generate dynamic OG image URL if not provided
  const ogImageUrl = ogImage?.url || (title && description 
    ? `${baseUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
    : defaultSEO.openGraph?.images?.[0]?.url
  );

  // Build language alternates
  const languageAlternates = [
    { hrefLang: 'en', href: `${baseUrl}/en${pathname}` },
    { hrefLang: 'es', href: `${baseUrl}/es${pathname}` },
    { hrefLang: 'x-default', href: `${baseUrl}${pathname}` },
  ];

  const seoProps: NextSeoProps = {
    ...defaultSEO,
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    canonical: canonicalUrl,
    noindex,
    nofollow,
    languageAlternates,
    openGraph: {
      ...defaultSEO.openGraph,
      title: title || defaultSEO.openGraph?.title,
      description: description || defaultSEO.openGraph?.description,
      url: canonicalUrl,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      images: [
        {
          url: ogImageUrl || '',
          width: ogImage?.width || 1200,
          height: ogImage?.height || 630,
          alt: ogImage?.alt || title || 'Automatron.ai',
          type: 'image/png',
        },
      ],
    },
    twitter: {
      ...defaultSEO.twitter,
    },
    additionalMetaTags: [
      ...(defaultSEO.additionalMetaTags || []),
      {
        name: 'robots',
        content: `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`,
      },
      {
        property: 'og:locale',
        content: locale === 'es' ? 'es_ES' : 'en_US',
      },
      {
        property: 'og:locale:alternate',
        content: locale === 'es' ? 'en_US' : 'es_ES',
      },
    ],
    ...props,
  };

  return <NextSeo {...seoProps} />;
}

// Convenience components for specific page types
interface PageSEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: SEOProps['ogImage'];
}

export function HomeSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: 'automation, PowerShell, Python, Excel, business automation, workflow automation, time saving, productivity, small business',
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
    />
  );
}

export function ServiceSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      additionalMetaTags={[
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'keywords',
          content: 'automation service, PowerShell scripting, Python automation, business process automation, workflow optimization',
        },
      ]}
    />
  );
}

export function CaseStudySEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      additionalMetaTags={[
        {
          property: 'og:type',
          content: 'article',
        },
        {
          name: 'keywords',
          content: 'automation case study, business automation success, time savings, productivity improvement',
        },
      ]}
    />
  );
}

export function AboutSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      additionalMetaTags={[
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'keywords',
          content: 'automation experts, PowerShell specialists, Python developers, business automation consultants',
        },
      ]}
    />
  );
}

export function ContactSEO({ title, description, canonical, ogImage }: PageSEOProps) {
  return (
    <SEO
      title={title}
      description={description}
      canonical={canonical}
      ogImage={ogImage}
      additionalMetaTags={[
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'keywords',
          content: 'contact automation experts, automation consultation, business automation services, get automation quote',
        },
      ]}
    />
  );
}