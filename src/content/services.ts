import { LucideIcon } from 'lucide-react'
import { Code2, TerminalSquare, Rocket, FileCode2, Boxes, ShieldCheck } from 'lucide-react'

export type Service = {
  id: string
  title: string
  description: string
  features: string[]
  href: string
  icon: LucideIcon
  badge?: string
}

export const services: Service[] = [
  {
    id: 'custom-python',
    title: 'Custom Python Automation',
    description:
      'Reliable cross-platform scripts for Windows, macOS, and Linux with logging, packaging, and scheduled runs.',
    features: ['Packaging (exe/app)', 'Scheduler & logging', 'Secure secrets'],
    href: '/en/services/custom-scripts?lang=python',
    icon: Code2,
    badge: 'Popular',
  },
  {
    id: 'powershell-windows',
    title: 'PowerShell for Windows',
    description:
      'Admin-grade scripts for IT workflows: provisioning, hardening, and fleet automation with code signing.',
    features: ['AD/Intune friendly', 'Code signing', 'Idempotent'],
    href: '/en/services/custom-scripts?lang=powershell&os=windows',
    icon: TerminalSquare,
  },
  {
    id: 'landing-pages',
    title: 'Static Landing Pages',
    description:
      'Lightning-fast Astro/Next static pages with SEO baked in. Deploy to Vercel/Netlify or S3+CDN.',
    features: ['99+ Lighthouse', 'A/B-ready', 'MDX content'],
    href: '/en/services/landing-pages',
    icon: Rocket,
    badge: 'New',
  },
  {
    id: 'script-packaging',
    title: 'Script Packaging & CI',
    description:
      'Turn scripts into distributables with CI pipelines, tests, and reproducible builds.',
    features: ['PyInstaller/Briefcase', 'GitHub Actions', 'Signed artifacts'],
    href: '/en/services/packaging',
    icon: FileCode2,
  },
  {
    id: 'integrations',
    title: 'Integrations & APIs',
    description:
      'Glue apps together with robust API clients, webhooks, and data sync jobs.',
    features: ['REST/GraphQL', 'Webhooks', 'Rate-limit aware'],
    href: '/en/services/integrations',
    icon: Boxes,
  },
  {
    id: 'security',
    title: 'Security Hardening',
    description:
      'Guardrails for scripts and pages: secrets, least-privilege, code review, and supply-chain checks.',
    features: ['OWASP-lite', 'Secrets hygiene', 'Dependency audit'],
    href: '/en/services/security',
    icon: ShieldCheck,
  },
]