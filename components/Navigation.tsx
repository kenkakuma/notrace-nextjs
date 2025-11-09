'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavItem {
  title: string
  to: string
  icon: string
}

const navigationItems: NavItem[] = [
  { title: 'コーヒー', to: '/coffee', icon: 'coffee' },
  { title: 'エキシビション', to: '/exhibition', icon: 'calendar' },
  { title: 'ショップ', to: '/lab', icon: 'shopping-bag' },
  { title: 'クラブ', to: '/club', icon: 'users' },
  { title: '企業情報', to: '/about', icon: 'info' },
  { title: 'お問い合わせ', to: '/contact', icon: 'mail' }
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 管理メニュー以外をクリックで閉じる
  useEffect(() => {
    const handleClickOutside = () => {
      setAdminMenuOpen(false)
    }

    if (adminMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [adminMenuOpen])

  return (
    <>
      {/* ナビゲーションバー */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 h-20 ${
          scrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/95 backdrop-blur-sm shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* ブランドロゴ */}
          <Link href="/" className="flex items-center no-underline">
            <div className="flex flex-col">
              <h1 className="hidden md:block text-xl font-bold text-text-dark">
                NO TRACE EXPLORER
                <span className="text-sm font-normal ml-2">| 無迹探索株式会社</span>
              </h1>
              <h1 className="md:hidden text-xl font-bold text-text-dark">NTE</h1>
            </div>
          </Link>

          <div className="flex-1" />

          {/* デスクトップナビゲーションメニュー */}
          <div className="hidden lg:flex gap-1 items-center">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
                  'text-text-dark hover:bg-opacity-10 hover:bg-primary'
                }`}
              >
                {item.title}
              </Link>
            ))}

            {/* 管理システムドロップダウン */}
            <div className="relative ml-4 pl-4 border-l border-gray-300">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setAdminMenuOpen(!adminMenuOpen)
                }}
                className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium text-text-dark hover:bg-opacity-10 hover:bg-primary"
              >
                管理システム
                <ChevronDown size={16} className={`transition-transform ${adminMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* ドロップダウンメニュー */}
              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <Link
                    href="/admin"
                    onClick={() => setAdminMenuOpen(false)}
                    className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                  >
                    管理中心
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="メニュー"
          >
            {drawerOpen ? (
              <X size={24} className="text-text-dark" />
            ) : (
              <Menu size={24} className="text-text-dark" />
            )}
          </button>
        </div>
      </nav>

      {/* モバイルドロワーナビゲーション */}
      {drawerOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          {/* 背景 */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />

          {/* ドロワーコンテンツ */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col">
            {/* クローズボタン */}
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold text-text-dark">メニュー</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* ナビゲーションアイテム */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="block px-4 py-3 text-text-dark hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-primary"
                >
                  {item.title}
                </Link>
              ))}

              {/* 管理システム */}
              <div className="px-4 py-3 border-b border-gray-200">
                <button
                  onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                  className="w-full text-left text-text-dark hover:bg-gray-50 transition-colors flex items-center justify-between py-2"
                >
                  管理システム
                  <ChevronDown size={16} className={`transition-transform ${adminMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {adminMenuOpen && (
                  <Link
                    href="/admin"
                    onClick={() => {
                      setDrawerOpen(false)
                      setAdminMenuOpen(false)
                    }}
                    className="block px-4 py-2 text-sm text-text-dark hover:bg-gray-100 transition-colors rounded mt-2"
                  >
                    管理中心
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
