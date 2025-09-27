'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, LucideIcon } from 'lucide-react'

type Props = {
  title: string
  description: string
  features?: string[]
  href: string
  icon: LucideIcon
  badge?: string
  index?: number
}

export function ServiceCard({
  title,
  description,
  features = [],
  href,
  icon,
  badge,
  index = 0,
}: Props) {
  const prefersReducedMotion = useReducedMotion()
  const [xy, setXY] = React.useState({ x: 0, y: 0 })

  const onMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10 // -5..5 deg
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10 // -5..5 deg
    setXY({ x, y })
  }

  const onMouseLeave = () => setXY({ x: 0, y: 0 })

  return (
    <motion.article
      role="article"
      aria-label={title}
      className="group relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{
        delay: prefersReducedMotion ? 0 : index * 0.05,
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      {/* gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-emerald-500/10 to-transparent blur-[18px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative h-full rounded-2xl border border-border/70 bg-card text-card-foreground p-5 shadow-sm transition-shadow hover:shadow-lg focus-within:shadow-lg"
        style={
          prefersReducedMotion
            ? undefined
            : { transform: `perspective(800px) rotateX(${xy.y}deg) rotateY(${xy.x}deg)` }
        }
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/30">
            <icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold leading-tight">{title}</h3>
              {badge && (
                <span className="text-xs rounded-full px-2 py-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  {badge}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{description}</p>
          </div>
        </div>

        {features.length > 0 && (
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-muted-foreground">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        )}

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ring-1 ring-border hover:bg-emerald-500 hover:text-white hover:ring-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
          aria-label={`${title} – view service`}
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>

        {/* make entire card clickable for pointer users while keeping a11y */}
        <Link href={href} className="absolute inset-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500" aria-hidden="true" tabIndex={-1} />
      </div>
    </motion.article>
  )
}