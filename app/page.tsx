import { MovieRatingForm } from "@/components/movie-rating-form"
import { RecentPredictions } from "@/components/recent-predictions"
import { ModelStats } from "@/components/model-stats"
import { Header } from "@/components/header"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Movie Rating Predictor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Predict movie ratings using advanced machine learning. Our RandomForest model analyzes title, overview,
            genres, and budget to forecast IMDb-style ratings with high accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MovieRatingForm />
          </div>
          <div className="space-y-6">
            <ModelStats />
            <RecentPredictions />
          </div>
        </div>
      </main>
    </div>
  )
}
