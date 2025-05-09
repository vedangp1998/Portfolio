"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

// Animated text that reveals character by character
export function CharacterReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
}: {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerChildren?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, once: false }) // Changed to once: false

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={child}
          className="inline-block"
          style={{
            whiteSpace: char === " " ? "pre" : "normal",
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Animated text that reveals word by word
export function WordReveal({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
}: {
  text: string
  className?: string
  delay?: number
  staggerChildren?: number
}) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, once: false }) // Changed to once: false

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: staggerChildren,
        delayChildren: delay,
      },
    }),
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {text.split(" ").map((word, index) => (
        <motion.span key={`${word}-${index}`} variants={child} className="inline-block mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Animated text that has a typing effect
export function TypewriterText({
  text,
  className = "",
  delay = 0,
  speed = 0.05,
  cursor = true,
}: {
  text: string
  className?: string
  delay?: number
  speed?: number
  cursor?: boolean
}) {
  const [displayText, setDisplayText] = useState("")
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.3, once: false }) // Changed to once: false
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!isInView) {
      setDisplayText("")
      setIsTyping(false)
      return
    }

    let timeout: NodeJS.Timeout
    let currentIndex = 0
    setIsTyping(true)

    const typeNextChar = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex))
        currentIndex++
        timeout = setTimeout(typeNextChar, speed * 1000)
      } else {
        setIsTyping(false)
      }
    }

    timeout = setTimeout(() => {
      typeNextChar()
    }, delay * 1000)

    return () => clearTimeout(timeout)
  }, [text, delay, speed, isInView])

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {displayText}
      {cursor && isInView && (isTyping || displayText.length < text.length) && (
        <span className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] animate-blink"></span>
      )}
    </span>
  )
}

// Animated gradient text
export function GradientText({
  text,
  className = "",
  colors = ["#ff5e62", "#ff9966", "#ffcc33"],
  duration = 8,
  delay = 0,
}: {
  text: string
  className?: string
  colors?: string[]
  duration?: number
  delay?: number
}) {
  const gradientRef = useRef<HTMLSpanElement>(null)
  const [gradientWidth, setGradientWidth] = useState(0)

  useEffect(() => {
    if (gradientRef.current) {
      setGradientWidth(gradientRef.current.offsetWidth)
    }
  }, [text])

  const gradientColors = colors.join(", ")

  return (
    <span ref={gradientRef} className={`relative inline-block ${className}`}>
      <span className="invisible">{text}</span>
      <motion.span
        className="absolute top-0 left-0 right-0 bottom-0 bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColors}, ${colors[0]})`,
          backgroundSize: `${gradientWidth * 3}px 100%`,
          backgroundPosition: "0% 0%",
        }}
        animate={{
          backgroundPosition: [`0% 0%`, `${gradientWidth * 2}px 0%`],
        }}
        transition={{
          duration: duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          delay: delay,
        }}
      >
        {text}
      </motion.span>
    </span>
  )
}
