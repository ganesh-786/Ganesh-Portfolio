import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { EDUCATION_DATA } from '@/lib/constants'

const degrees = EDUCATION_DATA.filter((item) => !item.certificateImage)
const certificates = EDUCATION_DATA.filter((item) => item.certificateImage)

export function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeader index="06" title="Education" />

      <ul className="border-t border-ink">
        {degrees.map((degree) => (
          <li
            key={degree.degree}
            className="grid gap-x-12 gap-y-2 border-b border-rule py-8 md:grid-cols-12"
          >
            <p className="font-mono text-sm text-muted md:col-span-3 md:pt-2">{degree.period}</p>
            <div className="md:col-span-9">
              <h3 className="font-display text-3xl leading-tight tracking-tight text-ink">
                {degree.degree}
              </h3>
              <p className="mt-1 text-base font-medium text-accent">{degree.institution}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
        {certificates.map((cert) => (
          <figure key={cert.degree} className="flex flex-col">
            <div className="border border-rule bg-raised p-2">
              <Image
                src={cert.certificateImage!}
                alt={`${cert.degree} certificate awarded to Ganesh Chaudhary by ${cert.institution}`}
                width={1200}
                height={900}
                sizes="(max-width: 768px) 100vw, 540px"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-5">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                {cert.institution} · {cert.period}
              </p>
              <h3 className="mt-2 font-display text-2xl leading-tight tracking-tight text-ink">
                {cert.degree}
              </h3>
              {cert.details && (
                <p className="mt-2 text-base leading-7 text-muted">{cert.details}</p>
              )}
              {cert.certificateUrl && (
                <a
                  href={cert.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  Verify certificate
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  )
}
