import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Layout } from '@/components/common'
import { getCaseStudyBySlug, getRelatedCaseStudies } from '@/lib/constants/case-studies'
import { CaseStudyDetail } from '@/components/case-studies/case-study-detail'
import { RelatedCaseStudies } from '@/components/case-studies/related-case-studies'

interface CaseStudyPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Automatron.ai'
    }
  }

  return {
    title: `${caseStudy.title} | Automatron.ai`,
    description: `${caseStudy.challenge.substring(0, 150)}...`,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.challenge.substring(0, 150),
      type: 'article',
      images: caseStudy.heroImage ? [{ url: caseStudy.heroImage }] : undefined,
    },
  }
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = getCaseStudyBySlug(slug)
  
  if (!caseStudy) {
    notFound()
  }

  const relatedStudies = getRelatedCaseStudies(slug, 3)

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <CaseStudyDetail caseStudy={caseStudy} />
        {relatedStudies.length > 0 && (
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <RelatedCaseStudies studies={relatedStudies} />
            </div>
          </section>
        )}
      </div>
    </Layout>
  )
}

// Generate static params for all case studies
export async function generateStaticParams() {
  const { caseStudies } = await import('@/lib/constants/case-studies')
  
  return caseStudies.map((study) => ({
    slug: study.slug,
  }))
}