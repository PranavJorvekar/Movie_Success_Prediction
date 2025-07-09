# Algorithms & Models

## Machine Learning Algorithms Used
- **Regression Models:** Used for predicting movie ratings (e.g., Random Forest Regressor).
- **Text Vectorization:** TF-IDF for processing movie overviews and titles.
- **MultiLabelBinarizer:** For encoding genres and other categorical features.
- **MinMaxScaler:** For scaling numerical features (e.g., budget).

## Model Training (`src/train_model.py`)

### Step-by-Step Breakdown

1. **Data Loading & Cleaning**
   - Loads `movies_metadata.csv` into a DataFrame.
   - Converts `budget` to numeric, fills missing with median.
   - Merges `overview` and `tagline` for richer text features.
   - Extracts genres as a list of names.
   - Removes outliers in budget (top 5%).
   - Drops rows with missing target (`vote_average`).

2. **Feature Engineering & Preprocessing**
   - **TF-IDF Vectorization:**
     - `title` (max 500 features)
     - `overview` (max 5000 features)
   - **Genre Encoding:**
     - One-hot encoding of genres using MultiLabelBinarizer.
   - **Budget Scaling:**
     - Scaled to [0,1] using MinMaxScaler.
   - **Saving Transformers:**
     - All transformers are saved for consistent inference.
   - **Feature Matrix:**
     - All features are horizontally stacked (sparse matrix).

3. **Train-Test Split**
   - 80% for training, 20% for testing (random_state=42).

4. **Model Training**
   - **RandomForestRegressor** (100 trees, random_state=42) is trained on the training set.
   - Model is saved to `saved_models/movie_rating_model.pkl`.

5. **Evaluation**
   - Predicts on the test set.
   - Computes Mean Absolute Error (MAE) and prints it.

### Example Output
- **Feature matrix shape:** ~5,521 columns (500 title + 5000 overview + ~20 genres + 1 budget)
- **Rows:** 10,000–20,000 (after filtering)
- **MAE:** Typically between 0.5 and 1.5 (depends on data and model)

### Key Code Snippet
```python
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
with open(model_path, "wb") as f:
    pickle.dump(model, f)
```

---

See the full script in `src/train_model.py` for more details. 