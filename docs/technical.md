# Technical Overview

## Architecture
- **Frontend:** Next.js (React) app for user interaction and UI.
- **Backend API:** Python FastAPI/Flask app for model inference.
- **Machine Learning Models:** Trained using scikit-learn and stored in `saved_models/`.

## Main Components
- **app/**: Next.js app source (pages, API routes, styles).
- **components/**: Reusable React components for UI.
- **python/**: Python backend API for predictions.
- **src/**: Data preprocessing, model training, and prediction scripts.
- **saved_models/**: Pre-trained models and transformers.
- **data/**: Raw and preprocessed data files.

## Data Flow
1. User submits movie details via the frontend.
2. Frontend sends a request to the backend API endpoint.
3. Backend loads the appropriate model and preprocessors, makes a prediction, and returns the result.
4. Frontend displays the prediction to the user.

---

See setup.md for installation and usage.md for user instructions. 