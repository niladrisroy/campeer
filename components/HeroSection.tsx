"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import TypewriterEffect from "@/components/TypewriterEffect"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [spotCount, setSpotCount] = useState(() => {
    return Math.floor(Math.random() * (9450 - 8287 + 1) + 8287)
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSpotCount((prevCount) => {
        const newCount = prevCount - Math.floor(Math.random() * 3)
        return newCount > 0 ? newCount : 0
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/submit-waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          invitedEmails: [], // No invited emails at this stage
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit waitlist registration")
      }

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting waitlist registration:", error)
      setError(`Failed to submit: ${error instanceof Error ? error.message : "Unknown error"}. Please try again later.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 flex flex-col items-center justify-center p-4 text-center font-roboto"
    >
      <motion.h1 className="mb-6 w-full" initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
        <span className="block text-xl md:text-3xl lg:text-5xl text-white mb-2">The new way to build</span>
        <TypewriterEffect texts={["Campeers", "Campus Peers"]} delay={150} pauseBetweenTexts={2000} />
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-blue-100 mb-8 md:mb-12 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Be Among India's First 10,000 Students 🚀
        <br className="hidden md:inline" />
        Claim Early Access to Campeer's AI-Powered Study Network.
        <br className="hidden md:inline" />
        All Founding Members Earn 1,000 Scholar Coins Instantly!
      </motion.p>

      <motion.div
        className="w-full max-w-xl px-4 md:px-0"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col md:block relative gap-2 md:gap-0">
          <Input
            type="email"
            placeholder="Enter your email to secure your spot!"
            className="h-12 md:h-14 px-4 md:px-6 rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder-blue-200 animate-border"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || submitted}
          />
          <Button
            type="submit"
            className={cn(
              "w-full md:w-auto md:absolute md:right-2 md:top-2 h-10 px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600",
              {
                "opacity-50 cursor-not-allowed": isSubmitting || submitted,
              },
            )}
            disabled={isSubmitting || submitted}
          >
            {isSubmitting ? "Claiming..." : submitted ? "Claimed!" : "Claim My Founding Status"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <motion.p
          className="text-sm text-blue-200/70 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Only {spotCount.toLocaleString()} founding spots left!
        </motion.p>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-blue-200 mt-4 text-center"
          >
            You're almost there! 🎉 Check your inbox to verify your email and lock in your spot as a Founding Member.
            1,000 Scholar Coins await you at launch!
            <br />
            (Can't find the email? Check spam/promotions.)
          </motion.p>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 mt-4 text-center"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </motion.main>
  )
}

