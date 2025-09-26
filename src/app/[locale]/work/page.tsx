'use client'

import { motion } from 'framer-motion'
import { Layout } from '@/components/common'
import { CaseStudyListing } from '@/components/case-studies/case-study-listing'
import { CaseStudyStats } from '@/components/case-studies/case-study-stats'
import { getCaseStudyStats } from '@/lib/constants/case-studies'

export default function WorkPage() {
  const stats = getCaseStudyStats()

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Real Results from Real Businesses
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              See how we've helped businesses save 2-5 hours per week through practical automation solutions
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-8 text-center"
            >
              <div>
                <div className="text-3xl font-bold text-primary">{stats.totalStudies}+</div>
                <div className="text-sm text-muted-foreground">Success Stories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{stats.avgTimeSaved}h</div>
                <div className="text-sm text-muted-foreground">Avg. Weekly Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{stats.avgSuccessRate}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{stats.avgSatisfaction}/5</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <CaseStudyStats />
          </div>
        </motion.section>

        {/* Case Studies Listing */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="py-16 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <CaseStudyListing />
          </div>
        </motion.section>
      </div>
    </Layout>
  )
}