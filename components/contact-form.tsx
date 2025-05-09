"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic will be added later
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="name" className="text-foreground/90 text-sm sm:text-base">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Your Name"
            className="bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-primary/30 h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="email" className="text-foreground/90 text-sm sm:text-base">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            className="bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-primary/30 h-10 sm:h-12 text-sm sm:text-base"
          />
        </div>
      </div>
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="subject" className="text-foreground/90 text-sm sm:text-base">
          Subject
        </Label>
        <Input
          id="subject"
          placeholder="Subject"
          className="bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-primary/30 h-10 sm:h-12 text-sm sm:text-base"
        />
      </div>
      <div className="space-y-1 sm:space-y-2">
        <Label htmlFor="message" className="text-foreground/90 text-sm sm:text-base">
          Message
        </Label>
        <Textarea
          id="message"
          placeholder="Your Message"
          rows={4}
          className="bg-background/50 border-primary/20 focus:border-primary focus-visible:ring-primary/30 text-sm sm:text-base min-h-[100px]"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-5 sm:py-6 text-sm sm:text-base"
      >
        Send Message
      </Button>
    </form>
  )
}
