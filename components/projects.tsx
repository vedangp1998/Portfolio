"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, LayoutDashboard, ShoppingCart } from "lucide-react"
import { StaggerContainer, StaggerItem, ScaleIn } from "@/components/scroll-animations"
import SectionHeading from "@/components/section-heading"
import { lazy, Suspense } from "react"
import Image from "next/image"

import Richie1 from "../public/Richie1.png"
import Stalwart1 from "../public/StalwartPlugnplay1.png"
import Effibuild1 from "../public/Effibuild2.png"
// import First500Days1 from "../public/First500Days1.png";
import Waitlist1 from "../public/Waitlist1.png"

// Define image paths as strings
const imagePaths = {
  richie: Richie1,
  stalwart: Stalwart1,
  effibuild: Effibuild1,
  // first500days: First500Days1,
  waitlist: Waitlist1,
}
const ProjectDetails = lazy(() => import("@/components/project-details"))

export default function Projects() {
  const projects = [
    {
      title: "Richie AI",
      description:
        "A comprehensive embedded lending platform enabling SaaS platforms, marketplaces, and payment processors to offer tailored business loan solutions through a unified infrastructure.",
      icon: (
        <Image
          src={imagePaths.richie || "/placeholder.svg"}
          alt="Richie AI Platform"
          className="h-full w-full drop-shadow-md"
          width={600}
          height={400}
        />
      ),
      color: "bg-primary",
      technologies: ["Next.js", "Redux", "Tailwind CSS", "REST API"],
      responsibilities: [
        "Developed and maintained a responsive web application offering embedded lending solutions for B2B platforms.",
        "Built dynamic, reusable UI components with Tailwind CSS and integrated smooth animations for an engaging user experience.",
        "Improved performance and reduced initial load time through optimized asset loading and code splitting.",
        "Collaborated closely with designers and backend developers to align UI implementation with product goals.",
      ],
      liveLink: "https://richie.ai/",
      githubLink: null,
    },
    {
      title: "Stalwart Plug N Play",
      description:
        "India's first 'Plug-N-Play' sales implementation and route-to-market organization, partnering with early and growth-stage FMCG brands to provide comprehensive retail sales and market solutions across 100+ locations.",
      icon: (
        <Image
          src={imagePaths.stalwart || "/placeholder.svg"}
          alt="Stalwart Plug N Play"
          className="h-full w-full drop-shadow-md"
          width={600}
          height={400}
        />
      ),
      color: "bg-primary",
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
      title: "Effibuild.co",
      description:
        "An AI platform designed to meet all your coding and construction planning requirements with a variety of services.",
      icon: (
        <Image
          src={imagePaths.effibuild || "/placeholder.svg"}
          alt="Effibuild Platform"
          className="h-full w-full text-primary/70 text-glow"
          width={600}
          height={400}
        />
      ),
      color: "bg-primary",
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
      title: "Waitlist.Me",
      description:
        "A web application designed to manage guest reservations and waitlists for restaurants, cafes, and other businesses, streamlining the customer experience and operational efficiency.",
      icon: (
        <Image
          src={imagePaths.waitlist || "/placeholder.svg"}
          alt="Waitlist.Me App"
          className="h-full w-full text-primary/70 text-glow"
          width={600}
          height={400}
        />
      ),
      color: "bg-secondary",
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
      title: "Project Management Web App",
      description:
        "This web app allows users to create new projects, manage them by adding tasks, and oversee project-related activities efficiently.",
      icon: <LayoutDashboard className="h-16 w-16 text-accent/70 text-glow" strokeWidth={1.5} />,
      color: "bg-accent",
      technologies: ["React.js", "Tailwind CSS", "JavaScript"],
      responsibilities: [
        "Designed and developed a user-friendly interface for project management.",
        "Implemented task tracking and project organization features.",
        "Created a responsive design for all device sizes.",
      ],
      liveLink: null,
      githubLink: "https://github.com/vedangp1998",
    },
    {
      title: "Food Ordering Web App",
      description:
        "Developing a user-centric food ordering app to streamline the process of browsing, selecting, and ordering meals.",
      icon: <ShoppingCart className="h-16 w-16 text-tertiary/70 text-glow" strokeWidth={1.5} />,
      color: "bg-tertiary",
      technologies: ["React.js", "Tailwind CSS", "JavaScript"],
      responsibilities: [
        "Designed an intuitive user interface for browsing food items.",
        "Implemented cart functionality and checkout process.",
        "Ensured responsive design for mobile and desktop users.",
      ],
      liveLink: null,
      githubLink: "https://github.com/vedangp1998",
    },
  ]

  return (
    <section id="projects" className="py-8">
      <div className="container mx-auto px-4">
        <SectionHeading title="Projects" />

        <div className="max-w-7xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
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
                            variant="secondary"
                            className="bg-secondary/10 text-secondary text-xs sm:text-sm py-1 border border-secondary/20 font-medium tracking-tight transition-all duration-200 hover:bg-secondary/20 hover:border-secondary/40 hover:shadow-[0_0_8px_rgba(var(--secondary),0.3)] hover:scale-105 hover:-translate-y-0.5"
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
                        <ProjectDetails responsibilities={project.responsibilities} />
                      </Suspense>
                    </CardContent>
                    <CardFooter className="flex gap-3 p-4 sm:p-6 pt-0">
                      {project.liveLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-primary/30 text-xs sm:text-sm py-2 h-auto hover:bg-primary/20 hover:text-primary hover:border-primary/70 font-medium tracking-tight transition-all duration-200 active:scale-95 active:bg-primary/30 active:border-primary"
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
                          className="border-primary/30 text-xs sm:text-sm py-2 h-auto hover:bg-primary/20 hover:text-primary hover:border-primary/70 font-medium tracking-tight transition-all duration-200 active:scale-95 active:bg-primary/30 active:border-primary"
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
