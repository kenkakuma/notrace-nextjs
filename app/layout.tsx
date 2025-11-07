import type { Metadata } from 'next'
import { Roboto, Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import { RootLayout as AppRootLayout } from '@/components/RootLayout'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
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
    <html lang="ja" className={`${roboto.variable} ${notoSansJp.variable}`}>
      <body className="antialiased font-roboto">
        <AppRootLayout>
          {children}
        </AppRootLayout>
      </body>
    </html>
  )
}
