import type { Metadata } from 'next'
import './globals.css'
import { RootLayout as AppRootLayout } from '@/components/RootLayout'
import { Noto_Serif_JP } from 'next/font/google'

const notoSerifJP = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-serif-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NO TRACE EXPLORER',
  description: '品質を極め、文化をつなぐ',
  generator: 'Next.js',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  metadataBase: new URL('https://no-trace.jp'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSerifJP.variable}>
      <body className="antialiased">
        <AppRootLayout>
          {children}
        </AppRootLayout>
      </body>
    </html>
  )
}
