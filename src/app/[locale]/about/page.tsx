import type { Metadata } from 'next'
import { Layout, Container, Section } from '@/components/common'
import { 
  AboutHero,
  CompanyMission,
  TeamExpertise,
  TechnologyFocus,
  SafetyPractices,
  AboutFAQ
} from '@/components/about'

export const metadata: Metadata = {
  title: 'About Automatron.ai - Professional Automation Experts',
  description: 'Learn about our mission to save busy professionals 2-5 hours per week through practical automation solutions. Windows-first approach with PowerShell, Python, and Excel expertise.',
  keywords: ['automation experts', 'PowerShell specialists', 'Python automation', 'Excel automation', 'business process automation'],
  openGraph: {
    title: 'About Automatron.ai - Professional Automation Experts',
    description: 'Learn about our mission to save busy professionals 2-5 hours per week through practical automation solutions.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Automatron.ai - Professional Automation Experts',
    description: 'Learn about our mission to save busy professionals 2-5 hours per week through practical automation solutions.',
  },
}

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <AboutHero />

      {/* Company Mission */}
      <Section className="py-16 lg:py-24">
        <Container>
          <CompanyMission />
        </Container>
      </Section>

      {/* Team Expertise */}
      <Section className="py-16 lg:py-24 bg-muted/50">
        <Container>
          <TeamExpertise />
        </Container>
      </Section>

      {/* Technology Focus */}
      <Section className="py-16 lg:py-24">
        <Container>
          <TechnologyFocus />
        </Container>
      </Section>

      {/* Safety-First Practices */}
      <Section className="py-16 lg:py-24 bg-muted/50">
        <Container>
          <SafetyPractices />
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-16 lg:py-24" id="faq">
        <Container>
          <AboutFAQ />
        </Container>
      </Section>
    </Layout>
  )
}