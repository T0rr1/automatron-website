import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'

const inter = Inter({ subsets: ['latin'] })

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
        {/* Optimized theme script - prevents flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const key = 'theme';
                const saved = localStorage.getItem(key);
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = saved || (systemDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Mark interactive to enable transitions after first paint
              window.addEventListener('DOMContentLoaded', () => {
                document.documentElement.classList.add('theme-ready');
              });
              
              // Theme toggle function (available globally)
              window.toggleTheme = function() {
                const html = document.documentElement;
                const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                html.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
              };
            `,
          }}
        />
      </body>
    </html>
  )
}