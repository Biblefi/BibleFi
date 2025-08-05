import React from 'react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

// Memoized feature card component
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ title, description, icon }) => (
  <motion.div
    className="feature-card"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
    
    <style jsx>{`
      .feature-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        color: white;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .feature-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
      }

      .feature-description {
        opacity: 0.9;
        line-height: 1.6;
        flex: 1;
      }
    `}</style>
  </motion.div>
))

FeatureCard.displayName = 'FeatureCard'

const FeaturesSection: React.FC = () => {
  // Memoize the features data to prevent unnecessary re-renders
  const features = React.useMemo(() => [
    {
      title: 'Faith-Based Investing',
      description: 'Invest according to biblical principles with automated screening and ethical guidelines.',
      icon: '✝️'
    },
    {
      title: 'Community Giving',
      description: 'Automatically donate a portion of your yields to charitable causes and ministries.',
      icon: '🤝'
    },
    {
      title: 'Daily Devotions',
      description: 'Receive daily Bible verses and spiritual insights integrated with your investment journey.',
      icon: '📖'
    },
    {
      title: 'Secure Vaults',
      description: 'Store your assets safely with battle-tested smart contracts and multi-sig security.',
      icon: '🔒'
    },
    {
      title: 'Yield Farming',
      description: 'Earn competitive returns through optimized DeFi strategies and liquidity provision.',
      icon: '🌱'
    },
    {
      title: 'Base Network',
      description: 'Built on Coinbase\'s Base network for fast, cheap, and reliable transactions.',
      icon: '⚡'
    }
  ], [])

  return (
    <section className="features-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Features That Matter
        </motion.h2>
        
        <motion.div
          className="features-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          color: white;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          font-weight: 700;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 2rem 0;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default React.memo(FeaturesSection)