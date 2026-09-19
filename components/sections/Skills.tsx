import { SectionHeader } from '@/components/ui/SectionHeader'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { SKILLS_DATA } from '@/lib/constants'

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeader index="02" title="Skills" />

      <dl className="border-t border-ink">
        {SKILLS_DATA.map((category) => (
          <div
            key={category.title}
            className="grid gap-x-10 gap-y-3 border-b border-rule py-6 md:grid-cols-12"
          >
            <dt className="pt-1 font-mono text-xs uppercase tracking-[0.16em] text-muted md:col-span-3">
              {category.title}
            </dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-x-1 gap-y-1.5 text-lg leading-7 text-ink">
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="after:mx-2 after:text-rule after:content-['/'] last:after:content-none"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  )
}
