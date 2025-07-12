"use client"

import { Star, Github, Brain, Sparkles, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection('predictor')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Predictor
            </button>
            <button 
              onClick={() => scrollToSection('model-stats')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Model Stats
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-blue-50 hover:border-blue-300"
              onClick={() => scrollToSection('model-stats')}
            >
              <Brain className="h-4 w-4 mr-2" />
              ML Model
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="hover:bg-gray-50"
              asChild
            >
              <Link href="https://github.com/PranavJorvekar/Movie_Success_Prediction" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4 pt-4">
              <button 
                onClick={() => scrollToSection('predictor')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Predictor
              </button>
              <button 
                onClick={() => scrollToSection('model-stats')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Model Stats
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </button>
              <div className="flex flex-col gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => {
                    scrollToSection('model-stats')
                  }}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  ML Model
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start hover:bg-gray-50"
                  asChild
                >
                  <Link href="https://github.com/PranavJorvekar/Movie_Success_Prediction" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}