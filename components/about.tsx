"use client";

import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { FadeIn, ParallaxElement } from "@/components/scroll-animations";
import SectionHeading from "@/components/section-heading";
import ProfileImage from "../public/Image Passport.jpg";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-8">
      <div className="container mx-auto px-4">
        <SectionHeading title="About Me" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="right">
            <div className="relative h-[400px] rounded-3xl overflow-hidden glass-card flex items-center justify-center border-glow">
              {/* Placeholder icon instead of image */}
              {/* <ParallaxElement speed={-0.2}>
                <div className="flex flex-col items-center justify-center">
                  <User
                    className="h-32 w-32 text-primary/70 mb-4 text-glow"
                    strokeWidth={1.5}
                  />
                  <p className="text-muted-foreground text-center px-8 text-shadow-sm font-light tracking-wide">
                    Replace with your profile image when you clone this project
                  </p>
                </div>
              </ParallaxElement> */}
              <Image src={ProfileImage} alt="Profile Image" />
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <Card className="h-full glass-card backdrop-blur-card border-white/5 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 font-montserrat text-gradient secondary-gradient text-shadow-sm tracking-tight">
                  My Journey
                </h3>
                <div className="space-y-4">
                  <FadeIn direction="up" delay={0.3}>
                    <p className="text-lg leading-relaxed text-foreground/90 font-normal tracking-tight text-pretty">
                      I'm a passionate Frontend Developer with over 3.5 years of
                      professional experience in building high-performance web
                      applications. I specialize in React.js and modern frontend
                      technologies, focusing on creating intuitive and
                      responsive user interfaces.
                    </p>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.4}>
                    <p className="text-lg leading-relaxed text-foreground/90 font-normal tracking-tight text-pretty">
                      Based in Indore, Madhya Pradesh, India, I've worked with
                      various companies to develop scalable web applications,
                      optimize performance, and enhance user experiences. My
                      approach combines technical expertise with a keen eye for
                      design, ensuring that the applications I build are not
                      only functional but also visually appealing.
                    </p>
                  </FadeIn>
                  <FadeIn direction="up" delay={0.5}>
                    <p className="text-lg leading-relaxed text-foreground/90 font-normal tracking-tight text-pretty">
                      I'm constantly learning and exploring new technologies to
                      stay at the forefront of web development.
                    </p>
                  </FadeIn>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
