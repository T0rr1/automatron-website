'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Search, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react'
import { caseStudies } from '@/lib/constants/case-studies'
import { serviceCategories } from '@/lib/constants/services'
import { CaseStudy } from '@/types'

export function CaseStudyListing() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')

  // Get unique industries
  const industries = useMemo(() => {
    return Array.from(new Set(caseStudies.map(study => study.industry))).sort()
  }, [])

  // Filter case studies
  const filteredStudies = useMemo(() => {
    return caseStudies.filter(study => {
      const matchesSearch = searchTerm === '' || 
        study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        study.challenge.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || study.serviceCategory === selectedCategory
      const matchesIndustry = selectedIndustry === 'all' || study.industry === selectedIndustry

      return matchesSearch && matchesCategory && matchesIndustry
    })
  }, [searchTerm, selectedCategory, selectedIndustry])

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
      {/* Filters */}
      <div className="bg-card rounded-lg p-6 border">
        <h2 className="text-2xl font-semibold mb-6">Find Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search case studies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Service Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All Services" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {serviceCategories.map(category => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Industry Filter */}
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger>
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters */}
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedIndustry('all')
            }}
            className="w-full"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {filteredStudies.length} of {caseStudies.length} case studies
        </p>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>

      {/* No Results */}
      {filteredStudies.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No case studies found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedIndustry('all')
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
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
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
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
            <span className="font-medium">{study.results.timeSavedPerWeek}h/week saved</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="font-medium">{study.results.successRate}% success</span>
          </div>
        </div>

        {/* Challenge Preview */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {study.challenge}
        </p>

        {/* Business Impact */}
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Impact</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {study.results.businessImpact}
          </p>
        </div>

        {/* CTA */}
        <Link href={`/work/${study.slug}` as any}>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Read Full Case Study
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}