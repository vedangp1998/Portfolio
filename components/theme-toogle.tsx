"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Avoid hydration mismatch by only rendering after mount
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-md border-border/30">
                <span className="sr-only">Toggle theme</span>
                <div className="h-5 w-5 bg-muted rounded-full animate-pulse" />
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 rounded-md border-border/30 hover:bg-accent/10"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "light" ? (
                        <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
                    )}
                </motion.div>
            </AnimatePresence>
        </Button>
    )
}
