"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import MobileNav from "@/components/mobile-nav"
import { motion } from "framer-motion"
import ContactButton from "@/components/contact-button"
import ThemeToggle from "@/components/theme-toogle"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    // Track scroll for header background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Add scroll listener for header background
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Center-focused section detection
    const detectCenterSection = () => {
      const sections = document.querySelectorAll("section[id]")
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2

      // Calculate which section is closest to the center of the viewport
      let closestSection = null
      let closestDistance = Number.POSITIVE_INFINITY

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionCenter = rect.top + rect.height / 2
        const distanceFromCenter = Math.abs(sectionCenter - viewportCenter)

        // If this section is closer to the center than the previous closest
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter
          closestSection = section
        }
      })

      if (closestSection && (closestSection as HTMLElement).id !== activeSection) {
        setActiveSection((closestSection as HTMLElement).id)
      }
    }

    // Throttle the scroll event for performance
    let scrollTimeout: NodeJS.Timeout
    const handleSectionDetection = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(detectCenterSection, 50) // 50ms throttle
    }

    window.addEventListener("scroll", handleSectionDetection, { passive: true })

    // Initial detection
    detectCenterSection()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleSectionDetection)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [activeSection])

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Education", to: "education" },
    { name: "Connect", to: "connect" },
  ]

  // Custom smooth scroll function
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (!section) return

    const headerOffset = 80
    const sectionPosition = section.getBoundingClientRect().top
    const offsetPosition = sectionPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })

    // Update active section immediately for better UX
    setActiveSection(sectionId)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 sm:py-4",
        isScrolled ? "bg-background/90 backdrop-blur-xl shadow-md border-b border-primary/10" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl sm:text-2xl font-bold text-gradient primary-gradient font-heading"
        >
          VP
        </motion.div>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.to}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              onClick={() => scrollToSection(link.to)}
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group",
                activeSection === link.to && "text-primary font-medium",
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  activeSection === link.to ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </motion.button>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <ContactButton className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20" />
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ThemeToggle />
          </motion.div>

          <div className="md:hidden">
            <MobileNav scrollToSection={scrollToSection} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
