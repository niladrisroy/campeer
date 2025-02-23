"use client"

import { useState } from "react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import AboutModal from "@/components/AboutModal"
import AnimatedShape from "@/components/AnimatedShape"

export default function HomePage() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-800 flex flex-col overflow-hidden relative font-inter">
      <div className="absolute inset-0">
        <AnimatedShape />
      </div>
      <div className="relative z-10 flex-1 flex flex-col">
        <Header onKnowMoreClick={() => setShowDetails(true)} />
        <HeroSection />
        <footer className="w-full px-6 py-4 text-center text-blue-200 text-sm">
          <p>
            © 2025 <span className="font-bangers">campeer</span>. All rights reserved.
          </p>
          <p className="mt-2">We respect your privacy and will never spam you.</p>
        </footer>
      </div>

      {showDetails && <AboutModal onClose={() => setShowDetails(false)} />}
    </div>
  )
}

