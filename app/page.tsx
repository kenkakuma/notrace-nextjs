import { HeroSection } from '@/components/HeroSection'
import { BusinessValueSection } from '@/components/BusinessValueSection'
import { PhilosophySection } from '@/components/PhilosophySection'
import { SecondaryHeroSection } from '@/components/SecondaryHeroSection'
import { FeaturedArticlesSection } from '@/components/FeaturedArticlesSection'
import { PartnersSection } from '@/components/PartnersSection'
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

      {/* Secondary Hero Section */}
      <SecondaryHeroSection />

      {/* Featured Articles Section */}
      <FeaturedArticlesSection />

      {/* Partners Section */}
      <PartnersSection />

      {/* FAQ Section */}
      <FAQSection />
    </main>
  )
}
