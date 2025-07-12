import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, TrendingUp, Activity } from "lucide-react"

export function RecentPredictions() {
  const recentPredictions = [
    {
      title: "The Last Adventure",
      genres: ["Action", "Adventure"],
      rating: 7.8,
      category: "Good",
      time: "2h ago",
      confidence: 92
    },
    {
      title: "Romantic Evening",
      genres: ["Romance", "Drama"],
      rating: 6.4,
      category: "Average",
      time: "4h ago",
      confidence: 88
    },
    {
      title: "Space Odyssey 2024",
      genres: ["Sci-Fi", "Thriller"],
      rating: 8.2,
      category: "Excellent",
      time: "6h ago",
      confidence: 95
    },
    {
      title: "Comedy Central",
      genres: ["Comedy"],
      rating: 5.9,
      category: "Average",
      time: "8h ago",
      confidence: 85
    },
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-600"
    if (rating >= 6) return "text-yellow-600"
    return "text-orange-600"
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Excellent": return "bg-green-100 text-green-800"
      case "Good": return "bg-blue-100 text-blue-800"
      case "Average": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          Recent Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPredictions.map((prediction, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-200 border border-gray-100">
            <div className="flex-1">
              <div className="font-semibold text-gray-900 text-sm mb-2">{prediction.title}</div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs font-medium">
                  {prediction.genres[0]}
                </Badge>
                <Badge className={`text-xs ${getCategoryColor(prediction.category)}`}>
                  {prediction.category}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {prediction.time}
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {prediction.confidence}% confidence
                </span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className={`font-bold text-lg flex items-center gap-1 ${getRatingColor(prediction.rating)}`}>
                <Star className="h-4 w-4 fill-current" />
                {prediction.rating}
              </div>
              <div className="text-xs text-gray-500 mt-1">out of 10</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
