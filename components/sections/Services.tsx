import { ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SERVICES_DATA } from '@/lib/constants'

export function Services() {
  return (
    <SectionWrapper id="services">
      <SectionHeader index="04" title={SERVICES_DATA.heading}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{SERVICES_DATA.intro}</p>
      </SectionHeader>

      <ol className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {SERVICES_DATA.items.map((item, i) => (
          <li key={item.title} className="border-t border-ink pt-5">
            <p className="mb-6 font-mono text-xs tracking-[0.2em] text-accent">
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="font-display text-2xl leading-tight tracking-tight text-ink">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-muted">{item.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-8 border-t border-rule pt-8 md:grid-cols-12">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted md:col-span-3">
          How I work
        </h3>
        <ul className="space-y-3 md:col-span-6">
          {SERVICES_DATA.process.map((step) => (
            <li key={step} className="flex gap-3 text-base leading-7 text-ink">
              <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-accent" />
              {step}
            </li>
          ))}
        </ul>
        <div className="md:col-span-3 md:text-right">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            Discuss a project
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
