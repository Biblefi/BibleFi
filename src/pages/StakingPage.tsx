import React from 'react'
import { motion } from 'framer-motion'

const StakingPage: React.FC = () => {
  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Faith-Based Staking</h1>
      <p>Stake your tokens and earn rewards while supporting faith-based initiatives.</p>
      
      <style jsx>{`
        .container {
          color: white;
          text-align: center;
          padding: 2rem 0;
        }
        
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        p {
          font-size: 1.2rem;
          opacity: 0.9;
        }
      `}</style>
    </motion.div>
  )
}

export default StakingPage