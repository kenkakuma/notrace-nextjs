import { LabHeroSection, LabProductsSection } from '@/components/lab'

export const metadata = {
  title: 'ショップ | SHOP - NO TRACE EXPLORATION',
  description:
    'プレミアムコーヒー器具セレクション。北京の老舗カフェで培われた経験と技術を基に選び抜いた高品質なコーヒー機器。',
  keywords: 'ショップ、コーヒー器具、焙煎機、グラインダー、エスプレッソマシン',
}

export default function LabPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* LAB Hero Section - 统一风格的商城入口 */}
      <LabHeroSection />

      {/* LAB Products Section - 真实商城数据展示 */}
      <LabProductsSection />
    </main>
  )
}
