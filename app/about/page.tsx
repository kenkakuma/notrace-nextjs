import { AboutHeroSection } from '@/components/AboutHeroSection'
import { ArticlesListSection } from '@/components/ArticlesListSection'

export const metadata = {
  title: '企業情報・ニュース | ABOUT - NO TRACE EXPLORATION',
  description:
    'NO TRACE EXPLORATIONの最新ニュース、お知らせ、サービス情報。企業活動の最新情報をご覧いただけます。',
  keywords: '企業情報、ニュース、お知らせ、サービス情報',
}

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* About Hero Section */}
      <AboutHeroSection />

      {/* Articles List Section */}
      <ArticlesListSection />
    </main>
  )
}
