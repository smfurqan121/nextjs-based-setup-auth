export interface User {
    id: string;
    email: string;
    role: 'user' | 'admin' | 'vendor';
    name: string;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }