import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { CurrentWork } from '@/components/sections/CurrentWork'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Experience } from '@/components/sections/Experience'
import { Education } from '@/components/sections/Education'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <CurrentWork />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
