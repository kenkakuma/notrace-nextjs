import { ExhibitionHeroSection } from '@/components/ExhibitionHeroSection'
import { ExhibitionServicesSection } from '@/components/ExhibitionServicesSection'
import { ExhibitionQualitySection } from '@/components/ExhibitionQualitySection'
import { ExhibitionProcessSection } from '@/components/ExhibitionProcessSection'

export const metadata = {
  title: '展覧 | EXHIBITION - NO TRACE EXPLORATION',
  description:
    '文化・技術・芸術事業。革新的なアプローチで印象的な体験を創造します。展示企画・イベント運営・文化プロモーション。',
  keywords: '展覧、展示、イベント、企画、運営',
}

export default function ExhibitionPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Exhibition Hero Section */}
      <ExhibitionHeroSection />

      {/* Exhibition Services Section */}
      <ExhibitionServicesSection />

      {/* Exhibition Quality Section */}
      <ExhibitionQualitySection />

      {/* Exhibition Process Section */}
      <ExhibitionProcessSection />
    </main>
  )
}
