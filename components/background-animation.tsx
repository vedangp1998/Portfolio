"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useMobile } from "@/hooks/use-mobile"

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isMobile = useMobile()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    let lastFrameTime = 0
    const targetFPS = isMobile ? 30 : 60 // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS
    const isDark = theme === "dark"

    // Adjust particle count and properties for better performance
    const particleCount = isMobile ? 30 : 60 // Reduced from 40/80
    const connectionDistance = isMobile ? 80 : 120 // Reduced from 100/150

    // Spatial grid for optimized particle connections
    const gridSize = connectionDistance
    const grid: Record<string, Particle[]> = {}

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      gridX = 0
      gridY = 0

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 1 // Slightly smaller particles
        this.speedX = Math.random() * 0.4 - 0.2 // Slower movement
        this.speedY = Math.random() * 0.4 - 0.2

        // Adjust particle color based on theme
        if (isDark) {
          this.color = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.03})` // Light particles for dark mode
        } else {
          // Use the purple color for light mode particles
          this.color = `rgba(123, 94, 167, ${Math.random() * 0.08 + 0.02})` // Purple particles for light mode
        }

        this.updateGridPosition()
      }

      update() {
        // Remove from current grid cell
        this.removeFromGrid()

        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height

        // Add to new grid cell
        this.updateGridPosition()
      }

      updateGridPosition() {
        const newGridX = Math.floor(this.x / gridSize)
        const newGridY = Math.floor(this.y / gridSize)

        if (this.gridX !== newGridX || this.gridY !== newGridY) {
          this.gridX = newGridX
          this.gridY = newGridY
          const key = `${this.gridX},${this.gridY}`
          if (!grid[key]) grid[key] = []
          grid[key].push(this)
        }
      }

      removeFromGrid() {
        const key = `${this.gridX},${this.gridY}`
        if (grid[key]) {
          const index = grid[key].indexOf(this)
          if (index !== -1) {
            grid[key].splice(index, 1)
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Set canvas dimensions with device pixel ratio consideration
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)

      // Clear the grid and reinitialize particles
      Object.keys(grid).forEach((key) => delete grid[key])
      initParticles()
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    function getNeighboringCells(gridX: number, gridY: number): Particle[] {
      const neighbors: Particle[] = []

      // Check 9 surrounding cells (including current cell)
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const key = `${gridX + x},${gridY + y}`
          if (grid[key]) {
            neighbors.push(...grid[key])
          }
        }
      }

      return neighbors
    }

    function connectParticles() {
      // Use a set to avoid drawing the same connection twice
      const drawnConnections = new Set<string>()

      for (const particle of particles) {
        const neighbors = getNeighboringCells(particle.gridX, particle.gridY)
        let connectionCount = 0
        const maxConnections = isMobile ? 3 : 5 // Limit connections per particle

        for (const neighbor of neighbors) {
          if (particle === neighbor) continue

          // Create a unique ID for this connection
          const id1 = particles.indexOf(particle)
          const id2 = particles.indexOf(neighbor)
          const connectionId = id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`

          // Skip if we've already drawn this connection
          if (drawnConnections.has(connectionId)) continue

          const dx = particle.x - neighbor.x
          const dy = particle.y - neighbor.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            drawnConnections.add(connectionId)
            connectionCount++

            if (connectionCount > maxConnections) break

            const opacity = 1 - distance / connectionDistance

            // Adjust connection color based on theme
            if (isDark) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.12})`
            } else {
              // Use the purple color for light mode connections
              ctx.strokeStyle = `rgba(123, 94, 167, ${opacity * 0.08})`
            }

            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(neighbor.x, neighbor.y)
            ctx.stroke()
          }
        }
      }
    }

    function animate(timestamp: number) {
      // Throttle frame rate
      if (timestamp - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      lastFrameTime = timestamp

      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      connectParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Visibility API to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    window.addEventListener("resize", handleResize)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    handleResize()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, isMobile, isVisible])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}
