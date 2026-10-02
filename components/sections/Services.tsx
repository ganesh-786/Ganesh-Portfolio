import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CtaBand } from '@/components/ui/CtaBand'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SERVICES_DATA } from '@/lib/constants'

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

      <div className="mt-20">
        <CtaBand heading={SERVICES_DATA.cta.heading} body={SERVICES_DATA.cta.body} />
      </div>
    </SectionWrapper>
  )
}
