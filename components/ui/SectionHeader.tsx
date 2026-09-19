import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  index: string
  title: string
  className?: string
  children?: ReactNode
}

export function SectionHeader({ index, title, className, children }: SectionHeaderProps) {
  return (
    <header className={cn('mb-12 sm:mb-16', className)}>
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent">{index}</p>
      <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      {children}
    </header>
  )
}
