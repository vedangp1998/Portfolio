"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import SectionHeading from "@/components/section-heading"

export default function Experience() {
  const experiences = [
    {
      company: "Effibuild.co",
      position: "Frontend Developer",
      period: "Aug 2024 – Feb 2025",
      location: "Hyderabad, Telangana / India",
      color: "bg-primary",
      responsibilities: [
        "Improved and Refined Figma designs for intuitive, user-centric interfaces.",
        "Developed and integrated responsive UI components, ensuring functionality and accessibility, resulting in 25% improvement.",
        "Optimized application performance, scalability, and functionality by implementing state management with Redux.",
      ],
    },
    {
      company: "Varlyq Technologies Pvt.Ltd",
      position: "React JS Developer",
      period: "Sep 2022 – Aug 2024",
      location: "Indore, Madhya Pradesh / India",
      color: "bg-secondary",
      responsibilities: [
        "Developed and enhanced features, functionality, and capabilities for the website using state management tools like Redux.",
        "Architected and developed scalable web applications using React.js, resulting in improved performance and user engagement.",
        "Utilized advanced JavaScript, HTML, and CSS techniques to develop responsive and visually appealing user interfaces.",
      ],
    },
    {
      company: "Systango Technologies Pvt.Ltd",
      position: "Associate Software Engineer",
      period: "June 2021 – March 2022",
      location: "Indore, Madhya Pradesh / India",
      color: "bg-accent",
      responsibilities: [
        "Built a responsive web application using HTML5, CSS3, JavaScript, React.js, and Tailwind CSS.",
        "Created reusable and modular React components enhancing code efficiency and scalability.",
        "Tested web applications to ensure functionality, performance, and compatibility, resolving issues to improve user experience.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-8">
      <div className="container mx-auto px-4">
        <SectionHeading title="Work Experience" />

        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="relative">
            {/* Timeline connector - now a single element for better consistency */}
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-muted-foreground/20 md:left-1/2 md:transform md:-translate-x-1/2"></div>

            {experiences.map((exp, index) => (
              <StaggerItem key={index} className="relative mb-12 md:mb-16 last:mb-0">
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 top-4 w-8 h-8 rounded-full ${exp.color} flex items-center justify-center md:left-1/2 md:transform md:-translate-x-1/2 z-10`}
                >
                  <div className="w-3 h-3 bg-background rounded-full"></div>
                </div>

                <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? "" : "md:grid-flow-dense"}`}>
                  {/* Empty column for left/right alignment */}
                  <div className={`hidden md:block ${index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}></div>

                  {/* Card column - consistent width and height */}
                  <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? "md:col-start-2" : "md:col-start-1"}`}>
                    <Card className="card-highlight h-full overflow-visible shadow-md border border-muted/20">
                      <div className={`h-2 ${exp.color} rounded-t-lg`}></div>
                      <CardContent className="p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold font-montserrat line-clamp-1 tracking-tight">
                              {exp.company}
                            </h3>
                            <p className="text-sm text-muted-foreground font-medium">{exp.position}</p>
                          </div>
                          <div className="mt-1 sm:mt-0 text-left sm:text-right flex flex-col sm:items-end">
                            <Badge
                              variant="outline"
                              className="mb-1 border-primary/30 bg-primary/5 text-xs sm:text-sm inline-block w-fit font-medium"
                            >
                              {exp.period}
                            </Badge>
                            <p className="text-xs sm:text-sm text-muted-foreground font-light">{exp.location}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 mt-4">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-foreground/80 flex items-start gap-2">
                              <span
                                className={`inline-block w-2 h-2 ${exp.color} rounded-full mt-1.5 flex-shrink-0`}
                              ></span>
                              <span className="text-xs sm:text-sm font-normal tracking-tight text-pretty">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}
