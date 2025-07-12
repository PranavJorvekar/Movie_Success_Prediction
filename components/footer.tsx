import { Star, Github, Heart, ExternalLink, Mail, FileText, Database, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
              Advanced AI-powered movie rating prediction using state-of-the-art machine learning algorithms trained on 45,000+ movies.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                asChild
              >
                <Link href="https://github.com/PranavJorvekar/Movie_Success_Prediction" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-transparent border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
                onClick={() => scrollToSection('predictor')}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('predictor')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Star className="h-3 w-3" />
                  Movie Predictor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('model-stats')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Database className="h-3 w-3" />
                  Model Performance
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Code className="h-3 w-3" />
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-3 w-3" />
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link 
                  href="https://github.com/PranavJorvekar/Movie_Success_Prediction/blob/main/README.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-3 w-3" />
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/PranavJorvekar/Movie_Success_Prediction/tree/main/data" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Database className="h-3 w-3" />
                  Dataset
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/PranavJorvekar/Movie_Success_Prediction/tree/main/src" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Code className="h-3 w-3" />
                  Source Code
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <Link 
                  href="https://github.com/PranavJorvekar/Movie_Success_Prediction/tree/main/EDA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <FileText className="h-3 w-3" />
                  Analysis
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Technical</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                RandomForest Model
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                87.3% Accuracy
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                5,500+ Features
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                TF-IDF Vectorization
              </li>
            </ul>
            <div className="pt-2">
              <Link 
                href="mailto:contact@ratingpredict.ai" 
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                <Mail className="h-3 w-3" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2024 RatingPredict. Built with machine learning and data science.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <button 
                onClick={scrollToTop}
                className="hover:text-gray-300 transition-colors"
              >
                Back to Top
              </button>
              <span>•</span>
              <Link 
                href="https://github.com/PranavJorvekar/Movie_Success_Prediction/blob/main/LICENSE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors"
              >
                MIT License
              </Link>
            </div>
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-1 mt-4 md:mt-0">
            Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> for movie enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}