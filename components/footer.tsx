import { Star, Github, Brain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
              <span className="text-xl font-bold">RatingPredict</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced AI-powered movie rating prediction using state-of-the-art machine learning algorithms.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Model Performance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dataset</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Research Paper</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Connect</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white">
                <Brain className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Open source and available on GitHub
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © 2024 RatingPredict. Built with machine learning and data science.
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for movie enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}