import { ArrowRight } from 'lucide-react'
import { CONTACT_CTA } from '@/lib/constants'

interface CtaBandProps {
  heading: string
  body: string
  // The contact form is on the home page. Other pages pass "/#contact".
  href?: string
}

// The one invitation the site repeats: after the services, and at the end of every case study.
export function CtaBand({ heading, body, href = CONTACT_CTA.href }: CtaBandProps) {
  return (
    <div className="grid items-center gap-x-12 gap-y-6 border-y border-ink py-10 md:grid-cols-12">
      <p className="font-display text-3xl leading-tight tracking-tight text-ink md:col-span-4">
        {heading}
      </p>
      <p className="text-lg leading-8 text-muted md:col-span-5">{body}</p>
      <div className="md:col-span-3 md:text-right">
        <a
          href={href}
          className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
        >
          {CONTACT_CTA.label}
          <ArrowRight
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  )
}
