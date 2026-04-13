'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Award, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { EDUCATION_DATA } from '@/lib/constants'

export function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="education"
      ref={ref}
      className="section-content py-16 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <span className="text-gradient">Education</span>
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full mx-auto" />
        </div>

        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {EDUCATION_DATA.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="group p-5 sm:p-6 lg:p-7 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-200/80 dark:border-gray-800/80 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 shrink-0 mt-0.5">
                  {edu.certificateUrl ? <Award size={20} /> : <GraduationCap size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">
                    {edu.institution}
                  </p>
                  {edu.details && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {edu.details}
                    </p>
                  )}
                  {edu.certificateUrl && (
                    <a
                      href={edu.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition-colors mb-4"
                    >
                      <ExternalLink size={14} />
                      View Certificate
                    </a>
                  )}
                  {edu.certificateImage && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-gray-200/80 dark:border-gray-800/80">
                      <Image
                        src={edu.certificateImage}
                        alt={`${edu.degree} certificate`}
                        width={800}
                        height={566}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
