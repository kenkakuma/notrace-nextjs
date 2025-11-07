import { HeroSection } from '@/components/HeroSection'
import { BusinessValueSection } from '@/components/BusinessValueSection'
import { PhilosophySection } from '@/components/PhilosophySection'
import { FeaturedArticlesSection } from '@/components/FeaturedArticlesSection'
import { FAQSection } from '@/components/FAQSection'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Business Value Section */}
      <BusinessValueSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Featured Articles Section */}
      <FeaturedArticlesSection />

      {/* FAQ Section */}
      <FAQSection />
    </main>
  )
}
