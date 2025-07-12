"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Star, Film, DollarSign, Calendar, Clock, TrendingUp } from "lucide-react"
import { RatingResult } from "./rating-result"
import { Badge } from "@/components/ui/badge"

// Genres from your ML model training data
const availableGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
  "TV Movie",
  "War",
  "Western",
]

export function MovieRatingForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    genres: [] as string[],
    budget: "",
    popularity: "",
    runtime: "",
    releaseYear: new Date().getFullYear().toString(),
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/predict-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          overview: formData.overview,
          genres: formData.genres,
          budget: Number.parseInt(formData.budget) || 0,
          popularity: Number.parseFloat(formData.popularity) || 0,
          runtime: Number.parseInt(formData.runtime) || 0,
          release_year: Number.parseInt(formData.releaseYear) || new Date().getFullYear(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`)
      }

      if (result.error) {
        throw new Error(result.error)
      }

      setPrediction(result)
    } catch (error) {
      console.error("Error:", error)
      // Set an error state to show user-friendly message
      setPrediction({
        error: true,
        message: error instanceof Error ? error.message : "Failed to predict rating. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGenreChange = (genre: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      genres: checked ? [...prev.genres, genre] : prev.genres.filter((g) => g !== genre),
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
              <Star className="h-6 w-6 text-white" />
            </div>
            Movie Rating Prediction
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Enter comprehensive movie details to generate an accurate IMDb-style rating prediction using our advanced RandomForest ML model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Movie Title *
                <Badge variant="secondary" className="text-xs">Required</Badge>
              </Label>
              <div className="relative">
                <Film className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="title"
                  placeholder="Enter movie title"
                  className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <Label htmlFor="overview" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Plot Overview *
                <Badge variant="secondary" className="text-xs">Required</Badge>
              </Label>
              <Textarea
                id="overview"
                placeholder="Describe the movie plot, themes, and story..."
                rows={5}
                className="border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                value={formData.overview}
                onChange={(e) => handleInputChange("overview", e.target.value)}
                required
              />
              <p className="text-sm text-gray-500 flex items-center gap-1">
                💡 Detailed descriptions significantly improve prediction accuracy
              </p>
            </div>

            {/* Genres */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                Genres *
                <Badge variant="secondary" className="text-xs">Required</Badge>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-52 overflow-y-auto border border-gray-200 rounded-xl p-6 bg-gray-50/50">
                {availableGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-3">
                    <Checkbox
                      id={genre}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      checked={formData.genres.includes(genre)}
                      onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                    />
                    <Label htmlFor={genre} className="text-sm font-medium cursor-pointer hover:text-blue-600 transition-colors">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Select all applicable genres
                </p>
                <Badge variant={formData.genres.length > 0 ? "default" : "secondary"} className="text-xs">
                  {formData.genres.length} selected
                </Badge>
              </div>
            </div>

            {/* Numerical Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="budget" className="text-sm font-semibold text-gray-700">
                  Budget (USD)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="50000000"
                    className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="popularity" className="text-sm font-semibold text-gray-700">
                  Popularity Score
                </Label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="popularity"
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.popularity}
                    onChange={(e) => handleInputChange("popularity", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="runtime" className="text-sm font-semibold text-gray-700">
                  Runtime (minutes)
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="runtime"
                    type="number"
                    placeholder="120"
                    className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.runtime}
                    onChange={(e) => handleInputChange("runtime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="releaseYear" className="text-sm font-semibold text-gray-700">
                  Release Year
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="releaseYear"
                    type="number"
                    placeholder="2024"
                    className="pl-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.releaseYear}
                    onChange={(e) => handleInputChange("releaseYear", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200" 
              disabled={isLoading || formData.genres.length === 0}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Analyzing Movie Data...
                </>
              ) : (
                <>
                  <Star className="mr-3 h-5 w-5" />
                  Generate Rating Prediction
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {prediction && <RatingResult prediction={prediction} movieData={formData} />}
    </div>
  )
}
