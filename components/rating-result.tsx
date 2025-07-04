import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, CheckCircle, Film } from "lucide-react"

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
      <Card className="border-2 border-red-200 bg-red-50/50">
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
    <Card className="border-2 border-yellow-200 bg-yellow-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-900">
          <Star className="h-5 w-5 fill-current" />
          Rating Prediction Results
        </CardTitle>
        <CardDescription>AI prediction for "{movieData.title}" using RandomForest ML model</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Rating Display */}
        <div className="text-center p-6 bg-white rounded-lg border-2 border-yellow-200">
          <div className={`text-6xl font-bold mb-2 ${getRatingColor(ratingOutOf10)}`}>{ratingOutOf10.toFixed(1)}</div>
          <div className="text-lg text-gray-600 mb-3">out of 10</div>
          {getStarRating(ratingOutOf10)}
          <div className="mt-4">
            <Badge className={getRatingBadgeColor(prediction.rating_category)}>{prediction.rating_category}</Badge>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900">Rating Breakdown</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Overall Score</span>
              <span className="text-sm font-medium text-gray-900">{ratingOutOf10.toFixed(1)}/10</span>
            </div>
            <Progress value={ratingPercentage} className="h-3" />
          </div>

          {prediction.confidence_score && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Model Confidence</span>
                <span className="text-sm font-medium text-gray-900">
                  {(prediction.confidence_score * 100).toFixed(1)}%
                </span>
              </div>
              <Progress value={prediction.confidence_score * 100} className="h-2" />
            </div>
          )}
        </div>

        {/* Movie Details Summary */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Film className="h-4 w-4" />
            Movie Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div>
              <strong>Title:</strong> {movieData.title}
            </div>
            <div>
              <strong>Genres:</strong> {movieData.genres.join(", ")}
            </div>
            {movieData.budget && (
              <div>
                <strong>Budget:</strong> ${Number.parseInt(movieData.budget).toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Model Information */}
        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-2">Model Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Algorithm: {prediction.model_info.model_type}</div>
            <div>Mean Absolute Error: {prediction.model_info.mae.toFixed(3)}</div>
            <div>Features: Title (TF-IDF), Overview (TF-IDF), Genres, Budget, Runtime</div>
          </div>
        </div>

        {/* Interpretation */}
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Interpretation
          </h4>
          <ul className="text-sm text-green-800 space-y-1">
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
