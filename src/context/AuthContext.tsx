import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rollNumber?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored token and get current user
    const token = localStorage.getItem('token');
    if (token) {
      apiService.setToken(token);
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('Failed to get current user:', error);
      // Clear invalid token
      apiService.clearToken();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, rollNumber?: string): Promise<void> => {
    setLoading(true);

    try {
      const response = await apiService.login(email, password, rollNumber);
      if (response.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiService.logout().catch(console.error);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};