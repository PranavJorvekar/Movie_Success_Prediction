import sys
import json
import os
import numpy as np
from scipy.sparse import hstack

# Add the src directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

try:
    from load_model import load_saved_models
except ImportError:
    # Fallback if load_model is not available
    import joblib
    import pickle
    
    def load_saved_models():
        model_dir = os.path.join(os.path.dirname(__file__), '..', 'saved_models')
        
        model = joblib.load(os.path.join(model_dir, 'movie_rating_model.pkl'))
        
        with open(os.path.join(model_dir, 'tfidf_title.pkl'), 'rb') as f:
            tfidf_title = pickle.load(f)
        with open(os.path.join(model_dir, 'tfidf_overview.pkl'), 'rb') as f:
            tfidf_overview = pickle.load(f)
        with open(os.path.join(model_dir, 'mlb.pkl'), 'rb') as f:
            mlb = pickle.load(f)
        with open(os.path.join(model_dir, 'scaler.pkl'), 'rb') as f:
            scaler = pickle.load(f)
            
        return model, tfidf_title, tfidf_overview, mlb, scaler

def predict_rating_api(data):
    try:
        # Load models
        model, tfidf_title, tfidf_overview, mlb, scaler = load_saved_models()
        
        # Extract data
        title = data.get('title', '')
        overview = data.get('overview', '')
        genres = data.get('genres', [])
        budget = data.get('budget', 0)
        popularity = data.get('popularity', 0)
        runtime = data.get('runtime', 0)
        release_year = data.get('release_year', 2024)
        
        # Process features exactly like in training
        title_vec = tfidf_title.transform([title])
        overview_vec = tfidf_overview.transform([overview])
        genres_vec = mlb.transform([genres])
        
        # Handle budget scaling (log transform like in training)
        log_budget = np.log1p(budget) if budget > 0 else 0
        
        # Scale numerical features
        if scaler.n_features_in_ == 1:
            # If scaler was trained on budget only
            numeric_scaled = scaler.transform([[log_budget]])
        else:
            # If trained on multiple features
            numeric_features = [[log_budget, runtime, popularity, release_year]]
            numeric_scaled = scaler.transform(numeric_features)
        
        # Combine all features
        X_input = hstack([title_vec, overview_vec, genres_vec, numeric_scaled])
        
        # Make prediction
        predicted_rating = model.predict(X_input)[0]
        
        # Ensure rating is within valid range
        predicted_rating = max(0, min(10, predicted_rating))
        
        return {
            'rating': float(predicted_rating),
            'confidence': 0.85,  # You can calculate actual confidence if needed
            'success': True
        }
        
    except Exception as e:
        return {
            'error': str(e),
            'success': False
        }

if __name__ == "__main__":
    # Read input from stdin
    input_data = sys.stdin.read()
    
    try:
        data = json.loads(input_data)
        result = predict_rating_api(data)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e), 'success': False}))
