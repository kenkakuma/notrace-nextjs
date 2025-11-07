import { LabHeroSection } from '@/components/LabHeroSection'
import { LabResearchSection } from '@/components/LabResearchSection'
import { LabInnovationSection } from '@/components/LabInnovationSection'
import { LabPartnershipSection } from '@/components/LabPartnershipSection'

export const metadata = {
  title: 'ラボ | LAB - NO TRACE EXPLORER',
  description:
    '技術研究・イノベーション。AI・IoT技術とサステナブル技術を中心とした最先端研究開発。',
  keywords: 'ラボ、技術研究、イノベーション、AI、IoT',
}

export default function LabPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Lab Hero Section */}
      <LabHeroSection />

      {/* Lab Research Section */}
      <LabResearchSection />

      {/* Lab Innovation Section */}
      <LabInnovationSection />

      {/* Lab Partnership Section */}
      <LabPartnershipSection />
    </main>
  )
}
