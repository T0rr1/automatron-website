import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { PerformanceMonitor } from '@/components/performance/performance-monitor'

const sora = Sora({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  display: "swap",
  variable: "--font-sans",
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
      <body className={sora.variable}>
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