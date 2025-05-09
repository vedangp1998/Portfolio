"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-muted-foreground/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-xl font-bold font-montserrat text-gradient primary-gradient mb-4 md:mb-0">
              VP
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vedang Prajapati. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
