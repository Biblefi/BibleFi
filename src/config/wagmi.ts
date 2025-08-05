import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Bible.fi',
  projectId: process.env.VITE_WALLET_CONNECT_PROJECT_ID || 'your_project_id',
  chains: [base, baseSepolia],
  ssr: false, // Optimize for SPA
})

// Performance optimized Web3 constants
export const CHAIN_CONFIG = {
  mainnet: {
    chainId: base.id,
    name: base.name,
    rpcUrl: base.rpcUrls.default.http[0],
    blockExplorer: base.blockExplorers?.default.url,
  },
  testnet: {
    chainId: baseSepolia.id,
    name: baseSepolia.name,
    rpcUrl: baseSepolia.rpcUrls.default.http[0],
    blockExplorer: baseSepolia.blockExplorers?.default.url,
  },
} as const

// Contract addresses (to be updated with actual deployments)
export const CONTRACTS = {
  BIBLE_TOKEN: '0x0000000000000000000000000000000000000000',
  STAKING_POOL: '0x0000000000000000000000000000000000000000',
  FAITH_VAULT: '0x0000000000000000000000000000000000000000',
} as const

// Performance optimization: Pre-defined common token addresses
export const TOKENS = {
  ETH: '0x0000000000000000000000000000000000000000',
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // Base USDC
  BIBLE: CONTRACTS.BIBLE_TOKEN,
} as const