'use client'

import { motion } from 'framer-motion'
import { Container, HeroSection } from '@/components/common'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Clock, Users, Target } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    icon: Clock,
    value: '2-5',
    unit: 'hours saved',
    description: 'per week for our clients',
  },
  {
    icon: Users,
    value: '95%+',
    unit: 'success rate',
    description: 'across all projects',
  },
  {
    icon: Target,
    value: '1-7',
    unit: 'day turnaround',
    description: 'for most services',
  },
]

export function AboutHero() {
  return (
    <HeroSection className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              Professional Automation Experts
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            We Turn Your{' '}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Repetitive Tasks
            </span>{' '}
            Into Automated Solutions
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Automatron.ai specializes in practical automation solutions for solo business owners 
            and small teams. Our mission is simple: save you 2-5 hours per week through reliable, 
            safety-first automation that just works.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="group">
              <Link href={"/contact" as any}>
                Get Free Assessment
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={"/work" as any}>View Our Work</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-3">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {stat.unit}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </HeroSection>
  )
}