import { Star, Github, Brain, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Star className="h-8 w-8 text-yellow-500 fill-current" />
              <Sparkles className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RatingPredict
            </span>
            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full font-medium">
              AI
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Predictions
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Model Info
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Dataset
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300">
              <Brain className="h-4 w-4 mr-2" />
              ML Model
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-gray-50">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
