# Model Usage & API Integration

## Model Inference (`src/predict.py`)

### Step-by-Step Breakdown

1. **Load Saved Models & Transformers**
   - Uses `load_saved_models()` to load the trained model, TF-IDF vectorizers, genre binarizer, and scaler from disk.

2. **Process Input Features**
   - **Title & Overview:** Transformed using the saved TF-IDF vectorizers.
   - **Genres:** One-hot encoded using the saved MultiLabelBinarizer.
   - **Budget:** Log-transformed and scaled using the saved MinMaxScaler.
   - **Other Features:** (If scaler was trained on more features, e.g., runtime, popularity, release_year, these are also scaled.)

3. **Combine Features**
   - All features are horizontally stacked into a single input vector.

4. **Prediction**
   - The trained model predicts the movie rating from the input vector.

### Example Input
```python
predicted_rating = predict_rating(
    title="Forgettable",
    overview="A film so unmemorable and poorly executed that it is quickly forgotten. The storyline lacks originality and the pacing is sluggish throughout.",
    genres=["Drama", "Mystery"],
    budget=160000000,
    popularity=8.5,
    runtime=120,
    release_year=2015
)
print(f"Predicted Rating: {predicted_rating:.2f}")
```

### Line-by-Line Explanation (Key Function)
```python
def predict_rating(title, overview, genres, budget, popularity=0, runtime=0, release_year=2000):
    model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])
    log_budget = np.log1p(budget)
    if scaler.n_features_in_ == 1:
        numeric_scaled = scaler.transform([[log_budget]])
    else:
        numeric_features = [[log_budget, runtime, popularity, release_year]]
        numeric_scaled = scaler.transform(numeric_features)
    X_input = hstack([title_vec, overview_vec, genres_vec, numeric_scaled])
    predicted_rating = model.predict(X_input)[0]
    return predicted_rating
```
- **Load models:** Loads all saved transformers and the trained model.
- **Transform features:** Applies the same preprocessing as during training.
- **Stack features:** Combines all features into a single input vector.
- **Predict:** Uses the model to predict the rating.

---

## API Structure & Prediction Flow (`python/predict_api.py`)

### Step-by-Step Breakdown
1. **Imports & Setup**
   - Adds `src/` to the Python path to import model loading utilities.
   - Loads all required transformers and the trained model from `saved_models/`.

2. **API Prediction Function**
   - `predict_rating_api(data)` takes a dictionary with movie features.
   - Extracts features: `title`, `overview`, `genres`, `budget`, `popularity`, `runtime`, `release_year`.
   - Applies the same preprocessing as during training (TF-IDF, genre binarization, log-scaling budget, scaling numerics).
   - Combines all features and predicts the rating.
   - Clamps the predicted rating to [0, 10].
   - Returns a JSON with `rating`, `confidence`, and `success`.

3. **Command-Line Usage**
   - If run as a script, reads JSON input from stdin, calls `predict_rating_api`, and prints the result as JSON.

### Example Request (JSON)
```json
{
  "title": "Forgettable",
  "overview": "A film so unmemorable and poorly executed that it is quickly forgotten.",
  "genres": ["Drama", "Mystery"],
  "budget": 160000000,
  "popularity": 8.5,
  "runtime": 120,
  "release_year": 2015
}
```

### Example Response (JSON)
```json
{
  "rating": 6.72,
  "confidence": 0.85,
  "success": true
}
```

### Line-by-Line Explanation (Key Function)
```python
def predict_rating_api(data):
    model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()
    title = data.get('title', '')
    overview = data.get('overview', '')
    genres = data.get('genres', [])
    budget = data.get('budget', 0)
    popularity = data.get('popularity', 0)
    runtime = data.get('runtime', 0)
    release_year = data.get('release_year', 2024)
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])
    log_budget = np.log1p(budget) if budget > 0 else 0
    if scaler.n_features_in_ == 1:
        numeric_scaled = scaler.transform([[log_budget]])
    else:
        numeric_features = [[log_budget, runtime, popularity, release_year]]
        numeric_scaled = scaler.transform(numeric_features)
    X_input = hstack([title_vec, overview_vec, genres_vec, numeric_scaled])
    predicted_rating = model.predict(X_input)[0]
    predicted_rating = max(0, min(10, predicted_rating))
    return {
        'rating': float(predicted_rating),
        'confidence': 0.85,
        'success': True
    }
```
- **Load models:** Loads all saved transformers and the trained model.
- **Extract features:** Reads all required fields from the input.
- **Transform features:** Applies the same preprocessing as during training.
- **Stack features:** Combines all features into a single input vector.
- **Predict:** Uses the model to predict the rating, clamps to [0, 10].
- **Return:** Returns a JSON with the result.

---

## API Integration
- The backend exposes an API endpoint (e.g., `/api/predict-rating/`) for the frontend to send prediction requests.
- The API loads the model, preprocesses input, and returns the prediction result as JSON.

## Next.js API Route Integration
- The API route (`app/api/predict-rating/route.ts`) now calls the real Python backend (`python/predict_api.py`) using a child process.
- The request body is sent to the Python script as JSON.
- The Python script processes the input, runs the trained model, and returns the prediction as JSON.
- The API route formats the response and sends it back to the frontend.

## Example Flow
1. API route receives POST request from frontend.
2. Spawns Python process, sends input as JSON.
3. Receives prediction from Python backend.
4. Formats and returns the response to the frontend.

---

This ensures the frontend and backend are fully in sync for real predictions.

## Relevant Files
- API: `python/predict_api.py`, `app/api/predict-rating/route.ts`
- Model Loading: `src/load_model.py`, `src/predict.py`

---

See technical.md for an overview of the full data flow. 