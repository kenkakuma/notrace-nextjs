import { useState, useEffect, useCallback } from 'react'

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
  currentBackground: '/images/hero-bg-1.svg',
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

const LOCAL_IMAGE_OPTIONS = [
  '/images/hero-bg-1.svg',
  '/images/hero-bg-2.svg',
  '/images/hero-bg-3.svg',
  '/images/hero-bg-4.svg',
  '/images/hero-bg-5.svg',
  '/images/hero-bg-6.svg',
  '/images/default-hero-bg.svg',
]

const EXTERNAL_IMAGE_OPTIONS = [
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
]

export function useHeroData() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_CONFIG)

  // Load hero configuration from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('hero_simple_config')
        if (saved) {
          const parsedConfig = JSON.parse(saved) as HeroConfig
          if (
            parsedConfig.currentBackground &&
            (parsedConfig.currentBackground.startsWith('http') ||
              parsedConfig.currentBackground.startsWith('/images/'))
          ) {
            setConfig(parsedConfig)
          }
        }
      } catch (error) {
        console.warn('Failed to load saved hero config:', error)
      }
    }
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

  return {
    config,
    updateHeroConfig,
    updateBackgroundImage,
    resetToDefault,
    localImageOptions: LOCAL_IMAGE_OPTIONS,
    externalImageOptions: EXTERNAL_IMAGE_OPTIONS,
  }
}
