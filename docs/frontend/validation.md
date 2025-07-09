# Form Validation

## What is Validated?
- Required fields: title, overview, at least one genre.
- Numeric fields: budget, popularity, runtime, release year (should be valid numbers if provided).

## How Validation Works
- Frontend checks required fields before submitting the form.
- Shows error messages or disables submit button if validation fails.
- Backend also validates input and returns errors if needed.

## User Feedback
- Inline error messages for missing/invalid fields.
- Error state in the result display if backend validation fails.

---

See movie-rating-form.tsx and rating-result.tsx for implementation details. 