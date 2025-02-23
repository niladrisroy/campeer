import type React from "react"
import type { Metadata } from "next"
import { Inter, Bangers } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
})

export const metadata: Metadata = {
  title: "Campeer - The AI-Powered Study Network",
  description: "Join India's first AI-powered study network for students and educators.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bangers.variable} font-inter`}>{children}</body>
    </html>
  )
}



import './globals.css'