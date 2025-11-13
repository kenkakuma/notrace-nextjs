'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FileText,
  Image as ImageIcon,
  Layout,
  Settings,
  Newspaper,
  LogOut
} from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { AdminTabs } from '@/components/admin/AdminTabs'
import { CMSPanel } from '@/components/admin/CMSPanel'
import { ImageManagementPanel } from '@/components/admin/ImageManagementPanel'
import { HeroManagementPanel } from '@/components/admin/HeroManagementPanel'

type TabType = 'cms' | 'images' | 'hero'

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('cms')

  const handleLogout = async () => {
    if (confirm('ログアウトしますか？')) {
      try {
        await fetch('/api/admin/auth', { method: 'DELETE' })
        router.push('/admin/login')
        router.refresh()
      } catch (error) {
        console.error('Logout failed:', error)
      }
    }
  }

  const tabs = [
    {
      id: 'cms' as TabType,
      label: 'CMS管理',
      icon: FileText,
      description: '企業文章とニュースの管理'
    },
    {
      id: 'images' as TabType,
      label: '画像管理',
      icon: ImageIcon,
      description: 'Cloudinary画像ライブラリ'
    },
    {
      id: 'hero' as TabType,
      label: 'Hero管理',
      icon: Layout,
      description: 'トップページHeroセクション'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <Container>
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-dark flex items-center gap-3">
                  <Settings className="w-8 h-8 text-primary" />
                  管理者ダッシュボード
                </h1>
                <p className="text-text-secondary mt-2">
                  コンテンツ、画像、設定を一元管理
                </p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  サイトを表示
                </a>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 border border-gray-300 text-text-dark rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  ログアウト
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <AdminTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab as TabType)}
          />
        </Container>
      </div>

      {/* Content Panels */}
      <div className="py-8">
        <Container size="wide">
          {activeTab === 'cms' && <CMSPanel />}
          {activeTab === 'images' && <ImageManagementPanel />}
          {activeTab === 'hero' && <HeroManagementPanel />}
        </Container>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-auto">
        <Container>
          <div className="py-6 text-center text-sm text-text-secondary">
            <p>
              NO TRACE EXPLORATION 管理システム v0.4.0
            </p>
            <p className="mt-1">
              問題がある場合は{' '}
              <a href="mailto:dev@no-trace.jp" className="text-primary hover:underline">
                dev@no-trace.jp
              </a>{' '}
              までご連絡ください
            </p>
          </div>
        </Container>
      </div>
    </div>
  )
}
