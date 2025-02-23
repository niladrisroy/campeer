"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const Confetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiCount = 200
    const confettiColors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
    const confettiPieces: { x: number; y: number; vx: number; vy: number; color: string }[] = []

    for (let i = 0; i < confettiCount; i++) {
      confettiPieces.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      confettiPieces.forEach((piece) => {
        piece.x += piece.vx
        piece.y += piece.vy
        piece.vy += 0.1 // gravity

        ctx.beginPath()
        ctx.moveTo(piece.x, piece.y)
        ctx.lineTo(piece.x + 10, piece.y + 10)
        ctx.lineTo(piece.x + 5, piece.y + 20)
        ctx.fillStyle = piece.color
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
}

export default function EmailConfirmationClient() {
  const [emails, setEmails] = useState(["", "", ""])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000) // Stop confetti after 5 seconds
    return () => clearTimeout(timer)
  }, [])

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emails.every((email) => email === "")) return

    setIsSubmitting(true)
    setError("")

    try {
      const validEmails = emails.filter((email) => email !== "")

      // Assuming we have the user's email from the URL or some other source
      const userEmail = "user@example.com" // Replace this with the actual user's email

      const { data: userData, error: userError } = await supabase
        .from("waitlist")
        .select("id")
        .eq("email", userEmail)
        .single()

      if (userError) {
        console.error("Error fetching user data:", userError)
        throw userError
      }

      if (!userData) {
        throw new Error("User not found")
      }

      const referrals = validEmails.map((email) => ({
        referrer_id: userData.id,
        email: email,
      }))

      const { error: referralError } = await supabase.from("referrals").insert(referrals)

      if (referralError) {
        console.error("Error inserting referrals:", referralError)
        throw referralError
      }

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting invitations:", error)
      setError(
        `Failed to submit invitations: ${error instanceof Error ? error.message : "Unknown error"}. Please try again later.`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-4">
      {showConfetti && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-lg p-8 max-w-md w-full text-center"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-white"
        >
          Welcome to{" "}
          <span className="font-bangers text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">
            Campeer
          </span>
          !
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-blue-100 mb-8"
        >
          Your email has been successfully verified. You're now part of India's smartest learning community!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-white">Invite Your Friends</h2>
          <p className="text-blue-100 mb-6">Share the excitement with up to 3 friends and earn bonus Scholar Coins!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {emails.map((email, index) => (
              <Input
                key={index}
                type="email"
                placeholder={`Friend's email ${index + 1}`}
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder-blue-300"
                disabled={isSubmitting || submitted}
              />
            ))}
            <Button
              type="submit"
              className={cn(
                "w-full h-12 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600",
                {
                  "opacity-50 cursor-not-allowed": isSubmitting || submitted,
                },
              )}
              disabled={isSubmitting || submitted}
            >
              {isSubmitting ? "Sending Invites..." : submitted ? "Invites Sent!" : "Send Invites"}
              {submitted ? <Check className="ml-2 h-5 w-5" /> : <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-blue-200 mt-4"
            >
              Invitations sent successfully! Your friends will receive an email shortly.
            </motion.p>
          )}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-400 mt-4"
            >
              {error}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

