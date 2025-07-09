# Setup Instructions

## Prerequisites
- Node.js and npm (or pnpm)
- Python 3.x
- (Optional) Virtual environment for Python

## 1. Clone the Repository
```bash
git clone <repo-url>
cd Movie_Success_Prediction
```

## 2. Install Frontend Dependencies
```bash
pnpm install
# or
npm install
```

## 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

## 4. Prepare Data and Models
- Ensure the `data/` and `saved_models/` folders contain the necessary files.
- If not, run the preprocessing and training scripts in `src/`.

## 5. Run the Application
### Start the Frontend
```bash
pnpm dev
# or
npm run dev
```

### Start the Backend API
```bash
python python/predict_api.py
```

## 6. Access the App
Open your browser and go to `http://localhost:3000`.

---

See other docs for usage and technical details. 