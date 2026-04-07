import React from 'react'
import { motion } from 'framer-motion'

interface StatCardProps {
  title: string
  value: string
  change?: string
  icon: string
}

// Memoized stat card component
const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, change, icon }) => (
  <motion.div
    className="stat-card"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="stat-icon">{icon}</div>
    <h3 className="stat-title">{title}</h3>
    <p className="stat-value">{value}</p>
    {change && <p className="stat-change">{change}</p>}
    
    <style jsx>{`
      .stat-card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 1rem;
        padding: 2rem;
        text-align: center;
        color: white;
      }

      .stat-icon {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .stat-title {
        font-size: 0.875rem;
        opacity: 0.8;
        margin-bottom: 0.5rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      .stat-value {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
      }

      .stat-change {
        font-size: 0.875rem;
        color: #4ade80;
      }
    `}</style>
  </motion.div>
))

StatCard.displayName = 'StatCard'

const StatsGrid: React.FC = () => {
  // Memoize the stats data to prevent unnecessary re-renders
  const stats = React.useMemo(() => [
    {
      title: 'Total Value Locked',
      value: '$2.5M',
      change: '+15.2% this month',
      icon: '💰'
    },
    {
      title: 'Active Believers',
      value: '12.3K',
      change: '+8.7% this month',
      icon: '👥'
    },
    {
      title: 'Faith Points Earned',
      value: '45.2M',
      change: '+23.1% this month',
      icon: '⭐'
    },
    {
      title: 'Charitable Donations',
      value: '$125K',
      change: '+31.5% this month',
      icon: '❤️'
    }
  ], [])

  return (
    <section className="stats-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Platform Statistics
        </motion.h2>
        
        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 4rem 0;
        }

        .section-title {
          text-align: center;
          color: white;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: 2rem 0;
          }

          .section-title {
            font-size: 2rem;
            margin-bottom: 2rem;
          }

          .stats-grid {
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default React.memo(StatsGrid)