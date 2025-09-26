import { Metadata } from 'next'
import { Layout } from '@/components/common'
import { CaseStudyListing } from '@/components/case-studies/case-study-listing'
import { CaseStudyStats } from '@/components/case-studies/case-study-stats'
import { getCaseStudyStats } from '@/lib/constants/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies & Portfolio | Automatron.ai',
  description: 'Real automation success stories from businesses saving 2-5 hours per week. See measurable results, time savings, and client testimonials from our automation projects.',
  openGraph: {
    title: 'Case Studies & Portfolio | Automatron.ai',
    description: 'Real automation success stories from businesses saving 2-5 hours per week.',
    type: 'website',
  },
}

export default function WorkPage() {
  const stats = getCaseStudyStats()

  return (
    <Layout>
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Real Results from Real Businesses
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            See how we've helped businesses save 2-5 hours per week through practical automation solutions
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
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
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <CaseStudyStats />
        </div>
      </section>

      {/* Case Studies Listing */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <CaseStudyListing />
        </div>
      </section>
      </div>
    </Layout>
  )
}