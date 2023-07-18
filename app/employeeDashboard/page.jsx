"use client";
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EmployeeDashboard from '../components/EmployeeDashboard';

const queryClient = new QueryClient();

function Dashboard({ ...props }) {
  const email = props.searchParams.email;
  return (
    <QueryClientProvider client={queryClient}>
      <EmployeeDashboard email={email} />
    </QueryClientProvider>
  )
}



export default Dashboard;
