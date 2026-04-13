import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
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
    title: 'Ganesh Chaudhary | Full Stack Developer',
    description:
      'Full Stack Developer building production-grade web applications with React, Node.js, and AI integrations.',
    siteName: 'Ganesh Chaudhary Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ganesh Chaudhary | Full Stack Developer',
    description:
      'Full Stack Developer building production-grade web applications with React, Node.js, and AI integrations.',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
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
      <body className="font-sans bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 antialiased transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
