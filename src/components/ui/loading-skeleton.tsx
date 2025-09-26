'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'card' | 'text' | 'avatar' | 'button' | 'image' | 'list' | 'table'
  lines?: number
  width?: string | number
  height?: string | number
  'aria-label'?: string
}

export function LoadingSkeleton({
  className,
  variant = 'text',
  lines = 1,
  width,
  height,
  'aria-label': ariaLabel = 'Loading content',
  ...props
}: LoadingSkeletonProps) {
  const skeletonProps = {
    style: {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    },
    'aria-label': ariaLabel,
    role: 'status',
    'aria-live': 'polite' as const,
    ...props,
  }

  switch (variant) {
    case 'card':
      return (
        <div className={cn('space-y-3', className)} {...skeletonProps}>
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )

    case 'avatar':
      return (
        <div className={cn('flex items-center space-x-4', className)} {...skeletonProps}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      )

    case 'button':
      return (
        <Skeleton 
          className={cn('h-10 w-[100px] rounded-md', className)} 
          {...skeletonProps} 
        />
      )

    case 'image':
      return (
        <Skeleton 
          className={cn('aspect-video w-full rounded-lg', className)} 
          {...skeletonProps} 
        />
      )

    case 'list':
      return (
        <div className={cn('space-y-3', className)} {...skeletonProps}>
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            </div>
          ))}
        </div>
      )

    case 'table':
      return (
        <div className={cn('space-y-3', className)} {...skeletonProps}>
          {/* Table header */}
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          {/* Table rows */}
          {Array.from({ length: lines }).map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>
      )

    case 'text':
    default:
      return (
        <div className={cn('space-y-2', className)} {...skeletonProps}>
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton 
              key={i} 
              className={cn(
                'h-4',
                i === lines - 1 ? 'w-[80%]' : 'w-full'
              )} 
            />
          ))}
        </div>
      )
  }
}

// Specific loading components for common use cases
export function ServiceCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 border rounded-lg space-y-4', className)}>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-6 w-[150px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[80%]" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-9 w-[120px] rounded-md" />
      </div>
    </div>
  )
}

export function CaseStudySkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 border rounded-lg space-y-4', className)}>
      <div className="space-y-2">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
      <div className="flex space-x-4">
        <div className="space-y-1">
          <Skeleton className="h-3 w-[60px]" />
          <Skeleton className="h-5 w-[80px]" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-[80px]" />
          <Skeleton className="h-5 w-[60px]" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-[70px]" />
          <Skeleton className="h-5 w-[90px]" />
        </div>
      </div>
    </div>
  )
}

export function FormSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-24 w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <Skeleton className="h-10 w-[120px] rounded-md" />
    </div>
  )
}

export function NavigationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-between p-4', className)}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <Skeleton className="h-6 w-[120px]" />
      </div>
      <div className="hidden md:flex items-center space-x-6">
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[80px]" />
        <Skeleton className="h-4 w-[70px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-[100px] rounded-md" />
      </div>
    </div>
  )
}