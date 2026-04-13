'use client'

import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-gray-50 dark:bg-gray-950 z-0" />,
})

export function SceneLoader() {
  return <Scene3D />
}
