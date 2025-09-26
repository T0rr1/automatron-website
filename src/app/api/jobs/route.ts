import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'node:child_process'

export async function POST(req: NextRequest) {
  const payload = await req.json()
  const args = ['-A', 'worker.tasks', 'call', 'worker.tasks.generate_script', '--args', JSON.stringify([payload])]
  return new Promise((resolve) => {
    const p = spawn('celery', args, { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = '', stdout = ''
    p.stdout.on('data', d => stdout += d.toString())
    p.stderr.on('data', d => stderr += d.toString())
    p.on('close', (code) => {
      if (code === 0) resolve(NextResponse.json({ status: 'queued', stdout: stdout.trim() }))
      else resolve(NextResponse.json({ status: 'error', error: stderr.trim() }, { status: 500 }))
    })
  })
}