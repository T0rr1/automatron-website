'use client'

import { Typography } from '@/components/ui/typography'
import { Container } from '@/components/common'
import { GradientButton } from '@/components/ui/GradientButton'
import { AuroraBG } from '@/components/hero/AuroraBG'
import { Reveal } from '@/components/utils/Reveal'
import { CountUp } from '@/components/utils/CountUp'
import { trackHeroCTA } from '@/lib/analytics-events'



export function HomepageHero() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <AuroraBG />
      <Container className="relative z-10">
        <div className="text-center space-y-8 lg:space-y-12 max-w-[720px] mx-auto">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
              Simple automations.<br />Real time saved.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-prose text-muted mx-auto">
              Fill out a quick intake and we&apos;ll ship a frictionless, code-light workflow.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-6 flex gap-3 justify-center flex-wrap">
              <GradientButton onClick={() => trackHeroCTA('primary')}>
                Start My Intake
              </GradientButton>
              <button className="h-11 rounded-md border border-border bg-surface px-5 font-semibold">
                See Examples
              </button>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-8 flex gap-8 text-sm text-muted justify-center flex-wrap">
              <div>
                <span className="text-text font-semibold">
                  <CountUp to={95} />%
                </span> success rate
              </div>
              <div>
                <span className="text-text font-semibold">
                  <CountUp to={3} />
                </span> hrs to first result
              </div>
              <div>
                <span className="text-text font-semibold">
                  <CountUp to={3} />
                </span> days average delivery
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="text-center trust-line px-4 w-full">
              <Typography variant="small" className="text-xs text-gray-500 dark:text-gray-400 text-center block w-full">
                Dry-run first • Move-not-delete • 7-day bug fix
              </Typography>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}