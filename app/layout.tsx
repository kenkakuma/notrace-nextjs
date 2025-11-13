import type { Metadata } from 'next'
import './globals.css'
import { RootLayout as AppRootLayout } from '@/components/RootLayout'
import { GoogleAnalytics } from './components/GoogleAnalytics'
import { Noto_Serif_JP } from 'next/font/google'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://no-trace.jp'),
  title: {
    default: 'NO TRACE EXPLORATION | 無迹探索株式会社',
    template: '%s | NO TRACE EXPLORATION',
  },
  description: '北京の直火焙煎技術と日本の品質管理を融合。日中をつなぐコーヒー商社、NO TRACE EXPLORATION（無迹探索株式会社）。貿易・OEM・設備・展示サービスを提供。',
  keywords: ['コーヒー', 'Coffee', '日中貿易', '焙煎', 'OEM', '品質管理', '北京', '日本', 'NO TRACE EXPLORATION', '無迹探索'],
  authors: [{ name: 'NO TRACE EXPLORATION' }],
  creator: 'NO TRACE EXPLORATION',
  publisher: 'NO TRACE EXPLORATION',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://no-trace.jp',
    siteName: 'NO TRACE EXPLORATION',
    title: 'NO TRACE EXPLORATION | 無迹探索株式会社',
    description: '北京の直火焙煎技術と日本の品質管理を融合。日中をつなぐコーヒー商社。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NO TRACE EXPLORATION',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NO TRACE EXPLORATION | 無迹探索株式会社',
    description: '北京の直火焙煎技術と日本の品質管理を融合。日中をつなぐコーヒー商社。',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://no-trace.jp',
  },
  verification: {
    google: 'google-site-verification-code', // TODO: Replace with actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSerifJP.variable}>
      <head>
        <GoogleAnalytics />
      </head>
      <body className="antialiased">
        <AppRootLayout>
          {children}
        </AppRootLayout>
      </body>
    </html>
  )
}
