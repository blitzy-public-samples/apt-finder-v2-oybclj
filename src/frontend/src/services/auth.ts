import { ApiService } from './api';
import { AUTH_ENDPOINTS } from '../shared/constants/apiEndpoints';
import { User } from '../types/auth';

class AuthService {
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async register(userData: Partial<User>): Promise<User> {
    try {
      const response = await this.apiService.post(AUTH_ENDPOINTS.REGISTER, userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      const response = await this.apiService.post(AUTH_ENDPOINTS.LOGIN, { email, password });
      const { user, token } = response.data;
      localStorage.setItem('authToken', token);
      this.apiService.setAuthToken(token);
      return { user, token };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.removeItem('authToken');
      this.apiService.setAuthToken(null);
      await this.apiService.post(AUTH_ENDPOINTS.LOGOUT);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.apiService.get(AUTH_ENDPOINTS.CURRENT_USER);
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const response = await this.apiService.post(AUTH_ENDPOINTS.REFRESH_TOKEN);
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      this.apiService.setAuthToken(token);
      return token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await this.apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await this.apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, { token, newPassword });
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }
}

export const authService = new AuthService();

// Human tasks:
// TODO: Implement proper error handling for authentication failures
// TODO: Set up secure token storage mechanism (e.g., HttpOnly cookies)
// TODO: Implement token refresh logic to handle token expiration
// TODO: Add multi-factor authentication support