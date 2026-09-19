import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-newsreader',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0f11' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ganeshtharu.com.np'),
  title: 'Ganesh Chaudhary | Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, Node.js, microservices, and AI-integrated systems. View my portfolio of production-grade web applications.',
  keywords: [
    'Full Stack Developer',
    'React',
    'Node.js',
    'Next.js',
    'Portfolio',
    'Ganesh Chaudhary',
    'Software Engineer',
  ],
  authors: [{ name: 'Ganesh Chaudhary' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ganeshtharu.com.np',
    title: 'Ganesh Chaudhary | Full Stack Developer',
    description:
      'Full Stack Developer building production-grade web applications with React, Node.js, and AI integrations.',
    siteName: 'Ganesh Chaudhary Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ganesh Chaudhary — Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ganesh Chaudhary | Full Stack Developer',
    description:
      'Full Stack Developer building production-grade web applications with React, Node.js, and AI integrations.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ganesh Chaudhary',
  jobTitle: 'Full Stack Developer',
  url: 'https://ganeshtharu.com.np',
  sameAs: [
    'https://github.com/ganesh-786',
    'https://www.linkedin.com/in/ganesh-chaudhary-684843269',
  ],
  knowsAbout: [
    'React.js', 'Node.js', 'Next.js', 'TypeScript', 'PostgreSQL',
    'Redis', 'Docker', 'Microservices', 'AI Integration',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Institute of Engineering, Dharan',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Full Stack Open Certificate',
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: 'University of Helsinki',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Claude Code in Action',
      url: 'https://verify.skilljar.com/c/kw9drjq2b2d5',
      credentialCategory: 'certificate',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: 'Anthropic Academy',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <head>
        <noscript>
          <style>{'[style*="opacity:0"]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="bg-paper font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
