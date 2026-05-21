import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Caught error:', error, info.componentStack)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 mb-5">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Content failed to load
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
          This page encountered a rendering error. You can retry or navigate to another topic.
        </p>
        {import.meta.env.DEV && this.state.error && (
          <pre className="mb-6 max-w-full overflow-x-auto rounded-lg bg-gray-100 dark:bg-gray-900 p-4 text-left text-xs text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
            {this.state.error.message}
          </pre>
        )}
        <button
          onClick={this.handleReset}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      </div>
    )
  }
}
