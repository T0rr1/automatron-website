'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  FileCheck, 
  RotateCcw, 
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  Database,
  Lock,
  Activity
} from 'lucide-react'

const safetyPrinciples = [
  {
    icon: Shield,
    title: 'Move, Don\'t Delete',
    description: 'We never permanently delete files. Instead, we move them to designated backup locations where they can be easily recovered if needed.',
    practices: [
      'Files moved to timestamped backup folders',
      'Original folder structure preserved',
      'Easy restoration process documented',
      'Retention policies clearly defined'
    ],
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: Eye,
    title: 'Dry-Run First',
    description: 'Every automation includes a dry-run mode that shows exactly what would happen without making any actual changes.',
    practices: [
      'Preview all operations before execution',
      'Detailed impact reports generated',
      'User approval required for live runs',
      'Step-by-step change documentation'
    ],
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: FileCheck,
    title: 'Comprehensive Logging',
    description: 'Detailed logs capture every action, making it easy to understand what happened and troubleshoot any issues.',
    practices: [
      'Timestamped action logs',
      'Error tracking and reporting',
      'Performance metrics captured',
      'Audit trail for compliance'
    ],
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: RotateCcw,
    title: 'Easy Rollback',
    description: 'Every automation includes clear rollback procedures and maintains backups to quickly undo changes if needed.',
    practices: [
      'Automated backup creation',
      'One-click rollback scripts',
      'Version control for configurations',
      'Recovery documentation provided'
    ],
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
]

const securityMeasures = [
  {
    icon: Lock,
    title: 'Secure Execution',
    description: 'PowerShell execution policies and signed scripts ensure only authorized code runs',
  },
  {
    icon: Database,
    title: 'Data Protection',
    description: 'Sensitive data is handled with encryption and secure temporary storage',
  },
  {
    icon: Activity,
    title: 'Monitoring',
    description: 'Real-time monitoring and alerting for automation health and performance',
  },
  {
    icon: AlertTriangle,
    title: 'Error Handling',
    description: 'Graceful error handling prevents cascading failures and data corruption',
  },
]

const testimonials = [
  {
    quote: "The dry-run feature gave me complete confidence before running the automation. I could see exactly what would happen to my 10,000+ files.",
    author: "Sarah M.",
    role: "Small Business Owner",
    service: "File Organization Automation",
  },
  {
    quote: "When we needed to rollback a change, the process was seamless. Everything was back to normal in minutes, not hours.",
    author: "Mike R.",
    role: "Operations Manager",
    service: "Email Automation",
  },
]

export function SafetyPractices() {
  return (
    <div className="space-y-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <Badge variant="outline" className="mb-4">
          Safety-First Approach
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Your Data Safety is{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Our Top Priority
          </span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We understand that automation can feel risky. That's why every solution we build 
          includes multiple safety layers to protect your data and ensure you can always 
          recover from any unexpected issues.
        </p>
      </motion.div>

      {/* Safety Principles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {safetyPrinciples.map((principle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${principle.bgColor}`}>
                    <principle.icon className={`h-8 w-8 ${principle.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    How We Implement This
                  </h4>
                  <ul className="space-y-2">
                    {principle.practices.map((practice, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Security Measures */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Additional Security Measures</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond our core safety practices, we implement enterprise-grade security measures
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMeasures.map((measure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <measure.icon className="h-6 w-6" />
                  </div>
                  <h4 className="font-semibold mb-2">{measure.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {measure.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Client Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-muted/50 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Client Peace of Mind</h3>
          <p className="text-muted-foreground">
            What our clients say about our safety-first approach
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.service}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Safety Guarantee */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 mb-4">
            <Shield className="h-8 w-8" />
          </div>
          <h4 className="text-lg font-semibold mb-2">Our Safety Guarantee</h4>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            If any automation causes unintended data loss or system issues, we'll work with you 
            at no charge to restore your systems and data to their previous state.
          </p>
          <motion.a
            href={"/contact" as any}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discuss Your Safety Requirements
            <CheckCircle className="ml-2 h-4 w-4" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}