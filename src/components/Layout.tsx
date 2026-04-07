import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: React.ReactNode
}

// Memoized navigation component for performance
const Navigation = React.memo(() => {
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/staking', label: 'Staking' },
    { path: '/vaults', label: 'Vaults' },
    { path: '/verse', label: 'Daily Verse' },
  ]

  return (
    <nav className="nav">
      {navItems.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link--active' : ''}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
})

Navigation.displayName = 'Navigation'

// Memoized header component
const Header = React.memo(() => (
  <motion.header
    className="header"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="container">
      <div className="header-content">
        <div className="logo">
          <h1>Bible.fi</h1>
          <span className="tagline">Faith-Based DeFi</span>
        </div>
        <Navigation />
        <ConnectButton />
      </div>
    </div>
  </motion.header>
))

Header.displayName = 'Header'

// Main layout component with performance optimizations
export const Layout: React.FC<LayoutProps> = React.memo(({ children }) => {
  return (
    <div className="app">
      <Header />
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Bible.fi - Building faith through DeFi</p>
        </div>
      </footer>
      <style jsx>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          gap: 2rem;
        }

        .logo h1 {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .tagline {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.875rem;
        }

        .nav {
          display: flex;
          gap: 2rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .nav-link:hover,
        .nav-link--active {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .main {
          flex: 1;
          padding: 2rem 0;
        }

        .footer {
          background: rgba(0, 0, 0, 0.2);
          color: rgba(255, 255, 255, 0.8);
          padding: 1rem 0;
          text-align: center;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
          }

          .nav {
            gap: 1rem;
          }

          .nav-link {
            padding: 0.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>
    </div>
  )
})

Layout.displayName = 'Layout'