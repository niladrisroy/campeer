import Image from "next/image"
import Link from "next/link"
import { Search, Star, Clock, ChevronRight, Sparkles, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-primary">
            <Sparkles className="w-8 h-8" />
            StudentConnect
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/7096/people-woman-coffee-meeting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Students collaborating"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-blue-900/70" />
        </div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">Connect, Learn, and Grow Together</h1>
          <p className="text-xl text-white/90 mb-8">
            Join a vibrant community of students and experts to share knowledge and experiences
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                className="pl-10 h-12 bg-white/90 backdrop-blur-sm"
                placeholder="Search by expertise, university, or topic"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[180px] h-12 bg-white/90 backdrop-blur-sm">
                <SelectValue placeholder="Filter by field" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="arts">Arts & Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Categories */}
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
              <div
                key={category.name}
                className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
              >
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

      {/* Expert Profiles */}
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

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-blue-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.university}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{testimonial.quote}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
    </div>
  )
}

const categories = [
  {
    name: "Computer Science",
    count: "1.2k",
    image:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Business",
    count: "856",
    image:
      "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Engineering",
    count: "943",
    image:
      "https://images.pexels.com/photos/3862130/pexels-photo-3862130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    name: "Arts & Design",
    count: "677",
    image:
      "https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
]

const experts = [
  {
    name: "Dr. Sarah Chen",
    image:
      "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Professor of Computer Science at Stanford",
    rating: "4.9",
    topics: ["Machine Learning", "AI Ethics", "Programming"],
    availability: "Available within 24hrs",
  },
  {
    name: "Michael Rodriguez",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage:
      "https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Senior Software Engineer at Google",
    rating: "4.8",
    topics: ["Web Development", "System Design", "Career Advice"],
    availability: "Available today",
  },
  {
    name: "Prof. Emily Watson",
    image:
      "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    coverImage:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Department Head, Business School",
    rating: "4.9",
    topics: ["MBA Consulting", "Leadership", "Strategy"],
    availability: "Next available: Tomorrow",
  },
]

const testimonials = [
  {
    name: "Alex Johnson",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    university: "MIT",
    quote:
      "StudentConnect helped me find the perfect mentor for my AI project. The guidance I received was invaluable!",
    rating: 5,
  },
  {
    name: "Sophia Lee",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    university: "Stanford University",
    quote: "The expert sessions on this platform have given me insights that go far beyond what I learn in class.",
    rating: 5,
  },
  {
    name: "David Patel",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    university: "Harvard Business School",
    quote: "I've made valuable connections and received great advice on my startup idea. Highly recommended!",
    rating: 4,
  },
]

