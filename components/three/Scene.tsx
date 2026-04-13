'use client'

import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useTheme } from 'next-themes'
import { SceneContent } from './SceneContent'

function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  )
}

function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return reduced
}

export default function Scene() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const isMobile = useIsMobile()
  const prefersReduced = useReducedMotion()
  const [webgl, setWebgl] = useState(true)

  useEffect(() => {
    setWebgl(hasWebGL())
  }, [])

  if (!webgl || prefersReduced) return null

  return (
    <div className="three-canvas-container">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={isMobile ? [1, 1] : [1, 1.5]}
          gl={{ alpha: true, antialias: !isMobile, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ pointerEvents: 'none' }}
        >
          <SceneContent isDark={isDark} isMobile={isMobile} />
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  )
}
