import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, CheckCircle, Film, Sparkles, TrendingUp, Award } from "lucide-react"

interface RatingResultProps {
  prediction: {
    predicted_rating?: number
    confidence_score?: number
    rating_category?: string
    model_info?: {
      mae: number
      model_type: string
    }
    error?: boolean
    message?: string
  }
  movieData: {
    title: string
    genres: string[]
    budget: string
  }
}

export function RatingResult({ prediction, movieData }: RatingResultProps) {
  // Handle error state
  if (prediction.error) {
    return (
      <Card className="border-2 border-red-200 bg-red-50/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <Star className="h-5 w-5" />
            Prediction Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-800">{prediction.message || "An error occurred while predicting the rating."}</div>
        </CardContent>
      </Card>
    )
  }

  // Ensure we have the required data
  if (!prediction.predicted_rating) {
    return null
  }

  const rating = prediction.predicted_rating
  const ratingOutOf10 = Math.min(10, Math.max(0, rating))
  const ratingPercentage = (ratingOutOf10 / 10) * 100

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-600"
    if (rating >= 6) return "text-yellow-600"
    if (rating >= 4) return "text-orange-600"
    return "text-red-600"
  }

  const getRatingBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "average":
        return "bg-yellow-100 text-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStarRating = (rating: number) => {
    const fullStars = Math.floor(rating / 2)
    const hasHalfStar = rating % 2 >= 1

    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < fullStars
                ? "text-yellow-400 fill-current"
                : i === fullStars && hasHalfStar
                  ? "text-yellow-400 fill-current opacity-50"
                  : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)}/10)</span>
      </div>
    )
  }

  return (
    <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-yellow-900 text-2xl">
          <div className="relative">
            <Star className="h-6 w-6 fill-current" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          Rating Prediction Results
        </CardTitle>
        <CardDescription className="text-base">
          AI-powered prediction for "<span className="font-semibold text-yellow-800">{movieData.title}</span>" using our advanced RandomForest ML model
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Main Rating Display */}
        <div className="text-center p-8 bg-white rounded-2xl border-2 border-yellow-200 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-8 w-8 text-yellow-600" />
            <span className="text-lg font-semibold text-gray-700">Predicted Rating</span>
          </div>
          <div className={`text-7xl font-bold mb-3 ${getRatingColor(ratingOutOf10)}`}>
            {ratingOutOf10.toFixed(1)}
          </div>
          <div className="text-xl text-gray-600 mb-4">out of 10</div>
          {getStarRating(ratingOutOf10)}
          <div className="mt-6">
            <Badge className={`${getRatingBadgeColor(prediction.rating_category)} text-sm px-4 py-2`}>
              {prediction.rating_category}
            </Badge>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-6">
          <h3 className="font-bold text-xl text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Rating Analysis
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-700">Overall Score</span>
              <span className="text-base font-bold text-gray-900">{ratingOutOf10.toFixed(1)}/10</span>
            </div>
            <Progress value={ratingPercentage} className="h-4" />
          </div>

          {prediction.confidence_score && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold text-gray-700">Model Confidence</span>
                <span className="text-base font-bold text-gray-900">
                  {(prediction.confidence_score * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={prediction.confidence_score * 100} className="h-3" />
            </div>
          )}
        </div>

        {/* Movie Details Summary */}
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h4 className="font-bold text-lg text-blue-900 mb-4 flex items-center gap-2">
            <Film className="h-5 w-5" />
            Movie Summary
          </h4>
          <div className="space-y-3 text-base">
            <div>
              <strong className="text-blue-800">Title:</strong> <span className="text-gray-700">{movieData.title}</span>
            </div>
            <div>
              <strong className="text-blue-800">Genres:</strong> <span className="text-gray-700">{movieData.genres.join(", ")}</span>
            </div>
            {movieData.budget && (
              <div>
                <strong className="text-blue-800">Budget:</strong> <span className="text-gray-700">${Number.parseInt(movieData.budget).toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Model Information */}
        <div className="p-6 bg-gray-50 rounded-xl border">
          <h4 className="font-bold text-lg text-gray-900 mb-3">Model Information</h4>
          <div className="text-base text-gray-600 space-y-2">
            <div>Algorithm: {prediction.model_info.model_type}</div>
            <div>Mean Absolute Error: {prediction.model_info.mae.toFixed(3)}</div>
            <div>Features: Title (TF-IDF), Overview (TF-IDF), Genres, Budget, Runtime</div>
          </div>
        </div>

        {/* Interpretation */}
        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
          <h4 className="font-bold text-lg text-green-900 mb-3 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Interpretation
          </h4>
          <ul className="text-base text-green-800 space-y-2">
            {ratingOutOf10 >= 7.5 && <li>• This movie is predicted to be highly rated by audiences</li>}
            {ratingOutOf10 >= 6 && ratingOutOf10 < 7.5 && <li>• This movie should receive above-average ratings</li>}
            {ratingOutOf10 >= 4 && ratingOutOf10 < 6 && <li>• This movie may receive mixed to average ratings</li>}
            {ratingOutOf10 < 4 && <li>• This movie may struggle with audience ratings</li>}
            <li>• Prediction based on content analysis and historical patterns</li>
            <li>• Consider marketing and distribution factors for final success</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
