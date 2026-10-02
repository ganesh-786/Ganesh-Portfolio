import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { CaseStudy } from '@/components/projects/CaseStudy'
import { HERO_DATA } from '@/lib/constants'
import { PROJECTS, getProject, projectPath } from '@/lib/projects'

const ORIGIN = 'https://ganeshtharu.com.np'

interface PageProps {
  params: Promise<{ slug: string }>
}

// The site is a static export, so the full list of pages has to be known at build time.
export const dynamicParams = false

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = getProject((await params).slug)
  if (!project) return {}

  const title = `${project.title}, a case study | ${HERO_DATA.name}`
  const path = projectPath(project.slug)

  return {
    title,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      url: path,
      title,
      description: project.summary,
      siteName: 'Ganesh Chaudhary Portfolio',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${HERO_DATA.name}, ${HERO_DATA.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.summary,
      images: ['/og-image.png'],
    },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const project = getProject((await params).slug)
  if (!project) notFound()

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      ['Home', ORIGIN],
      ['Projects', `${ORIGIN}/projects`],
      [project.title, `${ORIGIN}${projectPath(project.slug)}`],
    ].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <Navbar />
      <main id="main">
        <CaseStudy project={project} />
      </main>
      <Footer />
    </>
  )
}
