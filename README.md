# Movie_Success_Prediction
 predict weather movie will be success or not based on overview nad other metadata
# Movie Rating Prediction

## 📌 Project Overview
This project predicts movie ratings based on various features such as title, overview, genres, and budget. It uses **Natural Language Processing (NLP)** techniques, **feature engineering**, and a **Random Forest Regressor** to estimate the movie rating (vote_average).

## 📂 Project Structure
```
Movie-Rating-Prediction/
│── data/
│   └── movies_metadata.csv      # Dataset containing movie information
│── src/
│   ├── preprocessing.py         # Data preprocessing and feature extraction
│   ├── train.py                 # Model training and evaluation
│   ├── predict.py               # User input-based movie rating prediction
│── transformers.pkl             # Saved transformers (TF-IDF, Scaler, etc.)
│── model.pkl                    # Saved trained model
│── README.md                    # Project documentation
```

## 📊 Exploratory Data Analysis (EDA)
- **Missing Data Handling**: Filled missing overviews, converted budget to numeric.
- **Outlier Removal**: Used the **IQR method** to filter out extreme values in `budget` and `vote_average`.
- **Feature Engineering**:
  - **TF-IDF Vectorization**: Applied on `title` and `overview`.
  - **One-hot Encoding**: Used for `genres`.
  - **Min-Max Scaling**: Applied to `budget`.

## 🛠️ Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/Movie-Rating-Prediction.git
   cd Movie-Rating-Prediction
   ```
2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run data preprocessing**
   ```bash
   python src/preprocessing.py
   ```
4. **Train the model**
   ```bash
   python src/train.py
   ```
5. **Make predictions using user input**
   ```bash
   python src/predict.py
   ```

## 📜 Usage
### **Training the Model**
- `train.py` loads preprocessed data, trains a **RandomForestRegressor**, and saves the trained model.

### **Predicting Movie Ratings**
- `predict.py` takes user input (title, overview, genres, budget) and predicts the movie rating using the trained model.

## 📈 Model Performance
- **Mean Absolute Error (MAE):** ~1.29

## 🔥 Technologies Used
- **Python**
- **scikit-learn**
- **pandas, NumPy**
- **TF-IDF for NLP processing**
- **Random Forest Regressor**

## 🚀 Future Improvements
- Enhance the model using **Deep Learning**.
- Integrate **Sentiment Analysis** on reviews.
- Deploy as a **web-based app**.

## 🙌 Credits
Developed by **[Your Name]**

---

🎬 **Happy Predicting!** 🎥

