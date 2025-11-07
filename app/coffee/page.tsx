import { CoffeeHeroSection } from '@/components/CoffeeHeroSection'
import { CoffeeServicesSection } from '@/components/CoffeeServicesSection'
import { CoffeeQualitySection } from '@/components/CoffeeQualitySection'

export const metadata = {
  title: '珈琲 | COFFEE - NO TRACE EXPLORER',
  description:
    '高品質コーヒー商品の企画開発・貿易・ブランド展開。北京で磨いた焙煎技術と日本の品質管理を融合。',
  keywords: 'コーヒー、珈琲、コーヒー商品、焙煎技術',
}

export default function CoffeePage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Coffee Hero Section */}
      <CoffeeHeroSection />

      {/* Coffee Services Section */}
      <CoffeeServicesSection />

      {/* Coffee Quality Section */}
      <CoffeeQualitySection />
    </main>
  )
}
