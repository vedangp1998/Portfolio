"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function CustomCursor() {
  const { theme } = useTheme()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const previousTimeRef = useRef<number>(0)
  const requestRef = useRef<number>()

  useEffect(() => {
    // Initial position off-screen to avoid flashing
    if (cursorRef.current) {
      cursorRef.current.style.transform = "translate(-100px, -100px)"
    }
    if (cursorDotRef.current) {
      cursorDotRef.current.style.transform = "translate(-100px, -100px)"
    }

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true)

      // Use requestAnimationFrame for smoother performance
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      requestRef.current = requestAnimationFrame(() => {
        if (cursorRef.current && cursorDotRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
          cursorDotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        }
      })
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    // Clean up
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)

      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  // Generate grid dots
  const gridSize = 5 // 5x5 grid
  const dotSize = 2
  const gridGap = 6
  const totalSize = gridSize * dotSize + (gridSize - 1) * gridGap

  const gridDots = []
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      // Skip center dot to create a hollow center
      if (i === Math.floor(gridSize / 2) && j === Math.floor(gridSize / 2)) continue

      const posX = j * (dotSize + gridGap)
      const posY = i * (dotSize + gridGap)

      // Calculate distance from center for opacity
      const centerX = totalSize / 2
      const centerY = totalSize / 2
      const distanceFromCenter = Math.sqrt(Math.pow(posX - centerX, 2) + Math.pow(posY - centerY, 2))
      const maxDistance = (Math.sqrt(2) * totalSize) / 2
      const opacity = 1 - (distanceFromCenter / maxDistance) * 0.5

      gridDots.push(
        <div
          key={`${i}-${j}`}
          className="absolute rounded-full bg-primary"
          style={{
            width: dotSize,
            height: dotSize,
            left: posX,
            top: posY,
            opacity: opacity,
          }}
        />,
      )
    }
  }

  if (typeof window === "undefined") return null

  return (
    <>
      {/* Main cursor dot (system cursor replacement) */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[9999] w-4 h-4 -ml-2 -mt-2"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        <div className="absolute w-4 h-4 bg-black dark:bg-white rounded-full" />
      </div>

      {/* Grid cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9998] -ml-[20px] -mt-[20px]"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease",
          willChange: "transform",
        }}
      >
        {/* Grid dots container */}
        <div
          className="relative"
          style={{
            width: totalSize,
            height: totalSize,
          }}
        >
          {gridDots}
        </div>
      </div>
    </>
  )
}
