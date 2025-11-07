'use client'

import { ReactNode, useState, useEffect } from 'react'
import { Navigation } from './Navigation'
import { Footer } from './Footer'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      {/* Navigation Bar */}
      <Navigation />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 w-full">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  )
}

/**
 * Back to Top Button Component
 * Appears when user scrolls down the page
 */
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  // Show/hide button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      aria-label="Back to top"
      title="ページトップへ"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  )
}
