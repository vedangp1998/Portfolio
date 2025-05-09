import { Suspense, lazy } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import LoadingFallback from "@/components/loading-fallback"
import SectionSkeleton from "@/components/section-skeleton"
import ScrollProgress from "@/components/scroll-progress"
import BackToTop from "@/components/back-to-top"

// Eagerly load critical components
import GridBackground from "@/components/grid-background"

// Lazy load non-critical components
const About = lazy(() => import("@/components/about"))
const Experience = lazy(() => import("@/components/experience"))
const Projects = lazy(() => import("@/components/projects"))
const Skills = lazy(() => import("@/components/skills"))
const Footer = lazy(() => import("@/components/footer"))
const Education = lazy(() => import("@/components/education"))
const SocialProfiles = lazy(() => import("@/components/social-profiles"))

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GridBackground />
      <ScrollProgress />
      <BackToTop />
      <div className="relative z-10">
        <Header />

        <section id="hero" className="section-wrapper">
          <Hero />
        </section>

        <section id="about" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="About Me" />}>
            <About />
          </Suspense>
        </section>

        <section id="experience" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="Work Experience" />}>
            <Experience />
          </Suspense>
        </section>

        <section id="projects" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="Projects" />}>
            <Projects />
          </Suspense>
        </section>

        <section id="skills" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="My Stack" />}>
            <Skills />
          </Suspense>
        </section>

        <section id="education" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="Education & Certifications" />}>
            <Education />
          </Suspense>
        </section>

        <section id="connect" className="section-wrapper">
          <Suspense fallback={<SectionSkeleton title="Connect With Me" />}>
            <SocialProfiles />
          </Suspense>
        </section>

        <Suspense fallback={<LoadingFallback height="100px" />}>
          <Footer />
        </Suspense>
      </div>
    </main>
  )
}
