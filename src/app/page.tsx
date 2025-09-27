import { Layout } from '@/components/common'
import { ServicesGrid } from '@/components/sections/services-grid'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <Layout>
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Save 2-5 hours per week with automation
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional automation solutions for busy professionals. 
            Streamline your workflow and focus on what matters most.
          </p>
          <Link href="/en/services/custom-scripts">
            <Button size="lg" className="text-lg px-8 py-4">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <ServicesGrid />
    </Layout>
  )
}