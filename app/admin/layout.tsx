import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '管理者ダッシュボード | NO TRACE EXPLORER',
  description: 'コンテンツ、画像、設定を一元管理',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
