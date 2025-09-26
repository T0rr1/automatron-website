import { Layout } from '@/components/common'
import { Button } from '@/components/ui/button'

interface CancelledPageProps {
  params: { locale: string }
}

export default function CancelledPage({ params }: CancelledPageProps) {
  const { locale } = params
  const isSpanish = locale === 'es'

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold mb-4">
          {isSpanish ? 'Pago cancelado' : 'Payment Cancelled'}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {isSpanish 
            ? 'Tu pago fue cancelado. No se realizó ningún cargo.'
            : 'Your payment was cancelled. No charges were made.'
          }
        </p>
        <div className="space-x-4">
          <Button asChild>
            <a href={`/${locale}/services/custom-scripts`}>
              {isSpanish ? 'Intentar de nuevo' : 'Try Again'}
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href={`/${locale}`}>
              {isSpanish ? 'Volver al inicio' : 'Back to Home'}
            </a>
          </Button>
        </div>
      </div>
    </Layout>
  )
}