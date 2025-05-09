"use client"

import { useEffect } from "react"
import { usePerformance } from "@/hooks/use-performance"

export default function PerformanceOptimizer() {
  const metrics = usePerformance()

  useEffect(() => {
    // Optimize resource loading
    if (typeof window !== "undefined") {
      // Preload critical resources - using relative paths instead of absolute URLs
      const preloadLinks: any[] = [
        // Remove font preloading that might be causing the blob URL error
        // These fonts are already handled by Next.js font optimization
      ]

      preloadLinks.forEach((link) => {
        const linkEl = document.createElement("link")
        linkEl.rel = "preload"
        linkEl.href = link.href
        linkEl.as = link.as
        if (link.type) linkEl.type = link.type
        if (link.crossOrigin) linkEl.crossOrigin = link.crossOrigin
        document.head.appendChild(linkEl)
      })

      // Optimize image loading - remove potentially problematic preloading
      if ("connection" in navigator && (navigator.connection as any).effectiveType) {
        const connection = navigator.connection as any
        if (connection.effectiveType === "4g" && !connection.saveData) {
          // Don't preload hero image as it might be causing the blob URL error
          // The image will load normally through Next.js Image component
        }
      }

      // Optimize animations based on device capability
      if ("deviceMemory" in navigator) {
        const memory = (navigator as any).deviceMemory
        if (memory < 4) {
          // Reduce animation complexity on low-memory devices
          document.documentElement.classList.add("reduce-animations")
        }
      }
    }

    // Log performance metrics in development
    if (process.env.NODE_ENV === "development" && metrics.lcp) {
      console.log("Performance metrics:", metrics)
    }
  }, [metrics])

  // This component doesn't render anything visible
  return null
}
