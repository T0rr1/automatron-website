import { Metadata } from 'next'
import { Layout } from '@/components/common'
import { ServiceOverviewSection } from '@/components/services'

export const metadata: Metadata = {
  title: 'Automation Services | Automatron.ai',
  description: 'Discover our six specialized automation service categories designed to save you 2-5 hours per week. From file management to report generation.',
}

export default function ServicesPage() {
  return (
    <Layout>
      <ServiceOverviewSection />
    </Layout>
  )
}