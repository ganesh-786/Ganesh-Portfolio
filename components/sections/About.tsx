import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ABOUT_DATA } from '@/lib/constants'

export function About() {
  const [lead, ...rest] = ABOUT_DATA.paragraphs

  return (
    <SectionWrapper id="about">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeader index="01" title="About" className="mb-0 sm:mb-0" />
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="font-display text-xl leading-snug text-ink sm:text-2xl lg:text-[1.75rem] lg:leading-[1.35]">
            {lead}
          </p>
          <div className="mt-8 space-y-5">
            {rest.map((paragraph) => (
              <p key={paragraph} className="max-w-2xl text-lg leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-3 border-t border-ink">
            {ABOUT_DATA.highlights.map((item, i) => (
              <div
                key={item.label}
                className={i > 0 ? 'border-l border-rule pl-5 sm:pl-8' : 'pr-5 sm:pr-8'}
              >
                <dd className="pt-5 font-display text-4xl leading-none tracking-tight text-ink sm:text-6xl">
                  {item.value}
                </dd>
                <dt className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted sm:text-xs">
                  {item.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionWrapper>
  )
}
