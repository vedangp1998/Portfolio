"use client"

import { motion } from "framer-motion"
import Link from "next/link"

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
            <Link href="/">
              <motion.div
                aria-label="Go to home"
                title="Back to home"
                className="text-xl sm:text-2xl font-bold text-gradient primary-gradient font-heading cursor-pointer transition-transform hover:scale-105"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Portfolio
              </motion.div>
            </Link>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vedang Prajapati. All rights reserved.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
