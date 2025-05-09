"use client"

import { StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Globe, Code, Workflow, Cpu } from "lucide-react"
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiPostman,
  SiFramer,
  SiGithub,
  SiNpm,
  SiFigma,
  SiClickup,
  SiWebpack,
} from "react-icons/si"

// Map icon strings to actual components
const iconMap: Record<string, React.ComponentType> = {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiRedux,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiPostman,
  SiFramer,
  SiGithub,
  SiNpm,
  SiFigma,
  SiClickup,
  SiWebpack,
  Globe,
  Code,
  Workflow,
  Cpu,
}

interface Skill {
  name: string
  icon: string
  color: string
  bgColor: string
}

export default function SkillIcons({ skills }: { skills: Skill[] }) {
  return (
    <StaggerContainer className="flex flex-wrap w-full justify-start">
      {skills.map((skill, skillIndex) => {
        // Get the icon component
        const IconComponent = iconMap[skill.icon] as React.ComponentType<React.SVGProps<SVGSVGElement>>

        return (
          <StaggerItem key={skillIndex} className="inline-flex">
            <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 mr-2 sm:mr-4 mb-3 sm:mb-4 rounded-lg bg-background/80 backdrop-blur-md border border-foreground/10 shadow-lg transition-all duration-300">
              <div
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-md"
                style={{ backgroundColor: skill.bgColor }}
              >
                <IconComponent
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  style={{
                    color:
                      skill.name === "Next.js" || skill.name === "shadcn/ui" || skill.bgColor === "#181717"
                        ? "#FFFFFF"
                        : skill.bgColor === "#000000"
                          ? "#FFFFFF"
                          : "#000000",
                  }}
                />
              </div>
              <span className="text-sm sm:text-base text-foreground font-medium whitespace-nowrap">{skill.name}</span>
            </div>
          </StaggerItem>
        )
      })}
    </StaggerContainer>
  )
}
