'use client'

import { useState, useEffect } from 'react'
import { Save, RotateCcw, Eye, AlertCircle, CheckCircle, Loader, Image as ImageIcon } from 'lucide-react'

interface HeroConfig {
  title: string
  backgroundImage: string
  heroTitle: string
  subtitle: string
  description: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
  lastUpdated: string
}

export function HeroManagementPanel() {
  const [config, setConfig] = useState<HeroConfig>({
    title: '主页Hero配置',
    backgroundImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    heroTitle: '品質を極め、文化をつなぐ',
    subtitle: '日中コーヒービジネスの新基準',
    description: '北京で磨いた焙煎技術と、日本の品質管理を融合。\n両国の架け橋として、コーヒー文化の発展に貢献します。',
    button1Text: '私たちについて',
    button1Link: '/about',
    button2Text: 'サービス詳細',
    button2Link: '/coffee',
    lastUpdated: new Date().toISOString()
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    // Hero設定を取得
    fetch('/api/hero-config')
      .then(res => res.json())
      .then(data => {
        setConfig(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Hero設定の取得に失敗:', err)
        setLoading(false)
      })
  }, [])

  const handleSave = async () => {
    setSaving(true)

    try {
      // TODO: API実装 - Hero設定を保存
      await new Promise(resolve => setTimeout(resolve, 1500))

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error('保存に失敗:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    if (confirm('変更を破棄してリセットしますか?')) {
      // 初期値にリセット
      setLoading(true)
      setTimeout(() => setLoading(false), 500)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-dark mb-2">
              Hero セクション管理
            </h2>
            <p className="text-text-secondary">
              トップページのHeroセクションの内容を編集できます
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4" />
              {previewMode ? '編集' : 'プレビュー'}
            </button>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors"
            >
              サイトで確認
            </a>
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-900 font-medium">
              変更が保存されました
            </span>
          </div>
        </div>
      )}

      {previewMode ? (
        /* Preview Mode */
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h3 className="font-semibold text-text-dark">プレビュー</h3>
          </div>
          <div
            className="relative h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${config.backgroundImage})` }}
          >
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white max-w-3xl px-4">
                <h1 className="text-5xl font-bold mb-4">{config.heroTitle}</h1>
                <p className="text-2xl mb-2">{config.subtitle}</p>
                <p className="text-lg mb-8 whitespace-pre-line">{config.description}</p>
                <div className="flex gap-4 justify-center">
                  <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold">
                    {config.button1Text}
                  </button>
                  <button className="px-8 py-3 bg-white text-text-dark rounded-lg font-semibold">
                    {config.button2Text}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          {/* Background Image */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              背景画像URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={config.backgroundImage}
                onChange={(e) => setConfig({ ...config, backgroundImage: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="https://..."
              />
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors">
                <ImageIcon className="w-4 h-4" />
                選択
              </button>
            </div>
            {config.backgroundImage && (
              <div className="mt-3 relative h-40 rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={config.backgroundImage}
                  alt="背景プレビュー"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Hero Title */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              メインタイトル
            </label>
            <input
              type="text"
              value={config.heroTitle}
              onChange={(e) => setConfig({ ...config, heroTitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="品質を極め、文化をつなぐ"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              サブタイトル
            </label>
            <input
              type="text"
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="日中コーヒービジネスの新基準"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-text-dark mb-2">
              説明文
            </label>
            <textarea
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              placeholder="説明文を入力..."
            />
          </div>

          {/* Buttons */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-text-dark">ボタン1 (Primary)</h4>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  ボタンテキスト
                </label>
                <input
                  type="text"
                  value={config.button1Text}
                  onChange={(e) => setConfig({ ...config, button1Text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  リンク先
                </label>
                <input
                  type="text"
                  value={config.button1Link}
                  onChange={(e) => setConfig({ ...config, button1Link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-text-dark">ボタン2 (Secondary)</h4>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  ボタンテキスト
                </label>
                <input
                  type="text"
                  value={config.button2Text}
                  onChange={(e) => setConfig({ ...config, button2Text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  リンク先
                </label>
                <input
                  type="text"
                  value={config.button2Link}
                  onChange={(e) => setConfig({ ...config, button2Link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            リセット
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                変更を保存
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-medium mb-2">変更について</p>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>変更は保存後、即座にサイトに反映されます</li>
              <li>背景画像はCloudinaryまたは外部URLを使用できます</li>
              <li>リンク先は相対パス（/about）または絶対URL（https://...）を指定できます</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
