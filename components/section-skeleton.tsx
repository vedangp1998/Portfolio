"use client"

import { motion } from "framer-motion"
import SectionHeading from "@/components/section-heading"

interface SectionSkeletonProps {
  title: string
  className?: string
}

export default function SectionSkeleton({ title, className = "" }: SectionSkeletonProps) {
  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      <SectionHeading title={title} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <SkeletonLine width="100%" height="20px" />
          <SkeletonLine width="90%" height="20px" />
          <SkeletonLine width="95%" height="20px" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function SkeletonLine({ width, height }: { width: string; height: string }) {
  return <div className="bg-muted/30 rounded animate-pulse" style={{ width, height }} />
}

function SkeletonCard() {
  return (
    <div className="rounded-lg overflow-hidden border border-border/10 bg-card/50 p-6 space-y-4">
      <SkeletonLine width="60%" height="24px" />
      <SkeletonLine width="100%" height="16px" />
      <SkeletonLine width="90%" height="16px" />
      <SkeletonLine width="80%" height="16px" />
      <div className="flex space-x-2 mt-4">
        <SkeletonLine width="80px" height="32px" />
        <SkeletonLine width="80px" height="32px" />
      </div>
    </div>
  )
}
