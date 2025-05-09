"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import ContactButton from "@/components/contact-button"

interface MobileNavProps {
  scrollToSection: (sectionId: string) => void
  activeSection: string
}

export default function MobileNav({ scrollToSection, activeSection }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Skills", to: "skills" },
    { name: "Education", to: "education" },
  ]

  const handleNavClick = (sectionId: string) => {
    setOpen(false)
    scrollToSection(sectionId)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="h-12 w-12">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85vw] sm:w-[350px] pt-12">
        <div className="flex flex-col gap-2 mt-8">
          {navLinks.map((link) => (
            <button
              key={link.to}
              onClick={() => handleNavClick(link.to)}
              className={cn(
                "text-foreground/80 hover:text-primary transition-colors cursor-pointer text-lg py-4 px-3 text-left rounded-md",
                activeSection === link.to
                  ? "text-primary font-medium bg-primary/10 border-l-4 border-primary pl-4"
                  : "border-l-4 border-transparent pl-4",
              )}
            >
              {link.name}
            </button>
          ))}
          <div className="mt-6">
            <ContactButton className="w-full py-6 text-base">Contact Me</ContactButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
