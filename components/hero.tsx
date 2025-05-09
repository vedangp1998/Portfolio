"use client"

import { motion } from "framer-motion"
import { TextReveal, FadeIn } from "@/components/scroll-animations"
import { GradientText, TypewriterText } from "@/components/text-animations"
import { Button } from "@/components/ui/button"
import ContactButton from "@/components/contact-button"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const headerOffset = 80
    const sectionPosition = section.getBoundingClientRect().top
    const offsetPosition = sectionPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 pb-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 optimize-gpu"
        >
          <div>
            <TextReveal className="inline-block">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-2 sm:mb-4 font-montserrat text-foreground text-shadow-md tracking-tighter">
                Hi, I am <TypewriterText text="Vedang" delay={0.5} speed={0.08} />
              </h1>
            </TextReveal>
            <TextReveal delay={0.1} className="inline-block">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 tracking-tight">
                <GradientText
                  text="Frontend Developer with 3.5+ years of experience"
                  colors={["#ffcc33", "#ff9966", "#ff5e62"]}
                />
              </h2>
            </TextReveal>
          </div>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-base sm:text-xl text-foreground/90 leading-relaxed px-2 sm:px-0 text-shadow-sm font-normal tracking-tight text-balance">
              I build high-performance web applications using{" "}
              <span className="text-highlight font-medium">React.js</span>,
              <span className="text-highlight font-medium"> Next.js</span>, and modern frontend technologies. Passionate
              about creating seamless user experiences and writing clean, scalable code.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-2 sm:mt-0 max-w-xs mx-auto sm:max-w-none">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="shadow-xl shadow-primary/20"
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 font-semibold tracking-tight"
                  onClick={() => scrollToSection("projects")}
                >
                  View My Work
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ContactButton
                  variant="outline"
                  size="lg"
                  className="border-primary/50 hover:bg-primary/10 hover:text-primary hover:border-primary text-base sm:text-lg w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 backdrop-blur-sm font-medium tracking-tight"
                >
                  Contact Me
                </ContactButton>
              </motion.div>
            </div>
          </FadeIn>
        </motion.div>
      </div>
    </section>
  )
}
