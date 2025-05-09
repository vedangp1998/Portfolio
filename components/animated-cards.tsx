"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

// 3D tilt card effect
export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  perspective = 1000,
  scale = 1.05,
  speed = 500,
}: {
  children: React.ReactNode
  className?: string
  tiltAmount?: number
  perspective?: number
  scale?: number
  speed?: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tracking mouse position
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring animations for smoother movement
  const springConfig = { damping: 20, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  // Transform mouse position into rotation values
  const rotateX = useTransform(ySpring, [-0.5, 0.5], [tiltAmount, -tiltAmount])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-tiltAmount, tiltAmount])

  // Handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height

    // Calculate normalized mouse position (-0.5 to 0.5)
    const xValue = (e.clientX - rect.left) / width - 0.5
    const yValue = (e.clientY - rect.top) / height - 0.5

    // Update motion values
    x.set(xValue)
    y.set(yValue)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        perspective: perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovered ? scale : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
          duration: speed / 1000,
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

// Floating card effect
export function FloatingCard({
  children,
  className = "",
  floatAmount = 10,
  duration = 4,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  floatAmount?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      className={`relative ${className}`}
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
      {children}
    </motion.div>
  )
}

// Card with hover glow effect
export function GlowCard({
  children,
  className = "",
  glowColor = "rgba(var(--primary), 0.3)",
  glowSize = 150,
  glowOpacity = 0.8,
}: {
  children: React.ReactNode
  className?: string
  glowColor?: string
  glowSize?: number
  glowOpacity?: number
}) {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            background: `radial-gradient(circle ${glowSize}px at ${glowPosition.x}px ${glowPosition.y}px, ${glowColor}, transparent)`,
            opacity: glowOpacity,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: glowOpacity }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
