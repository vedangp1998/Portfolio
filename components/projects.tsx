"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, LayoutDashboard, ShoppingCart } from "lucide-react"
import { StaggerContainer, StaggerItem, ScaleIn } from "@/components/scroll-animations"
import SectionHeading from "@/components/section-heading"
import { lazy, Suspense } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

import Richie1 from "../public/Richie1.png"
import Stalwart1 from "../public/StalwartPlugnplay1.png"
import Effibuild1 from "../public/Effibuild2.png"
// import First500Days1 from "../public/First500Days1.png";
import ProWrestling1 from "../public/ProWrestling1.png"
import ProjectManagement1 from "../public/ProjectManagement1.png"
import Waitlist1 from "../public/Waitlist1.png"

// Define image paths as strings
const imagePaths = {
  richie: Richie1,
  stalwart: Stalwart1,
  effibuild: Effibuild1,
  // first500days: First500Days1,
  pwl: ProWrestling1,
  ProjectManagement: ProjectManagement1,
  waitlist: Waitlist1,
}

const ProjectDetails = lazy(() => import("@/components/project-details"))

// Define a sequence of colors to use for the cards
const colorSequence = [
  {
    name: "primary",
    class: "bg-primary",
    textClass: "text-primary",
    badgeClass: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/40",
    buttonClass:
      "border-primary/30 hover:bg-primary/20 hover:text-primary hover:border-primary/70 active:bg-primary/30 active:border-primary",
  },
  {
    name: "secondary",
    class: "bg-secondary",
    textClass: "text-secondary",
    badgeClass: "bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/20 hover:border-secondary/40",
    buttonClass:
      "border-secondary/30 hover:bg-secondary/20 hover:text-secondary hover:border-secondary/70 active:bg-secondary/30 active:border-secondary",
  },
  {
    name: "accent",
    class: "bg-accent",
    textClass: "text-accent",
    badgeClass: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 hover:border-accent/40",
    buttonClass:
      "border-accent/30 hover:bg-accent/20 hover:text-accent hover:border-accent/70 active:bg-accent/30 active:border-accent",
  },
  {
    name: "tertiary",
    class: "bg-tertiary",
    textClass: "text-tertiary",
    badgeClass: "bg-tertiary/10 text-tertiary border-tertiary/20 hover:bg-tertiary/20 hover:border-tertiary/40",
    buttonClass:
      "border-tertiary/30 hover:bg-tertiary/20 hover:text-tertiary hover:border-tertiary/70 active:bg-tertiary/30 active:border-tertiary",
  },
  {
    name: "highlight",
    class: "bg-highlight",
    textClass: "text-highlight",
    badgeClass: "bg-highlight/10 text-highlight border-highlight/20 hover:bg-highlight/20 hover:border-highlight/40",
    buttonClass:
      "border-highlight/30 hover:bg-highlight/20 hover:text-highlight hover:border-highlight/70 active:bg-highlight/30 active:border-highlight",
  },
]

