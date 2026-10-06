import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/ui/CtaBand'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SERVICES_DATA } from '@/lib/constants'
import { cn } from '@/lib/utils'

const proofLink =
  'group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline'

export function Services() {
  return (
    <SectionWrapper id="services" tone="raised">
      <SectionHeader index="02" title={SERVICES_DATA.heading}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{SERVICES_DATA.intro}</p>
      </SectionHeader>

      <ol className="grid gap-x-12 gap-y-14 md:grid-cols-2">
        {SERVICES_DATA.items.map((item, i) => (
          <li key={item.title} className="border-t border-ink pt-5">
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 max-w-lg text-base leading-7 text-muted">{item.description}</p>

            <ul className="mt-5 max-w-lg space-y-2.5">
              {item.includes.map((line) => (
                <li key={line} className="flex gap-4 text-base leading-7 text-ink">
                  <span aria-hidden="true" className="mt-3.5 h-px w-3 shrink-0 bg-accent" />
                  {line}
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              Already done in
            </p>
            <ul className="flex flex-wrap gap-x-6">
              {item.proof.map((proof) => {
                const external = proof.href.startsWith('http')
                return (
                  <li key={proof.label}>
                    <a
                      href={proof.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className={proofLink}
                    >
                      {proof.label}
                      {external ? (
                        <ArrowUpRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      ) : (
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      )}
                      <span className="sr-only">
                        {external ? ' (opens in a new tab)' : `, case study for ${item.title}`}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </li>
        ))}
      </ol>

      {/* The terms a client asks about before writing. A row of label and value on a phone, two
          columns on a tablet, one line of four on a desktop. */}
      <h3 className="mb-4 mt-20 font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {SERVICES_DATA.terms.label}
      </h3>
      <dl className="border-t border-ink sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES_DATA.terms.items.map((term, i) => (
          <div
            key={term.label}
            className={cn(
              'grid grid-cols-[5.5rem_1fr] gap-4 border-b border-rule py-4',
              'sm:block sm:py-6 sm:pr-6',
              i % 2 === 1 && 'sm:border-l sm:pl-6',
              i % 2 === 0 && i > 0 && 'lg:border-l lg:pl-6',
            )}
          >
            <dt className="pt-1.5 font-mono text-xs uppercase tracking-wider text-muted sm:pt-0">
              {term.label}
            </dt>
            <dd className="font-display text-xl leading-snug text-ink sm:mt-3">{term.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16">
        <CtaBand heading={SERVICES_DATA.cta.heading} body={SERVICES_DATA.cta.body} />
      </div>
    </SectionWrapper>
  )
}
