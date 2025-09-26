// Example of NextIntl usage in server component
import { getTranslations } from 'next-intl/server'

export async function ServerTranslationExample() {
  const t = await getTranslations('hero')

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">
        NextIntl Server Component Example
      </h3>
      <h4 className="text-xl font-bold mb-2">
        {t('headline')}
      </h4>
      <p className="text-muted-foreground mb-4">
        {t('subheadline')}
      </p>
      <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
        {t('cta')}
      </button>
    </div>
  )
}