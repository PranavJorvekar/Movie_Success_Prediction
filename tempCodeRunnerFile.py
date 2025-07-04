# Example user input
title_input = "Example Movie"
overview_input = "A thrilling story about AI and human interactions."
genres_input = ["Action", "Sci-Fi"]
budget_input = 50000000

predicted_rating = predict_rating(title_input, overview_input, genres_input, budget_input)
print(f"Predicted Rating: {predicted_rating:.2f}")
