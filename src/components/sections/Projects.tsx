import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '@/data/constants'

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref}>
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-blue-500 dark:text-blue-400 text-xs sm:text-sm font-mono tracking-wider uppercase"
            >
              Portfolio
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-3"
            >
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
          </div>

          {/* Project Cards */}
          <div className="space-y-6 sm:space-y-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: i * 0.2 + 0.2 }}
                whileHover={{ y: -4 }}
                className="group relative grid md:grid-cols-2 gap-0 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                {/* Project Image */}
                <div
                  className={`relative overflow-hidden ${
                    i % 2 === 1 ? 'md:order-2' : ''
                  }`}
                >
                  <div className="aspect-video md:aspect-auto md:h-full md:min-h-[280px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Project Info */}
                <div
                  className={`p-5 sm:p-8 lg:p-10 flex flex-col justify-center ${
                    i % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="text-xs sm:text-sm font-mono text-blue-500 dark:text-blue-400">
                      Featured Project
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-4 sm:mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 text-[0.65rem] sm:text-xs font-medium rounded-md sm:rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-500/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 sm:gap-5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                      >
                        <Github size={16} className="sm:w-[18px] sm:h-[18px] group-hover/link:scale-110 transition-transform duration-200" />
                        Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-200"
                      >
                        <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px] group-hover/link:scale-110 transition-transform duration-200" />
                        Live Demo
                        <ArrowUpRight
                          size={12}
                          className="sm:w-[14px] sm:h-[14px] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
