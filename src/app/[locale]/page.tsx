import { Layout } from '@/components/common'
import { HomepageHero } from '@/components/home/hero-section'
import { ServiceOverviewSection } from '@/components/services'
import { DemoShowcase } from '@/components/home/demo-showcase'

interface HomeProps {
  params: { locale: string }
}

export default function Home({ params }: HomeProps) {
  const { locale } = params
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