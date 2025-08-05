import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { config } from '@/config/wagmi'
import { measureWebVitals, detectMemoryLeaks, registerServiceWorker } from '@/utils/performance'
import './index.css'

// Initialize performance monitoring
if (process.env.NODE_ENV === 'development') {
  measureWebVitals()
  detectMemoryLeaks()
}

// Register service worker for production
if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}

// Lazy load the main App component for code splitting
const App = React.lazy(() => import('./App'))

// Configure React Query with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error && 'status' in error && (error.status as number) >= 400 && (error.status as number) < 500) {
          return false
        }
        return failureCount < 3
      },
      refetchOnWindowFocus: false,
    },
  },
})

// Performance optimized root render
const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <React.Suspense fallback={
            <div className="loading">
              <div className="spinner" />
              Loading Bible.fi...
            </div>
          }>
            <App />
          </React.Suspense>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)