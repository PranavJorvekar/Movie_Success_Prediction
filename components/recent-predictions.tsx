import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"

export function RecentPredictions() {
  const recentPredictions = [
    {
      title: "The Last Adventure",
      genres: ["Action", "Adventure"],
      rating: 7.8,
      category: "Good",
      time: "2h ago",
    },
    {
      title: "Romantic Evening",
      genres: ["Romance", "Drama"],
      rating: 6.4,
      category: "Average",
      time: "4h ago",
    },
    {
      title: "Space Odyssey 2024",
      genres: ["Sci-Fi", "Thriller"],
      rating: 8.2,
      category: "Excellent",
      time: "6h ago",
    },
    {
      title: "Comedy Central",
      genres: ["Comedy"],
      rating: 5.9,
      category: "Average",
      time: "8h ago",
    },
  ]

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-600"
    if (rating >= 6) return "text-yellow-600"
    return "text-orange-600"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Predictions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentPredictions.map((prediction, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <div className="font-medium text-gray-900 text-sm">{prediction.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {prediction.genres[0]}
                </Badge>
                <span className="text-xs text-gray-500">{prediction.time}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`font-semibold text-sm flex items-center gap-1 ${getRatingColor(prediction.rating)}`}>
                <Star className="h-3 w-3 fill-current" />
                {prediction.rating}
              </div>
              <div className="text-xs text-gray-600">{prediction.category}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
