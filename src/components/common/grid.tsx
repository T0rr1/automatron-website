import * as React from "react"
import { cn } from "@/lib/utils"

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    md?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    lg?: 1 | 2 | 3 | 4 | 5 | 6 | 12
    xl?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  }
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = 'md', responsive, ...props }, ref) => {
    const gapClasses = {
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
    }

    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      12: 'grid-cols-12',
    }

    const responsiveClasses = responsive ? [
      responsive.sm && `sm:grid-cols-${responsive.sm}`,
      responsive.md && `md:grid-cols-${responsive.md}`,
      responsive.lg && `lg:grid-cols-${responsive.lg}`,
      responsive.xl && `xl:grid-cols-${responsive.xl}`,
    ].filter(Boolean).join(' ') : ''

    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          colClasses[cols],
          gapClasses[gap],
          responsiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)

Grid.displayName = "Grid"

// Grid item component for more control
interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  start?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  responsive?: {
    sm?: { span?: number; start?: number }
    md?: { span?: number; start?: number }
    lg?: { span?: number; start?: number }
    xl?: { span?: number; start?: number }
  }
}

const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, span, start, responsive, ...props }, ref) => {
    const spanClasses = span ? `col-span-${span}` : ''
    const startClasses = start ? `col-start-${start}` : ''

    const responsiveClasses = responsive ? [
      responsive.sm?.span && `sm:col-span-${responsive.sm.span}`,
      responsive.sm?.start && `sm:col-start-${responsive.sm.start}`,
      responsive.md?.span && `md:col-span-${responsive.md.span}`,
      responsive.md?.start && `md:col-start-${responsive.md.start}`,
      responsive.lg?.span && `lg:col-span-${responsive.lg.span}`,
      responsive.lg?.start && `lg:col-start-${responsive.lg.start}`,
      responsive.xl?.span && `xl:col-span-${responsive.xl.span}`,
      responsive.xl?.start && `xl:col-start-${responsive.xl.start}`,
    ].filter(Boolean).join(' ') : ''

    return (
      <div
        ref={ref}
        className={cn(
          spanClasses,
          startClasses,
          responsiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)

GridItem.displayName = "GridItem"

// Flex utilities
interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse'
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  responsive?: {
    xs?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
    sm?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
    md?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
    lg?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
    xl?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
    '2xl'?: { direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse' }
  }
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction = 'row', wrap, align, justify, gap, responsive, ...props }, ref) => {
    const directionClasses = {
      row: 'flex-row',
      col: 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'col-reverse': 'flex-col-reverse',
    }

    const wrapClasses = {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
      'wrap-reverse': 'flex-wrap-reverse',
    }

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    }

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    }

    const gapClasses = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12',
      '2xl': 'gap-16',
    }

    const responsiveClasses = responsive ? [
      responsive.xs?.direction && `xs:${directionClasses[responsive.xs.direction]}`,
      responsive.sm?.direction && `sm:${directionClasses[responsive.sm.direction]}`,
      responsive.md?.direction && `md:${directionClasses[responsive.md.direction]}`,
      responsive.lg?.direction && `lg:${directionClasses[responsive.lg.direction]}`,
      responsive.xl?.direction && `xl:${directionClasses[responsive.xl.direction]}`,
      responsive['2xl']?.direction && `2xl:${directionClasses[responsive['2xl'].direction]}`,
    ].filter(Boolean).join(' ') : ''

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionClasses[direction],
          wrap && wrapClasses[wrap],
          align && alignClasses[align],
          justify && justifyClasses[justify],
          gap && gapClasses[gap],
          responsiveClasses,
          className
        )}
        {...props}
      />
    )
  }
)

Flex.displayName = "Flex"

export { Grid, GridItem, Flex }