"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const DOT_COUNT = 70
const CONNECTION_DISTANCE = 100
const CURSOR_EFFECT_RADIUS = 150
const CURSOR_EFFECT_STRENGTH = 0.01 // Reduced from 0.05
const DOT_RADIUS = 2
const NO_GO_ZONE_SIZE = 100 // Size of the area to keep clear in the top-left corner
const MOBILE_MAX_DOTS = 20
const MOBILE_WIDTH_THRESHOLD = 768 // Typical tablet breakpoint

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
}

const AnimatedShape = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const dots: Dot[] = []
    const mousePosition = { x: 0, y: 0 }
    let targetMousePosition = { x: 0, y: 0 }

    // Initialize dots
    const initializeDots = () => {
      const isMobile = window.innerWidth < MOBILE_WIDTH_THRESHOLD
      const dotCount = isMobile
        ? MOBILE_MAX_DOTS
        : Math.min(DOT_COUNT, Math.floor((window.innerWidth * window.innerHeight) / 10000))

      dots.length = 0 // Clear existing dots
      for (let i = 0; i < dotCount; i++) {
        let x, y
        do {
          x = Math.random() * canvas.width
          y = Math.random() * canvas.height
        } while (x < NO_GO_ZONE_SIZE && y < NO_GO_ZONE_SIZE)
        dots.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
        })
      }
    }

    initializeDots()

    function updateMousePosition() {
      const dx = targetMousePosition.x - mousePosition.x
      const dy = targetMousePosition.y - mousePosition.y
      mousePosition.x += dx * 0.1
      mousePosition.y += dy * 0.1
      requestAnimationFrame(updateMousePosition)
    }
    updateMousePosition()

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw dots
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i]

        // Apply cursor effect
        const dx = mousePosition.x - dot.x
        const dy = mousePosition.y - dot.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < CURSOR_EFFECT_RADIUS) {
          const force = (CURSOR_EFFECT_RADIUS - distance) / CURSOR_EFFECT_RADIUS
          dot.vx += dx * force * CURSOR_EFFECT_STRENGTH
          dot.vy += dy * force * CURSOR_EFFECT_STRENGTH
        }

        // Add random movement
        dot.vx += (Math.random() - 0.5) * 0.1
        dot.vy += (Math.random() - 0.5) * 0.1

        // Update position
        dot.x += dot.vx
        dot.y += dot.vy

        // Apply damping
        dot.vx *= 0.995
        dot.vy *= 0.995

        // Bounce off walls and avoid no-go zone
        if (dot.x < NO_GO_ZONE_SIZE && dot.y < NO_GO_ZONE_SIZE) {
          // If in no-go zone, push dot away
          if (dot.x < dot.y) {
            dot.x = NO_GO_ZONE_SIZE
            dot.vx = Math.abs(dot.vx)
          } else {
            dot.y = NO_GO_ZONE_SIZE
            dot.vy = Math.abs(dot.vy)
          }
        } else {
          if (dot.x < DOT_RADIUS && dot.vx < 0) {
            dot.x = DOT_RADIUS
            dot.vx = -dot.vx * 0.8
          } else if (dot.x > canvas.width - DOT_RADIUS && dot.vx > 0) {
            dot.x = canvas.width - DOT_RADIUS
            dot.vx = -dot.vx * 0.8
          }
          if (dot.y < DOT_RADIUS && dot.vy < 0) {
            dot.y = DOT_RADIUS
            dot.vy = -dot.vy * 0.8
          } else if (dot.y > canvas.height - DOT_RADIUS && dot.vy > 0) {
            dot.y = canvas.height - DOT_RADIUS
            dot.vy = -dot.vy * 0.8
          }
        }

        // Draw dot
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.fill()

        // Draw connections
        for (let j = i + 1; j < dots.length; j++) {
          const otherDot = dots[j]
          const dx = dot.x - otherDot.x
          const dy = dot.y - otherDot.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance <= CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(dot.x, dot.y)
            ctx.lineTo(otherDot.x, otherDot.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / CONNECTION_DISTANCE})`
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      targetMousePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeDots()
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

export default AnimatedShape

