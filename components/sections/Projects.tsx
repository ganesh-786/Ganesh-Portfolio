'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { PROJECTS } from '@/lib/constants'

export function Projects() {
  return (
    <SectionWrapper id="projects">
      {(isInView) => (
        <>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {PROJECTS.map((project, i) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/80 overflow-hidden hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="p-5 sm:p-6 lg:p-7 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.badge && (
                        <span className="mt-2 inline-block px-2 py-0.5 rounded-md border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-600 dark:text-gray-400">
                          {project.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-3 shrink-0">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="p-2 rounded-lg text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
                      >
                        <Github size={18} />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="p-2 rounded-lg text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <dl className="space-y-3 mb-5 flex-1 text-sm leading-relaxed">
                    {(
                      [
                        ['Challenge', project.challenge],
                        ['Approach', project.approach],
                        ['Outcome', project.outcome],
                      ] as const
                    ).map(([label, text]) => (
                      <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-0.5">
                          {label}
                        </dt>
                        <dd className="text-gray-600 dark:text-gray-400">{text}</dd>
                      </div>
                    ))}
                  </dl>

                  {project.note && (
                    <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">{project.note}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800/80 text-xs text-gray-600 dark:text-gray-400 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </>
      )}
    </SectionWrapper>
  )
}
