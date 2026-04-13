'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  fullWidth?: boolean
}

export function SectionWrapper({ children, id, className, fullWidth = false }: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'section-content py-16 sm:py-20 lg:py-24',
        !fullWidth && 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </motion.section>
  )
}
