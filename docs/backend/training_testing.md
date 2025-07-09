# Training & Testing

## Training Process
- Data is preprocessed and split into training and validation sets.
- Models are trained on the training set using features such as budget, genres, and text data.
- Performance is evaluated using metrics like RMSE, MAE, or accuracy (depending on the task).

## Feature Matrix Shape
- After preprocessing, the feature matrix typically has:
  - 500 (title TF-IDF) + 5000 (overview TF-IDF) + ~20 (genres) columns = ~5,520 features.
  - Number of rows: 10,000–20,000 (after filtering).
- Target vector: `vote_average` (continuous, e.g., 7.2).

## Testing & Validation
- Validation set is used to tune hyperparameters and prevent overfitting.
- Final model is tested on unseen data to estimate real-world performance.
- Metrics: RMSE (Root Mean Squared Error), MAE (Mean Absolute Error).

## Scripts
- Training: `src/train_model.py`
- Prediction/Testing: `src/predict.py`

---

Refer to the EDA folder for exploratory data analysis and visualizations. 