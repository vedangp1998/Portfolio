"use client"

import { motion } from "framer-motion"

interface ProjectDetailsProps {
  responsibilities: string[]
  colorClass?: string
}

export default function ProjectDetails({ responsibilities, colorClass = "text-primary" }: ProjectDetailsProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm sm:text-base font-semibold mb-1">Key Responsibilities:</h4>
      <ul className="space-y-1.5 list-none pl-0">
        {responsibilities.map((responsibility, index) => (
          <motion.li
            key={index}
            className="text-xs sm:text-sm text-foreground/80 flex items-start gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={`${colorClass} text-lg leading-none mt-0.5`}>•</span>
            <span>{responsibility}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
