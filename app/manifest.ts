import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ganesh Chaudhary — Full Stack Developer',
    short_name: 'Ganesh Chaudhary',
    description:
      'Full Stack Developer portfolio — React, Node.js, microservices, and AI-integrated systems.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f4ee',
    theme_color: '#f6f4ee',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
