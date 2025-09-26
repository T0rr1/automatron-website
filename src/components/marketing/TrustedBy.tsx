import Image from "next/image"

const logos = [
  { src: "/logos/notion.svg", alt: "Notion" },
  { src: "/logos/stripe.svg", alt: "Stripe" },
  { src: "/logos/slack.svg", alt: "Slack" },
  { src: "/logos/hubspot.svg", alt: "HubSpot" },
  { src: "/logos/airtable.svg", alt: "Airtable" },
]

export function TrustedBy() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted">
        Trusted by teams using
      </p>
      <div className="group relative overflow-hidden">
        <div className="flex animate-[scroll_18s_linear_infinite] gap-10 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          {[...logos, ...logos].map((l, i) => (
            <div key={i} className="flex h-10 items-center flex-shrink-0">
              <Image 
                src={l.src} 
                alt={l.alt} 
                width={120} 
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}