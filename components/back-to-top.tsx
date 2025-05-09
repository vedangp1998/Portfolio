"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef(null)

  // Track scroll position and scrolling state
  useEffect(() => {
    const handleScroll = () => {
      // Update scrolling state
      setIsScrolling(true)

      // Hide back-to-top button while scrolling
      setIsVisible(false)

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set a timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)

        // Only show button if we're scrolled down enough
        if (window.scrollY > 500) {
          setIsVisible(true)
        }
      }, 150) // Wait 150ms after scrolling stops
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial check
    if (window.scrollY > 500) {
      setIsVisible(true)
    }

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, []) // Empty dependency array

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && !isScrolling && (
        <motion.div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
