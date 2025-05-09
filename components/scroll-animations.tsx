"use client"

import type { ReactNode, CSSProperties } from "react"
import { motion, useScroll, useTransform, useSpring, useInView, useAnimation } from "framer-motion"
import { useRef, useEffect } from "react"

// Optimized fade in animation that triggers when element enters viewport
export function FadeIn({
  children,
  delay = 0,
  direction = null,
  fullWidth = false,
  className = "",
  style = {},
}: {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | null
  fullWidth?: boolean
  className?: string
  style?: CSSProperties
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: false }) // Changed to once: false to trigger on every view
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const getDirectionValues = () => {
    switch (direction) {
      case "up":
        return { y: 20, x: 0 }
      case "down":
        return { y: -20, x: 0 }
      case "left":
        return { y: 0, x: 20 }
      case "right":
        return { y: 0, x: -20 }
      default:
        return { y: 0, x: 0 }
    }
  }

  const { x, y } = getDirectionValues()

  const variants = {
    hidden: { opacity: 0, y, x },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.4,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${fullWidth ? "w-full" : ""} ${className} optimize-gpu`}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// Optimized staggered animation for lists or grids
export function StaggerContainer({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.1, once: false }) // Changed to once: false
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("show")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={`${className} optimize-gpu`}
    >
      {children}
    </motion.div>
  )
}

// Optimized staggered item for use with StaggerContainer
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.21, 0.45, 0.27, 0.9],
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={`${className} optimize-gpu`}>
      {children}
    </motion.div>
  )
}

// Optimized parallax effect for background elements
export function ParallaxElement({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const smoothY = useSpring(y, { damping: 20, stiffness: 100 })

  return (
    <motion.div ref={ref} style={{ y: smoothY }} className={`${className} optimize-gpu`}>
      {children}
    </motion.div>
  )
}

// Optimized text reveal animation for headings
export function TextReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: false }) // Changed to once: false
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      },
    },
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial="hidden" animate={controls} variants={variants} className="optimize-gpu">
        {children}
      </motion.div>
    </div>
  )
}

// Optimized scale animation for cards or images
export function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once: false }) // Changed to once: false
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={`${className} optimize-gpu`}
    >
      {children}
    </motion.div>
  )
}
