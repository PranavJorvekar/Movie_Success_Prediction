from load_model import load_saved_models
from scipy.sparse import hstack
import numpy as np

def predict_rating(title, overview, genres, budget, popularity=0, runtime=0, release_year=2000):
    # Load trained model and preprocessors
    model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()

    # Process input text features
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])  # Ensure genres is a list

    # Log transform budget (to match training preprocessing)
    log_budget = np.log1p(budget)

    # Debugging: Check scaler training info
    print(f"Scaler was trained with {scaler.n_features_in_} features.")

    if scaler.n_features_in_ == 1:  # If scaler was trained on budget only
        numeric_scaled = scaler.transform([[log_budget]])
    else:  # If trained on multiple features, match input size
        numeric_features = [[log_budget, runtime, popularity, release_year]]
        numeric_scaled = scaler.transform(numeric_features)

    # Debugging: Print input feature shape
    print(f"Input features shape: {np.array(numeric_scaled).shape}")

    # Combine all features
    X_input = hstack([title_vec, overview_vec, genres_vec, numeric_scaled])

    # Make prediction
    predicted_rating = model.predict(X_input)[0]

    return predicted_rating


if __name__ == "__main__":
    # Example user input
    title_input = "Forgettable"
    overview_input = "A film so unmemorable and poorly executed that it is quickly forgotten. The storyline lacks originality and the pacing is sluggish throughout."
    genres_input = ["Drama", "Mystery"]


    budget_input = 160000000



    popularity_input = 8.5
    runtime_input = 120
    release_year_input = 2015

    predicted_rating = predict_rating(title_input, overview_input, genres_input, budget_input, popularity_input, runtime_input, release_year_input)
    print(f"Predicted Rating: {predicted_rating:.2f}")
