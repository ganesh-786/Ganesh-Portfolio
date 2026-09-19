import type { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { HERO_DATA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Page not found | Ganesh Chaudhary',
}

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">404</p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
        This page does not exist
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
        The link may be old or mistyped. The portfolio and everything on it is one click away.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
        <a
          href="/"
          className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to {HERO_DATA.name}
        </a>
        <a
          href="/#projects"
          className="inline-flex min-h-11 items-center justify-center px-2 text-sm font-medium text-ink underline decoration-rule decoration-2 underline-offset-8 transition-colors hover:decoration-accent"
        >
          See the projects
        </a>
      </div>
    </main>
  )
}
