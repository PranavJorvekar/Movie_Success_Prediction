import pandas as pd
import ast
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from scipy.sparse import hstack

def load_and_preprocess_data(file_path):
    df = pd.read_csv(file_path, low_memory=False)

    # Convert budget to numeric
    df["budget"] = pd.to_numeric(df["budget"], errors="coerce")

    # Drop rows with missing target values
    df = df.dropna(subset=["vote_average"])

    # Extract genres
    def extract_genres(genre_str):
        try:
            genres = ast.literal_eval(genre_str)
            return [genre["name"] for genre in genres] if isinstance(genres, list) else []
        except (ValueError, SyntaxError):
            return []

    df["genres"] = df["genres"].apply(extract_genres)

    # Fill missing overviews
    df["overview"] = df["overview"].fillna("")

    return df

def preprocess_features(df):
    # Vectorize text features
    tfidf_title = TfidfVectorizer(max_features=500)
    tfidf_overview = TfidfVectorizer(max_features=500)

    X_title = tfidf_title.fit_transform(df["title"])
    X_overview = tfidf_overview.fit_transform(df["overview"])

    # One-hot encode genres
    mlb = MultiLabelBinarizer()
    X_genres = mlb.fit_transform(df["genres"])

    # Scale budget
    scaler = MinMaxScaler()
    X_budget = scaler.fit_transform(df[["budget"]])

    # Combine all features
    X = hstack([X_title, X_overview, X_genres, X_budget])
    y = df["vote_average"].values

    return X, y, tfidf_title, tfidf_overview, mlb, scaler
