'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, User } from './types';

const AuthContext = createContext<{
  state: AuthState;
  login: (email: string, password: string, role: 'user' | 'admin' | 'vendor') => Promise<void>;
  logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, setState] = useState<AuthState>({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true, // Start with loading true
      error: null,
    });

  useEffect(() => {
    // Check localStorage for existing auth data
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
          setState({
            user: JSON.parse(user),
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState(prev => ({ ...prev, isLoading: false, error: 'Failed to initialize auth' }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, role: 'user' | 'admin' | 'vendor') => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: '123',
        email,
        role,
        name: role === 'admin' ? 'Admin User' : role === 'vendor' ? 'Vendor User' : 'Regular User',
      };
      
      const token = 'fake-jwt-token';
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Login failed',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};