"use client"

import { trpcClient } from '@/lib/trpc';
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const DashboardLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <QueryClientProvider client={queryClient}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            {children}
        </trpc.Provider>
    </QueryClientProvider>
  )
}

export default DashboardLayout