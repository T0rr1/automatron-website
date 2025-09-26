"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

export function FancyCard({ 
  className, 
  children 
}: { 
  className?: string
  children: React.ReactNode 
}) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn("fancy card-hover", className)}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty("--rx", String(-y * 6)) // tilt degrees
        el.style.setProperty("--ry", String(x * 6))
        el.style.setProperty("--px", `${x * 100}%`)
        el.style.setProperty("--py", `${y * 100}%`)
      }}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.setProperty("--rx", "0")
        el.style.setProperty("--ry", "0")
      }}
      style={{ perspective: "900px" }}
    >
      <div
        ref={ref}
        className="inner"
        style={{
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition: "transform .2s ease",
          backgroundImage: `
            radial-gradient(400px circle at var(--px,50%) var(--py,50%), color-mix(in oklab, var(--accent), transparent 80%), transparent 70%)
          `,
          backgroundBlendMode: "screen",
        }}
      >
        <div className="p-6 md:p-7">{children}</div>
      </div>
    </div>
  )
}