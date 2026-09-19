import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  tone?: 'paper' | 'raised'
}

export function SectionWrapper({ children, id, className, tone = 'paper' }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn('reveal border-t border-rule', tone === 'raised' && 'bg-raised', className)}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  )
}
