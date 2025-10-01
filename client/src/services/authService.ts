import axios from '../config/axios';
import { ApiResponse } from '../constants/types';

interface LoginResponse {
    userId: number;
    username: string;
    token: string;
    refreshToken: string;
    isAdmin: boolean;
}

class AuthService {
    private static TOKEN_KEY = 'token';
    private static REFRESH_TOKEN_KEY = 'refreshToken';

    async login(username: string, password: string): Promise<LoginResponse> {
        const response = await axios.post<ApiResponse<LoginResponse>>('/auth/login', {
            username,
            password
        }, {
            withCredentials: true // Include cookies in the request
        });

        if (!response.data.hasErrors && response.data.data) {
            this.setTokens(response.data.data);
            return response.data.data;
        }
        
        throw new Error('Login failed');
    }

    logout(): void {
        localStorage.removeItem(AuthService.TOKEN_KEY);
        localStorage.removeItem(AuthService.REFRESH_TOKEN_KEY);
    }

    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    private setTokens(auth: LoginResponse): void {
        localStorage.setItem(AuthService.TOKEN_KEY, auth.token);
        localStorage.setItem(AuthService.REFRESH_TOKEN_KEY, auth.refreshToken);
    }

    async refreshToken(): Promise<LoginResponse> {
        const response = await axios.post<ApiResponse<LoginResponse>>('/auth/refresh', {}, {
            withCredentials: true
        });

        if (!response.data.hasErrors && response.data.data) {
            this.setTokens(response.data.data);
            return response.data.data;
        }
        
        throw new Error('Token refresh failed');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}

export const authService = new AuthService();