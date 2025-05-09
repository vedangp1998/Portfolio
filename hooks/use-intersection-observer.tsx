"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  root?: RefObject<Element> | null
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  root = null,
}: UseIntersectionObserverProps = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const targetRef = useRef<Element | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)

        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold,
        rootMargin,
        root: root?.current,
      },
    )

    const currentTarget = targetRef.current

    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [threshold, rootMargin, root, hasIntersected])

  return { targetRef, isIntersecting, hasIntersected, setTargetRef: (el: Element) => (targetRef.current = el) }
}
