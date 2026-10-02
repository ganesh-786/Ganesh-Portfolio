import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { Services } from '@/components/sections/Services'
import { Faq } from '@/components/sections/Faq'
import { About } from '@/components/sections/About'
import { Experience } from '@/components/sections/Experience'
import { Skills } from '@/components/sections/Skills'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'

// Ordered the way a client reads: the work, what they get, their questions, then who is behind it.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Faq />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
