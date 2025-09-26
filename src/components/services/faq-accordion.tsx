'use client'

import { useState } from 'react'
import { FaqItem } from '@/types'
import { cn } from '@/lib/utils'

interface FaqAccordionProps {
  faqs: FaqItem[]
  className?: string
}

export function FaqAccordion({ faqs, className }: FaqAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <div className={cn('space-y-4', className)}>
      {faqs.map((faq, index) => {
        const isOpen = openItems.has(index)
        
        return (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-glass dark:border-white/10 dark:bg-black/5"
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/10 dark:hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              aria-expanded={isOpen}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                {faq.q}
              </h3>
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 transition-transform duration-200',
                  isOpen ? 'rotate-180' : ''
                )}
              >
                <svg
                  className="h-4 w-4 text-brand-600 dark:text-brand-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <div className="border-t border-white/10 p-6 pt-4 dark:border-white/10">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}