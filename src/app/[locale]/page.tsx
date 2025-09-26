import { Layout } from '@/components/common'
import { HomepageHero } from '@/components/home/hero-section'
import { ServiceOverviewSection } from '@/components/services'
import { DemoShowcase } from '@/components/home/demo-showcase'

interface HomeProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params
  return (
    <Layout>
      {/* Hero Section */}
      <HomepageHero />

      {/* Service Overview Section */}
      <ServiceOverviewSection />

      {/* Demo Showcase Section */}
      <DemoShowcase />
    </Layout>
  )
}