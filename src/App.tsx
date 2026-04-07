import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Layout } from './components/Layout'

// Lazy load pages for code splitting and better performance
const HomePage = React.lazy(() => import('./pages/HomePage'))
const StakingPage = React.lazy(() => import('./pages/StakingPage'))
const VaultsPage = React.lazy(() => import('./pages/VaultsPage'))
const VerseOfDayPage = React.lazy(() => import('./pages/VerseOfDayPage'))

// Performance optimized loading component
const PageLoader = () => (
  <div className="loading">
    <div className="spinner" />
    Loading...
  </div>
)

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <React.Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/staking" element={<StakingPage />} />
              <Route path="/vaults" element={<VaultsPage />} />
              <Route path="/verse" element={<VerseOfDayPage />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  )
}

export default App