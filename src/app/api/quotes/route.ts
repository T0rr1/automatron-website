import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  // very simple pricing model; you'll replace with real one
  const base = 15000 // $150
  const langAdder = { python: 0, powershell: 2000, bash: 0, nodejs: 1000 }[body.language] ?? 0
  const osAdder = (Array.isArray(body.os) ? body.os.length : 1) * 1000
  const features =
    (body.needsPackaging ? 2000 : 0) +
    (body.requiresNetwork ? 1500 : 0) +
    (body.needsScheduler ? 1000 : 0)

  const quote_cents = base + langAdder + osAdder + features
  return NextResponse.json({ quote_cents })
}