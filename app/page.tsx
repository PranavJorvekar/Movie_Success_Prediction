import { MovieRatingForm } from "@/components/movie-rating-form"
import { RecentPredictions } from "@/components/recent-predictions"
import { ModelStats } from "@/components/model-stats"
import { Header } from "@/components/header"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            AI-Powered Movie Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
            Movie Rating Predictor
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Harness the power of advanced machine learning to predict movie ratings with remarkable accuracy. 
            Our sophisticated RandomForest model analyzes multiple factors including plot, genres, and production details 
            to deliver precise IMDb-style rating forecasts.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              87.3% Accuracy
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              45K+ Movies Analyzed
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Real-time Predictions
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <MovieRatingForm />
          </div>
          <div className="space-y-8">
            <ModelStats />
            <RecentPredictions />
          </div>
        </div>

        {/* Features Section */}
        <Features />
      </main>
      <Footer />
    </div>
  )
}
