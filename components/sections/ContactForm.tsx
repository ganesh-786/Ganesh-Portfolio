'use client'

import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { CONTACT_DATA } from '@/lib/constants'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ENDPOINT = 'https://api.web3forms.com/submit'

const fieldClass =
  'w-full rounded-md border border-rule bg-raised px-4 py-3 text-base text-ink placeholder:text-muted/70 transition-colors hover:border-ink/40 focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent'

const labelClass = 'mb-2 block text-sm font-medium text-ink'

export function ContactForm({ accessKey }: { accessKey: string }) {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (data.get('botcheck')) return

    setStatus('submitting')
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: CONTACT_DATA.formSubject,
          from_name: 'Portfolio contact form',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      const result = await response.json()

      if (response.ok && result.success) {
        form.reset()
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={6}
          placeholder="What are you working on, and how can I help?"
          className={`${fieldClass} resize-y`}
        />
      </div>

      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-ink px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {submitting ? 'Sending' : 'Send message'}
        </button>

        <p role="status" aria-live="polite" className="text-sm leading-6">
          {status === 'success' && (
            <span className="inline-flex items-start gap-2 text-ok">
              <CheckCircle2 size={16} className="mt-1 shrink-0" />
              Thanks, your message is on its way. I will reply to the address you gave.
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-start gap-2 text-danger">
              <AlertCircle size={16} className="mt-1 shrink-0" />
              That did not send. Please try again, or use one of the direct links.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
