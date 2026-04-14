'use client'

import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

interface SceneContentProps {
  isDark: boolean
  isMobile: boolean
}

const PARTICLE_COUNT_DESKTOP = 800
const PARTICLE_COUNT_MOBILE = 300
const SCROLL_DAMPING = 0.08

// Singleton scroll state shared by all scene children.
// One listener, one smoothed value — no duplicate event registrations.
const scroll = { target: 0, smoothed: 0 }

function onScroll() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  scroll.target = maxScroll > 0 ? window.scrollY / maxScroll : 0
}

/**
 * Single scroll listener + per-frame lerp smoothing.
 * Runs at priority -1 so the smoothed value is ready before any consumer reads it.
 */
function ScrollManager() {
  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame(() => {
    scroll.smoothed += (scroll.target - scroll.smoothed) * SCROLL_DAMPING
  }, -1)

  return null
}

function ParticleField({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const meshRef = useRef<THREE.Points>(null)
  const frameCount = useRef(0)
  const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP

  const { positions, basePositions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    const sz = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1.5 + Math.random() * 1.2

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      pos[i * 3] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
      base[i * 3] = x
      base[i * 3 + 1] = y
      base[i * 3 + 2] = z
      sz[i] = Math.random() * 2 + 0.5
    }

    return { positions: pos, basePositions: base, sizes: sz }
  }, [count])

  const targetColor = useRef(new THREE.Color())
  const currentColor = useRef(new THREE.Color(isDark ? '#60a5fa' : '#3b82f6'))

  useFrame((state, delta) => {
    if (!meshRef.current) return

    frameCount.current++
    const s = scroll.smoothed
    const time = state.clock.elapsedTime

    targetColor.current.set(isDark ? '#60a5fa' : '#3b82f6')
    currentColor.current.lerp(targetColor.current, delta * 2)

    const material = meshRef.current.material as THREE.PointsMaterial
    material.color.copy(currentColor.current)
    material.opacity = THREE.MathUtils.lerp(0.7, 0.05, s)

    // On mobile, update particle positions every 2nd frame to halve per-frame cost
    if (!(isMobile && frameCount.current % 2 !== 0)) {
      const posAttr = meshRef.current.geometry.getAttribute('position')
      const posArray = posAttr.array as Float32Array

      const expansion = 1 + s * 2.5
      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        const noiseX = Math.sin(time * 0.3 + i * 0.01) * 0.15
        const noiseY = Math.cos(time * 0.2 + i * 0.013) * 0.15
        const noiseZ = Math.sin(time * 0.25 + i * 0.017) * 0.1

        const targetX = basePositions[i3] * expansion + noiseX
        const targetY = basePositions[i3 + 1] * expansion + noiseY
        const targetZ = basePositions[i3 + 2] * expansion + noiseZ

        posArray[i3] += (targetX - posArray[i3]) * 0.02
        posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.02
        posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * 0.02
      }

      posAttr.needsUpdate = true
    }

    meshRef.current.rotation.y += delta * 0.05
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.025 : 0.02}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function GeometricCore({ isDark, isMobile }: { isDark: boolean; isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  const torusRef = useRef<THREE.Mesh>(null)
  const icosaRef = useRef<THREE.Mesh>(null)
  const octaRef = useRef<THREE.Mesh>(null)

  const lightColorTarget = useRef(new THREE.Color())
  const darkColorTarget = useRef(new THREE.Color())

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const s = scroll.smoothed
    const time = state.clock.elapsedTime

    groupRef.current.rotation.y = time * 0.15 + s * Math.PI * 2
    groupRef.current.rotation.x = Math.sin(time * 0.08) * 0.2 + s * 0.5

    const scale = THREE.MathUtils.lerp(1, 0.3, s)
    groupRef.current.scale.setScalar(scale)

    groupRef.current.position.y = THREE.MathUtils.lerp(0, -2, s)

    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.3
      torusRef.current.rotation.z = time * 0.2
      const mat = torusRef.current.material as THREE.MeshStandardMaterial
      lightColorTarget.current.set(isDark ? '#3b82f6' : '#2563eb')
      mat.color.lerp(lightColorTarget.current, delta * 3)
      mat.opacity = THREE.MathUtils.lerp(0.6, 0.03, s)
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.y = time * 0.25
      icosaRef.current.rotation.z = time * 0.15
      const mat = icosaRef.current.material as THREE.MeshStandardMaterial
      darkColorTarget.current.set(isDark ? '#0ea5e9' : '#0284c7')
      mat.color.lerp(darkColorTarget.current, delta * 3)
      mat.opacity = THREE.MathUtils.lerp(0.3, 0.02, s)
    }
    if (octaRef.current) {
      octaRef.current.rotation.x = time * 0.2
      octaRef.current.rotation.y = time * 0.3
      const mat = octaRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = THREE.MathUtils.lerp(0.8, 0.04, s)
    }
  })

  const detail = isMobile ? 1 : 2

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef}>
        <torusGeometry args={[1.2, 0.04, 16, 100]} />
        <meshStandardMaterial
          color={isDark ? '#3b82f6' : '#2563eb'}
          emissive={isDark ? '#3b82f6' : '#2563eb'}
          emissiveIntensity={isDark ? 0.5 : 0.2}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>

      <mesh ref={icosaRef}>
        <icosahedronGeometry args={[0.8, detail]} />
        <meshStandardMaterial
          color={isDark ? '#0ea5e9' : '#0284c7'}
          emissive={isDark ? '#0ea5e9' : '#0284c7'}
          emissiveIntensity={isDark ? 0.4 : 0.15}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      <mesh ref={octaRef}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={isDark ? '#60a5fa' : '#3b82f6'}
          emissive={isDark ? '#60a5fa' : '#3b82f6'}
          emissiveIntensity={isDark ? 0.6 : 0.25}
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

