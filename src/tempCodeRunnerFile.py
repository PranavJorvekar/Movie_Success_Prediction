import joblib
import os

MODEL_PATH = "saved_models/movie_rating_model.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded successfully!")
    print(model)
except Exception as e:
    print(f"❌ Error loading model: {e}")
