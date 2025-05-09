"use client"

import { type ReactNode, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import LoadingFallback from "@/components/loading-fallback"

interface LazySectionProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
  className?: string
  id?: string
}

export default function LazySection({
  children,
  threshold = 0.1,
  rootMargin = "200px 0px",
  fallback = <LoadingFallback />,
  className = "",
  id,
}: LazySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin])

  return (
    <div ref={sectionRef} className={className} id={id}>
      {isVisible ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {children}
        </motion.div>
      ) : (
        fallback
      )}
    </div>
  )
}
