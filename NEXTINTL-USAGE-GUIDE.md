# NextIntl Usage Guide

## Overview
NextIntl is now properly configured with `NextIntlClientProvider` in the layout. Here's how to use translations in your components.

## Server Components (Recommended)

For server components, use `getTranslations`:

```tsx
import { getTranslations } from 'next-intl/server'

export default async function HomePage() {
  const t = await getTranslations('hero')
  
  return (
    <div>
      <h1>{t('headline')}</h1>
      <p>{t('subheadline')}</p>
      <button>{t('cta')}</button>
    </div>
  )
}
```

## Client Components

For client components, use `useTranslations`:

```tsx
'use client'

import { useTranslations } from 'next-intl'

export function MyClientComponent() {
  const t = useTranslations('navigation')
  
  return (
    <nav>
      <a href="/">{t('home')}</a>
      <a href="/services">{t('services')}</a>
      <a href="/contact">{t('contact')}</a>
    </nav>
  )
}
```

## Current Locale in Client Components

```tsx
'use client'

import { useLocale } from 'next-intl'

export function LocaleAwareComponent() {
  const locale = useLocale() // 'en' or 'es'
  
  return <div>Current locale: {locale}</div>
}
```

## What Was Fixed

1. **Added NextIntlClientProvider**: Wrapped the app with `NextIntlClientProvider` in the layout
2. **Pass messages to client**: Used `getMessages()` to pass translations to client components
3. **Updated LanguageSwitcher**: Now uses `useTranslations` and `useLocale` hooks properly

## Key Points

- **Server components**: Use `getTranslations()` (async)
- **Client components**: Use `useTranslations()` (hook)
- **Current locale**: Use `useLocale()` hook in client components
- **Messages are available**: All translation keys from your JSON files are accessible
- **Type safety**: NextIntl provides TypeScript support for your translation keys

## Example Translation Keys Available

From your message files, you can use:
- `t('navigation.home')` → "Home" / "Inicio"
- `t('hero.headline')` → "Save 2-5 Hours..." / "Ahorra 2-5 Horas..."
- `t('common.getStarted')` → "Get Started" / "Comenzar"
- `t('services.title')` → "Automation Services" / "Servicios de Automatización"

## Previous Issue

The language switcher was crashing because it wasn't wrapped with `NextIntlClientProvider`, so the `useTranslations` and `useLocale` hooks weren't available. Now they work properly!