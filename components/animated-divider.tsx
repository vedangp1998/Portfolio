"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export default function AnimatedDivider({
  width = "100%",
  height = 1,
  background = "bg-primary/30",
  className = "",
  delay = 0,
  direction = "left-to-right",
}: {
  width?: string | number
  height?: number
  background?: string
  className?: string
  delay?: number
  direction?: "left-to-right" | "right-to-left" | "center-out" | "outside-in"
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.5, once: false }) // Changed to once: false
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const getAnimationVariants = () => {
    switch (direction) {
      case "left-to-right":
        return {
          hidden: { width: 0 },
          visible: { width: "100%" },
        }
      case "right-to-left":
        return {
          hidden: { width: 0, x: "100%" },
          visible: { width: "100%", x: 0 },
        }
      case "center-out":
        return {
          hidden: { width: 0, x: "50%" },
          visible: { width: "100%", x: 0 },
        }
      case "outside-in":
        return {
          hidden: { opacity: 0, scale: 1.5 },
          visible: { opacity: 1, scale: 1 },
        }
      default:
        return {
          hidden: { width: 0 },
          visible: { width: "100%" },
        }
    }
  }

  const variants = getAnimationVariants()

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width, height: "auto" }}>
      <motion.div
        className={`${background}`}
        style={{ height }}
        variants={variants}
        initial="hidden"
        animate={controls}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
      />
    </div>
  )
}
