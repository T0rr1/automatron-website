import { getTranslations } from 'next-intl/server'
import { TranslationExample } from '@/components/examples/translation-example'
import { ServerTranslationExample } from '@/components/examples/server-translation-example'

interface TestIntlPageProps {
  params: { locale: string }
}

export default async function TestIntlPage({ params: { locale } }: TestIntlPageProps) {
  const t = await getTranslations('navigation')

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">NextIntl Test Page</h1>
        <p className="text-muted-foreground">
          Current locale: <strong>{locale}</strong>
        </p>
      </div>

      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Server Component Translation</h2>
          <div className="p-4 border rounded-lg">
            <p>Navigation Home: <strong>{t('home')}</strong></p>
            <p>Navigation Services: <strong>{t('services')}</strong></p>
            <p>Navigation Contact: <strong>{t('contact')}</strong></p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Server Component Example</h2>
          <ServerTranslationExample />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Client Component Example</h2>
          <TranslationExample />
        </div>
      </div>
    </div>
  )
}