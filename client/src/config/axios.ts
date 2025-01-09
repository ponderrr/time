import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { apiConfig } from './env';
import { authService } from '../services/authService';

const instance = rateLimit(axios.create(apiConfig), { 
    maxRequests: 100,
    perMilliseconds: 60000 
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            authService.logout();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;