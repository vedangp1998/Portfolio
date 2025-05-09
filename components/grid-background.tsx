"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useTheme } from "next-themes"
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiGit,
  SiNodedotjs,
  SiNpm,
  SiWebpack,
} from "react-icons/si"

// Tech icon configuration with enhanced sizes and colors
const techIcons = [
  { Icon: SiReact, color: "#61DAFB", size: 32 },
  { Icon: SiJavascript, color: "#F7DF1E", size: 30 },
  { Icon: SiTypescript, color: "#3178C6", size: 30 },
  { Icon: SiHtml5, color: "#E34F26", size: 32 },
  { Icon: SiCss3, color: "#1572B6", size: 32 },
  { Icon: SiNextdotjs, color: "#000000", darkColor: "#f9f4da", size: 32 },
  { Icon: SiTailwindcss, color: "#06B6D4", size: 32 },
  { Icon: SiRedux, color: "#764ABC", size: 30 },
  { Icon: SiGit, color: "#F05032", size: 30 },
  { Icon: SiNodedotjs, color: "#339933", size: 32 },
  { Icon: SiNpm, color: "#CB3837", size: 32 },
  { Icon: SiWebpack, color: "#8DD6F9", size: 30 },
]

// Floating icon component with enhanced hover effects
interface TechIcon {
  Icon: React.ComponentType<{ size: number; color: string }>;
  color: string;
  darkColor?: string;
  size: number;
}

const FloatingIcon = ({ tech, index }: { tech: TechIcon; index: number }) => {
  const { Icon, color, darkColor, size } = tech
  const { theme } = useTheme()
  const duration = 120 + Math.random() * 60 // Random duration between 120-180s
  const delay = index * 2 // Staggered start
  const [isHovered, setIsHovered] = useState(false)

  // Use appropriate color based on theme
  const iconColor = theme === "dark" && darkColor ? darkColor : color

  // Random starting position - memoized to prevent recalculation
  const { startX, startY, pathVariants } = useMemo(() => {
    const startX = Math.random() * 100
    const startY = Math.random() * 100

    // Random path configuration with enhanced motion
    const pathVariants = {
      start: { x: `${startX}vw`, y: `${startY}vh`, opacity: 0.1 },
      end: {
        x: [`${startX}vw`, `${(startX + 30) % 100}vw`, `${(startX + 60) % 100}vw`, `${startX}vw`],
        y: [`${startY}vh`, `${(startY + 40) % 100}vh`, `${(startY + 20) % 100}vh`, `${startY}vh`],
        opacity: theme === "dark" ? [0.2, 0.8, 0.4, 0.2] : [0.4, 0.9, 0.6, 0.4], // Enhanced opacity for better visibility in light mode
        transition: {
          duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          delay,
        },
      },
    }

    return { startX, startY, pathVariants }
  }, [duration, delay, theme])

  // Get the technology name from the icon component name
  const getTechName = () => {
    const iconName = Icon.displayName || Icon.name || ""
    // Remove the 'Si' prefix and convert to readable format
    return iconName
      .replace(/^Si/, "")
      .replace(/([A-Z])/g, " $1")
      .trim()
  }

  return (
    <motion.div
      className="absolute cursor-pointer pointer-events-auto optimize-gpu"
      variants={pathVariants}
      initial="start"
      animate="end"
      style={{ filter: "blur(0px)", zIndex: isHovered ? 50 : 0 }} // Removed blur for HD look
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.8,
        filter:
          theme === "dark"
            ? "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))"
            : "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))", // Adjusted shadow for light mode
        transition: { duration: 0.2 },
      }}
    >
      <div className="relative group">
        <div
          style={{
            opacity: isHovered ? 1 : theme === "dark" ? 0.8 : 0.9, // Increased opacity in light mode
            transition: "opacity 0.2s ease, filter 0.2s ease",
            filter: isHovered ? "drop-shadow(0 0 5px " + iconColor + ")" : "none", // Added color glow on hover
          }}
        >
          <Icon size={size} color={iconColor} />
        </div>

        {/* Enhanced tooltip that appears on hover */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-background/90 text-foreground text-xs rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-200 pointer-events-none backdrop-blur-sm border border-border/10 shadow-lg">
          {getTechName()}
        </div>
      </div>
    </motion.div>
  )
}

export default function GridBackground() {
  const isMobile = useMobile()
  const iconCount = isMobile ? 8 : 12 // Increased minimum icons on mobile for better visual effect

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {techIcons.slice(0, iconCount).map((tech, index) => (
        <FloatingIcon key={index} tech={tech} index={index} />
      ))}
    </div>
  )
}
