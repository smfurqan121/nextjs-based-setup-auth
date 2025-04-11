'use client'

import { RoleGuard } from '@/components/RoleGuard'
import React from 'react'
// import { ConfigProvider } from 'antd';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

function page({ children }:{ children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['admin', 'vendor']}>
         <div>
           {children}
           <h1>Dashboard</h1>
         </div>
         </RoleGuard>
        
  )
}

export default page
