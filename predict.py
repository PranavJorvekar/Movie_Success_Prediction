from load_model import load_model
from scipy.sparse import hstack

def predict_rating(title, overview, genres, budget):
    # Load trained model and preprocessors
    model, tfidf_title, tfidf_overview, mlb, scaler = load_model()

    # Process input
    title_vec = tfidf_title.transform([title])
    overview_vec = tfidf_overview.transform([overview])
    genres_vec = mlb.transform([genres])
    budget_scaled = scaler.transform([[budget]])

    X_input = hstack([title_vec, overview_vec, genres_vec, budget_scaled])
    predicted_rating = model.predict(X_input)[0]

    return predicted_rating

if __name__ == "__main__":
    # Example user input
    title_input = "Inception"
    overview_input = "A skilled thief, who specializes in entering people's dreams and stealing secrets, is given a chance to have his past crimes forgiven if he can successfully plant an idea in someone's mind."
    genres_input = ["Action", "Science Fiction","Thriller","Adventure"]
    budget_input = 16000000

    predicted_rating = predict_rating(title_input, overview_input, genres_input, budget_input)
    print(f"Predicted Rating: {predicted_rating:.2f}")
