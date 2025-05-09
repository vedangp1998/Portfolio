"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

export default function AnimatedCounter({
  from = 0,
  to = 100,
  duration = 2,
  delay = 0,
  formatter = (value: number) => value.toString(),
  className = "",
}: {
  from?: number
  to: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
  className?: string
}) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isInView) return

    // Delay start if needed
    const timeoutId = setTimeout(() => {
      startAnimation()
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isInView, delay])

  const startAnimation = () => {
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / (duration * 1000), 1)

      // Use easeOutExpo for a nice deceleration effect
      const easeOutExpo = 1 - Math.pow(2, -10 * progress)

      // Calculate current count value
      const currentCount = Math.floor(from + (to - from) * easeOutExpo)
      setCount(currentCount)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  return (
    <span ref={ref} className={className}>
      {formatter(count)}
    </span>
  )
}
