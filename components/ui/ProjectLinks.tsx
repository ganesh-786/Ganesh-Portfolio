import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/types'
import { cn } from '@/lib/utils'

const linkBase =
  'group inline-flex min-h-11 items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:underline'

const arrow = 'transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'

// The two outside links a project can have. Each names its project for screen readers, so a
// list of projects does not read as "Live demo, Code, Live demo, Code".
export function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  if (!project.liveUrl && !project.githubUrl) return null

  return (
    <div className={cn('flex flex-wrap gap-x-5', className)}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkBase, 'text-accent')}
        >
          Live demo
          <ArrowUpRight size={15} aria-hidden="true" className={arrow} />
          <span className="sr-only"> of {project.title} (opens in a new tab)</span>
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(linkBase, 'text-ink')}
        >
          Code
          <ArrowUpRight size={15} aria-hidden="true" className={arrow} />
          <span className="sr-only"> for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}
