'use client'

import React from 'react'
// import { ConfigProvider } from 'antd';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const queryClient = new QueryClient();

function page({ children }:{ children: React.ReactNode }) {
  return (
    
         <div>
           {children}
           <h1>Dashboard</h1>
           </div>
        
        
  )
}

export default page
