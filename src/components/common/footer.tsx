import React from 'react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer role="contentinfo" className="footer border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/basic-scripting" className="text-muted-foreground hover:text-foreground">
                  Basic Scripting
                </Link>
              </li>
              <li>
                <Link href="/services/email-automation" className="text-muted-foreground hover:text-foreground">
                  Email Automation
                </Link>
              </li>
              <li>
                <Link href="/services/reporting" className="text-muted-foreground hover:text-foreground">
                  Reporting
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-md"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <div className="mb-2">
            <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Hours saved for clients this quarter: 126
            </p>
          </div>
          <p>&copy; 2024 Automatron. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}