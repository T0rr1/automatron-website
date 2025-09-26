import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'node:child_process'

export async function POST(req: NextRequest) {
  const payload = await req.json()
  // Call celery task via CLI for the demo; replace with proper broker call later
  const args = ['-A', 'worker.tasks', 'call', 'worker.tasks.generate_script', `--args=[${JSON.stringify(payload)}]`]
  return new Promise((resolve) => {
    const p = spawn('celery', args, { cwd: process.cwd() })
    let stderr = ''
    p.stderr.on('data', (d) => { stderr += d.toString() })
    p.on('close', (code) => {
      if (code === 0) resolve(NextResponse.json({ status: 'queued' }))
      else resolve(NextResponse.json({ status: 'error', error: stderr }, { status: 500 }))
    })
  })
}