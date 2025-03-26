import pandas as pd
import ast
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MultiLabelBinarizer, MinMaxScaler
from sklearn.ensemble import RandomForestRegressor
from sklearn.pipeline import make_pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import mean_absolute_error
from scipy.sparse import hstack

# Load dataset
file_path = "movies_metadata.csv"
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

def preprocess_data(df):
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

# Preprocess data
X, y, tfidf_title, tfidf_overview, mlb, scaler = preprocess_data(df)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate model
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error: {mae:.2f}")

# Function for user input prediction
def predict_rating(title, overview, genres, budget):
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])
    budget_scaled = scaler.transform([[budget]])
    
    X_input = hstack([title_vec, overview_vec, genres_vec, budget_scaled])
    predicted_rating = model.predict(X_input)[0]
    
    return predicted_rating

# Example user input
title_input = "Example Movie"
overview_input = "A thrilling story about AI and human interactions."
genres_input = ["Action", "Sci-Fi"]
budget_input = 50000000

predicted_rating = predict_rating(title_input, overview_input, genres_input, budget_input)
print(f"Predicted Rating: {predicted_rating:.2f}")
