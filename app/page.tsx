import { HeroSegmented } from '@/components/HeroSegmented'
import { FeaturedArticlesSection } from '@/components/FeaturedArticlesSection'

export default function Home() {
  return (
    <>
      {/* Hero Section - Full Screen */}
      <HeroSegmented />

      <main className="flex flex-col w-full">
        {/* Simple Value Proposition */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-6 leading-relaxed">
              北京直火焙煎の実績と日本の品質基準を融合
            </h2>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              コーヒー貿易から設備調達、文化交流まで、
              <br className="hidden md:block" />
              日中両国の架け橋として価値を創造します。
            </p>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 md:py-16 bg-bg-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-text-secondary">体験プログラム</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-text-secondary">パートナー企業</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4</div>
                <div className="text-sm text-text-secondary">事業領域</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2</div>
                <div className="text-sm text-text-secondary">国際市場</div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <FeaturedArticlesSection />

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-dark mb-6">
              お問い合わせ
            </h2>
            <p className="text-base md:text-lg text-text-secondary mb-8">
              ご質問やご相談がございましたら、お気軽にご連絡ください
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-all duration-300"
              >
                お問い合わせ
              </a>
              <a
                href="/about"
                className="inline-block px-8 py-3 border-2 border-text-dark text-text-dark rounded-lg font-medium hover:bg-text-dark hover:text-white transition-all duration-300"
              >
                企業情報
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
