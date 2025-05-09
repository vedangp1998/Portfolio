"use client"

import { useEffect, useState } from "react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  cls: number | null
  fid: number | null
  ttfb: number | null
}

export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  })

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      return
    }

    // Measure Time to First Byte (TTFB)
    if (performance && performance.getEntriesByType) {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navEntry) {
        setMetrics((prev) => ({ ...prev, ttfb: navEntry.responseStart }))
      }
    }

    // First Contentful Paint (FCP)
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        if (entries.length > 0) {
          const fcp = entries[0].startTime
          setMetrics((prev) => ({ ...prev, fcp }))
          fcpObserver.disconnect()
        }
      })
      fcpObserver.observe({ type: "paint", buffered: true })
    } catch (e) {
      console.warn("FCP measurement not supported", e)
    }

    // Largest Contentful Paint (LCP)
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          const lcp = lastEntry.startTime
          setMetrics((prev) => ({ ...prev, lcp }))
        }
      })
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      return () => lcpObserver.disconnect()
    } catch (e) {
      console.warn("LCP measurement not supported", e)
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        if (entries.length > 0) {
          const firstInput = entries[0] as PerformanceEventTiming
          const fid = firstInput.processingStart - firstInput.startTime
          setMetrics((prev) => ({ ...prev, fid }))
          fidObserver.disconnect()
        }
      })
      fidObserver.observe({ type: "first-input", buffered: true })
    } catch (e) {
      console.warn("FID measurement not supported", e)
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0
      let clsEntries: PerformanceEntry[] = []
      let sessionValue = 0
      let sessionEntries: PerformanceEntry[] = []
      let sessionId = 0

      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries() as LayoutShift[]

        entries.forEach((entry) => {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            const currentTime = entry.startTime

            // Start a new session if more than 1 second has passed
            // since the last entry or if the session has lasted more than 5 seconds
            if (
              sessionValue &&
              (currentTime - sessionEntries[sessionEntries.length - 1].startTime > 1000 ||
                currentTime - sessionEntries[0].startTime > 5000)
            ) {
              // If this session's value is larger than the current CLS value,
              // update the CLS value and entries
              if (sessionValue > clsValue) {
                clsValue = sessionValue
                clsEntries = sessionEntries
              }

              // Start a new session
              sessionValue = 0
              sessionEntries = []
              sessionId++
            }

            // Add the entry to the current session
            sessionValue += entry.value
            sessionEntries.push(entry)

            // Update the CLS value if the current session is larger
            if (sessionValue > clsValue) {
              clsValue = sessionValue
              clsEntries = sessionEntries

              // Update metrics state with the new CLS value
              setMetrics((prev) => ({ ...prev, cls: clsValue }))
            }
          }
        })
      })

      clsObserver.observe({ type: "layout-shift", buffered: true })

      return () => clsObserver.disconnect()
    } catch (e) {
      console.warn("CLS measurement not supported", e)
    }
  }, [])

  return metrics
}
