"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function StickyHeader() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  
  return (
    <header
      className={[
        "sticky top-0 z-50 transition-all",
        "border-b",
        scrolled 
          ? "bg-surface/95 border-border backdrop-saturate-150" 
          : "bg-bg/80 border-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold text-text">
          Automatron.ai
        </Link>
        
        <ul className="hidden gap-6 md:flex">
          {["Services", "Work", "About", "Contact"].map((l) => (
            <li key={l}>
              <Link
                href={`/${l.toLowerCase()}`}
                className="relative text-sm text-muted hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
              >
                {l}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-accent transition-all duration-200 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>
        
        <div className="flex items-center gap-2">
          <Link 
            href="/contact"
            className="rounded-md bg-accent px-4 py-2 text-accent-foreground hover:shadow-glow transition-shadow"
          >
            Start My Intake
          </Link>
        </div>
      </nav>
    </header>
  )
}