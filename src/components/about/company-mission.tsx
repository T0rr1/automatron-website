'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Zap, 
  Users, 
  Shield, 
  Clock, 
  Target, 
  Heart,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const missionPoints = [
  {
    icon: Clock,
    title: 'Time is Your Most Valuable Asset',
    description: 'We believe busy professionals shouldn\'t waste hours on repetitive tasks that can be automated safely and reliably.',
  },
  {
    icon: Users,
    title: 'Built for Solo Owners & Small Teams',
    description: 'Our solutions are designed specifically for businesses that need quick wins without complex enterprise overhead.',
  },
  {
    icon: Shield,
    title: 'Safety-First Approach',
    description: 'Every automation we build includes safeguards, logging, and dry-run options to protect your data and processes.',
  },
  {
    icon: Target,
    title: 'Practical Results Over Complexity',
    description: 'We focus on tangible time savings and measurable outcomes rather than impressive but impractical solutions.',
  },
]

const values = [
  {
    icon: Zap,
    title: 'Quick Wins',
    description: 'Most projects deliver results within 1-7 days',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    icon: Heart,
    title: 'Human-Centered',
    description: 'Technology should serve people, not the other way around',
    color: 'text-red-600 dark:text-red-400',
  },
  {
    icon: CheckCircle,
    title: 'Reliability',
    description: '95%+ success rate across all automation projects',
    color: 'text-green-600 dark:text-green-400',
  },
]

export function CompanyMission() {
  return (
    <div className="space-y-16">
      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <Badge variant="outline" className="mb-4">
          Our Mission
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Practical Automation for{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Busy Professionals
          </span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          At Automatron.ai, we're on a mission to give busy professionals their time back. 
          We specialize in creating practical, reliable automation solutions that save 2-5 hours 
          per week without the complexity or risk of enterprise-level systems.
        </p>
      </motion.div>

      {/* Mission Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missionPoints.map((point, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <point.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Core Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <Badge variant="outline" className="mb-4">
          Our Values
        </Badge>
        <h3 className="text-2xl font-bold mb-8">What Drives Us</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 border-border mb-4 group-hover:scale-110 transition-transform ${value.color}`}>
                <value.icon className="h-8 w-8" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center bg-muted/50 rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold mb-4">
          Ready to Get Your Time Back?
        </h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's discuss how we can automate your repetitive tasks and save you 2-5 hours per week. 
          Our free assessment will identify your biggest time-saving opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href={"/contact" as any}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Free Assessment
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href={"/services" as any}
            className="inline-flex items-center justify-center px-6 py-3 border border-border rounded-lg font-medium hover:bg-muted transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}