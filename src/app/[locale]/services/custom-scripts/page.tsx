'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Layout } from '@/components/common'

const Schema = z.object({
  language: z.enum(['python', 'powershell', 'bash', 'nodejs']),
  os: z.array(z.enum(['windows', 'macos', 'linux'])).min(1, 'Pick at least one OS'),
  title: z.string().min(5).max(80),
  description: z.string().min(20).max(2000),
  needsPackaging: z.boolean().default(false),
  requiresNetwork: z.boolean().default(false),
  needsScheduler: z.boolean().default(false),
})

type FormData = z.infer<typeof Schema>

export default function CustomScripts() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: { language: 'python', os: ['windows'] },
  })

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/quotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) { alert('Failed to quote'); return }
    const quote = await res.json()
    router.push(`/checkout?cents=${quote.quote_cents}`)
  }

  const os = watch('os', [])

  const toggleOS = (name: 'windows' | 'macos' | 'linux') => {
    const next = os.includes(name) ? os.filter(o => o !== name) : [...os, name]
    setValue('os', next, { shouldValidate: true })
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Request a Custom Script</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          <div>
            <label className="block mb-2 font-medium">Language</label>
            <Select onValueChange={(v) => setValue('language', v as FormData['language'])} defaultValue="python">
              <SelectTrigger><SelectValue placeholder="Pick a language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="powershell">PowerShell</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="nodejs">Node.js</SelectItem>
              </SelectContent>
            </Select>
            {errors.language && <p className="text-red-600 text-sm">{errors.language.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">Target OS</label>
            <div className="flex gap-3">
              {(['windows','macos','linux'] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleOS(opt)}
                  className={`px-3 py-2 rounded border ${os.includes(opt) ? 'bg-accent text-accent-foreground' : ''}`}
                  aria-pressed={os.includes(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.os && <p className="text-red-600 text-sm">{errors.os.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">Short title</label>
            <Input placeholder="e.g., Weekly CSV merger with email output" {...register('title')} />
            {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block mb-2 font-medium">What should it do?</label>
            <Textarea rows={6} placeholder="Describe inputs, outputs, schedule, permissions…" {...register('description')} />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          <fieldset className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label className="flex items-center gap-2"><input type="checkbox" {...register('needsPackaging')} /> Needs packaging (exe/app)</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('requiresNetwork')} /> Network access</label>
            <label className="flex items-center gap-2"><input type="checkbox" {...register('needsScheduler')} /> Scheduled (cron/Task Scheduler)</label>
          </fieldset>

          <Button type="submit" className="font-bold">Get Instant Quote</Button>
        </form>
      </section>
    </Layout>
  )
}