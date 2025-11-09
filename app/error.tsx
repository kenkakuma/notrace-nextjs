'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error('全局错误:', error)
  }, [error])

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
          下のボタンをクリックして再試行してください。
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-gray-100 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-text-secondary mb-2 font-semibold">エラー詳細:</p>
            <pre className="text-xs text-red-600 overflow-auto">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-text-secondary mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            もう一度試す
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
