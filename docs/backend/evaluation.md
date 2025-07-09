# Model Evaluation

## Metrics Used
- **Mean Absolute Error (MAE):** Measures average absolute difference between predicted and actual ratings
- **Root Mean Squared Error (RMSE):** (Can be added) Penalizes larger errors more

## How Evaluation Works
- After training, model is tested on a held-out test set
- Predictions are compared to true ratings
- MAE is printed and can be logged for tracking

## Example (from train_model.py)
```python
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Absolute Error: {mae:.2f}")
```

## Interpretation
- Lower MAE/RMSE means better model performance
- Typical MAE for this project: 0.5–1.5

---

See algorithms.md for training details. 