import { useState, useEffect, useCallback } from 'react'
import { CldImage } from 'next-cloudinary'

export interface HeroContent {
  title: string
  description: string
  button1Text: string
  button1Link: string
  button2Text: string
  button2Link: string
}

export interface HeroConfig {
  currentBackground: string
  heroContent: HeroContent
  lastUpdated: string
}

const DEFAULT_CONFIG: HeroConfig = {
  currentBackground: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  heroContent: {
    title: '品質を極め、文化をつなぐ',
    description:
      '日中コーヒービジネスの新基準\n\n北京で磨いた焙煎技術と、日本の品質管理を融合。\n両国の架け橋として、コーヒー文化の発展に貢献します。',
    button1Text: '私たちについて',
    button1Link: '/about',
    button2Text: 'サービス詳細',
    button2Link: '/coffee',
  },
  lastUpdated: new Date().toISOString(),
}

export function useHeroData() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_CONFIG)
  const [loading, setLoading] = useState(true)

  // Load hero configuration from API or markdown file
  useEffect(() => {
    async function loadConfig() {
      try {
        // Try to fetch from API endpoint (which reads from markdown)
        const response = await fetch('/api/hero-config')
        if (response.ok) {
          const data = await response.json()
          setConfig(data)
        } else {
          // Fallback to localStorage
          if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('hero_simple_config')
            if (saved) {
              const parsedConfig = JSON.parse(saved) as HeroConfig
              if (
                parsedConfig.currentBackground &&
                (parsedConfig.currentBackground.startsWith('http') ||
                  parsedConfig.currentBackground.startsWith('/'))
              ) {
                setConfig(parsedConfig)
              }
            }
          }
        }
      } catch (error) {
        console.warn('Failed to load hero config from API:', error)
        // Try localStorage as fallback
        if (typeof window !== 'undefined') {
          try {
            const saved = localStorage.getItem('hero_simple_config')
            if (saved) {
              const parsedConfig = JSON.parse(saved) as HeroConfig
              setConfig(parsedConfig)
            }
          } catch (e) {
            console.warn('Failed to load from localStorage:', e)
          }
        }
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  // Update hero configuration
  const updateHeroConfig = useCallback((newConfig: Partial<HeroConfig>) => {
    setConfig((prevConfig) => {
      const updated: HeroConfig = {
        ...prevConfig,
        ...newConfig,
        lastUpdated: new Date().toISOString(),
      }

      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('hero_simple_config', JSON.stringify(updated))
      }

      return updated
    })
  }, [])

  // Update background image
  const updateBackgroundImage = useCallback(
    (imageUrl: string) => {
      updateHeroConfig({ currentBackground: imageUrl })
    },
    [updateHeroConfig]
  )

  // Reset to default configuration
  const resetToDefault = useCallback(() => {
    setConfig({ ...DEFAULT_CONFIG })
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hero_simple_config')
    }
  }, [])

  // Check if image is from Cloudinary
  const isCloudinaryImage = (url: string) => {
    return url.includes('cloudinary.com') || url.includes('res.cloudinary.com')
  }

  return {
    config,
    loading,
    updateHeroConfig,
    updateBackgroundImage,
    resetToDefault,
    isCloudinaryImage,
  }
}
