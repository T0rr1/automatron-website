import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Layout } from '@/components/common'
import { serviceCategories } from '@/lib/constants'
import { ServiceDetailPage } from '@/components/services/service-detail-page'

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return serviceCategories.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = serviceCategories.find((s) => s.slug === slug)
  
  if (!service) {
    return {
      title: 'Service Not Found | Automatron.ai',
    }
  }

  return {
    title: `${service.name} | Automatron.ai`,
    description: service.description,
    openGraph: {
      title: `${service.name} - Automation Services`,
      description: service.description,
      type: 'website',
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = serviceCategories.find((s) => s.slug === slug)

  if (!service) {
    notFound()
  }

  return (
    <Layout>
      <ServiceDetailPage service={service} />
    </Layout>
  )
}