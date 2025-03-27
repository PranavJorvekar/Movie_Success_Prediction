import joblib

def load_model():
    model = joblib.load("movie_rating_model.pkl")
    tfidf_title = joblib.load("tfidf_title.pkl")
    tfidf_overview = joblib.load("tfidf_overview.pkl")
    mlb = joblib.load("mlb.pkl")
    scaler = joblib.load("scaler.pkl")
    print("Model and preprocessing objects loaded successfully!")
    return model, tfidf_title, tfidf_overview, mlb, scaler

if __name__ == "__main__":
    load_model()
