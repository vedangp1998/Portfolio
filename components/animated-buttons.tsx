"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { ButtonProps } from "@/components/ui/button"

// Button with hover effect
export function AnimatedButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button variant={variant} size={size} className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

// Button with magnetic effect
export function MagneticButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  magneticStrength = 0.5,
  ...props
}: ButtonProps & { magneticStrength?: number }) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const x = (clientX - left - width / 2) * magneticStrength
    const y = (clientY - top - height / 2) * magneticStrength

    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className="inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <Button variant={variant} size={size} className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

// Button with shine effect
export function ShineButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative inline-block overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button variant={variant} size={size} className={`relative overflow-hidden ${className}`} {...props}>
        {children}

        {/* Shine effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "200%", opacity: 0.4 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
              zIndex: 1,
            }}
          />
        )}
      </Button>
    </motion.div>
  )
}
