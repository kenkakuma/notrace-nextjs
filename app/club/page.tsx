import { ClubHeroSection } from '@/components/ClubHeroSection'
import { ClubsGridSection } from '@/components/ClubsGridSection'
import { ClubMembershipBenefitsSection } from '@/components/ClubMembershipBenefitsSection'
import { ClubJoinCTASection } from '@/components/ClubJoinCTASection'

export const metadata = {
  title: 'クラブ | CLUB - NO TRACE EXPLORER',
  description:
    '会員制コミュニティ。コーヒー愛好家クラブ、アウトドアスポーツクラブ、文化芸術サークル。専門家ネットワークと限定サービス。',
  keywords: 'クラブ、コミュニティ、会員制、コーヒー、スポーツ、芸術',
}

export default function ClubPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Club Hero Section */}
      <ClubHeroSection />

      {/* Clubs Grid Section */}
      <ClubsGridSection />

      {/* Membership Benefits Section */}
      <ClubMembershipBenefitsSection />

      {/* Join CTA Section */}
      <ClubJoinCTASection />
    </main>
  )
}
