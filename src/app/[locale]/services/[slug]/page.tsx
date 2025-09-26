import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Layout } from '@/components/common'
import { serviceCategories } from '@/lib/constants'
import { ServiceDetailPage } from '@/components/services/service-detail-page'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return serviceCategories.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = serviceCategories.find((s) => s.slug === params.slug)
  
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

export default function ServicePage({ params }: ServicePageProps) {
  const service = serviceCategories.find((s) => s.slug === params.slug)

  if (!service) {
    notFound()
  }

  return (
    <Layout>
      <ServiceDetailPage service={service} />
    </Layout>
  )
}