export default function Projects() {
  const projects = [
    {
      title: "Stalwart Plug N Play",
      description:
        "India's first 'Plug-N-Play' sales implementation and route-to-market organization, partnering with early and growth-stage FMCG brands to provide comprehensive retail sales and market solutions across 100+ locations.",
      icon: (
        <Image
          src={imagePaths.stalwart || "/placeholder.svg"}
          alt="Stalwart Plug N Play"
          className="h-[full] w-[500px] drop-shadow-md"

        />
      ),
      technologies: ["React.js", "Redux", "Tailwind CSS", "REST API"],
      responsibilities: [
        "Developed a responsive and scalable frontend architecture for the corporate website.",
        "Implemented dynamic UI components using Tailwind Css to enhance user engagement.",
        "Optimized website performance through code splitting and lazy loading techniques.",
        "Integrated RESTful APIs to display real-time data and updates.",
      ],
      liveLink: "https://www.stalwartplugnplay.com/",
      githubLink: null,
    },
    {
      title: "Richie AI",
      description:
        "Richie AI offers an embedded lending infrastructure that enables SaaS platforms, marketplaces, and payment processors to provide tailored business loan solutions through a unified, customizable system.",
      icon: (
        <Image
          src={imagePaths.richie || "/placeholder.svg"}
          alt="Richie AI Platform"
          className="h-full w-[500px] drop-shadow-md"
        />
      ),
      technologies: ["React.js", "Redux", "Tailwind CSS", "REST API"],
      responsibilities: [
        "Developed and maintained a responsive web application offering embedded lending solutions for B2B platforms.",
        "Built dynamic, reusable UI components with Tailwind CSS and integrated smooth animations for an engaging user experience.",
        "Improved performance and reduced initial load time through optimized asset loading and code splitting.",
        "Collaborated closely with designers and backend developers to align UI implementation with product goals.",
      ],
      liveLink: "https://richie-ai.com/",
      githubLink: null,
    },
    {
      title: "Waitlist.Me",
      description:
        "A web application designed to manage guest reservations and waitlists for restaurants, cafes, and other businesses, streamlining the customer experience and operational efficiency.",
      icon: (
        <Image
          src={imagePaths.waitlist || "/placeholder.svg"}
          alt="Waitlist.Me App"
          className="h-full w-[500px] text-primary/70 text-glow"
        />
      ),
      technologies: ["React.js", "Redux", "Material UI", "REST API"],
      responsibilities: [
        "Fixed bugs and enhanced the UI in collaboration with the design team to ensure a polished and user-friendly experience.",
        "Developed and integrated new features, such as real-time waitlist updates and text notifications, improving customer communication and satisfaction.",
        "Enhanced application performance, reducing load times and improving overall responsiveness.",
      ],
      liveLink: "https://waitlist.me/",
      githubLink: null,
    },
    {
      title: "Effibuild.co",
      description:
        "An AI platform designed to meet all your coding and construction planning requirements with a variety of services.",
      icon: (
        <Image
          src={imagePaths.effibuild || "/placeholder.svg"}
          alt="Effibuild Platform"
          className="h-full w-[500px] text-primary/70 text-glow"

        />
      ),
      technologies: ["React.js", "TypeScript", "Redux", "Material UI", "REST API"],
      responsibilities: [
        "Developed a responsive web application with three core services.",
        "Designed and implemented reusable components with integrated animations to enhance user engagement.",
        "Reduced loading time and optimized UI for improved performance and user experience.",
        "Integrated APIs for service functionality using Redux for efficient state management.",
      ],
      liveLink: "https://web.dev.effibuild.co/",
      githubLink: null,
    },
    {
      title: "Pro Wrestling League",
      description:
        "Pro Wrestling League (PWL) is a premier Indian wrestling competition featuring top national and international wrestlers. The platform offers live match streaming, team standings, player profiles, and the latest news updates.",
      icon: (
        <Image
          src={imagePaths.pwl || "/placeholder.svg"}
          alt="Pro Wrestling League"
          className="h-full w-[500px] drop-shadow-md"
        />
      ),
      technologies: ["React.js", "Next.js", "Tailwind CSS",],
      responsibilities: [
        "Developed a dynamic and responsive web interface to showcase live matches, team standings, and player profiles.",
        "Implemented responsive design using Tailwind CSS to ensure optimal viewing across devices.",
      ],
      liveLink: null,
      githubLink: "https://github.com/vedangp1998/pro-wrestling-league-",
    }
    ,
    {
      title: "Project Management Web App",
      description:
        "This web app allows users to create new projects, manage them by adding tasks, and oversee project-related activities efficiently.",
      icon: (
        <Image
          src={imagePaths.ProjectManagement || "/placeholder.svg"}
          alt="Pro Wrestling League"
          className="h-full w-[500px] drop-shadow-md"
        />
      ),
      technologies: ["React.js", "Tailwind CSS", "JavaScript"],
      responsibilities: [
        "Designed and developed a user-friendly interface for project management.",
        "Implemented task tracking and project organization features.",
        "Created a responsive design for all device sizes.",
      ],
      liveLink: null,
      githubLink: "https://github.com/vedangp1998/Project-management-app",
    },
  ]

  // Assign colors to projects in sequence
  const projectsWithColors = projects.map((project, index) => {
    const colorIndex = index % colorSequence.length
    return {
      ...project,
      color: colorSequence[colorIndex].class,
      textColor: colorSequence[colorIndex].textClass,
      colorName: colorSequence[colorIndex].name,
      badgeClass: colorSequence[colorIndex].badgeClass,
      buttonClass: colorSequence[colorIndex].buttonClass,
    }
  })

  return (
    <section id="projects" className="py-8">
      <div className="container mx-auto px-4">
        <SectionHeading title="Projects" />

        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsWithColors.map((project, index) => (
              <StaggerItem key={index}>
                <ScaleIn>
                  <Card className="h-full flex flex-col overflow-hidden border-0 shadow-xl glass-card">
                    <div className={`h-2 ${project.color} w-full`}></div>
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-background/80 to-muted/30 flex items-center justify-center backdrop-blur-sm">
                      {project.icon}
                    </div>
                    <CardContent className="flex-grow p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 font-montserrat text-shadow-sm tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                        {project.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className={cn(
                              "text-xs sm:text-sm py-1 font-medium tracking-tight transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-[0_0_8px_rgba(var(--ring),0.3)]",
                              project.badgeClass,
                            )}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-foreground/90 mb-3 sm:mb-4 font-normal tracking-tight text-pretty">
                        {project.description}
                      </p>

                      {/* Lazy load project responsibilities */}
                      <Suspense
                        fallback={
                          <div className="space-y-2">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="h-4 bg-muted/30 rounded animate-pulse" />
                            ))}
                          </div>
                        }
                      >
                        <ProjectDetails responsibilities={project.responsibilities} colorClass={project.textColor} />
                      </Suspense>
                    </CardContent>
                    <CardFooter className="flex gap-3 p-4 sm:p-6 pt-0">
                      {project.liveLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={cn(
                            "text-xs sm:text-sm py-2 h-auto font-medium tracking-tight transition-all duration-200 active:scale-95",
                            project.buttonClass,
                          )}
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" /> Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className={cn(
                            "text-xs sm:text-sm py-2 h-auto font-medium tracking-tight transition-all duration-200 active:scale-95",
                            project.buttonClass,
                          )}
                        >
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <Github className="h-3 w-3 sm:h-4 sm:w-4" /> GitHub
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
