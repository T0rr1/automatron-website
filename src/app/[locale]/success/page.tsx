'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Layout } from '@/components/common'
import { Button } from '@/components/ui/button'

interface SuccessPageProps {
  params: { locale: string }
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const { locale } = params
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [jobStatus, setJobStatus] = useState<string>('')

  useEffect(() => {
    if (!sessionId) {
      setStatus('error')
      return
    }

    // Verify payment and queue job
    const processPayment = async () => {
      try {
        // In a real implementation, you'd verify the Stripe session server-side
        // and extract the metadata.request to queue the job
        const response = await fetch('/api/jobs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            // This would come from Stripe session metadata in production
            language: 'python',
            os: ['windows'],
            title: 'Sample Script',
            description: 'Sample description',
            needsPackaging: false,
            requiresNetwork: false,
            needsScheduler: false
          })
        })

        if (response.ok) {
          const result = await response.json()
          setJobStatus(result.status)
          setStatus('success')
        } else {
          setStatus('error')
        }
      } catch (error) {
        console.error('Error processing payment:', error)
        setStatus('error')
      }
    }

    processPayment()
  }, [sessionId])

  const isSpanish = locale === 'es'

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 text-center">
        {status === 'loading' && (
          <div>
            <h1 className="text-3xl font-bold mb-4">
              {isSpanish ? 'Procesando tu pedido...' : 'Processing your order...'}
            </h1>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="text-6xl mb-6">✅</div>
            <h1 className="text-3xl font-bold mb-4">
              {isSpanish ? '¡Pago exitoso!' : 'Payment Successful!'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isSpanish 
                ? 'Tu script personalizado está siendo generado. Te enviaremos un email con el enlace de descarga en las próximas 24 horas.'
                : 'Your custom script is being generated. We\'ll email you the download link within 24 hours.'
              }
            </p>
            <div className="bg-muted/50 p-4 rounded-lg mb-8">
              <p className="text-sm">
                <strong>{isSpanish ? 'Estado del trabajo:' : 'Job Status:'}</strong> {jobStatus}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>{isSpanish ? 'ID de sesión:' : 'Session ID:'}</strong> {sessionId}
              </p>
            </div>
            <Button asChild>
              <a href={`/${locale}`}>
                {isSpanish ? 'Volver al inicio' : 'Back to Home'}
              </a>
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="text-6xl mb-6">❌</div>
            <h1 className="text-3xl font-bold mb-4">
              {isSpanish ? 'Error en el procesamiento' : 'Processing Error'}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {isSpanish 
                ? 'Hubo un problema procesando tu pedido. Por favor contacta soporte.'
                : 'There was an issue processing your order. Please contact support.'
              }
            </p>
            <Button asChild>
              <a href={`/${locale}/contact`}>
                {isSpanish ? 'Contactar soporte' : 'Contact Support'}
              </a>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}