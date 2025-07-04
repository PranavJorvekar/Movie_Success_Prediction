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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Movie Rating Prediction
          </CardTitle>
          <CardDescription>
            Enter movie details to predict its IMDb-style rating using our trained RandomForest model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Movie Title *</Label>
              <div className="relative">
                <Film className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="title"
                  placeholder="Enter movie title"
                  className="pl-10"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-2">
              <Label htmlFor="overview">Plot Overview *</Label>
              <Textarea
                id="overview"
                placeholder="Describe the movie plot, themes, and story..."
                rows={4}
                value={formData.overview}
                onChange={(e) => handleInputChange("overview", e.target.value)}
                required
              />
              <p className="text-xs text-gray-500">Detailed descriptions help improve prediction accuracy</p>
            </div>

            {/* Genres */}
            <div className="space-y-3">
              <Label>Genres *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto border rounded-lg p-4">
                {availableGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={formData.genres.includes(genre)}
                      onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                    />
                    <Label htmlFor={genre} className="text-sm font-normal cursor-pointer">
                      {genre}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500">Select all applicable genres ({formData.genres.length} selected)</p>
            </div>

            {/* Numerical Features */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="budget"
                    type="number"
                    placeholder="50000000"
                    className="pl-10"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="popularity">Popularity Score</Label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="popularity"
                    type="number"
                    step="0.1"
                    placeholder="8.5"
                    className="pl-10"
                    value={formData.popularity}
                    onChange={(e) => handleInputChange("popularity", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="runtime">Runtime (minutes)</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="runtime"
                    type="number"
                    placeholder="120"
                    className="pl-10"
                    value={formData.runtime}
                    onChange={(e) => handleInputChange("runtime", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="releaseYear">Release Year</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="releaseYear"
                    type="number"
                    placeholder="2024"
                    className="pl-10"
                    value={formData.releaseYear}
                    onChange={(e) => handleInputChange("releaseYear", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || formData.genres.length === 0}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Predicting Rating...
                </>
              ) : (
                <>
                  <Star className="mr-2 h-4 w-4" />
                  Predict Movie Rating
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
