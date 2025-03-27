import pandas as pd
import ast
import numpy as np
import os
import pickle  # Use pickle for saving models
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from scipy.sparse import hstack

# Define paths
DATA_PATH = "data/movies_metadata.csv"
MODEL_DIR = "saved_models"

# Ensure model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

# Load dataset
df = pd.read_csv(DATA_PATH, low_memory=False)

# Convert budget to numeric and handle missing values
df["budget"] = pd.to_numeric(df["budget"], errors="coerce")

# Handle NaN budget values safely
budget_median = df["budget"].median() if not df["budget"].isna().all() else 0
df["budget"] = df["budget"].fillna(budget_median)

df["overview"] = df["overview"].fillna("")

# Extract genres
def extract_genres(genre_str):
    try:
        genres = ast.literal_eval(genre_str)
        return [genre["name"] for genre in genres] if isinstance(genres, list) else []
    except (ValueError, SyntaxError):
        return []

df["genres"] = df["genres"].apply(extract_genres)

# Remove outliers based on budget
df = df[df["budget"] < df["budget"].quantile(0.95)]  # Remove extreme budget values

# Drop rows with missing target values
df = df.dropna(subset=["vote_average"])

# Preprocessing function
def preprocess_data(df, fit=True):
    tfidf_title_path = os.path.join(MODEL_DIR, "tfidf_title.pkl")
    tfidf_overview_path = os.path.join(MODEL_DIR, "tfidf_overview.pkl")
    mlb_path = os.path.join(MODEL_DIR, "mlb.pkl")
    scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")

    if fit:
        tfidf_title = TfidfVectorizer(max_features=500)
        tfidf_overview = TfidfVectorizer(max_features=500)
        mlb = MultiLabelBinarizer()
        scaler = MinMaxScaler()

        X_title = tfidf_title.fit_transform(df["title"])
        X_overview = tfidf_overview.fit_transform(df["overview"])
        X_genres = mlb.fit_transform(df["genres"])
        X_budget = scaler.fit_transform(df[["budget"]])

        # Save transformers using pickle for consistency
        with open(tfidf_title_path, "wb") as f: pickle.dump(tfidf_title, f)
        with open(tfidf_overview_path, "wb") as f: pickle.dump(tfidf_overview, f)
        with open(mlb_path, "wb") as f: pickle.dump(mlb, f)
        with open(scaler_path, "wb") as f: pickle.dump(scaler, f)

        print("✅ Transformers saved successfully.")

    else:
        # Load pre-trained transformers
        with open(tfidf_title_path, "rb") as f: tfidf_title = pickle.load(f)
        with open(tfidf_overview_path, "rb") as f: tfidf_overview = pickle.load(f)
        with open(mlb_path, "rb") as f: mlb = pickle.load(f)
        with open(scaler_path, "rb") as f: scaler = pickle.load(f)

        X_title = tfidf_title.transform(df["title"])
        X_overview = tfidf_overview.transform(df["overview"])
        X_genres = mlb.transform(df["genres"])
        X_budget = scaler.transform(df[["budget"]])

    X = hstack([X_title, X_overview, X_genres, X_budget])
    y = df["vote_average"].values

    return X, y

# Preprocess data
X, y = preprocess_data(df, fit=True)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model using pickle for consistency
model_path = os.path.join(MODEL_DIR, "movie_rating_model.pkl")
with open(model_path, "wb") as f:
    pickle.dump(model, f)

print(f"✅ Model saved successfully at {model_path}")

# Evaluate model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"📊 Mean Absolute Error: {mae:.2f}")
