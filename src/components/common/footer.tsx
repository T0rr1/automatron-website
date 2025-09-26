import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export function Footer({ className }: FooterProps = {}) {
  return (
    <footer role="contentinfo" className={cn("footer border-t border-border bg-surface", className)}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-text">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-muted hover:text-text transition-colors">
                  Basic Scripting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted hover:text-text transition-colors">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted hover:text-text transition-colors">
                  Reporting
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-text">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted hover:text-text transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-text transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-text">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted hover:text-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted hover:text-text transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-text">Newsletter</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border rounded-md bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-accent text-accent-foreground rounded-md hover:shadow-glow transition-shadow"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border text-center text-muted">
          <div className="mb-2">
            <p className="text-sm font-medium text-accent">
              Hours saved for clients this quarter: 126
            </p>
          </div>
          <p>&copy; 2024 Automatron. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}