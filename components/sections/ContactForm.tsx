'use client'

import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { CONTACT_DATA } from '@/lib/constants'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const ENDPOINT = 'https://api.web3forms.com/submit'

const fieldClass =
  'w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900/60 px-4 py-3 text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-colors'

const labelClass = 'block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300'

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
    <form onSubmit={handleSubmit} className="text-left space-y-5 mb-10">
      <div className="grid sm:grid-cols-2 gap-5">
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
          rows={5}
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

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap px-8 py-3.5 bg-blue-500 hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-base rounded-xl font-medium transition-colors duration-300 shadow-lg shadow-blue-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:focus-visible:ring-offset-gray-950"
        >
          {submitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          {submitting ? 'Sending' : 'Send message'}
        </button>

        <p role="status" aria-live="polite" className="text-sm">
          {status === 'success' && (
            <span className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={16} />
              Thanks, your message is on its way. I will reply to the address you gave.
            </span>
          )}
          {status === 'error' && (
            <span className="inline-flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
              That did not send. Please try again, or use one of the links below.
            </span>
          )}
        </p>
      </div>
    </form>
  )
}
