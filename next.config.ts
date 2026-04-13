import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
