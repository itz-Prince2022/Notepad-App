// If we are on localhost, use localhost. Otherwise, use the Render Backend URL.
export const BASE_URL = import.meta.env.MODE === "development" 
    ? "http://localhost:3000"
    : "https://notepad-app-backend-w4f1.onrender.com"; // render url