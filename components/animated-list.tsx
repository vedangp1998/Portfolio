"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

export default function AnimatedList({
  items,
  renderItem,
  className = "",
  itemClassName = "",
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = "up",
  once = false, // Changed default to false to trigger on every view
}: {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
  itemClassName?: string
  staggerDelay?: number
  initialDelay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.2, once })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const getDirectionVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 },
        }
      case "left":
        return {
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  }

  const itemVariants = getDirectionVariants()

  return (
    <motion.ul ref={ref} className={className} variants={containerVariants} initial="hidden" animate={controls}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          className={itemClassName}
          variants={itemVariants}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 200,
          }}
        >
          {renderItem(item, index)}
        </motion.li>
      ))}
    </motion.ul>
  )
}
