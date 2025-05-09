"use client"

import { motion } from "framer-motion"

interface LoadingFallbackProps {
  height?: string
  width?: string
  className?: string
}

export default function LoadingFallback({ height = "300px", width = "100%", className = "" }: LoadingFallbackProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} style={{ height, width }}>
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-3 h-3 bg-primary rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", times: [0, 0.5, 1] }}
        />
        <motion.div
          className="w-3 h-3 bg-secondary rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 0.2,
          }}
        />
        <motion.div
          className="w-3 h-3 bg-accent rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: 0.4,
          }}
        />
      </motion.div>
    </div>
  )
}
