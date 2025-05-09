"use client"

import { TextReveal } from "@/components/scroll-animations"
import { useTheme } from "next-themes"

export default function SectionHeading({ title }: { title: string }) {
  const { theme } = useTheme()

  return (
    <div className="text-center mb-10">
      <TextReveal>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 font-montserrat text-foreground tracking-tight text-shadow-sm">
          {title}
        </h2>
      </TextReveal>
      <TextReveal delay={0.1}>
        <div
          className={`w-20 h-1 bg-primary mx-auto mt-4 ${theme === "light" ? "shadow-sm shadow-primary/30" : ""}`}
        ></div>
      </TextReveal>
    </div>
  )
}
