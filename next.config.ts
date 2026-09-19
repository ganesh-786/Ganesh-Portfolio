import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
  // Since Next 16, `next dev` writes AGENTS.md and CLAUDE.md into the project root whenever it
  // notices an AI coding tool. Nothing here needs them, so keep dependencies out of the source tree.
  agentRules: false,
}

export default nextConfig
