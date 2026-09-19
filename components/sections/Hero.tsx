'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { CONTACT_DATA, HERO_DATA } from '@/lib/constants'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: {
    delay,
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
})

const profileLinks = CONTACT_DATA.socials.filter((s) => s.name !== 'Email')

export function Hero() {
  const [firstName, ...rest] = HERO_DATA.name.split(' ')

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-44">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0.05)}
            className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {HERO_DATA.status}
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="font-display text-[clamp(3.25rem,9.5vw,7rem)] leading-[0.92] tracking-[-0.03em] text-ink"
          >
            {firstName} <em className="font-normal italic">{rest.join(' ')}</em>
          </motion.h1>

          <motion.p
            {...rise(0.2)}
            className="mt-6 font-display text-2xl text-ink sm:text-3xl"
          >
            {HERO_DATA.title}
          </motion.p>

          <motion.p
            {...rise(0.28)}
            className="mt-6 max-w-xl text-[1.0625rem] leading-7 text-muted sm:text-lg sm:leading-8"
          >
            {HERO_DATA.description}
          </motion.p>

          <motion.div
            {...rise(0.36)}
            className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={HERO_DATA.cta.primary.href}
              className="group inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-accent hover:text-accent-ink"
            >
              {HERO_DATA.cta.primary.label}
              <ArrowDown
                size={16}
                className="transition-transform group-hover:translate-y-0.5"
              />
            </a>
            <a
              href={HERO_DATA.cta.secondary.href}
              className="inline-flex items-center justify-center rounded-md border border-ink/30 px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              {HERO_DATA.cta.secondary.label}
            </a>
            {HERO_DATA.resume && (
              <a
                href={HERO_DATA.resume.href}
                download
                className="inline-flex items-center justify-center gap-2 px-2 py-3.5 text-sm font-medium text-ink underline decoration-rule decoration-2 underline-offset-8 transition-colors hover:decoration-accent"
              >
                <Download size={16} />
                {HERO_DATA.resume.label}
              </a>
            )}
          </motion.div>

          <motion.ul
            {...rise(0.44)}
            className="mt-4 flex flex-wrap gap-x-6 font-mono text-xs uppercase tracking-[0.16em] text-muted"
          >
            {profileLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-ink"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.aside
          {...rise(0.3)}
          aria-label="At a glance"
          className="lg:col-span-5 lg:pt-3"
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            At a glance
          </p>
          <dl className="border-t border-ink">
            {HERO_DATA.facts.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-rule py-4"
              >
                <dt className="pt-1 font-mono text-xs uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="text-base leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>
    </section>
  )
}
