'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  ArrowLeft, 
  Clock, 
  TrendingUp, 
  Users, 
  Star, 
  CheckCircle, 
  Quote,
  Calendar,
  Building,
  Target
} from 'lucide-react'
import { CaseStudy } from '@/types'
import { serviceCategories } from '@/lib/constants/services'
import { MetricsVisualization } from './metrics-visualization'
import { DeliverablesShowcase } from './deliverables-showcase'
import { TestimonialDisplay } from './testimonial-display'

interface CaseStudyDetailProps {
  caseStudy: CaseStudy
}

export function CaseStudyDetail({ caseStudy }: CaseStudyDetailProps) {
  const getCategoryName = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.name || categorySlug
  }

  const getCategoryIcon = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.icon || '🔧'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="bg-muted/30 py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href={"/work" as any}>
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Badge variant="secondary" className="text-sm">
              {getCategoryIcon(caseStudy.serviceCategory)} {getCategoryName(caseStudy.serviceCategory)}
            </Badge>
            <Badge variant="outline">{caseStudy.industry}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(caseStudy.createdAt).toLocaleDateString()}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {caseStudy.title}
          </h1>
          
          <div className="flex items-center gap-4 text-lg text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              {caseStudy.client}
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {caseStudy.industry}
            </div>
          </div>

          {/* Key Results Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">
                {caseStudy.results.timeSavedPerWeek}h
              </div>
              <div className="text-sm text-muted-foreground">Weekly Time Saved</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {caseStudy.results.successRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-500 mb-1">
                {caseStudy.results.turnaroundTime}
              </div>
              <div className="text-sm text-muted-foreground">Turnaround Time</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-500 mb-1">
                {caseStudy.results.clientSatisfaction}/5
              </div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="h-5 w-5 text-red-500" />
                The Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{caseStudy.challenge}</p>
            </CardContent>
          </Card>

          {/* Solution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Our Solution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{caseStudy.solution}</p>
            </CardContent>
          </Card>

          {/* Before/After Comparison */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Before vs After</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-red-600 flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    Before Automation
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {caseStudy.beforeAfter.before}
                  </p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-green-600 flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    After Automation
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {caseStudy.beforeAfter.after}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Visualization */}
          <MetricsVisualization metrics={caseStudy.metrics} />

          {/* Deliverables */}
          <DeliverablesShowcase deliverables={caseStudy.deliverables} />

          {/* Business Impact */}
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Business Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-primary mb-4">
                {caseStudy.results.businessImpact}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {caseStudy.results.timeSavedPerWeek}
                  </div>
                  <div className="text-sm text-muted-foreground">Hours Saved Weekly</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 mb-1">
                    {caseStudy.results.successRate}%
                  </div>
                  <div className="text-sm text-muted-foreground">Implementation Success</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500 mb-1">
                    {caseStudy.results.clientSatisfaction}/5
                  </div>
                  <div className="text-sm text-muted-foreground">Client Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <TestimonialDisplay 
              testimonial={caseStudy.testimonial}
              client={caseStudy.client}
              industry={caseStudy.industry}
            />
          )}

          {/* CTA Section */}
          <Card className="text-center bg-gradient-to-r from-primary/10 to-secondary/10">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                See how automation can save you 2-5 hours per week, just like {caseStudy.client}. 
                Get your free automation assessment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/contact" as any}>
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Your Free Assessment
                  </Button>
                </Link>
                <Link href={"/services" as any}>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore Our Services
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}