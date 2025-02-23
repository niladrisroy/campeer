import { Button } from "@/components/ui/button"

interface HeaderProps {
  onKnowMoreClick: () => void
}

export default function Header({ onKnowMoreClick }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
          <span className="text-blue-900 font-bold text-3xl font-bangers">c</span>
        </div>
        <span className="font-bangers text-white text-4xl tracking-wider">campeer</span>
      </div>
      <Button
        className="rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white hover:from-blue-500 hover:to-pink-500 font-inter"
        size="sm"
        onClick={onKnowMoreClick}
      >
        Know More
      </Button>
    </header>
  )
}

