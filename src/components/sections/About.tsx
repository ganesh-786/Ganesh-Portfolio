import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Briefcase, GraduationCap } from 'lucide-react'
import { ABOUT_DATA } from '@/data/constants'

const highlightIcons = [Code2, Briefcase, GraduationCap]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
            <span className="text-blue-500 dark:text-blue-400 text-xs sm:text-sm font-mono tracking-wider uppercase">
              About Me
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Passionate about crafting{' '}
              <span className="bg-gradient-to-r from-blue-500 to-sky-500 bg-clip-text text-transparent">
                digital experiences
              </span>
            </h2>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Bio Text */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-5 sm:space-y-6">
              {ABOUT_DATA.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-600 dark:text-gray-400 leading-relaxed text-base sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>

            {/* Highlights */}
            <motion.div variants={itemVariants} className="lg:col-span-2 space-y-3 sm:space-y-4">
              {ABOUT_DATA.highlights.map((highlight, i) => {
                const Icon = highlightIcons[i] ?? Code2
                return (
                  <motion.div
                    key={highlight.label}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500 transition-colors duration-300 shrink-0">
                      <Icon
                        size={20}
                        className="text-blue-500 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {highlight.value}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        {highlight.label}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
