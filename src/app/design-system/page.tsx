import { DesignSystemExample } from '@/components/examples/design-system-example'
import { ServiceCardsExample } from '@/components/examples/optimized-service-card'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="border-b border-border bg-surface">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-text">Design System Demo</h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Unified Design System
          </h1>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Clean, cohesive, and performant. One accent green, two surfaces, instant theming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent text-accent-foreground rounded-lg px-6 py-3 font-semibold hover:opacity-90 transition-opacity">
              Primary Action
            </button>
            <button className="bg-surface text-text border border-border rounded-lg px-6 py-3 font-semibold hover:bg-bg transition-colors">
              Secondary Action
            </button>
          </div>
        </div>
      </section>

      {/* Design Tokens */}
      <section className="section--alt py-16">
        <div className="container mx-auto px-4">
          <DesignSystemExample />
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-text text-center mb-12">
            Optimized Components
          </h2>
          <ServiceCardsExample />
        </div>
      </section>

      {/* Performance Features */}
      <section className="section--alt py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-text text-center mb-12">
              Performance Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-text mb-3">🎨 Design System</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Semantic CSS variables</li>
                  <li>• One accent green everywhere</li>
                  <li>• Two surfaces maximum</li>
                  <li>• 8px border radius standard</li>
                  <li>• Accessible contrast ratios</li>
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-text mb-3">⚡ Performance</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Instant theme switching</li>
                  <li>• Optimized font loading</li>
                  <li>• GPU-accelerated animations</li>
                  <li>• Reduced paint complexity</li>
                  <li>• Prefers-reduced-motion support</li>
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-text mb-3">🎯 Theming</h3>
                <ul className="space-y-2 text-muted">
                  <li>• Zero React rerenders</li>
                  <li>• No class recomputations</li>
                  <li>• System preference detection</li>
                  <li>• No flash of wrong theme</li>
                  <li>• localStorage persistence</li>
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-lg p-6">
                <h3 className="text-xl font-semibold text-text mb-3">♿ Accessibility</h3>
                <ul className="space-y-2 text-muted">
                  <li>• WCAG 2.1 AA compliant</li>
                  <li>• Focus management</li>
                  <li>• Screen reader support</li>
                  <li>• Touch-friendly targets</li>
                  <li>• Keyboard navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted">
            Built with Next.js, Tailwind CSS, and semantic design tokens
          </p>
        </div>
      </footer>
    </div>
  )
}