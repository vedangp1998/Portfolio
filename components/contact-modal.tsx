"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Github, X, Phone } from "lucide-react"
import { useTheme } from "next-themes"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [activeTab, setActiveTab] = useState<"connect">("connect")
  const emailAddress = "vedang.prajapati18@gmail.com"
  const phoneNumber = "+91 8962483102"
  const phoneNumberForHref = "+918962483102" // Removed spaces for href
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show the UI once mounted on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close modal with escape key
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => document.removeEventListener("keydown", handleEscapeKey)
  }, [isOpen, onClose])

  // Function to open Gmail compose window
  const openGmailCompose = (e: React.MouseEvent) => {
    e.preventDefault()
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`, "_blank")
  }

  if (!mounted) return null

  const isLightTheme = theme === "light"

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`sm:max-w-[550px] max-w-[95vw] ${isLightTheme ? "bg-white/95 border-gray-200" : "bg-black/90 border-white/10"
          } backdrop-blur-lg p-0 overflow-hidden`}
      >
        <div className="pt-6 px-4 sm:px-6 relative">
          <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className={`h-8 w-8 rounded-full ${isLightTheme ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
            >
              <X className={`h-4 w-4 ${isLightTheme ? "text-gray-700" : "text-white"}`} />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://www.linkedin.com/in/vedang-prajapati-66576a141/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isLightTheme ? "text-blue-600/70 hover:text-blue-600" : "text-white/70 hover:text-white"
                } transition-colors`}
            >
              <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/vedangp1998"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isLightTheme ? "text-gray-700/70 hover:text-gray-700" : "text-white/70 hover:text-white"
                } transition-colors`}
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>

        <div className="px-4 sm:px-6 mb-4 sm:mb-6">
          <h2 className={`text-xl font-bold ${isLightTheme ? "text-gray-800" : "text-white"} text-center mb-4`}>
            Quick Connect
          </h2>
        </div>

        <div className="px-4 sm:px-6">
          <div className="mb-4 sm:mb-6">
            <a
              href={`mailto:${emailAddress}`}
              onClick={openGmailCompose}
              className={`group block ${isLightTheme ? "bg-blue-50 hover:bg-blue-100" : "bg-[#0f1729] hover:bg-[#162033]"
                } p-4 sm:p-6 rounded-lg transition-colors`}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`${isLightTheme ? "bg-blue-100" : "bg-blue-500/20"} p-2 rounded-lg mr-3`}>
                  <Mail className={`h-4 w-4 sm:h-5 sm:w-5 ${isLightTheme ? "text-blue-600" : "text-blue-500"}`} />
                </div>
                <h3 className={`text-base sm:text-lg font-semibold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                  Email
                </h3>
              </div>
              <p
                className={`text-sm sm:text-base ${isLightTheme ? "text-gray-800" : "text-white"
                  } font-medium mb-1 break-all`}
              >
                {emailAddress}
              </p>
              <p className={`text-xs sm:text-sm ${isLightTheme ? "text-gray-600" : "text-white/60"}`}>
                Send me an email directly
              </p>
            </a>
          </div>

          <div className="mb-4 sm:mb-6">
            <a
              href={`tel:${phoneNumberForHref}`}
              className={`group block ${isLightTheme ? "bg-amber-50 hover:bg-amber-100" : "bg-[#291f0f] hover:bg-[#332710]"
                } p-4 sm:p-6 rounded-lg transition-colors`}
            >
              <div className="flex items-center mb-3 sm:mb-4">
                <div className={`${isLightTheme ? "bg-amber-100" : "bg-amber-500/20"} p-2 rounded-lg mr-3`}>
                  <Phone className={`h-4 w-4 sm:h-5 sm:w-5 ${isLightTheme ? "text-amber-600" : "text-amber-500"}`} />
                </div>
                <h3 className={`text-base sm:text-lg font-semibold ${isLightTheme ? "text-gray-800" : "text-white"}`}>
                  Phone
                </h3>
              </div>
              <p className={`text-sm sm:text-base ${isLightTheme ? "text-gray-800" : "text-white"} font-medium mb-1`}>
                {phoneNumber}
              </p>
              <p className={`text-xs sm:text-sm ${isLightTheme ? "text-gray-600" : "text-white/60"}`}>
                Available Mon-Fri, 9am-6pm IST
              </p>
            </a>
          </div>
        </div>

        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div
            className={`flex items-center justify-center p-2.5 sm:p-3 ${isLightTheme ? "bg-green-50" : "bg-[#0f291f]"
              } rounded-lg`}
          >
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-2"></div>
              <p className={`text-xs sm:text-sm ${isLightTheme ? "text-green-800" : "text-white/80"}`}>
                Currently available for new opportunities
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
