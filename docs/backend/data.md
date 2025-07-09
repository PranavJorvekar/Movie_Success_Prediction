# Data Sources & Preprocessing

## Data Sources
- **File:** `data/movies_metadata.csv`
- **Size:** Typically ~45,000 rows and 24 columns (MovieLens dataset). After filtering, usually 10,000–20,000 rows remain.
- **Columns:** Common columns include `title`, `budget`, `genres`, `overview`, `tagline`, `vote_average`, `vote_count`, etc.

## Example Data Row
| title      | budget   | genres                        | overview         | tagline         | vote_average | vote_count |
|------------|----------|-------------------------------|------------------|-----------------|--------------|------------|
| Toy Story  | 30000000 | [{'id': 16, 'name': 'Animation'}, ...] | A cowboy doll... | The adventure... | 7.7          | 5415       |

## Data Loading & Cleaning (`src/data_preprocessing.py`)

```python
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
```

### Line-by-Line Explanation
- **Read CSV:** Loads the dataset into a pandas DataFrame.
- **Drop missing/low-vote rows:** Removes movies with missing ratings or fewer than 25 votes (to ensure data quality).
- **Extract genres:** Parses the `genres` column (which is a stringified list of dicts) into a Python list of genre names.
- **Merge text fields:** Combines `overview` and `tagline` into a single text field for richer text analysis.

## Preprocessing Function

```python
def preprocess_data(df):
    # Vectorize text features
    tfidf_title = TfidfVectorizer(max_features=500)
    tfidf_overview = TfidfVectorizer(max_features=5000)
    X_title = tfidf_title.fit_transform(df["title"])
    X_overview = tfidf_overview.fit_transform(df["overview"])
    # One-hot encode genres
    mlb = MultiLabelBinarizer()
    X_genres = mlb.fit_transform(df["genres"])
    # Combine all features (sparse)
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
```

### Explanation
- **TF-IDF Vectorization:** Converts `title` and `overview` text into numerical vectors (max 500 and 5000 features, respectively).
- **Genre Encoding:** Converts the list of genres into a one-hot encoded matrix.
- **Feature Combination:** Stacks all features horizontally into a single sparse matrix.
- **Target:** The model predicts `vote_average` (the movie’s average rating).
- **Model Saving:** Saves the fitted vectorizers and encoders for use during inference.

## What You’ve Done
- Loaded and cleaned a large movie dataset.
- Engineered features from text and categorical data.
- Built a preprocessing pipeline for use in model training and inference.
- Saved all transformers for consistent use in production. 