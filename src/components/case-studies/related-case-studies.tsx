'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, TrendingUp, ArrowRight } from 'lucide-react'
import { CaseStudy } from '@/types'
import { serviceCategories } from '@/lib/constants/services'

interface RelatedCaseStudiesProps {
  studies: CaseStudy[]
}

export function RelatedCaseStudies({ studies }: RelatedCaseStudiesProps) {
  if (studies.length === 0) return null

  const getCategoryName = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.name || categorySlug
  }

  const getCategoryIcon = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.icon || '🔧'
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Related Success Stories</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover more automation wins from similar projects and industries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studies.map((study) => (
          <RelatedCaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      <div className="text-center">
        <Link href={"/work" as any}>
          <Button variant="outline" size="lg">
            View All Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function RelatedCaseStudyCard({ study }: { study: CaseStudy }) {
  const getCategoryName = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.name || categorySlug
  }

  const getCategoryIcon = (categorySlug: string) => {
    const category = serviceCategories.find(cat => cat.slug === categorySlug)
    return category?.icon || '🔧'
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className="mb-2">
            {getCategoryIcon(study.serviceCategory)} {getCategoryName(study.serviceCategory)}
          </Badge>
          <Badge variant="outline">{study.industry}</Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
          {study.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {study.client}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{study.results.timeSavedPerWeek}h/week</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium">{study.results.successRate}%</span>
          </div>
        </div>

        {/* Business Impact */}
        <div className="bg-muted/50 rounded-lg p-3">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {study.results.businessImpact}
          </p>
        </div>

        {/* CTA */}
        <Link href={`/work/${study.slug}` as any}>
          <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Read Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}