import { HeroSegmented } from '@/components/HeroSegmented'
import { FeaturedArticlesSection } from '@/components/FeaturedArticlesSection'
import { Compass, Lightbulb, Globe, Shield } from 'lucide-react'

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Screen */}
      <HeroSegmented />

      <main className="flex flex-col w-full">
        {/* Company Introduction */}
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <span className="text-primary font-semibold text-sm">私たちについて</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6 leading-tight">
                  日中コーヒービジネスの
                  <br />
                  新たな架け橋
                </h2>
                <p className="text-base md:text-lg text-text-secondary mb-6 leading-relaxed">
                  NO TRACE EXPLORERは、北京の直火焙煎カフェで培った専門技術と、
                  日本の厳格な品質管理基準を融合させた、日中両国をつなぐコーヒー商社です。
                </p>
                <p className="text-base text-text-secondary leading-relaxed">
                  貿易・OEMサービスから、設備・資材調達、技術交流、文化展示まで、
                  コーヒーを中心とした総合的なビジネスソリューションを提供し、
                  両国市場の持続的な成長を支援します。
                </p>
              </div>
              <div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-bg-light rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-text-secondary">体験プログラム</div>
                  </div>
                  <div className="bg-bg-light rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <div className="text-sm text-text-secondary">パートナー企業</div>
                  </div>
                  <div className="bg-bg-light rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="text-3xl font-bold text-primary mb-2">4</div>
                    <div className="text-sm text-text-secondary">専門事業領域</div>
                  </div>
                  <div className="bg-bg-light rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="text-3xl font-bold text-primary mb-2">2</div>
                    <div className="text-sm text-text-secondary">国際市場展開</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-20 md:py-24 bg-bg-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                事業領域
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
                4つの専門分野で、お客様のビジネス成長を多角的に支援します
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Coffee Business */}
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Compass className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">コーヒー事業</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  貿易・OEM、品質管理、焙煎技術支援を通じて、両国市場での事業展開をサポート
                </p>
                <a href="/coffee" className="text-sm text-primary font-medium hover:underline">
                  詳しく見る →
                </a>
              </div>

              {/* Exhibition Services */}
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">展示サービス</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  文化・技術・芸術分野の展示企画から運営まで、両国の文化交流を促進
                </p>
                <a href="/exhibition" className="text-sm text-primary font-medium hover:underline">
                  詳しく見る →
                </a>
              </div>

              {/* Equipment Shop */}
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">設備・器具</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  北京カフェ運営の経験から厳選した、プロフェッショナル向けコーヒー機器
                </p>
                <a href="/lab" className="text-sm text-primary font-medium hover:underline">
                  商品を見る →
                </a>
              </div>

              {/* Community */}
              <div className="bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">コミュニティ</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  会員制プログラムを通じて、コーヒー愛好者とプロフェッショナルを繋ぐ
                </p>
                <a href="/club" className="text-sm text-primary font-medium hover:underline">
                  詳しく見る →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                私たちの強み
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto">
                北京と日本、両国の優位性を活かした独自の価値創造
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">北京焙煎技術</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  日式直火焙煎カフェでの実績に基づく、確かな技術力と品質管理ノウハウ
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">日本品質基準</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  日本市場で求められる厳格な品質管理と、細やかなサービス対応
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">文化的架け橋</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  両国の文化と商習慣を深く理解し、スムーズなビジネス展開を実現
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <FeaturedArticlesSection />

        {/* CTA Section */}
        <section className="py-20 md:py-24 bg-bg-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
              お問い合わせ
            </h2>
            <p className="text-base md:text-lg text-text-secondary mb-10 leading-relaxed">
              コーヒー事業に関するご相談、お取引のご検討、サービスに関するご質問など、
              <br className="hidden md:block" />
              お気軽にお問い合わせください。専門スタッフが丁寧に対応いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-10 py-4 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                お問い合わせ
              </a>
              <a
                href="/about"
                className="inline-block px-10 py-4 border-2 border-text-dark text-text-dark rounded-lg font-medium hover:bg-text-dark hover:text-white transition-all duration-300"
              >
                企業情報を見る
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
