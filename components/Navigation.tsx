'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'

interface SubMenuItem {
  title: string
  to: string
  description?: string
}

interface NavItem {
  title: string
  to?: string
  icon: string
  submenu?: SubMenuItem[]
}

const navigationItems: NavItem[] = [
  {
    title: 'コーヒー事業',
    icon: 'coffee',
    submenu: [
      { title: '貿易・OEM', to: '/coffee', description: 'コーヒー貿易とOEMサービス' },
      { title: '展示サービス', to: '/exhibition', description: '文化・技術展示の企画運営' }
    ]
  },
  {
    title: 'ショップ',
    icon: 'shopping-bag',
    submenu: [
      { title: '設備・器具', to: '/shop', description: 'プロ向けコーヒー機器' },
      { title: 'コミュニティ', to: '/club', description: '会員制プログラム' }
    ]
  },
  { title: '企業情報', to: '/about', icon: 'info' },
  { title: 'お問い合わせ', to: '/contact', icon: 'mail' }
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [adminMenuOpen, setAdminMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null)

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // タイムアウトをクリーンアップ
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout)
      }
    }
  }, [closeTimeout])

  // メニューを開く（遅延キャンセル）
  const handleMenuEnter = (itemTitle: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout)
      setCloseTimeout(null)
    }
    setOpenSubmenu(itemTitle)
  }

  // メニューを閉じる（300ms遅延）
  const handleMenuLeave = () => {
    const timeout = setTimeout(() => {
      setOpenSubmenu(null)
    }, 300)
    setCloseTimeout(timeout)
  }

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
                NO TRACE EXPLORATION
                <span className="text-sm font-normal ml-2">| 無迹探索株式会社</span>
              </h1>
              <h1 className="md:hidden text-xl font-bold text-text-dark">NTE</h1>
            </div>
          </Link>

          <div className="flex-1" />

          {/* デスクトップナビゲーションメニュー */}
          <div className="hidden lg:flex gap-1 items-center">
            {navigationItems.map((item) => (
              <div key={item.title} className="relative">
                {item.submenu ? (
                  // ドロップダウンメニュー付きアイテム
                  <>
                    <button
                      onMouseEnter={() => handleMenuEnter(item.title)}
                      onMouseLeave={handleMenuLeave}
                      className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium text-text-dark hover:bg-opacity-10 hover:bg-primary"
                    >
                      {item.title}
                      <ChevronDown size={14} />
                    </button>
                    {openSubmenu === item.title && (
                      <div
                        onMouseEnter={() => handleMenuEnter(item.title)}
                        onMouseLeave={handleMenuLeave}
                        className="absolute left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                      >
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.to}
                            href={subItem.to}
                            className="block px-4 py-3 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium mb-1">{subItem.title}</div>
                            {subItem.description && (
                              <div className="text-xs text-text-secondary">{subItem.description}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // 通常のリンク
                  <Link
                    href={item.to!}
                    className="px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium text-text-dark hover:bg-opacity-10 hover:bg-primary"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
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
                <div key={item.title}>
                  {item.submenu ? (
                    // サブメニュー付きアイテム
                    <>
                      <button
                        onClick={() => setOpenSubmenu(openSubmenu === item.title ? null : item.title)}
                        className="w-full flex items-center justify-between px-4 py-3 text-text-dark hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-primary"
                      >
                        <span className="font-medium">{item.title}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openSubmenu === item.title ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {openSubmenu === item.title && (
                        <div className="bg-gray-50">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.to}
                              href={subItem.to}
                              onClick={() => {
                                setDrawerOpen(false)
                                setOpenSubmenu(null)
                              }}
                              className="block px-8 py-2 text-sm text-text-dark hover:bg-gray-100 transition-colors"
                            >
                              {subItem.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    // 通常のリンク
                    <Link
                      href={item.to!}
                      onClick={() => setDrawerOpen(false)}
                      className="block px-4 py-3 text-text-dark hover:bg-gray-50 transition-colors border-l-4 border-transparent hover:border-primary"
                    >
                      {item.title}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
