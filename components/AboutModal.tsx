"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface AboutModalProps {
  onClose: () => void
}

export default function AboutModal({ onClose }: AboutModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-white/90 backdrop-blur-md rounded-lg p-6 max-w-4xl w-full overflow-y-auto max-h-[90vh] text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl  mb-4 text-center flex items-center justify-center">
          About <span className="font-bangers text-3xl ml-2">campeer</span>
        </h2>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-lg font-semibold mb-2">
            What is <span className="font-bangers text-2xl">campeer</span>?
          </h3>
          <p className="mb-4">
            Campeer is India's first AI-powered study network, designed to help students connect, collaborate, and
            achieve their academic goals together. Whether you're preparing for exams, exploring new skills, or looking
            for a supportive community of peers, Campeer is your go-to platform.
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Why Join <span className="font-bangers text-2xl">campeer</span>?
          </h3>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Exclusive Early Access:</strong> Be among the first 10,000 Founding Members to experience Campeer
              before anyone else. Founders will enjoy exclusive perks and access to premium features at launch.
            </li>
            <li>
              <strong>Your Academic Identity:</strong> Create a profile that showcases your skills, achievements, and
              contributions. Think of it as your LinkedIn for academics – perfect for networking with peers and
              educators.
            </li>
            <li>
              <strong>Earn Scholar Coins:</strong> Founding Members receive 1,000 Scholar Coins instantly upon launch.
              Use these coins to unlock exciting rewards like mentorship sessions, study resources, and more!
            </li>
            <li>
              <strong>AI-Powered Study Network:</strong> Our advanced AI matches you with study buddies based on your
              goals, learning style, and schedule. Build meaningful connections while staying productive!
            </li>
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <ol className="list-decimal pl-5 mb-4">
            <li>
              <strong>Sign Up for the Waitlist:</strong> Enter your email to secure your spot as one of the first 10,000
              members.
            </li>
            <li>
              <strong>Verify Your Email:</strong> Check your inbox to confirm your email address and lock in your spot.
            </li>
            <li>
              <strong>Get Ready for Launch:</strong> Once Campeer launches, you'll receive early access along with 1,000
              Scholar Coins to kickstart your journey!
            </li>
          </ol>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <h3 className="text-lg font-semibold mb-2">
            Who is <span className="font-bangers text-2xl">campeer</span> For?
          </h3>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Students:</strong> Preparing for exams or exploring new skills? Find study buddies and stay
              motivated together!
            </li>
            <li>
              <strong>Educators & Experts:</strong> Share knowledge, mentor students, and build your academic network.
            </li>
          </ul>
          <p className="font-semibold mb-4">Don't Miss Out!</p>
          <p className="mb-6">
            Spots are filling up fast! Secure your place today and become a part of India's smartest learning community.
          </p>
        </motion.div>
        <div className="flex justify-center">
          <Button
            className="px-8 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition-colors duration-200"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

