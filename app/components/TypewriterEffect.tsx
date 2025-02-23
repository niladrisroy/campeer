"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const words = ["Campeers", "Campus Peers"]
const TYPING_SPEED = 150
const DELETING_SPEED = 100
const WORD_DISPLAY_TIME = 5000 // 5 seconds

export default function TypewriterEffect() {
  const [currentWord, setCurrentWord] = useState(words[0])
  const [currentText, setCurrentText] = useState("")
  const [index, setIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isWaiting) {
      timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, WORD_DISPLAY_TIME)
    } else if (!isDeleting && currentText === currentWord) {
      setIsWaiting(true)
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
      setCurrentWord(words[(index + 1) % words.length])
    } else {
      timeout = setTimeout(
        () => {
          setCurrentText((prev) => (isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)))
        },
        isDeleting ? DELETING_SPEED : TYPING_SPEED,
      )
    }

    return () => clearTimeout(timeout)
  }, [currentText, currentWord, index, isDeleting, isWaiting])

  return (
    <div className="h-32 w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden bg-transparent">
      <motion.div
        key={currentWord}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="text-7xl md:text-[7rem] font-bangers tracking-wide whitespace-nowrap"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">{currentText}</span>
      </motion.div>
    </div>
  )
}

