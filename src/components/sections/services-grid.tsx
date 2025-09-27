'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ServiceCard } from '@/components/cards/service-card'
import { services } from '@/content/services'

export function ServicesGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold tracking-tight">
          What we can build for you
        </h2>
        <p className="mt-3 text-muted-foreground">
          From one-off scripts to full static sites, built with testing, packaging, and security best practices.
        </p>
      </div>

      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 1 },
          show: {
            transition: { staggerChildren: 0.07 },
          },
        }}
      >
        {services.map((s, i) => (
          <ServiceCard key={s.id} index={i} {...s} />
        ))}
      </motion.div>
    </section>
  )
}