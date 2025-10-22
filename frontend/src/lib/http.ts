// src/lib/http.ts
import axios from 'axios';

// Use relative path in development, absolute in production
const BASE_URL = import.meta.env.DEV 
  ? '/backend'  // This will use Vite proxy
  : 'http://localhost/elibrary/backend';

type RequestData = Record<string, string | number>;

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Important for CORS with credentials
});

export async function post(endpoint: string, data: RequestData) {
  try {
    const response = await http.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("HTTP POST Error", error);
  }
}

export async function get(endpoint: string, params?: Record<string, string | number>) {
  try {
    const response = await http.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("HTTP GET Error", error);
  }
}