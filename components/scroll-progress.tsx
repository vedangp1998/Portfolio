"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    // Horizontal progress bar at the top
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-primary/30 z-50 origin-left" style={{ scaleX }} />
  )
}
