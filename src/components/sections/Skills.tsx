import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2,
  Palette,
  Layers,
  Layout,
  Terminal,
  Server,
  Globe,
  GitBranch,
  Box,
  Cpu,
  Smartphone,
  Figma,
  FileCode2,
  Wrench,
} from 'lucide-react'
import { SKILLS_DATA } from '@/data/constants'

const iconMap: Record<string, React.ElementType> = {
  html5: FileCode2,
  css3: Palette,
  javascript: Code2,
  typescript: Code2,
  react: Layers,
  tailwind: Palette,
  bootstrap: Layout,
  python: Terminal,
  flask: Server,
  django: Server,
  api: Globe,
  git: GitBranch,
  github: Box,
  vscode: Cpu,
  responsive: Smartphone,
  design: Figma,
}

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const categories = Object.entries(SKILLS_DATA)

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={ref}>
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-indigo-500 dark:text-indigo-400 text-xs sm:text-sm font-mono tracking-wider uppercase"
            >
              Tech Stack
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-3"
            >
              Skills &{' '}
              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Technologies
              </span>
            </motion.h2>
          </div>

          {/* Skill Categories */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {categories.map(([key, category], catIndex) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
                className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-indigo-500/20 transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = iconMap[skill.icon] ?? Wrench
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{
                          duration: 0.3,
                          delay: catIndex * 0.15 + skillIndex * 0.05 + 0.3,
                        }}
                        className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700/50 hover:border-indigo-500/40 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all duration-200 cursor-default"
                      >
                        <Icon
                          size={14}
                          className="text-indigo-500 dark:text-indigo-400 shrink-0 sm:w-[15px] sm:h-[15px]"
                        />
                        <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                          {skill.name}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
