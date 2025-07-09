import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.overview || !body.genres || body.genres.length === 0) {
      return NextResponse.json({ error: "Title, overview, and at least one genre are required" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock prediction based on input features (simulating your RandomForest model)
    const prediction = generateMockPrediction(body)

    // Format response to match frontend expectations
    const response = {
      predicted_rating: prediction.rating,
      confidence_score: prediction.confidence,
      rating_category: getRatingCategory(prediction.rating),
      model_info: {
        mae: 0.65, // Your model's actual MAE
        model_type: "RandomForest Regressor",
      },
      input_data: body,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Prediction API error:", error)
    return NextResponse.json({ error: "Failed to generate prediction", details: error.message }, { status: 500 })
  }
}

function generateMockPrediction(data: any) {
  // Simulate your ML model's prediction logic
  let baseRating = 6.0 // Start with average rating

  // Genre-based adjustments (based on typical genre performance)
  const genreBoosts: { [key: string]: number } = {
    Action: 0.3,
    Adventure: 0.2,
    Animation: 0.4,
    Comedy: 0.1,
    Crime: 0.2,
    Documentary: -0.1,
    Drama: 0.3,
    Family: 0.2,
    Fantasy: 0.3,
    History: 0.1,
    Horror: -0.2,
    Music: 0.1,
    Mystery: 0.2,
    Romance: 0.0,
    "Science Fiction": 0.4,
    Thriller: 0.2,
    "TV Movie": -0.3,
    War: 0.1,
    Western: -0.1,
  }

  // Apply genre effects
  const genreEffect =
    data.genres.reduce((sum: number, genre: string) => {
      return sum + (genreBoosts[genre] || 0)
    }, 0) / data.genres.length

  baseRating += genreEffect

  // Budget effect (higher budget often correlates with higher ratings up to a point)
  if (data.budget > 0) {
    const budgetLog = Math.log10(data.budget)
    if (budgetLog > 7) {
      // > 10M
      baseRating += 0.3
    }
    if (budgetLog > 8) {
      // > 100M
      baseRating += 0.2
    }
    if (budgetLog > 9) {
      // > 1B (might be too high)
      baseRating -= 0.1
    }
  }

  // Runtime effect (movies around 90-150 minutes tend to rate better)
  if (data.runtime > 0) {
    if (data.runtime >= 90 && data.runtime <= 150) {
      baseRating += 0.1
    } else if (data.runtime > 180) {
      baseRating -= 0.2 // Very long movies can be polarizing
    }
  }

  // Popularity effect
  if (data.popularity > 0) {
    if (data.popularity > 10) {
      baseRating += 0.2
    }
    if (data.popularity > 50) {
      baseRating += 0.1
    }
  }

  // Title and overview quality simulation (based on length and keywords)
  const titleWords = data.title.split(" ").length
  const overviewWords = data.overview.split(" ").length

  // Reasonable title length
  if (titleWords >= 2 && titleWords <= 5) {
    baseRating += 0.1
  }

  // Detailed overview
  if (overviewWords > 20) {
    baseRating += 0.1
  }
  if (overviewWords > 50) {
    baseRating += 0.1
  }

  // Check for quality indicators in overview
  const qualityKeywords = ["award", "acclaimed", "masterpiece", "brilliant", "outstanding", "exceptional"]
  const negativeKeywords = ["boring", "terrible", "awful", "worst", "disappointing", "forgettable"]

  const overviewLower = data.overview.toLowerCase()
  const hasQualityKeywords = qualityKeywords.some((keyword) => overviewLower.includes(keyword))
  const hasNegativeKeywords = negativeKeywords.some((keyword) => overviewLower.includes(keyword))

  if (hasQualityKeywords) baseRating += 0.3
  if (hasNegativeKeywords) baseRating -= 0.5

  // Add some randomness to simulate model uncertainty
  const randomFactor = (Math.random() - 0.5) * 0.4 // ±0.2 random variation
  baseRating += randomFactor

  // Ensure rating is within valid bounds
  const finalRating = Math.max(1.0, Math.min(10.0, baseRating))

  // Calculate confidence based on how "typical" the inputs are
  let confidence = 0.85
  if (data.budget === 0 || data.runtime === 0) confidence -= 0.1
  if (data.genres.length > 3) confidence -= 0.05
  if (overviewWords < 10) confidence -= 0.1

  confidence = Math.max(0.6, Math.min(0.95, confidence))

  return {
    rating: Number(finalRating.toFixed(1)),
    confidence: Number(confidence.toFixed(2)),
  }
}

function getRatingCategory(rating: number): string {
  if (rating >= 8) return "Excellent"
  if (rating >= 6.5) return "Good"
  if (rating >= 5) return "Average"
  return "Poor"
}
