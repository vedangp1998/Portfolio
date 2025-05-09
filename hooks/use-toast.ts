"use client"

// Adapted from: https://ui.shadcn.com/docs/components/toast
import { useState, useEffect, useCallback } from "react"

const TOAST_TIMEOUT = 5000

type ToastType = "default" | "success" | "destructive"

interface Toast {
  id: string
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback(
    ({ title, description, type = "default", duration = TOAST_TIMEOUT }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      const newToast = { id, title, description, type, duration }

      setToasts((prevToasts) => [...prevToasts, newToast])

      return id
    },
    [],
  )

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => {
          const [, ...rest] = prevToasts
          return rest
        })
      }, toasts[0].duration)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  return {
    toasts,
    addToast,
    removeToast,
  }
}

export type { Toast }
