"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

// Animated icon that pulses on hover
export function PulseIcon({
  icon: Icon,
  size = 24,
  color = "currentColor",
  className = "",
  pulseColor = "rgba(var(--primary), 0.2)",
  pulseSize = 50,
}: {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
  pulseColor?: string
  pulseSize?: number
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {isHovered && (
        <motion.div
          className="absolute rounded-full"
          style={{
            backgroundColor: pulseColor,
            width: pulseSize,
            height: pulseSize,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.2, 1.5],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      )}
      <Icon size={size} color={color} />
    </motion.div>
  )
}

// Animated icon that floats
export function FloatingIcon({
  icon: Icon,
  size = 24,
  color = "currentColor",
  className = "",
  floatAmount = 5,
  duration = 3,
  delay = 0,
}: {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
  floatAmount?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={{
        y: [-floatAmount, floatAmount, -floatAmount],
      }}
      transition={{
        duration: duration,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <Icon size={size} color={color} />
    </motion.div>
  )
}

// Animated icon that rotates
export function RotatingIcon({
  icon: Icon,
  size = 24,
  color = "currentColor",
  className = "",
  rotateAmount = 360,
  duration = 20,
  hover = false,
}: {
  icon: LucideIcon
  size?: number
  color?: string
  className?: string
  rotateAmount?: number
  duration?: number
  hover?: boolean
}) {
  return (
    <motion.div
      className={`inline-flex items-center justify-center ${className}`}
      animate={!hover ? { rotate: rotateAmount } : undefined}
      whileHover={hover ? { rotate: rotateAmount } : undefined}
      transition={{
        duration: duration,
        repeat: !hover ? Number.POSITIVE_INFINITY : 0,
        ease: "linear",
      }}
    >
      <Icon size={size} color={color} />
    </motion.div>
  )
}
