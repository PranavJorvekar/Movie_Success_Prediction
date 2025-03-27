import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from data_preprocessing import load_and_preprocess_data, preprocess_features

def train_and_save_model(file_path):
    # Load and preprocess data
    df = load_and_preprocess_data(file_path)
    X, y, tfidf_title, tfidf_overview, mlb, scaler = preprocess_features(df)

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Evaluate model
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    print(f"Mean Absolute Error: {mae:.2f}")

    # Save model and preprocessors
    joblib.dump(model, "movie_rating_model.pkl")
    joblib.dump(tfidf_title, "tfidf_title.pkl")
    joblib.dump(tfidf_overview, "tfidf_overview.pkl")
    joblib.dump(mlb, "mlb.pkl")
    joblib.dump(scaler, "scaler.pkl")

    print("Model and preprocessing objects saved!")

if __name__ == "__main__":
    train_and_save_model("movies_metadata.csv")
