import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; retry: () => void }>
}

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to monitoring service in production
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // In production, you would send this to your error tracking service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  retry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return <FallbackComponent error={this.state.error} retry={this.retry} />
    }

    return this.props.children
  }
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ error?: Error; retry: () => void }> = ({ error, retry }) => (
  <div className="error-boundary">
    <div className="error-content">
      <h2>Something went wrong</h2>
      <p>We apologize for the inconvenience. The error has been reported to our team.</p>
      {process.env.NODE_ENV === 'development' && error && (
        <details className="error-details">
          <summary>Error details</summary>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </details>
      )}
      <button onClick={retry} className="retry-button">
        Try again
      </button>
    </div>
    <style jsx>{`
      .error-boundary {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 2rem;
      }

      .error-content {
        text-align: center;
        max-width: 500px;
      }

      .error-content h2 {
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      .error-content p {
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .error-details {
        text-align: left;
        margin: 1rem 0;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.5rem;
      }

      .error-details pre {
        font-size: 0.875rem;
        white-space: pre-wrap;
        margin: 0.5rem 0;
      }

      .retry-button {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid rgba(255, 255, 255, 0.3);
        padding: 0.75rem 2rem;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.2s ease;
      }

      .retry-button:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
      }
    `}</style>
  </div>
)

// Export with performance optimization
export const ErrorBoundary: React.FC<ErrorBoundaryProps> = React.memo((props) => (
  <ErrorBoundaryClass {...props} />
))

ErrorBoundary.displayName = 'ErrorBoundary'