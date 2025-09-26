import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    robots: 'index, follow',
  };
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {t('lastUpdated')}: December 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.overview.title')}</h2>
            <p className="mb-4">{t('sections.overview.content1')}</p>
            <p className="mb-4">{t('sections.overview.content2')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.dataCollection.title')}</h2>
            <p className="mb-4">{t('sections.dataCollection.intro')}</p>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.dataCollection.personalInfo.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataCollection.personalInfo.items.name')}</li>
              <li>{t('sections.dataCollection.personalInfo.items.email')}</li>
              <li>{t('sections.dataCollection.personalInfo.items.phone')}</li>
              <li>{t('sections.dataCollection.personalInfo.items.company')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.dataCollection.projectInfo.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataCollection.projectInfo.items.requirements')}</li>
              <li>{t('sections.dataCollection.projectInfo.items.processes')}</li>
              <li>{t('sections.dataCollection.projectInfo.items.files')}</li>
              <li>{t('sections.dataCollection.projectInfo.items.timeline')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.dataCollection.technical.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataCollection.technical.items.ip')}</li>
              <li>{t('sections.dataCollection.technical.items.browser')}</li>
              <li>{t('sections.dataCollection.technical.items.usage')}</li>
              <li>{t('sections.dataCollection.technical.items.performance')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.dataUse.title')}</h2>
            <p className="mb-4">{t('sections.dataUse.intro')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataUse.purposes.service')}</li>
              <li>{t('sections.dataUse.purposes.communication')}</li>
              <li>{t('sections.dataUse.purposes.improvement')}</li>
              <li>{t('sections.dataUse.purposes.legal')}</li>
              <li>{t('sections.dataUse.purposes.security')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.dataSharing.title')}</h2>
            <p className="mb-4">{t('sections.dataSharing.intro')}</p>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.dataSharing.serviceProviders.title')}</h3>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataSharing.serviceProviders.items.email')}</li>
              <li>{t('sections.dataSharing.serviceProviders.items.hosting')}</li>
              <li>{t('sections.dataSharing.serviceProviders.items.analytics')}</li>
              <li>{t('sections.dataSharing.serviceProviders.items.monitoring')}</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">{t('sections.dataSharing.legal.title')}</h3>
            <p className="mb-4">{t('sections.dataSharing.legal.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.dataSecurity.title')}</h2>
            <p className="mb-4">{t('sections.dataSecurity.intro')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.dataSecurity.measures.encryption')}</li>
              <li>{t('sections.dataSecurity.measures.access')}</li>
              <li>{t('sections.dataSecurity.measures.monitoring')}</li>
              <li>{t('sections.dataSecurity.measures.backup')}</li>
              <li>{t('sections.dataSecurity.measures.retention')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.cookies.title')}</h2>
            <p className="mb-4">{t('sections.cookies.intro')}</p>
            
            <h3 className="text-xl font-medium mb-3">{t('sections.cookies.essential.title')}</h3>
            <p className="mb-4">{t('sections.cookies.essential.content')}</p>

            <h3 className="text-xl font-medium mb-3">{t('sections.cookies.analytics.title')}</h3>
            <p className="mb-4">{t('sections.cookies.analytics.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.rights.title')}</h2>
            <p className="mb-4">{t('sections.rights.intro')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.rights.list.access')}</li>
              <li>{t('sections.rights.list.correction')}</li>
              <li>{t('sections.rights.list.deletion')}</li>
              <li>{t('sections.rights.list.portability')}</li>
              <li>{t('sections.rights.list.objection')}</li>
            </ul>
            <p className="mb-4">{t('sections.rights.contact')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.retention.title')}</h2>
            <p className="mb-4">{t('sections.retention.content1')}</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>{t('sections.retention.periods.inquiries')}</li>
              <li>{t('sections.retention.periods.projects')}</li>
              <li>{t('sections.retention.periods.analytics')}</li>
              <li>{t('sections.retention.periods.logs')}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{t('sections.international.title')}</h2>
            <p className="mb-4">{t('sections.international.content')}</p>
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
              <p className="mb-1">Email: privacy@automatron.ai</p>
              <p className="mb-1">Website: https://automatron.ai/contact</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}