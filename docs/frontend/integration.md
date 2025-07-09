# Backend Integration

## API Communication
- The frontend sends user input to the backend API endpoint (`/api/predict-rating`) using HTTP requests (e.g., fetch or axios).
- The Next.js API route now calls the real Python backend (`python/predict_api.py`) using a child process, passing the request data as JSON.
- The Python script processes the input, runs the trained model, and returns the prediction as JSON.
- The API route formats the response and sends it back to the frontend.

## Example Flow
1. User submits the form in the frontend.
2. Next.js API route receives the request and validates input.
3. The route spawns a Python process, sends the input as JSON, and waits for the result.
4. The Python backend returns the prediction, which is formatted and sent to the frontend.
5. The frontend displays the result to the user.

## Example Request/Response
- See design.md for form data and expected response structure.

---

This ensures the frontend and backend are fully in sync for real predictions. 