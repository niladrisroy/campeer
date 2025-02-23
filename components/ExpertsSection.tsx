import Image from "next/image"
import { ChevronRight, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { experts } from "@/lib/data"

export default function ExpertsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-purple-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Experts</h2>
          <Button variant="ghost" className="gap-2">
            View all <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((expert) => (
            <Card key={expert.name} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={expert.coverImage || "/placeholder.svg"}
                  alt={`${expert.name}'s area of expertise`}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="font-semibold text-white text-xl">{expert.name}</h3>
                  <p className="text-white/90">{expert.title}</p>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-lg">
                    <AvatarImage src={expert.image} />
                    <AvatarFallback>
                      {expert.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Badge variant="secondary" className="gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {expert.rating}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.topics.map((topic) => (
                    <Badge key={topic} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {expert.availability}
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

