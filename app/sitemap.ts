import type { MetadataRoute } from 'next'
import { PROJECTS, projectPath } from '@/lib/projects'

export const dynamic = 'force-static'

const ORIGIN = 'https://ganeshtharu.com.np'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    { url: ORIGIN, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${ORIGIN}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    ...PROJECTS.map((project) => ({
      url: `${ORIGIN}${projectPath(project.slug)}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ]
}
