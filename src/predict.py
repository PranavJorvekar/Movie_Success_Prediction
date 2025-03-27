from load_model import load_saved_models
from scipy.sparse import hstack

def predict_rating(title, overview, genres, budget):
    # Load trained model and preprocessors
    model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()

    # Process input
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])  # Ensure genres is a list
    budget_scaled = scaler.transform([[budget]])

    # Combine features
    X_input = hstack([title_vec, overview_vec, genres_vec, budget_scaled])

    # Make prediction
    predicted_rating = model.predict(X_input)[0]

    return predicted_rating

if __name__ == "__main__":
    # Example user input
    title_input = "Superbabies: Baby Geniuses 2"
    overview_input = "A group of babies with superhuman intelligence and abilities must stop an evil villain from controlling the world."
    genres_input =  ["Comedy", "Family", "Science Fiction"]
    budget_input = 200

    predicted_rating = predict_rating(title_input, overview_input, genres_input, budget_input)
    print(f"Predicted Rating: {predicted_rating:.2f}")
