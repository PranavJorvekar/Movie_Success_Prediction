import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Shield, BarChart3, Cpu, Database } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "Advanced ML Algorithm",
      description: "RandomForest model trained on 45,000+ movies with sophisticated feature engineering",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Zap,
      title: "Real-time Predictions",
      description: "Get instant rating predictions with confidence scores in milliseconds",
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      icon: BarChart3,
      title: "High Accuracy",
      description: "87.3% accuracy with Mean Absolute Error of just 0.65 rating points",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Database,
      title: "Rich Feature Set",
      description: "Analyzes 5,500+ features including TF-IDF text vectors and genre combinations",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Shield,
      title: "Reliable & Robust",
      description: "Extensively tested model with consistent performance across different movie types",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Cpu,
      title: "Optimized Performance",
      description: "Efficient preprocessing pipeline with cached models for lightning-fast responses",
      color: "bg-indigo-100 text-indigo-600"
    }
  ]

  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Predictor?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Built with cutting-edge machine learning techniques and trained on comprehensive movie data
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}