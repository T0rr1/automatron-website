'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Monitor, 
  Smartphone, 
  Cloud, 
  Server,
  Zap,
  CheckCircle,
  ArrowRight,
  Globe,
  Shield
} from 'lucide-react'

const platforms = [
  {
    icon: Monitor,
    name: 'Windows-First',
    priority: 'Primary Focus',
    description: 'Deep expertise in Windows environments, PowerShell, and Microsoft ecosystem integration',
    features: [
      'PowerShell scripting and modules',
      'Windows Task Scheduler integration',
      'Active Directory automation',
      'Office 365 and Exchange automation',
      'Windows file system operations',
      'Registry and system configuration'
    ],
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Globe,
    name: 'Cross-Platform',
    priority: 'Extended Capability',
    description: 'Python-based solutions that work across Windows, macOS, and Linux environments',
    features: [
      'Python automation scripts',
      'Cross-platform file operations',
      'Web API integrations',
      'Database connectivity',
      'Cloud service automation',
      'Docker containerization'
    ],
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
]

const technologies = [
  {
    category: 'Scripting & Automation',
    icon: Zap,
    tools: [
      { name: 'PowerShell 7+', expertise: 'Expert', description: 'Advanced scripting, modules, and cmdlets' },
      { name: 'Python 3.9+', expertise: 'Expert', description: 'Automation, data processing, and web integration' },
      { name: 'Batch Scripts', expertise: 'Proficient', description: 'Legacy system integration and simple tasks' },
      { name: 'VBA/Excel Macros', expertise: 'Expert', description: 'Spreadsheet automation and data manipulation' },
    ],
  },
  {
    category: 'Microsoft Ecosystem',
    icon: Monitor,
    tools: [
      { name: 'Office 365', expertise: 'Expert', description: 'Email, SharePoint, Teams automation' },
      { name: 'Exchange Server', expertise: 'Proficient', description: 'Email rules and mailbox management' },
      { name: 'Active Directory', expertise: 'Proficient', description: 'User and group management automation' },
      { name: 'SQL Server', expertise: 'Proficient', description: 'Database queries and reporting' },
    ],
  },
  {
    category: 'Cloud & Integration',
    icon: Cloud,
    tools: [
      { name: 'Azure PowerShell', expertise: 'Proficient', description: 'Cloud resource management' },
      { name: 'REST APIs', expertise: 'Expert', description: 'Third-party service integration' },
      { name: 'JSON/XML Processing', expertise: 'Expert', description: 'Data format conversion and manipulation' },
      { name: 'Web Scraping', expertise: 'Proficient', description: 'Automated data collection' },
    ],
  },
]

const advantages = [
  {
    icon: CheckCircle,
    title: 'Windows Optimization',
    description: 'Native Windows integration means faster, more reliable automation with better system compatibility',
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description: 'Deep platform knowledge allows us to deliver solutions quickly without compatibility issues',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built-in Windows security features and PowerShell execution policies for safe automation',
  },
  {
    icon: Globe,
    title: 'Future-Proof',
    description: 'Python capabilities ensure solutions can scale beyond Windows when needed',
  },
]

export function TechnologyFocus() {
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
          Technology Focus
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Windows-First with{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Cross-Platform Capabilities
          </span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          We specialize in Windows environments where most small businesses operate, 
          while maintaining the flexibility to work across platforms when needed.
        </p>
      </motion.div>

      {/* Platform Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {platforms.map((platform, index) => (
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
                  <div className={`flex-shrink-0 p-3 rounded-lg ${platform.bgColor}`}>
                    <platform.icon className={`h-8 w-8 ${platform.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{platform.name}</h3>
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {platform.priority}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                    Key Capabilities
                  </h4>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Technology Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Technology Stack</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our toolkit covers the essential technologies for effective business automation
          </p>
        </div>

        <div className="space-y-8">
          {technologies.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                        <category.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold">{category.category}</h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.tools.map((tool, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-sm">{tool.name}</span>
                            <Badge 
                              variant={tool.expertise === 'Expert' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {tool.expertise}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Advantages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-muted/50 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Why Our Approach Works</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our Windows-first strategy delivers better results for small businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-4 group"
            >
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <advantage.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {advantage.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 pt-8 border-t border-border">
          <p className="text-muted-foreground mb-4">
            Ready to see how our technology expertise can automate your workflows?
          </p>
          <motion.a
            href={"/services" as any}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Our Services
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}