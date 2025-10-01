import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { apiConfig } from './env';
import { authService } from '../services/authService';

const instance = rateLimit(axios.create({
    ...apiConfig,
    withCredentials: true // Include cookies in all requests
}), { 
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
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                await authService.refreshToken();
                // Retry the original request with the new token
                const token = authService.getToken();
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, redirect to login
                authService.logout();
                window.location.href = '/login';
            }
        }
        
        return Promise.reject(error);
    }
);

export default instance;