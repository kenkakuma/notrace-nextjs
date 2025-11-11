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
        <section className="py-24 md:py-32 bg-bg-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-32 bg-primary/20"></div>
                <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">About Us</span>
                <div className="h-px w-32 bg-primary/20"></div>
              </div>
              <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
                日中コーヒービジネスの新たな架け橋
              </h2>
              <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>
              <p className="text-sm md:text-base text-text-secondary leading-loose max-w-2xl mx-auto mb-6">
                北京の直火焙煎カフェで培った専門技術と、<br className="hidden md:block" />
                日本の厳格な品質管理基準を融合させた、<br className="hidden md:block" />
                日中両国をつなぐコーヒー商社です。
              </p>
              <p className="text-xs md:text-sm text-text-secondary/80 leading-loose max-w-xl mx-auto">
                貿易・OEM・設備調達から文化展示まで、<br className="hidden md:block" />
                コーヒーを通じた総合的なビジネスソリューションを提供します。
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16">
              <div className="text-center py-6">
                <div className="font-noto-serif-jp text-3xl md:text-4xl font-light text-primary mb-3">50<span className="text-xl">+</span></div>
                <div className="text-xs text-text-secondary tracking-wide">体験プログラム</div>
              </div>
              <div className="text-center py-6">
                <div className="font-noto-serif-jp text-3xl md:text-4xl font-light text-primary mb-3">15<span className="text-xl">+</span></div>
                <div className="text-xs text-text-secondary tracking-wide">パートナー企業</div>
              </div>
              <div className="text-center py-6">
                <div className="font-noto-serif-jp text-3xl md:text-4xl font-light text-primary mb-3">4</div>
                <div className="text-xs text-text-secondary tracking-wide">専門事業領域</div>
              </div>
              <div className="text-center py-6">
                <div className="font-noto-serif-jp text-3xl md:text-4xl font-light text-primary mb-3">2</div>
                <div className="text-xs text-text-secondary tracking-wide">国際市場展開</div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Areas */}
        <section className="py-24 md:py-32 bg-bg-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-32 bg-primary/20"></div>
                <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Services</span>
                <div className="h-px w-32 bg-primary/20"></div>
              </div>
              <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
                事業領域
              </h2>
              <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
              <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
                4つの専門分野で<br className="md:hidden" />お客様のビジネス成長を支援します
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Coffee Business */}
              <div className="p-8 transition-all duration-500 group">
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Compass className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">コーヒー事業</h3>
                <p className="text-xs text-text-secondary/80 leading-loose mb-6">
                  貿易・OEM・品質管理・<br />焙煎技術支援を通じた<br />両国市場での事業展開
                </p>
                <a href="/coffee" className="text-xs text-primary/80 hover:text-primary tracking-wide transition-colors inline-flex items-center gap-1">
                  詳細 <span className="text-[10px]">→</span>
                </a>
              </div>

              {/* Exhibition Services */}
              <div className="p-8 transition-all duration-500 group">
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Globe className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">展示サービス</h3>
                <p className="text-xs text-text-secondary/80 leading-loose mb-6">
                  文化・技術・芸術分野の<br />展示企画から運営まで<br />両国の文化交流を促進
                </p>
                <a href="/exhibition" className="text-xs text-primary/80 hover:text-primary tracking-wide transition-colors inline-flex items-center gap-1">
                  詳細 <span className="text-[10px]">→</span>
                </a>
              </div>

              {/* Equipment Shop */}
              <div className="p-8 transition-all duration-500 group">
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Lightbulb className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">設備・器具</h3>
                <p className="text-xs text-text-secondary/80 leading-loose mb-6">
                  北京カフェ運営の経験から<br />厳選したプロフェッショナル<br />向けコーヒー機器
                </p>
                <a href="/shop" className="text-xs text-primary/80 hover:text-primary tracking-wide transition-colors inline-flex items-center gap-1">
                  詳細 <span className="text-[10px]">→</span>
                </a>
              </div>

              {/* Community */}
              <div className="p-8 transition-all duration-500 group">
                <div className="mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Shield className="w-8 h-8 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">コミュニティ</h3>
                <p className="text-xs text-text-secondary/80 leading-loose mb-6">
                  会員制プログラムを通じて<br />コーヒー愛好者と<br />プロフェッショナルを繋ぐ
                </p>
                <a href="/club" className="text-xs text-primary/80 hover:text-primary tracking-wide transition-colors inline-flex items-center gap-1">
                  詳細 <span className="text-[10px]">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 md:py-32 bg-bg-light">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-px w-32 bg-primary/20"></div>
                <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Our Strength</span>
                <div className="h-px w-32 bg-primary/20"></div>
              </div>
              <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
                私たちの強み
              </h2>
              <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>
              <p className="text-xs md:text-sm text-text-secondary/80 max-w-md mx-auto leading-loose">
                北京と日本、<br className="md:hidden" />両国の優位性を活かした独自の価値創造
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              <div className="text-center">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
                  <Compass className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">北京焙煎技術</h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  日式直火焙煎カフェでの実績に基づく<br />確かな技術力と品質管理ノウハウ
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
                  <Shield className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">日本品質基準</h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  日本市場で求められる<br />厳格な品質管理と細やかなサービス対応
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6 opacity-60">
                  <Globe className="w-10 h-10 text-primary/70" strokeWidth={1.5} />
                </div>
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">文化的架け橋</h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  両国の文化と商習慣を深く理解し<br />スムーズなビジネス展開を実現
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <FeaturedArticlesSection />

        {/* CTA Section */}
        <section className="py-24 md:py-32 bg-bg-light">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Contact</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>
            <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 drop-shadow-sm">
              お問い合わせ
            </h2>
            <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>
            <p className="text-xs md:text-sm text-text-secondary/80 mb-12 leading-loose max-w-lg mx-auto">
              コーヒー事業に関するご相談、お取引のご検討、<br className="hidden md:block" />
              サービスに関するご質問など、<br />
              お気軽にお問い合わせください。<br className="hidden md:block" />
              専門スタッフが丁寧に対応いたします。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-10 py-3 bg-primary/90 text-white font-light text-sm tracking-wide hover:bg-primary transition-all duration-300"
              >
                お問い合わせ
              </a>
              <a
                href="/about"
                className="inline-block px-10 py-3 border border-text-dark/20 text-text-dark font-light text-sm tracking-wide hover:border-text-dark/40 hover:bg-text-dark/5 transition-all duration-300"
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
