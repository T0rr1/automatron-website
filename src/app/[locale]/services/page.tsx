import { Layout } from '@/components/common'
import { ServicesGrid } from '@/components/sections/services-grid'

interface ServicesPageProps {
  params: { locale: string }
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = params
  const isSpanish = locale === 'es'

  return (
    <Layout>
      <div className="py-16 px-4 text-center">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {isSpanish ? 'Nuestros Servicios' : 'Our Services'}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {isSpanish 
              ? 'Soluciones de automatización profesionales diseñadas para ahorrar tiempo y aumentar la productividad.'
              : 'Professional automation solutions designed to save time and increase productivity.'
            }
          </p>
        </div>
      </div>

      <ServicesGrid />
    </Layout>
  )
}