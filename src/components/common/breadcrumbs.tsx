'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
  separator?: React.ReactNode
  showHome?: boolean
  maxItems?: number
}

export function Breadcrumbs({
  items,
  className,
  separator = <ChevronRight className="h-4 w-4" />,
  showHome = true,
  maxItems = 5,
}: BreadcrumbsProps) {
  const pathname = usePathname()
  const t = useTranslations('navigation')

  // Auto-generate breadcrumbs from pathname if items not provided
  const breadcrumbItems = React.useMemo(() => {
    if (items) return items

    const pathSegments = pathname.split('/').filter(Boolean)
    const generatedItems: BreadcrumbItem[] = []

    if (showHome) {
      generatedItems.push({
        label: t('home'),
        href: '/',
      })
    }

    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const isLast = index === pathSegments.length - 1
      
      // Convert segment to readable label
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      generatedItems.push({
        label,
        href: isLast ? undefined : href,
        current: isLast,
      })
    })

    return generatedItems
  }, [items, pathname, showHome, t])

  // Truncate items if exceeding maxItems
  const displayItems = React.useMemo(() => {
    if (breadcrumbItems.length <= maxItems) {
      return breadcrumbItems
    }

    const firstItem = breadcrumbItems[0]
    const lastItems = breadcrumbItems.slice(-2)
    
    return [
      firstItem,
      { label: '...', href: undefined },
      ...lastItems,
    ]
  }, [breadcrumbItems, maxItems])

  if (displayItems.length <= 1) {
    return null
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center space-x-1 text-sm', className)}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1
          const isEllipsis = item.label === '...'

          return (
            <li key={`${item.href}-${index}`} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground" aria-hidden="true">
                  {separator}
                </span>
              )}
              
              {isEllipsis ? (
                <span className="text-muted-foreground px-1">...</span>
              ) : item.href && !isLast ? (
                <Link
                  href={item.href as any}
                  className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm px-1 py-0.5"
                >
                  {item.label === t('home') && showHome ? (
                    <Home className="h-4 w-4" aria-label={item.label} />
                  ) : (
                    item.label
                  )}
                </Link>
              ) : (
                <span
                  className={cn(
                    'px-1 py-0.5',
                    isLast
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// Structured data for breadcrumbs (SEO)
export function BreadcrumbsStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
      .filter(item => item.href)
      .map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: item.href?.startsWith('http') ? item.href : `https://automatron.ai${item.href}`,
      })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// Breadcrumb wrapper with structured data
interface BreadcrumbsWithSEOProps extends BreadcrumbsProps {
  includeStructuredData?: boolean
}

export function BreadcrumbsWithSEO({
  includeStructuredData = true,
  ...props
}: BreadcrumbsWithSEOProps) {
  const breadcrumbItems = props.items || []

  return (
    <>
      <Breadcrumbs {...props} />
      {includeStructuredData && breadcrumbItems.length > 0 && (
        <BreadcrumbsStructuredData items={breadcrumbItems} />
      )}
    </>
  )
}