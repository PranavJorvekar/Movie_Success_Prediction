import { Star, Github, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star className="h-8 w-8 text-yellow-500 fill-current" />
            <span className="text-2xl font-bold text-gray-900">RatingPredict</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Predictions
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Model Info
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
              Dataset
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Brain className="h-4 w-4 mr-2" />
              ML Model
            </Button>
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
