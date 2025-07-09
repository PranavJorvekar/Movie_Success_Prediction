# Frontend Design & UI

## Main Form Component (`components/movie-rating-form.tsx`)

### Step-by-Step Breakdown
1. **State Management**
   - Uses React's `useState` to manage form data, loading state, and prediction result.
   - `formData` holds all user inputs (title, overview, genres, budget, popularity, runtime, release year).

2. **Form Fields**
   - **Title:** Text input, required.
   - **Overview:** Textarea, required, encourages detailed descriptions.
   - **Genres:** Checkbox group, must select at least one.
   - **Budget, Popularity, Runtime, Release Year:** Numeric inputs, optional but improve prediction.

3. **Input Handling**
   - `handleInputChange` updates form state for text/number fields.
   - `handleGenreChange` manages genre selection (add/remove from array).

4. **Form Submission**
   - `handleSubmit` prevents default, sets loading state, and sends a POST request to `/api/predict-rating` with the form data as JSON.
   - Converts numeric fields to numbers, ensures required fields are present.
   - Handles API response: sets prediction state or error state for user feedback.

5. **Loading & Error Handling**
   - Shows a loading spinner while waiting for the API.
   - Displays error messages if prediction fails.

6. **Result Display**
   - If prediction is successful, displays the result using the `RatingResult` component.
   - Shows predicted rating, confidence, and other model info.

### Example Form Data
```json
{
  "title": "Epic Adventure",
  "overview": "A thrilling journey across uncharted lands, filled with danger and discovery.",
  "genres": ["Adventure", "Action"],
  "budget": "120000000",
  "popularity": "15.2",
  "runtime": "130",
  "releaseYear": "2023"
}
```

### Line-by-Line Explanation (Key Logic)
```tsx
const [formData, setFormData] = useState({ ... })
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  try {
    const response = await fetch("/api/predict-rating", { ... })
    const result = await response.json()
    setPrediction(result)
  } catch (error) {
    setPrediction({ error: true, message: error.message })
  } finally {
    setIsLoading(false)
  }
}
```
- **State:** Manages form and prediction state.
- **Submit:** Sends user input to the API and handles the response.
- **Error:** Catches and displays errors.
- **Loading:** Shows spinner while waiting for prediction.

### UI/UX Features
- Responsive layout with clear labels and icons.
- Required fields are validated before submission.
- User feedback for loading and errors.
- Results are shown in a dedicated component for clarity.

---

## Result Display Component (`components/rating-result.tsx`)

### Step-by-Step Breakdown
1. **Props & Data Handling**
   - Receives `prediction` (object with predicted rating, confidence, category, model info, error/message) and `movieData` (title, genres, budget).
   - Handles error state: displays a styled error card if prediction failed.
   - If no prediction, renders nothing.

2. **Main Rating Display**
   - Shows the predicted rating (0–10) in large font, color-coded by value.
   - Displays a star rating visualization (out of 5 stars, with half-star support).
   - Shows a badge for the rating category (Excellent, Good, Average, Poor).

3. **Breakdown & Confidence**
   - Shows a progress bar for the overall score.
   - Displays model confidence as a percentage with a progress bar.

4. **Movie Details Summary**
   - Summarizes the input movie details (title, genres, budget) in a styled card.

5. **Model Information**
   - Shows the algorithm used, mean absolute error (MAE), and feature list.

6. **Interpretation**
   - Provides a human-readable interpretation of the predicted rating (e.g., "highly rated", "mixed to average", etc.).
   - Offers context and caveats about the prediction.

### Error Handling
- If the prediction has an error, displays a red error card with the error message.
- If no prediction is available, renders nothing.

### UI/UX Features
- Uses color, icons, and progress bars for visual clarity.
- Responsive and accessible layout.
- Clear separation of result, breakdown, details, and interpretation.

### Example Usage
```tsx
<RatingResult prediction={prediction} movieData={formData} />
```

---

See integration.md for API communication details and more.md for additional features. 