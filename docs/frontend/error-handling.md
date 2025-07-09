# Error Handling

## Types of Errors
- Network errors (API unreachable, timeout)
- Backend validation errors (missing/invalid input)
- Unexpected server errors

## How Errors are Handled
- Catches errors in the form submission handler.
- Sets an error state and displays a user-friendly message.
- Shows error cards in the result display if prediction fails.

## User Feedback
- Clear error messages in the UI.
- Encourages retry or correction of input.

---

See movie-rating-form.tsx and rating-result.tsx for error handling logic. 