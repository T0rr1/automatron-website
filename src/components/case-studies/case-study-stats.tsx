'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Clock, TrendingUp, Users, Star, Building, Briefcase } from 'lucide-react'
import { getCaseStudyStats } from '@/lib/constants/case-studies'
import { serviceCategories } from '@/lib/constants/services'

export function CaseStudyStats() {
  const stats = getCaseStudyStats()

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Proven Results Across Industries</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Our automation solutions have helped businesses across {stats.industries} industries 
          save time, reduce errors, and improve efficiency.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={<Briefcase className="h-6 w-6" />}
          title="Success Stories"
          value={`${stats.totalStudies}+`}
          description="Completed automation projects"
          color="text-blue-500"
        />
        <MetricCard
          icon={<Clock className="h-6 w-6" />}
          title="Average Time Saved"
          value={`${stats.avgTimeSaved}h`}
          description="Per week, per business"
          color="text-green-500"
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6" />}
          title="Success Rate"
          value={`${stats.avgSuccessRate}%`}
          description="Projects delivered successfully"
          color="text-purple-500"
        />
        <MetricCard
          icon={<Star className="h-6 w-6" />}
          title="Client Satisfaction"
          value={`${stats.avgSatisfaction}/5`}
          description="Average rating from clients"
          color="text-yellow-500"
        />
      </div>

      {/* Service Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Service Categories
          </CardTitle>
          <CardDescription>
            Success stories across our six main service areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map(category => {
              // Count case studies in this category
              const { caseStudies } = require('@/lib/constants/case-studies')
              const categoryCount = caseStudies.filter(
                (study: any) => study.serviceCategory === category.slug
              ).length
              const percentage = Math.round((categoryCount / stats.totalStudies) * 100)

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-sm">{category.name}</span>
                    </div>
                    <Badge variant="secondary">{categoryCount}</Badge>
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {percentage}% of all case studies
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Industry Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Industries Served
          </CardTitle>
          <CardDescription>
            We've helped businesses across {stats.industries} different industries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(() => {
              const { caseStudies } = require('@/lib/constants/case-studies')
              const industries = Array.from(new Set(caseStudies.map((study: any) => study.industry))) as string[]
              return industries.map((industry: string) => (
                <Badge key={industry} variant="outline" className="text-sm">
                  {industry}
                </Badge>
              ))
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MetricCardProps {
  icon: React.ReactNode
  title: string
  value: string
  description: string
  color: string
}

function MetricCard({ icon, title, value, description, color }: MetricCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted mb-4 ${color}`}>
          {icon}
        </div>
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="font-medium mb-1">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </CardContent>
    </Card>
  )
}