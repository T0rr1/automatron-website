import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import '../globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { ThemePersistence } from '@/components/theme-persistence'
import { Toaster } from '@/components/ui/toaster'
import { Analytics } from '@/components/common/analytics'
import { OrganizationStructuredData, WebsiteStructuredData } from '@/components/common/structured-data'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { ClientErrorBoundary } from '@/components/common/client-error-boundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isSpanish = locale === 'es'
  
  return {
    title: isSpanish 
      ? 'Automatron.ai - Ahorra 2-5 Horas Por Semana Con Automatización'
      : 'Automatron.ai - Save 2-5 Hours Per Week Through Automation',
    description: isSpanish
      ? 'Servicios profesionales de automatización para dueños de negocios individuales y equipos pequeños. Soluciones de automatización PowerShell, Python y Excel.'
      : 'Professional automation services for solo business owners and small teams. PowerShell, Python, and Excel automation solutions.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'es-ES': '/es',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Pre-paint theme script - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // Read theme from localStorage or system preference
                  var theme = localStorage.getItem('theme');
                  var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  var resolvedTheme = theme || systemTheme;
                  
                  // Set data-theme attribute (for new CSS variables)
                  document.documentElement.setAttribute('data-theme', resolvedTheme);
                  
                  // Set class attribute (for existing Tailwind dark: classes)
                  if (resolvedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                  
                  // Set color-scheme
                  document.documentElement.style.colorScheme = resolvedTheme;
                  
                  // Add no-transitions class to prevent animations on load
                  document.documentElement.classList.add('no-theme-transitions');
                  
                  // Remove no-transitions after a brief delay
                  setTimeout(function() {
                    document.documentElement.classList.remove('no-theme-transitions');
                  }, 100);
                } catch (e) {
                  // Fallback to dark theme (default)
                  document.documentElement.setAttribute('data-theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                  document.documentElement.classList.add('no-theme-transitions');
                }
              })();
            `,
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//plausible.io" />
        {/* Resource hints for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        {/* Critical CSS will be inlined by Next.js automatically */}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`} dir="ltr" data-locale={locale}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          <ThemePersistence />
          <ClientErrorBoundary locale={locale}>
            {children}
          </ClientErrorBoundary>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <OrganizationStructuredData data={organizationSchema} />
        <WebsiteStructuredData data={websiteSchema} />
      </body>
    </html>
  )
}