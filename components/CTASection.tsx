import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="text-xl mb-8 text-white/90">
          Join thousands of students already benefiting from expert mentorship and peer learning.
        </p>
        <Button size="lg" variant="secondary" className="gap-2">
          Get Started Now <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  )
}

