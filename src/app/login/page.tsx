'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, state } = useAuth();
  const router = useRouter();

  // If already logged in, redirect based on role
  useEffect(() => {
    if (state.isAuthenticated) {
      redirectBasedOnRole(state.user?.role);
    }
  }, [state.isAuthenticated, state.user?.role]);

  const redirectBasedOnRole = (role?: string) => {
    if (role === 'admin' || role === 'vendor') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Determine role based on email
      let role: 'user' | 'admin' | 'vendor' = 'user';
      if (email.includes('admin')) role = 'admin';
      if (email.includes('vendor')) role = 'vendor';
      
      await login(email, password, role);
      toast.success('Logged in successfully!');
      redirectBasedOnRole(role);
    } catch (error) {
      toast.error('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="user@example.com"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
            placeholder="••••••••"
          />
        </div>
        
        <button
          type="submit"
          disabled={state.isLoading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {state.isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>Demo credentials:</p>
          <ul className="list-disc pl-5 mt-1">
            <li>Admin: admin@example.com (any password)</li>
            <li>Vendor: vendor@example.com (any password)</li>
            <li>User: user@example.com (any password)</li>
          </ul>
        </div>
      </form>
    </div>
  );
}