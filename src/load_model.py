import joblib
import os

# Define paths
SAVED_MODELS_DIR = "saved_models"  # Ensure this is correct
MODEL_PATHS = {
    "model": os.path.join(SAVED_MODELS_DIR, "movie_rating_model.pkl"),
    "tfidf_title": os.path.join(SAVED_MODELS_DIR, "tfidf_title.pkl"),
    "tfidf_overview": os.path.join(SAVED_MODELS_DIR, "tfidf_overview.pkl"),
    "mlb": os.path.join(SAVED_MODELS_DIR, "mlb.pkl"),
    "scaler": os.path.join(SAVED_MODELS_DIR, "scaler.pkl"),
}

def load_saved_models():
    """Loads trained model and preprocessors from disk."""
    try:
        model = joblib.load(MODEL_PATHS["model"])
        tfidf_title = joblib.load(MODEL_PATHS["tfidf_title"])
        tfidf_overview = joblib.load(MODEL_PATHS["tfidf_overview"])
        mlb = joblib.load(MODEL_PATHS["mlb"])
        scaler = joblib.load(MODEL_PATHS["scaler"])

        return model, tfidf_title, tfidf_overview, mlb, scaler  # ✅ Ensure correct return format
    except FileNotFoundError as e:
        raise RuntimeError(f"❌ Model file not found: {e}")
    except Exception as e:
        raise RuntimeError(f"❌ Error loading models: {e}")

if __name__ == "__main__":
    model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()
    print("✅ All models loaded successfully!")
