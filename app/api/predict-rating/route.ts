import { type NextRequest, NextResponse } from "next/server"

// Use dynamic import for child_process in Next.js API routes
async function getSpawn() {
  // @ts-ignore
  const { spawn } = await import("child_process")
  return spawn
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.overview || !body.genres || body.genres.length === 0) {
      return NextResponse.json({ error: "Title, overview, and at least one genre are required" }, { status: 400 })
    }

    // Call the Python backend for real prediction
    const pythonResult = await runPythonPrediction(body)
    if (pythonResult.error || pythonResult.success === false) {
      return NextResponse.json({ error: pythonResult.error || "Prediction failed" }, { status: 500 })
    }

    // Format response to match frontend expectations
    const response = {
      predicted_rating: pythonResult.rating,
      confidence_score: pythonResult.confidence,
      rating_category: getRatingCategory(pythonResult.rating),
      model_info: {
        mae: 0.65, // Your model's actual MAE
        model_type: "RandomForest Regressor",
      },
      input_data: body,
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error)
    console.error("Prediction API error:", errMsg)
    return NextResponse.json({ error: "Failed to generate prediction", details: errMsg }, { status: 500 })
  }
}

function getRatingCategory(rating: number): string {
  if (rating >= 8) return "Excellent"
  if (rating >= 6.5) return "Good"
  if (rating >= 5) return "Average"
  return "Poor"
}

async function runPythonPrediction(data: any): Promise<any> {
  const spawn = await getSpawn()
  return new Promise((resolve) => {
    const py = spawn("python", ["python/predict_api.py"])
    let result = ""
    let error = ""
    py.stdin.write(JSON.stringify(data))
    py.stdin.end()
    // Use 'any' for chunk type to avoid Buffer type errors in edge runtimes
    py.stdout.on("data", (chunk: any) => {
      result += chunk.toString()
    })
    py.stderr.on("data", (chunk: any) => {
      error += chunk.toString()
    })
    py.on("close", (code: number) => {
      if (code !== 0 || error) {
        resolve({ error: error || `Python process exited with code ${code}` })
      } else {
        try {
          resolve(JSON.parse(result))
        } catch (e) {
          resolve({ error: "Failed to parse Python response" })
        }
      }
    })
  })
}
