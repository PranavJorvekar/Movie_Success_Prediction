import pandas as pd
import ast
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from scipy.sparse import hstack, csr_matrix

# Load dataset
def load_data(file_path):
    df = pd.read_csv(file_path, low_memory=False)

    # Drop rows with missing vote_average and vote_count < 25
    df.dropna(subset=["vote_average", "vote_count"], inplace=True)
    df = df[df["vote_count"] >= 25]

    # Extract genres
    def extract_genres(genre_str):
        try:
            genres = ast.literal_eval(genre_str)
            return [genre["name"] for genre in genres] if isinstance(genres, list) else []
        except (ValueError, SyntaxError):
            return []
    
    df["genres"] = df["genres"].apply(extract_genres)

    # Merge tagline and overview
    df["overview"] = df["overview"].fillna("") + " " + df["tagline"].fillna("")

    return df

# Preprocessing Function
def preprocess_data(df):
    # Vectorize text features
    tfidf_title = TfidfVectorizer(max_features=500)
    tfidf_overview = TfidfVectorizer(max_features=5000)  # Increased max_features for overview

    X_title = tfidf_title.fit_transform(df["title"])
    X_overview = tfidf_overview.fit_transform(df["overview"])

    # One-hot encode genres
    mlb = MultiLabelBinarizer()
    X_genres = mlb.fit_transform(df["genres"])

    # Combine all features (keeping it sparse)
    X = hstack([X_title, X_overview, X_genres])

    y = df["vote_average"].values  # Target

    # Save preprocessing models
    with open("../saved_models/tfidf_title.pkl", "wb") as f:
        pickle.dump(tfidf_title, f)

    with open("../saved_models/tfidf_overview.pkl", "wb") as f:
        pickle.dump(tfidf_overview, f)

    with open("../saved_models/mlb.pkl", "wb") as f:
        pickle.dump(mlb, f)

    return X, y

if __name__ == "__main__":
    file_path = "data/movies_metadata.csv"
    df = load_data(file_path)
    X, y = preprocess_data(df)
    print("✅ Data Preprocessing Complete! Preprocessed models saved in 'saved_models/'")
