import { useMemo, useCallback } from 'react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { useQuery } from '@tanstack/react-query'
import { CHAIN_CONFIG, TOKENS } from '@/config/wagmi'

// Optimized Web3 hook with caching and performance improvements
export const useOptimizedWeb3 = () => {
  const { address, isConnected, isConnecting } = useAccount()
  const chainId = useChainId()

  // Memoize balance query to prevent unnecessary re-renders
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    query: {
      enabled: !!address,
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes
    }
  })

  // Memoize USDC balance query
  const { data: usdcBalance, isLoading: isUsdcLoading } = useBalance({
    address,
    token: TOKENS.USDC as `0x${string}`,
    query: {
      enabled: !!address,
      staleTime: 1000 * 30, // 30 seconds
      gcTime: 1000 * 60 * 5, // 5 minutes
    }
  })

  // Memoize chain configuration
  const currentChain = useMemo(() => {
    return chainId === CHAIN_CONFIG.mainnet.chainId 
      ? CHAIN_CONFIG.mainnet 
      : CHAIN_CONFIG.testnet
  }, [chainId])

  // Optimized wallet connection status
  const walletStatus = useMemo(() => ({
    isConnected,
    isConnecting,
    address,
    chainId,
    isCorrectChain: chainId === CHAIN_CONFIG.mainnet.chainId || chainId === CHAIN_CONFIG.testnet.chainId
  }), [isConnected, isConnecting, address, chainId])

  // Memoized formatted balances
  const formattedBalances = useMemo(() => ({
    eth: balance ? parseFloat(balance.formatted).toFixed(4) : '0.0000',
    usdc: usdcBalance ? parseFloat(usdcBalance.formatted).toFixed(2) : '0.00'
  }), [balance, usdcBalance])

  // Optimized transaction preparation
  const prepareTransaction = useCallback((to: string, value: bigint, data?: string) => {
    return {
      to: to as `0x${string}`,
      value,
      data: data as `0x${string}` | undefined,
      gas: 21000n, // Default gas limit
    }
  }, [])

  return {
    // Wallet status
    ...walletStatus,
    
    // Balances
    balance,
    usdcBalance,
    formattedBalances,
    isBalanceLoading: isBalanceLoading || isUsdcLoading,
    
    // Chain info
    currentChain,
    
    // Utilities
    prepareTransaction,
  }
}

// Hook for optimized contract interactions
export const useOptimizedContract = (contractAddress: string) => {
  const { address, chainId } = useAccount()

  // Cache contract read calls
  const useContractRead = (functionName: string, args: any[] = []) => {
    return useQuery({
      queryKey: ['contract', contractAddress, functionName, args, chainId],
      queryFn: async () => {
        // Contract read implementation would go here
        // This is a placeholder for actual contract interaction
        return null
      },
      enabled: !!contractAddress && !!address,
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes
    })
  }

  return {
    useContractRead,
    contractAddress,
    isEnabled: !!contractAddress && !!address,
  }
}