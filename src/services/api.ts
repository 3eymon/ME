import axios from 'axios';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 20000,
    headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    },

    withCredentials: true
});
export default api;
