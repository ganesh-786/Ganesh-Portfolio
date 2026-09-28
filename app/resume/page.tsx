import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight, Download } from 'lucide-react'
import { HERO_DATA } from '@/lib/constants'

// /resume is the address to share (LinkedIn, applications, an email signature). It forwards to
// the CV file, so a shared link keeps working when the file is renamed. GitHub Pages cannot send
// a server redirect, so the page forwards itself: a script does it at once, the refresh tag
// covers visitors without JavaScript, and the links cover anything that blocks both.
const cv = HERO_DATA.resume

const title = `Resume | ${HERO_DATA.name}`
const description = `Resume of ${HERO_DATA.name}, ${HERO_DATA.title}.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: null },
  robots: { index: false, follow: true },
  openGraph: {
    type: 'website',
    url: '/resume',
    title,
    description,
    siteName: 'Ganesh Chaudhary Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${HERO_DATA.name}, ${HERO_DATA.title}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
}

export default function Resume() {
  return (
    <main id="main" className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 py-24 sm:px-8">
      {cv && <meta httpEquiv="refresh" content={`0; url=${cv.href}`} />}

      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{HERO_DATA.name}</p>
      <h1 className="font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-7xl">
        {cv ? 'Opening the resume' : 'The resume is not online right now'}
      </h1>
      <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
        {cv
          ? 'It should open on its own. If it does not, open it here or download a copy.'
          : 'Send a message and I will email it to you directly.'}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {cv ? (
          <>
            <a
              href={cv.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
            >
              Open the resume
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
              <span className="sr-only"> (PDF)</span>
            </a>
            <a
              href={cv.href}
              download
              className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/30 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Download size={16} aria-hidden="true" />
              Download PDF
            </a>
          </>
        ) : (
          <a
            href="/#contact"
            className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
          >
            Get in touch
          </a>
        )}
        <a
          href="/"
          className="group inline-flex min-h-11 items-center justify-center gap-2 px-2 text-sm font-medium text-ink underline decoration-rule decoration-2 underline-offset-8 transition-colors hover:decoration-accent"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          />
          Back to the portfolio
        </a>
      </div>

      {/* Last on purpose: starting a navigation stops the page from parsing any further, so the
          links above must already be on screen in case the browser hands the file off instead. */}
      {cv && (
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(cv.href)})` }} />
      )}
    </main>
  )
}
