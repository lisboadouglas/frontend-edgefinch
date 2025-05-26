import axios, { AxiosInstance } from 'axios';

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!import.meta.env.VITE_API_TOKEN) {
  console.warn('API_TOKEN não está configurado. Certifique-se de adicionar ao .env.');
}

const api: AxiosInstance = axios.create({
    baseURL: API_BASE_URL || '',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': API_TOKEN ? `Bearer ${API_TOKEN}` : '',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error);
        if (error.response && error.response.status === 401) {
            // Handle unauthorized access, e.g., redirect to login
            console.error('Unauthorized access - token may be invalid or expired.');
        }
    }
);

export default api;