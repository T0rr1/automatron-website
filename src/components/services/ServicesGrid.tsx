"use client"

import { useMemo, useState } from "react"
import { FancyCard } from "@/components/ui/FancyCard"
import { Reveal } from "@/components/utils/Reveal"

type Service = {
  id: string
  title: string
  blurb: string
  price: string
  tags: ("Files" | "Inbox" | "Reports" | "Systems" | "Templates")[]
}

export function ServicesGrid({ services }: { services: Service[] }) {
  const all = ["All", "Files", "Inbox", "Reports", "Systems", "Templates"] as const
  const [active, setActive] = useState<typeof all[number]>("All")

  const filtered = useMemo(
    () => (active === "All" ? services : services.filter(s => s.tags.includes(active as any))),
    [services, active]
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {all.map(k => (
            <button
              key={k}
              onClick={() => setActive(k)}
              aria-pressed={active === k}
              className={[
                "rounded-full px-3 py-1 text-sm border transition-colors",
                active === k 
                  ? "bg-accent text-accent-foreground border-transparent" 
                  : "bg-surface border-border text-muted hover:text-text"
              ].join(" ")}
            >
              {k}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 [container-type:inline-size]">
        {filtered.map((s, index) => (
          <Reveal key={s.id} delay={80 * index}>
            <FancyCard>
              <article className="card-item">
                <header>
                  <h3 className="h-display text-lg font-semibold text-text">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                </header>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <span className="h-display text-sm text-muted">{s.price}</span>
                  <a 
                    href="/contact"
                    className="rounded-md bg-accent px-3 py-2 text-xs font-semibold text-accent-foreground hover:shadow-glow transition-shadow"
                  >
                    Start
                  </a>
                </div>
              </article>
            </FancyCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}