const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// API utility functions
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse(response: Response) {
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid
        this.clearToken();
        window.location.href = '/login';
      }
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await this.handleResponse(response);
    
    if (data.success && data.data.token) {
      this.setToken(data.data.token);
    }

    return data;
  }

  async register(userData: any) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });

    return this.handleResponse(response);
  }

  async getCurrentUser() {
    const response = await fetch(`${this.baseURL}/auth/me`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async updateProfile(profileData: any) {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(profileData),
    });

    return this.handleResponse(response);
  }

  async changePassword(passwordData: any) {
    const response = await fetch(`${this.baseURL}/auth/change-password`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(passwordData),
    });

    return this.handleResponse(response);
  }

  async forgotPassword(email: string) {
    const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email }),
    });

    return this.handleResponse(response);
  }

  async resetPassword(token: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/reset-password/${token}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify({ password }),
    });

    return this.handleResponse(response);
  }

  async logout() {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(),
    });

    this.clearToken();
    return this.handleResponse(response);
  }

  // Admin endpoints
  async getDashboardStats() {
    const response = await fetch(`${this.baseURL}/admin/dashboard/stats`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getRecentActivities() {
    const response = await fetch(`${this.baseURL}/admin/dashboard/activities`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getAIAlerts() {
    const response = await fetch(`${this.baseURL}/admin/dashboard/ai-alerts`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async getClassPerformance() {
    const response = await fetch(`${this.baseURL}/admin/dashboard/class-performance`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Generic CRUD operations
  async get(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  async post(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async put(endpoint: string, data: any) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  async delete(endpoint: string) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService;