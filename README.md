# Movie Rating Prediction

## 📌 Project Overview
This project builds a **Machine Learning model** to predict movie ratings based on **title, overview, genre, and budget**. The model is trained on the **movies_metadata.csv** dataset and utilizes **Natural Language Processing (NLP)** for textual features. The goal is to efficiently predict ratings for new movies using a trained model without requiring retraining every time.

---

## 📁 Project Structure

\`\`\`
Movie_Rating_Prediction/
│── data/
│   ├── movies_metadata.csv          # Original dataset
│   ├── preprocessed_data.pkl        # Preprocessed feature set (optional caching)
│── saved_models/
│   ├── tfidf_title.pkl              # TF-IDF vectorizer for title
│   ├── tfidf_overview.pkl           # TF-IDF vectorizer for overview
│   ├── mlb.pkl                      # MultiLabelBinarizer for genres
│   ├── scaler.pkl                   # MinMaxScaler for budget
│   ├── movie_rating_model.pkl       # Trained ML model
│── src/
│   ├── preprocessing.py             # Data cleaning, feature engineering
│   ├── train_model.py               # Model training & evaluation
│   ├── predict.py                   # Prediction using saved model
│── notebooks/
│   ├── exploratory_analysis.ipynb   # Data visualization & analysis
│── README.md                        # Project documentation
│── requirements.txt                  # Dependencies
\`\`\`

---

## 🚀 Features
✅ **Preprocessing**: Handles missing values, removes outliers, and vectorizes text.  
✅ **Model Training**: Uses **RandomForestRegressor** for predicting movie ratings.  
✅ **Efficient Predictions**: Saves trained models to avoid retraining.  
✅ **User Input Support**: Predict ratings for new movies based on user-provided details.  
✅ **Scalability**: Can be extended with different ML models (XGBoost, Neural Networks).  

---

## ⚙️ Installation
1. **Clone the Repository**:
   \`\`\`bash
   git clone https://github.com/PranavJorvekar/Movie_Success_Prediction
   cd Movie_Rating_Prediction
   \`\`\`
2. **Install Dependencies**:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

---

## 📊 Data Preprocessing
- **Handles Missing Values**: Uses appropriate methods for different columns.
- **Outlier Removal**: Detects and removes extreme values in numerical data.
- **Feature Engineering**:
  - Converts **genres** into one-hot encoding.
  - Vectorizes **title & overview** using **TF-IDF**.
  - Normalizes **budget** using **MinMaxScaler**.

---

## 🎯 Model Training
- Uses **RandomForestRegressor** for regression.
- Evaluated using **Mean Absolute Error (MAE)**.
- Saves trained model and preprocessed objects for **efficient reuse**.

---

## 🔮 Prediction Workflow
1. Loads the trained model and preprocessing objects.
2. Accepts **user input** (Title, Overview, Genres, Budget).
3. Applies the same preprocessing as training.
4. Predicts the movie rating using the trained model.

---

## 🛠️ Future Improvements
- Implement **hyperparameter tuning** for better accuracy.
- Experiment with **XGBoost & Neural Networks**.
- Add a **web interface** for easy user interaction.

---

## 📩 Contact
For any questions or improvements, feel free to reach out or contribute to the project! 🚀
