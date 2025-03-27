import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATHS = {
    "tfidf_title": os.path.join(BASE_DIR, "saved_models", "tfidf_title.pkl"),
    "tfidf_overview": os.path.join(BASE_DIR, "saved_models", "tfidf_overview.pkl"),
    "mlb": os.path.join(BASE_DIR, "saved_models", "mlb.pkl"),
    "scaler": os.path.join(BASE_DIR, "saved_models", "scaler.pkl"),
    "movie_rating_model": os.path.join(BASE_DIR, "saved_models", "movie_rating_model.pkl"),
}
