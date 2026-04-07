// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
  } else {
    fn()
  }
}

// Web Vitals measurement
export const measureWebVitals = () => {
  if (typeof window !== 'undefined') {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime)
        }
      }
    }).observe({ type: 'paint', buffered: true })

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
    }).observe({ type: 'largest-contentful-paint', buffered: true })

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('FID:', (entry as any).processingStart - entry.startTime)
      }
    }).observe({ type: 'first-input', buffered: true })
  }
}

// Bundle size analyzer helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build with npm run analyze')
  }
}

// Memory leak detection
export const detectMemoryLeaks = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const checkMemory = () => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory
        console.log('Memory usage:', {
          used: Math.round(memInfo.usedJSHeapSize / 1048576),
          total: Math.round(memInfo.totalJSHeapSize / 1048576),
          limit: Math.round(memInfo.jsHeapSizeLimit / 1048576)
        })
      }
    }
    
    // Check memory every 30 seconds in development
    if (process.env.NODE_ENV === 'development') {
      setInterval(checkMemory, 30000)
    }
  }
}

// Optimize images loading
export const optimizeImageLoading = () => {
  if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    return true
  }
  return false
}

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('SW registered: ', registration)
      return registration
    } catch (error) {
      console.log('SW registration failed: ', error)
    }
  }
}