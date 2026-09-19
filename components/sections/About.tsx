import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { cn } from '@/lib/utils'
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

          <dl className="mt-14 border-t border-ink sm:grid sm:grid-cols-3">
            {ABOUT_DATA.highlights.map((item, i) => (
              <div
                key={item.label}
                className={cn(
                  'flex items-baseline justify-between gap-4 border-b border-rule py-4',
                  'sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-3 sm:border-b-0 sm:pb-0 sm:pt-5',
                  i === 0 ? 'sm:pr-8' : 'sm:border-l sm:pl-8',
                )}
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {item.label}
                </dt>
                <dd className="font-display text-4xl leading-none tracking-tight text-ink sm:text-6xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </SectionWrapper>
  )
}
