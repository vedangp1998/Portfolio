"use client"

import type React from "react"

import { createContext, useContext } from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as Provider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast, type Toast as ToastType } from "@/hooks/use-toast"

interface ToastContextType {
  toast: (props: { title?: string; description?: string; type?: "default" | "success" | "destructive" }) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, addToast, removeToast } = useToast()

  const toast = ({
    title,
    description,
    type = "default",
  }: { title?: string; description?: string; type?: "default" | "success" | "destructive" }) => {
    addToast({ title, description, type })
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      <Provider>
        {children}
        {toasts.map((toast: ToastType) => (
          <Toast key={toast.id} variant={toast.type} onOpenChange={() => removeToast(toast.id)}>
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </Provider>
    </ToastContext.Provider>
  )
}

export function useToastMessage() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastMessage must be used within a ToastProvider")
  }
  return context
}
