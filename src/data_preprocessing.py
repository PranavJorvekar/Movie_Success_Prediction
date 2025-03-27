import pandas as pd
import ast
import numpy as np
import os
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from scipy.sparse import hstack

# Create directories if not exist
os.makedirs("../saved_models", exist_ok=True)
os.makedirs("../data", exist_ok=True)

# Load dataset
file_path = "data\movies_metadata.csv"
df = pd.read_csv(file_path, low_memory=False)

# Handle missing values
df["budget"] = pd.to_numeric(df["budget"], errors="coerce").fillna(0)  # Replace NaN with 0
df["overview"] = df["overview"].fillna("No overview available")  # Replace NaN with default text
df["title"] = df["title"].fillna("Unknown Title")  # Replace NaN with default text
df["vote_average"] = df["vote_average"].fillna(df["vote_average"].median())  # Replace with median

# Extract genres
def extract_genres(genre_str):
    try:
        genres = ast.literal_eval(genre_str)
        return [genre["name"] for genre in genres] if isinstance(genres, list) else []
    except (ValueError, SyntaxError):
        return []

df["genres"] = df["genres"].apply(extract_genres)

# Remove outliers using IQR method
def remove_outliers(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    return df[(df[column] >= lower_bound) & (df[column] <= upper_bound)]

df = remove_outliers(df, "budget")
df = remove_outliers(df, "vote_average")

# Vectorization & Encoding
tfidf_title = TfidfVectorizer(max_features=500)
tfidf_overview = TfidfVectorizer(max_features=500)
mlb = MultiLabelBinarizer()
scaler = MinMaxScaler()

X_title = tfidf_title.fit_transform(df["title"])
X_overview = tfidf_overview.fit_transform(df["overview"])
X_genres = mlb.fit_transform(df["genres"])
X_budget = scaler.fit_transform(df[["budget"]])

# Combine features
X = hstack([X_title, X_overview, X_genres, X_budget])
y = df["vote_average"].values

# Save preprocessed data & models
with open("../saved_models/tfidf_title.pkl", "wb") as f:
    pickle.dump(tfidf_title, f)
with open("../saved_models/tfidf_overview.pkl", "wb") as f:
    pickle.dump(tfidf_overview, f)
with open("../saved_models/mlb.pkl", "wb") as f:
    pickle.dump(mlb, f)
with open("../saved_models/scaler.pkl", "wb") as f:
    pickle.dump(scaler, f)
with open("../data/preprocessed_data.pkl", "wb") as f:
    pickle.dump((X, y), f)

print("✅ Data Preprocessing Completed & Saved Successfully!")
