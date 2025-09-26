'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Terminal, 
  FileSpreadsheet, 
  Code, 
  Database,
  Workflow,
  Shield,
  Clock,
  Award
} from 'lucide-react'

const teamMembers = [
  {
    name: 'Automation Specialists',
    role: 'PowerShell & Python Experts',
    avatar: '👨‍💻',
    description: 'Our team combines deep technical expertise with practical business understanding to deliver automation solutions that actually work in real-world scenarios.',
    specialties: ['PowerShell Scripting', 'Python Automation', 'Excel VBA', 'Process Optimization'],
    experience: '5+ years',
  },
  {
    name: 'Business Analysts',
    role: 'Process & Workflow Experts',
    avatar: '👩‍💼',
    description: 'We understand small business workflows and can quickly identify the highest-impact automation opportunities for maximum time savings.',
    specialties: ['Workflow Analysis', 'Process Mapping', 'Requirements Gathering', 'ROI Optimization'],
    experience: '7+ years',
  },
]

const technicalSkills = [
  {
    icon: Terminal,
    name: 'PowerShell',
    level: 95,
    description: 'Advanced scripting for Windows automation, file management, and system administration',
    color: 'bg-blue-500',
  },
  {
    icon: Code,
    name: 'Python',
    level: 90,
    description: 'Data processing, web scraping, API integration, and cross-platform automation',
    color: 'bg-green-500',
  },
  {
    icon: FileSpreadsheet,
    name: 'Excel Automation',
    level: 88,
    description: 'VBA macros, data analysis, report generation, and spreadsheet optimization',
    color: 'bg-emerald-500',
  },
  {
    icon: Database,
    name: 'Data Processing',
    level: 85,
    description: 'CSV manipulation, database queries, data cleaning, and format conversion',
    color: 'bg-purple-500',
  },
  {
    icon: Workflow,
    name: 'Process Automation',
    level: 92,
    description: 'Workflow design, task scheduling, email automation, and system integration',
    color: 'bg-orange-500',
  },
  {
    icon: Shield,
    name: 'Security & Safety',
    level: 94,
    description: 'Safe automation practices, data protection, backup strategies, and error handling',
    color: 'bg-red-500',
  },
]

const achievements = [
  {
    icon: Clock,
    title: '10,000+',
    subtitle: 'Hours Saved',
    description: 'Total time saved for our clients through automation',
  },
  {
    icon: Award,
    title: '95%+',
    subtitle: 'Success Rate',
    description: 'Projects delivered successfully on first deployment',
  },
  {
    icon: Workflow,
    title: '500+',
    subtitle: 'Automations Built',
    description: 'Custom scripts and workflows created for clients',
  },
]

export function TeamExpertise() {
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
          Our Expertise
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          PowerShell, Python &{' '}
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Excel Specialists
          </span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our team brings together deep technical expertise in automation technologies 
          with practical understanding of small business workflows and challenges.
        </p>
      </motion.div>

      {/* Team Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {teamMembers.map((member, index) => (
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
                  <div className="text-4xl">{member.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{member.name}</h3>
                      <Badge variant="secondary">{member.experience}</Badge>
                    </div>
                    <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Technical Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Technical Proficiency</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our expertise spans the most effective automation technologies for small business workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {technicalSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex-shrink-0">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <skill.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{skill.name}</h4>
                        <span className="text-sm font-medium text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Progress 
                    value={skill.level} 
                    className="mb-3 h-2"
                  />
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-muted/50 rounded-2xl p-8"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Track Record</h3>
          <p className="text-muted-foreground">
            Numbers that demonstrate our commitment to delivering results
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <achievement.icon className="h-8 w-8" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {achievement.title}
              </div>
              <div className="text-sm font-medium text-primary mb-2">
                {achievement.subtitle}
              </div>
              <p className="text-sm text-muted-foreground">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}