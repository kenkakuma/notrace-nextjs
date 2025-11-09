'use client'

import { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * 错误边界组件
 * 捕获子组件中的JavaScript错误,记录错误并显示备用UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 可以将错误日志上报给服务器
    console.error('错误边界捕获到错误:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback,使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <svg
                className="mx-auto h-16 w-16 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              エラーが発生しました
            </h1>
            <p className="text-lg text-text-secondary mb-8">
              申し訳ございません。予期しないエラーが発生しました。
              <br />
              ページを更新するか、しばらく時間をおいて再度お試しください。
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="bg-gray-100 rounded-lg p-4 mb-8 text-left">
                <p className="text-sm text-text-secondary mb-2 font-semibold">エラー詳細:</p>
                <pre className="text-xs text-red-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                ページを更新
              </button>
              <a
                href="/"
                className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300"
              >
                ホームページへ戻る
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
