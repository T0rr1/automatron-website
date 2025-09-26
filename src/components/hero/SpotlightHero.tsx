"use client"

import { useCallback } from "react"
import { GradientButton } from "@/components/ui/GradientButton"
import { Container } from "@/components/common"
import { Reveal } from "@/components/utils/Reveal"
import { CountUp } from "@/components/utils/CountUp"
import { trackHeroCTA } from "@/lib/analytics-events"

export function SpotlightHero() {
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    const root = document.documentElement
    root.style.setProperty("--spot-x", `${x}%`)
    root.style.setProperty("--spot-y", `${y}%`)
  }, [])

  return (
    <section
      onMouseMove={onMove}
      className="relative overflow-hidden py-20 md:py-28 bg-noise"
      style={{
        backgroundImage: `
          radial-gradient(600px circle at var(--spot-x) var(--spot-y), var(--spot-c), transparent 60%)
        `,
      }}
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-[.12]" />
      <Container className="relative z-10">
        <div className="text-center space-y-8 lg:space-y-12 max-w-[720px] mx-auto">
          <Reveal>
            <h1 className="h-display text-5xl md:text-6xl font-semibold tracking-tight">
              Simple automations.<br />Real time saved.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-prose text-muted mx-auto">
              We ship reliable, maintainable workflows in days—not weeks.
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
                <span className="h-display text-text font-semibold">
                  <CountUp to={95} />%
                </span> success rate
              </div>
              <div>
                <span className="h-display text-text font-semibold">
                  <CountUp to={3} />
                </span> hrs to first result
              </div>
              <div>
                <span className="h-display text-text font-semibold">
                  <CountUp to={3} />
                </span> days average delivery
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="text-center trust-line px-4 w-full">
              <p className="text-xs text-muted text-center block w-full">
                Dry-run first • Move-not-delete • 7-day bug fix
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}