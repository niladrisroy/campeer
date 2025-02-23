import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categories } from "@/lib/data"

export default function CategoriesSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Explore Categories</h2>
          <Button variant="ghost" className="gap-2">
            View all <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-white/80">{category.count} experts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

