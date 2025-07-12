import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, Database, Zap, TrendingUp } from "lucide-react"

export function ModelStats() {
  const stats = [
    {
      title: "Model Accuracy",
      value: "87.3%",
      icon: Target,
      description: "MAE: 0.65",
      color: "bg-green-100 text-green-600",
      trend: "+2.1%"
    },
    {
      title: "Training Data",
      value: "45K+",
      icon: Database,
      description: "Movies analyzed",
      color: "bg-blue-100 text-blue-600",
      trend: "+5.2K"
    },
    {
      title: "Features Used",
      value: "5,500+",
      icon: Brain,
      description: "TF-IDF + Genres",
      color: "bg-purple-100 text-purple-600",
      trend: "Optimized"
    },
    {
      title: "Predictions",
      value: "1,247",
      icon: Zap,
      description: "This month",
      color: "bg-orange-100 text-orange-600",
      trend: "+18%"
    },
  ]

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Model Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.trend}
                </span>
              </div>
              <div className="text-sm font-medium text-gray-700">{stat.title}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
