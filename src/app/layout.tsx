import type { Metadata } from 'next'
import { Urbanist, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { PerformanceMonitor } from '@/components/performance/performance-monitor'

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Automatron - Save Time with Automation',
  description: 'Professional automation solutions for busy professionals. Save 2-5 hours per week with our expert automation services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Instant theme script - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const t = localStorage.getItem('theme');
                const sys = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light';
                document.documentElement.setAttribute('data-theme', t || sys);
              })();
            `,
          }}
        />
      </head>
      <body className={`${urbanist.variable} ${grotesk.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
          <PerformanceMonitor />
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enable transitions after first paint
              window.addEventListener('DOMContentLoaded', () => {
                document.documentElement.classList.add('theme-ready');
              });
            `,
          }}
        />
      </body>
    </html>
  )
}