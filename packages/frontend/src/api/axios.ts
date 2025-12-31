import axios from 'axios';

// For local development
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// For production
//const BASE_URL = "https://backend-fastapi-hqw6.onrender.com";

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    // TODO: add:
    // withCredentials: true
})