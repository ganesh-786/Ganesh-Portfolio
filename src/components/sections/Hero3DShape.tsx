import { useState, memo, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ─── Spring configs ─── */
const rotateSpring = { stiffness: 150, damping: 20 }

/* ─── Orbiting particle positions (4 particles at 90° intervals) ─── */
const orbitParticles = [0, 1, 2, 3] as const

/**
 * Hero3DShape — A multi-layered 3D interactive geometric shape
 * that responds to mouse movement with depth parallax.
 *
 * Layers (back → front):
 *   1. Outer rotating conic-gradient ring
 *   2. Counter-rotating middle ring
 *   3. 3D card stack (back shadow → middle depth → front card)
 *   4. Grid pattern + rotating conic overlay
 *   5. Center hexagon SVG with glow
 *   6. Orbiting particles
 *   7. Corner accent dots + connecting lines
 */
export const Hero3DShape = memo(function Hero3DShape() {
  const [isHovering, setIsHovering] = useState(false)

  /* ── Mouse-driven 3D rotation ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    rotateSpring
  )
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    rotateSpring
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.innerWidth < 768) return
      const rect = e.currentTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX.set((e.clientX - cx) / (rect.width / 2))
      mouseY.set((e.clientY - cy) / (rect.height / 2))
    },
    [mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovering(false)
  }, [mouseX, mouseY])

  return (
    <div
      className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[480px] lg:h-[480px] xl:w-[520px] xl:h-[520px]"
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Layer 1: Outer rotating conic-gradient ring ── */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-80 dark:opacity-100"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(99,102,241,0) 0deg, rgba(99,102,241,0.35) 90deg, rgba(99,102,241,0) 180deg, rgba(139,92,246,0.35) 270deg, rgba(99,102,241,0) 360deg)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Layer 2: Middle counter-rotating ring ── */}
      <motion.div
        className="absolute inset-6 sm:inset-8 md:inset-10 lg:inset-12 rounded-full border-[1.5px] border-indigo-400/30 dark:border-indigo-400/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      {/* ── Layer 3: 3D Card stack ── */}
      <motion.div
        className="absolute inset-10 sm:inset-12 md:inset-14 lg:inset-[4.5rem]"
        style={{
          transformStyle: 'preserve-3d',
          rotateX,
          rotateY,
        }}
      >
        {/* Back — shadow layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl"
          style={{
            background:
              'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))',
            transform: 'translateZ(-80px)',
            filter: 'blur(20px)',
          }}
        />

        {/* Middle — depth layer */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl"
          style={{
            background:
              'linear-gradient(135deg, #1e1b4b 0%, #0f0a2e 100%)',
            transform: 'translateZ(-40px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        />

        {/* Front — main card */}
        <motion.div
          className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #312e81 0%, #1e1b4b 40%, #0f0a2e 100%)',
            boxShadow:
              '0 30px 90px rgba(0,0,0,0.7), inset 0 0 80px rgba(99,102,241,0.08)',
            transform: 'translateZ(0px)',
          }}
          animate={{
            boxShadow: isHovering
              ? '0 40px 120px rgba(0,0,0,0.8), inset 0 0 100px rgba(99,102,241,0.15)'
              : '0 30px 90px rgba(0,0,0,0.7), inset 0 0 80px rgba(99,102,241,0.08)',
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Rotating conic overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(99,102,241,0.25) 60deg, transparent 120deg)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />

          {/* ── Center hexagon ── */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                rotate: isHovering ? 180 : 0,
                scale: isHovering ? 1.08 : 1,
              }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg
                viewBox="0 0 200 200"
                className="drop-shadow-2xl w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40"
              >
                <defs>
                  <linearGradient
                    id="heroHexGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: '#818cf8', stopOpacity: 0.85 }}
                    />
                    <stop
                      offset="50%"
                      style={{ stopColor: '#a78bfa', stopOpacity: 0.65 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: '#6366f1', stopOpacity: 0.85 }}
                    />
                  </linearGradient>
                  <filter id="heroGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Outer hexagon */}
                <polygon
                  points="100,18 172,60 172,140 100,182 28,140 28,60"
                  fill="url(#heroHexGrad)"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  filter="url(#heroGlow)"
                  opacity="0.9"
                />

                {/* Middle hexagon */}
                <polygon
                  points="100,42 148,70 148,130 100,158 52,130 52,70"
                  fill="none"
                  stroke="#a78bfa"
                  strokeWidth="1.5"
                  opacity="0.5"
                />

                {/* Inner circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="28"
                  fill="rgba(99,102,241,0.25)"
                  stroke="#818cf8"
                  strokeWidth="1.5"
                />

                {/* Center dot */}
                <circle
                  cx="100"
                  cy="100"
                  r="8"
                  fill="#818cf8"
                  filter="url(#heroGlow)"
                />
              </svg>

              {/* Orbiting particles */}
              {orbitParticles.map((i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-400"
                  style={{
                    boxShadow: '0 0 16px rgba(129,140,248,0.8)',
                  }}
                  animate={{
                    x: [
                      Math.cos((i * Math.PI) / 2) * 55,
                      Math.cos((i * Math.PI) / 2 + Math.PI) * 55,
                    ],
                    y: [
                      Math.sin((i * Math.PI) / 2) * 55,
                      Math.sin((i * Math.PI) / 2 + Math.PI) * 55,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: i * 0.6,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Top light highlight */}
          <div
            className="absolute inset-0 rounded-2xl md:rounded-3xl"
            style={{
              background:
                'radial-gradient(circle at 30% 20%, rgba(129,140,248,0.3) 0%, transparent 50%)',
            }}
          />

          {/* Bottom shadow */}
          <div
            className="absolute inset-0 rounded-2xl md:rounded-3xl"
            style={{
              background:
                'radial-gradient(circle at 70% 80%, transparent 30%, rgba(0,0,0,0.5) 100%)',
            }}
          />

          {/* Edge glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl md:rounded-3xl"
            style={{
              boxShadow: 'inset 0 0 50px rgba(99,102,241,0.15)',
            }}
            animate={{
              boxShadow: isHovering
                ? 'inset 0 0 70px rgba(99,102,241,0.3)'
                : 'inset 0 0 50px rgba(99,102,241,0.15)',
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Front accent layer */}
        <motion.div
          className="absolute inset-4 sm:inset-5 md:inset-6 rounded-xl md:rounded-2xl"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
            transform: 'translateZ(40px)',
          }}
          animate={{
            scale: [1, 1.04, 1],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── Corner accent dots ── */}
      <motion.div
        className="absolute -top-1 -right-1 md:-top-3 md:-right-3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-indigo-400"
        style={{ boxShadow: '0 0 24px rgba(129,140,248,0.7)' }}
        animate={{ y: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1 -left-1 md:-bottom-3 md:-left-3 w-3 h-3 md:w-5 md:h-5 rounded-full bg-violet-400"
        style={{ boxShadow: '0 0 24px rgba(167,139,250,0.7)' }}
        animate={{ y: [8, -8, 8], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />

      {/* ── Connecting lines ── */}
      <motion.div
        className="absolute top-0 left-1/2 w-px bg-gradient-to-t from-indigo-400/50 to-transparent"
        style={{ x: '-50%', y: '-100%' }}
        animate={{
          height: isHovering ? ['60px', '80px'] : ['40px', '60px'],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 w-px bg-gradient-to-b from-violet-400/50 to-transparent"
        style={{ x: '-50%', y: '100%' }}
        animate={{
          height: isHovering ? ['60px', '80px'] : ['40px', '60px'],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* ── Light-mode overlay to soften the shape ── */}
      <div className="absolute inset-0 rounded-full bg-white/10 dark:bg-transparent pointer-events-none" />
    </div>
  )
})
