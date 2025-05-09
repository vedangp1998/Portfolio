"use client"

import { FadeIn } from "@/components/scroll-animations"
import SectionHeading from "@/components/section-heading"
import { lazy, Suspense } from "react"

// Lazy load skill icons
const SkillIcons = lazy(() => import("@/components/skill-icons"))

// Map of skill names to their corresponding icons and colors
const skillsData = {
  frontend: [
    { name: "HTML", icon: "SiHtml5", color: "#E34F26", bgColor: "#E34F26" },
    { name: "CSS", icon: "SiCss3", color: "#1572B6", bgColor: "#1572B6" },
    { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", bgColor: "#F7DF1E" },
    { name: "ES6", icon: "SiJavascript", color: "#F7DF1E", bgColor: "#F7DF1E" },
    { name: "React.js", icon: "SiReact", color: "#61DAFB", bgColor: "#61DAFB" },
    { name: "Redux", icon: "SiRedux", color: "#764ABC", bgColor: "#764ABC" },
    { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", bgColor: "#3178C6" },
    { name: "Next.js", icon: "SiNextdotjs", color: "#FFFFFF", bgColor: "#000000" },
    { name: "RESTful API", icon: "Globe", color: "#FF5733", bgColor: "#FF5733" },
    { name: "React Router", icon: "SiReact", color: "#CA4245", bgColor: "#CA4245" },
    { name: "React Testing Library", icon: "SiReact", color: "#E33332", bgColor: "#E33332" },
    { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4", bgColor: "#06B6D4" },
    { name: "Material UI", icon: "SiMui", color: "#007FFF", bgColor: "#007FFF" },
    { name: "shadcn/ui", icon: "Cpu", color: "#FFFFFF", bgColor: "#18181B" },
    { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", bgColor: "#0055FF" },
  ],
  tools: [
    { name: "GitHub", icon: "SiGithub", color: "#181717", bgColor: "#181717" },
    { name: "NPM", icon: "SiNpm", color: "#CB3837", bgColor: "#CB3837" },
    { name: "Figma", icon: "SiFigma", color: "#F24E1E", bgColor: "#F24E1E" },
    { name: "Postman", icon: "SiPostman", color: "#FF6C37", bgColor: "#FF6C37" },
    { name: "ClickUp", icon: "SiClickup", color: "#7B68EE", bgColor: "#7B68EE" },
    { name: "Webpack", icon: "SiWebpack", color: "#8DD6F9", bgColor: "#8DD6F9" },
    { name: "Agile Environment", icon: "Workflow", color: "#0052CC", bgColor: "#0052CC" },
    { name: "CI/CD", icon: "Code", color: "#4CAF50", bgColor: "#4CAF50" },
  ],
}

export default function Skills() {
  const categories: { id: keyof typeof skillsData; title: string }[] = [
      { id: "frontend", title: "SKILLS" },
      { id: "tools", title: "TOOLS" },
    ]

  return (
    <section id="skills" className="py-8 relative">
      {/* Semi-transparent overlay to improve content visibility */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-0"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading title="My Stack" />

        <div className="max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <FadeIn key={category.id} direction="up" delay={index * 0.1} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
                <div className="text-3xl font-bold text-foreground tracking-wider bg-background/40 backdrop-blur-sm p-2 rounded-lg inline-block">
                  {category.title}
                </div>

                <div className="flex flex-wrap">
                  <Suspense
                    fallback={
                      <div className="flex flex-wrap gap-3">
                        {Array(8)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i} className="h-12 w-32 bg-muted/30 rounded-lg animate-pulse" />
                          ))}
                      </div>
                    }
                  >
                    <SkillIcons skills={skillsData[category.id]} />
                  </Suspense>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
