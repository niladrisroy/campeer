"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface TypewriterEffectProps {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({ texts, typingSpeed = 150, deletingSpeed = 75 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const currentText = texts[currentTextIndex]

    const type = () => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
          timeoutRef.current = setTimeout(type, typingSpeed)
        } else {
          // Text is fully written, wait for 4 seconds before deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true)
            timeoutRef.current = setTimeout(type, typingSpeed)
          }, 4000)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
          timeoutRef.current = setTimeout(type, deletingSpeed)
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
          timeoutRef.current = setTimeout(type, typingSpeed)
        }
      }
    }

    timeoutRef.current = setTimeout(type, typingSpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [texts, currentTextIndex, displayedText, isDeleting, typingSpeed, deletingSpeed])

  return (
    <div className="h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center relative">
      <motion.span
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bangers tracking-wide whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayedText}
      </motion.span>
    </div>
  )
}

export default TypewriterEffect

