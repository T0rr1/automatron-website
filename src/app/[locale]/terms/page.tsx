import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'terms' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'index, follow',
  };
}

export default function TermsOfServicePage() {
  const t = useTranslations('terms');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {t('lastUpdated')}: December 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.acceptance.title')}</h2>
            <p className="mb-4">{t('sections.acceptance.content1')}</p>
            <p className="mb-4">{t('sections.acceptance.content2')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.services.title')}</h2>
            <p className="mb-4">{t('sections.services.intro')}</p>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.services.categories.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.services.categories.items.scripting')}</li>
              <li>{t('sections.services.categories.items.hygiene')}</li>
              <li>{t('sections.services.categories.items.reporting')}</li>
              <li>{t('sections.services.categories.items.websites')}</li>
              <li>{t('sections.services.categories.items.helpers')}</li>
              <li>{t('sections.services.categories.items.templates')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.services.deliverables.title')}</h3>
            <p className="mb-4">{t('sections.services.deliverables.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.engagement.title')}</h2>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.engagement.process.title')}</h3>
            <ol className="list-decimal pl-6 mb-4 space-y-1">
              <li>{t('sections.engagement.process.steps.inquiry')}</li>
              <li>{t('sections.engagement.process.steps.assessment')}</li>
              <li>{t('sections.engagement.process.steps.proposal')}</li>
              <li>{t('sections.engagement.process.steps.agreement')}</li>
              <li>{t('sections.engagement.process.steps.delivery')}</li>
            </ol>

            <h3 className="text-xl font-medium mb-3">{t('sections.engagement.timeline.title')}</h3>
            <p className="mb-4">{t('sections.engagement.timeline.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.pricing.title')}</h2>
            <p className="mb-4">{t('sections.pricing.intro')}</p>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.pricing.packages.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.pricing.packages.items.starter')}</li>
              <li>{t('sections.pricing.packages.items.bundle')}</li>
              <li>{t('sections.pricing.packages.items.website')}</li>
              <li>{t('sections.pricing.packages.items.care')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.pricing.payment.title')}</h3>
            <p className="mb-4">{t('sections.pricing.payment.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.responsibilities.title')}</h2>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.responsibilities.client.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.responsibilities.client.items.information')}</li>
              <li>{t('sections.responsibilities.client.items.access')}</li>
              <li>{t('sections.responsibilities.client.items.feedback')}</li>
              <li>{t('sections.responsibilities.client.items.testing')}</li>
              <li>{t('sections.responsibilities.client.items.backup')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.responsibilities.automatron.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.responsibilities.automatron.items.quality')}</li>
              <li>{t('sections.responsibilities.automatron.items.documentation')}</li>
              <li>{t('sections.responsibilities.automatron.items.support')}</li>
              <li>{t('sections.responsibilities.automatron.items.confidentiality')}</li>
              <li>{t('sections.responsibilities.automatron.items.safety')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.intellectual.title')}</h2>
            <p className="mb-4">{t('sections.intellectual.content1')}</p>
            <p className="mb-4">{t('sections.intellectual.content2')}</p>
            <p className="mb-4">{t('sections.intellectual.content3')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.confidentiality.title')}</h2>
            <p className="mb-4">{t('sections.confidentiality.content1')}</p>
            <p className="mb-4">{t('sections.confidentiality.content2')}</p>
            <p className="mb-4">{t('sections.confidentiality.content3')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.warranties.title')}</h2>
            <p className="mb-4">{t('sections.warranties.content1')}</p>
            <p className="mb-4">{t('sections.warranties.content2')}</p>
            <p className="mb-4">{t('sections.warranties.content3')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.limitation.title')}</h2>
            <p className="mb-4">{t('sections.limitation.content1')}</p>
            <p className="mb-4">{t('sections.limitation.content2')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.termination.title')}</h2>
            <p className="mb-4">{t('sections.termination.content1')}</p>
            <p className="mb-4">{t('sections.termination.content2')}</p>
            <p className="mb-4">{t('sections.termination.content3')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.governing.title')}</h2>
            <p className="mb-4">{t('sections.governing.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.changes.title')}</h2>
            <p className="mb-4">{t('sections.changes.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.contact.title')}</h2>
            <p className="mb-4">{t('sections.contact.intro')}</p>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-medium mb-2">Automatron.ai</p>
              <p className="mb-1">Email: legal@automatron.ai</p>
              <p className="mb-1">Website: https://automatron.ai/contact</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}