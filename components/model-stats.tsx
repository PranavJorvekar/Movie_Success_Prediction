import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Target, Database, Zap } from "lucide-react"

export function ModelStats() {
  const stats = [
    {
      title: "Model Accuracy",
      value: "87.3%",
      icon: Target,
      description: "MAE: 0.65",
    },
    {
      title: "Training Data",
      value: "45K+",
      icon: Database,
      description: "Movies analyzed",
    },
    {
      title: "Features Used",
      value: "5,500+",
      icon: Brain,
      description: "TF-IDF + Genres",
    },
    {
      title: "Predictions",
      value: "1,247",
      icon: Zap,
      description: "This month",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Model Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <stat.icon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
