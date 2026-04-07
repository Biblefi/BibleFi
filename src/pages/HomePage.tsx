import React from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'

// Lazy load heavy components
const StatsGrid = React.lazy(() => import('../components/StatsGrid'))
const FeaturesSection = React.lazy(() => import('../components/FeaturesSection'))

const HomePage: React.FC = () => {
  const { isConnected } = useAccount()

  return (
    <div className="container">
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-content">
          <h1 className="hero-title">
            Faith Meets <span className="gradient-text">Finance</span>
          </h1>
          <p className="hero-subtitle">
            The world's first Bible-based DeFi platform. Invest with purpose,
            grow with faith, and build community through decentralized finance.
          </p>
          <div className="hero-actions">
            {isConnected ? (
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Investing
              </motion.button>
            ) : (
              <p className="connect-prompt">Connect your wallet to begin</p>
            )}
          </div>
        </div>
      </motion.section>

      <React.Suspense fallback={<div className="section-loading">Loading stats...</div>}>
        <StatsGrid />
      </React.Suspense>

      <React.Suspense fallback={<div className="section-loading">Loading features...</div>}>
        <FeaturesSection />
      </React.Suspense>

      <style jsx>{`
        .hero {
          text-align: center;
          padding: 4rem 0;
          color: white;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .gradient-text {
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          opacity: 0.9;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .hero-actions {
          margin-top: 2rem;
        }

        .cta-button {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .cta-button:hover {
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          transform: translateY(-2px);
        }

        .connect-prompt {
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .section-loading {
          text-align: center;
          padding: 2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 768px) {
          .hero {
            padding: 2rem 0;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage