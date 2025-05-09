"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down"
  quality?: number
  sizes?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  fill = false,
  objectFit = "cover",
  quality = 85,
  sizes,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isError, setIsError] = useState(false)
  const imgRef = useRef<HTMLDivElement>(null)

  // Generate responsive sizes if not provided
  const responsiveSizes = sizes || fill ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : undefined

  // Generate blur placeholder - use a simple data URI instead of a blob URL
  const blurDataURL =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100%25' height='100%25' fill='%23202020' fillOpacity='0.2'/%3E%3C/svg%3E"

  useEffect(() => {
    if (!imgRef.current || priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "300px", // Start loading when image is 300px from viewport
        threshold: 0.01,
      },
    )

    observer.observe(imgRef.current)

    return () => {
      if (imgRef.current) {
        observer.disconnect()
      }
    }
  }, [priority])

  // Handle image load error
  const handleError = () => {
    setIsError(true)
    console.warn(`Failed to load image: ${src}`)
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className} ${!isLoaded && !isError ? "bg-muted/30 animate-pulse" : ""}`}
      style={{ width: fill ? "100%" : width, height: fill ? "100%" : height }}
    >
      {isInView && !isError && (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={handleError}
          priority={priority}
          style={{ objectFit }}
          sizes={responsiveSizes}
          quality={quality}
          loading={priority ? "eager" : "lazy"}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      )}

      {/* Fallback for image load error */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 text-muted-foreground text-sm">
          <span className="px-2 text-center">{alt || "Image failed to load"}</span>
        </div>
      )}
    </div>
  )
}