function AdaptiveLighting({ isDark }: { isDark: boolean }) {
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const pointRef = useRef<THREE.PointLight>(null)

  useFrame((_, delta) => {
    const dim = 1 - scroll.smoothed * 0.7

    if (ambientRef.current) {
      const target = (isDark ? 0.15 : 0.4) * dim
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, target, delta * 2)
    }
    if (pointRef.current) {
      const target = (isDark ? 2.5 : 1.5) * dim
      pointRef.current.intensity = THREE.MathUtils.lerp(pointRef.current.intensity, target, delta * 2)
    }
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={isDark ? 0.15 : 0.4} />
      <pointLight ref={pointRef} position={[5, 5, 5]} intensity={isDark ? 2.5 : 1.5} color={isDark ? '#60a5fa' : '#3b82f6'} />
      <pointLight position={[-3, -3, 2]} intensity={isDark ? 0.8 : 0.4} color={isDark ? '#0ea5e9' : '#0284c7'} />
    </>
  )
}

function AdaptiveFog({ isDark }: { isDark: boolean }) {
  const fogRef = useRef<THREE.Fog>(null)

  useFrame(() => {
    if (!fogRef.current) return
    const s = scroll.smoothed
    fogRef.current.near = THREE.MathUtils.lerp(4, 1, s)
    fogRef.current.far = THREE.MathUtils.lerp(12, 6, s)
    fogRef.current.color.set(isDark ? '#030712' : '#f9fafb')
  })

  return <fog ref={fogRef} attach="fog" args={[isDark ? '#030712' : '#f9fafb', 4, 12]} />
}

export function SceneContent({ isDark, isMobile }: SceneContentProps) {
  return (
    <>
      <ScrollManager />
      <AdaptiveLighting isDark={isDark} />
      <Environment preset={isDark ? 'night' : 'city'} environmentIntensity={isDark ? 0.1 : 0.3} />
      <GeometricCore isDark={isDark} isMobile={isMobile} />
      <ParticleField isDark={isDark} isMobile={isMobile} />
      <AdaptiveFog isDark={isDark} />
    </>
  )
}
