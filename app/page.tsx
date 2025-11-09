import { HeroSection } from '@/components/HeroSection'
import { BusinessValueSection } from '@/components/BusinessValueSection'
import { PhilosophySection } from '@/components/PhilosophySection'
import { SecondaryHeroSection } from '@/components/SecondaryHeroSection'
import { ShopEntranceSection } from '@/components/ShopEntranceSection'
import { FeaturedProductsFromShop } from '@/components/FeaturedProductsFromShop'
import { FeaturedArticlesSection } from '@/components/FeaturedArticlesSection'
import { FAQSection } from '@/components/FAQSection'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Hero Section - 全屏背景+产品卡片 */}
      <HeroSection />

      {/* Business Value Section - 使命区域(左右布局) */}
      <BusinessValueSection />

      {/* Philosophy Section - 企业理念 */}
      <PhilosophySection />

      {/* Secondary Hero Section - LAB/CLUB卡片 */}
      <SecondaryHeroSection />

      {/* Shop Entrance Section - 商城入口 */}
      <ShopEntranceSection />

      {/* Featured Products Section - 精选商品展示 */}
      <FeaturedProductsFromShop />

      {/* Featured Articles Section - 企业情报 */}
      <FeaturedArticlesSection />

      {/* FAQ Section - 常见问题 */}
      <FAQSection />
    </main>
  )
}
