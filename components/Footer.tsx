'use client'

import Link from 'next/link'

const services = [
  { title: 'コーヒー', to: '/coffee' },
  { title: 'エキシビション', to: '/exhibition' },
  { title: 'ショップ', to: '/shop' },
  { title: 'クラブ', to: '/club' }
]

const companyInfo = [
  { title: '企業情報', to: '/about' },
  { title: 'プライバシーポリシー', to: '/privacy' },
  { title: '利用規約', to: '/terms' }
]

export function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ブランド情報 */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-2">NO TRACE EXPLORATION</h3>
            <p className="text-sm mb-3">無迹探索株式会社</p>
            <p className="text-sm text-white/80 leading-relaxed">
              革新的なソリューションで新たなビジネス価値を創造し、
              お客様と共に成長する企業です。
            </p>
          </div>

          {/* サービス一覧 */}
          <div>
            <h4 className="font-semibold mb-4 text-base">サービス</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.to}>
                  <Link
                    href={service.to}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 企業情報 */}
          <div>
            <h4 className="font-semibold mb-4 text-base">企業情報</h4>
            <ul className="space-y-2">
              {companyInfo.map((info) => (
                <li key={info.to}>
                  <Link
                    href={info.to}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {info.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 会社所在地 */}
          <div>
            <h4 className="font-semibold mb-4 text-base">会社所在地</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              〒107-0062<br />
              東京都港区南青山二丁目２番８号<br />
              ＤＦビル
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-sm text-white/80 hover:text-white transition-colors underline"
            >
              お問い合わせ
            </Link>
          </div>
        </div>

        {/* 区切り線 */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
            <p>&copy; {new Date().getFullYear()} NO TRACE EXPLORATION. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
