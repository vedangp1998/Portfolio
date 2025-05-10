"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import SectionHeading from "@/components/section-heading"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { useTheme } from "next-themes"

export default function SocialProfiles() {
    const { theme } = useTheme()

    const socialProfiles = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            color: "#0A66C2",
            bgColor: "rgba(10, 102, 194, 0.1)",
            description: "Connect with me professionally and view my work experience",
            link: "https://www.linkedin.com/in/vedang-prajapati-66576a141/",
        },
        {
            name: "GitHub",
            icon: Github,
            color: theme === "light" ? "#231f20" : "#f9f4da",
            bgColor: theme === "light" ? "rgba(35, 31, 32, 0.1)" : "rgba(249, 244, 218, 0.1)",
            description: "Explore my code repositories and open-source contributions",
            link: "https://github.com/vedangp1998",
        },
    ]

    return (
        <section id="social-profiles" className="py-8">
            <div className="container mx-auto px-4">
                <SectionHeading title="Connect With Me" />

                <div className="max-w-5xl mx-auto">
                    <StaggerContainer className="flex justify-center gap-6">
                        {socialProfiles.map((profile, index) => (
                            <StaggerItem key={index} className="w-full max-w-sm">
                                <a href={profile.link} target="_blank" rel="noopener noreferrer" className="block h-full group">
                                    <Card className="h-full overflow-hidden border-0 shadow-xl glass-card transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-[rgba(var(--primary),0.2)] group-hover:translate-y-[-5px]">
                                        <CardContent className="p-0">
                                            <div className="h-2 w-full" style={{ backgroundColor: profile.color }}></div>
                                            <div className="p-6 flex flex-col items-center text-center">
                                                <div
                                                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                                                    style={{ backgroundColor: profile.bgColor }}
                                                >
                                                    <profile.icon
                                                        className="h-8 w-8 transition-all duration-300 group-hover:scale-110"
                                                        style={{ color: profile.color }}
                                                    />
                                                </div>
                                                <h3 className="text-xl font-bold mb-2 font-montserrat text-shadow-sm tracking-tight group-hover:text-primary transition-colors duration-300">
                                                    {profile.name}
                                                </h3>
                                                <p className="text-sm text-foreground/80 mb-4 font-normal tracking-tight text-pretty">
                                                    {profile.description}
                                                </p>
                                                <div className="mt-auto flex items-center text-sm text-primary/70 font-medium group-hover:text-primary transition-colors duration-300">
                                                    <span>Visit Profile</span>
                                                    <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </a>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <FadeIn direction="up" delay={0.4} className="mt-10 text-center">
                        <motion.div
                            className="inline-block"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="bg-background/30 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-3 inline-flex items-center gap-2 shadow-lg shadow-primary/5 hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300">
                                <span className="text-sm text-foreground/80">Let's build something amazing together</span>
                                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            </div>
                        </motion.div>
                    </FadeIn>
                </div>
            </div>
        </section>
    )
}
