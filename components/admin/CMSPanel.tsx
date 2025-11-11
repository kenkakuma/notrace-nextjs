'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, AlertCircle, CheckCircle, Loader } from 'lucide-react'

export function CMSPanel() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // CMSの読み込み状態を監視
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-dark mb-2">
              Sveltia CMS統合
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              企業文章とニュースをGit-based CMSで管理できます。変更は自動的にGitにコミットされます。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/admin/cms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                別タブでCMSを開く
              </a>
              <a
                href="/articles"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                記事一覧を確認
              </a>
              <a
                href="/news"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                ニュース一覧を確認
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* CMS Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            {/* 动态统计 */}
            --
          </div>
          <div className="text-sm text-text-secondary">
            公開中の企業文章
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            --
          </div>
          <div className="text-sm text-text-secondary">
            公開中のニュース
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-3xl font-bold text-primary mb-2">
            --
          </div>
          <div className="text-sm text-text-secondary">
            下書き
          </div>
        </div>
      </div>

      {/* CMS Iframe Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-dark">
                コンテンツ管理システム
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                記事とニュースをここで編集できます
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              {loading && (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>読み込み中...</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="relative" style={{ height: '800px' }}>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-text-secondary">CMSを読み込んでいます...</p>
              </div>
            </div>
          )}

          <iframe
            src="/admin/cms"
            className="w-full h-full border-0"
            title="Sveltia CMS"
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false)
              setError('CMSの読み込みに失敗しました')
            }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6">
        <h3 className="font-semibold text-text-dark mb-4">
          クイックアクション
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-text-dark mb-2">📝 新規記事作成</h4>
            <p className="text-sm text-text-secondary mb-3">
              企業文章を作成して公開
            </p>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              作成を開始 →
            </button>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-text-dark mb-2">📰 ニュース投稿</h4>
            <p className="text-sm text-text-secondary mb-3">
              プレスリリースやお知らせを投稿
            </p>
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              投稿を開始 →
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900 mb-2">エラー</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
