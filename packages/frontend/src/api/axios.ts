import axios from 'axios';

// Use relative path "/api" for Ingress/Production/Universal.
// For pure local dev (no Ingress), VITE_API_URL can be injected to override.
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    // TODO: add:
    // withCredentials: true
})