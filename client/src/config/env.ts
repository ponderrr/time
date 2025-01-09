export const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5189',
    environment: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
    apiTimeout: 30000, // 30 seconds
    maxRetries: 3
};

export const apiConfig = {
    baseURL: config.apiUrl,
    timeout: config.apiTimeout,
    headers: {
        'Content-Type': 'application/json'
    }
};