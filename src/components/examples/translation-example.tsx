// Example of NextIntl usage in client component
'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'

export function TranslationExample() {
  const t = useTranslations('navigation')
  const locale = useLocale()

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">
        NextIntl Client Component Example
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Current locale: <strong>{locale}</strong>
      </p>
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" size="sm">
          {t('home')}
        </Button>
        <Button variant="outline" size="sm">
          {t('services')}
        </Button>
        <Button variant="outline" size="sm">
          {t('contact')}
        </Button>
      </div>
    </div>
  )
}