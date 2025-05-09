"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Award } from "lucide-react"
import SectionHeading from "@/components/section-heading"

export default function Education() {
  return (
    <section id="education" className="py-8">
      <div className="container mx-auto px-4">
        <SectionHeading title="Education & Certifications" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat">Bachelor of Computer Science and Engineering</h3>
                    <p className="text-foreground/70 mb-2">Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal, India</p>
                    <p className="text-foreground/70 mb-2">Aug 2016 – Sep 2020</p>
                    <p className="font-medium">CGPA: 7.88</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-montserrat">React.js Development Course</h3>
                    <p className="text-foreground/70 mb-2">Udemy</p>
                    <p className="text-foreground/70">
                      Comprehensive training in React.js development, covering components, state management, hooks, and
                      best practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
