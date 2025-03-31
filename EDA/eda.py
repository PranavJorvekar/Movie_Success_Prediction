import pandas as pd
import ast
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

def load_data(file_path):
    df = pd.read_csv(file_path, low_memory=False)

    # Convert budget to numeric
    df["budget"] = pd.to_numeric(df["budget"], errors="coerce")

    # Extract genres
    def extract_genres(genre_str):
        try:
            genres = ast.literal_eval(genre_str)
            return [genre["name"] for genre in genres] if isinstance(genres, list) else []
        except (ValueError, SyntaxError):
            return []

    df["genres"] = df["genres"].apply(extract_genres)

    return df

def plot_missing_values(df):
    missing_values = df.isnull().sum()
    missing_values = missing_values[missing_values > 0]
    
    if not missing_values.empty:
        plt.figure(figsize=(10, 5))
        missing_values.plot(kind='bar', color='red')
        plt.title("Missing Values in Each Column")
        plt.xlabel("Columns")
        plt.ylabel("Count")
        plt.xticks(rotation=45)
        plt.show()
    else:
        print("No missing values found!")

def plot_genre_distribution(df):
    genre_counts = df["genres"].explode().value_counts()

    plt.figure(figsize=(12, 6))
    sns.barplot(x=genre_counts.index, y=genre_counts.values, palette="viridis")
    plt.xticks(rotation=45)
    plt.title("Distribution of Movie Genres")
    plt.xlabel("Genres")
    plt.ylabel("Count")
    plt.show()

def plot_budget_vs_rating(df):
    plt.figure(figsize=(10, 5))
    sns.scatterplot(x=np.log1p(df["budget"]), y=df["vote_average"], alpha=0.5)
    plt.title("Budget vs Movie Rating")
    plt.xlabel("Log Budget")
    plt.ylabel("Average Rating")
    plt.show()

def plot_rating_distribution(df):
    plt.figure(figsize=(10, 5))
    sns.histplot(df["vote_average"], bins=20, kde=True, color='blue')
    plt.title("Distribution of Movie Ratings")
    plt.xlabel("Rating")
    plt.ylabel("Frequency")
    plt.show()

def eda(file_path):
    df = load_data(file_path)
    
    print("Dataset Overview:")
    print(df.head())

    print("\nSummary Statistics:")
    print(df.describe())

    print("\nChecking for missing values...")
    plot_missing_values(df)

    print("\nGenre Distribution:")
    plot_genre_distribution(df)

    print("\nBudget vs Rating Scatter Plot:")
    plot_budget_vs_rating(df)

    print("\nRating Distribution:")
    plot_rating_distribution(df)

if __name__ == "__main__":
    eda("data\movies_metadata.csv")
