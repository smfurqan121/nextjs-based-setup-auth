'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from '@/auth/context';
import { LogoutButton } from '@/components/LogoutButton';

const queryClient = new QueryClient();

export default function App({ children }:{ children: React.ReactNode }) {
  const { state } = useAuth();
  return (
    
      <QueryClientProvider client={queryClient}>
        {children}
        
     
        <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome {state.user?.name}</h1>
        <LogoutButton />
      </div>
      
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Your Information</h2>
        <p><strong>Email:</strong> {state.user?.email}</p>
        <p><strong>Role:</strong> {state.user?.role}</p>
        
        {state.user?.role === 'admin' && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h3 className="font-medium">Admin Dashboard</h3>
            <p className="mt-2">You have access to all admin features.</p>
          </div>
        )}
        
        {state.user?.role === 'vendor' && (
          <div className="mt-4 p-4 bg-green-50 rounded">
            <h3 className="font-medium">Vendor Dashboard</h3>
            <p className="mt-2">You have access to vendor-specific features.</p>
          </div>
        )}
      </div>
    </div>
      </QueryClientProvider>
  
  );
}
