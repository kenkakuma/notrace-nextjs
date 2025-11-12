import { Sparkles } from 'lucide-react'

export const metadata = {
  title: 'コミュニティ | COMMUNITY - NO TRACE EXPLORATION',
  description:
    '会員制コミュニティサービス準備中。コーヒー愛好家のための特別なコミュニティを近日公開予定。',
  keywords: 'コミュニティ、会員制、コーヒー、coming soon',
}

export default function ClubPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Coming Soon Section */}
      <section className="py-32 md:py-40 bg-bg-light min-h-[80vh] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* English Label with Lines */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-32 bg-primary/20"></div>
              <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Community</span>
              <div className="h-px w-32 bg-primary/20"></div>
            </div>

            {/* Icon */}
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-8 opacity-60">
              <Sparkles className="w-12 h-12 text-primary/70" strokeWidth={1.5} />
            </div>

            {/* Main Title */}
            <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
              コミュニティ
            </h1>

            {/* Divider */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

            {/* Coming Soon Message */}
            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-xl md:text-2xl text-primary/80 font-light mb-8 tracking-wide">
                Coming Soon
              </p>
              <p className="text-sm md:text-base text-text-secondary/80 leading-loose mb-4">
                会員制コミュニティサービスを準備中です
              </p>
              <p className="text-xs md:text-sm text-text-secondary/70 leading-loose">
                コーヒー愛好家のための特別なコミュニティを<br className="md:hidden" />近日公開予定です
              </p>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 max-w-4xl mx-auto mt-16">
              <div className="text-center">
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                  専門家ネットワーク
                </h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  業界の専門家とつながる機会
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                  限定サービス
                </h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  会員限定のイベントと特典
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-4 tracking-wide drop-shadow-sm">
                  文化交流
                </h3>
                <p className="text-xs text-text-secondary/80 leading-loose max-w-xs mx-auto">
                  日中コーヒー文化の架け橋
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-16 pt-12 border-t border-gray-200/50">
              <p className="text-xs text-text-secondary/60 mb-4">
                詳細についてのお問い合わせ
              </p>
              <a
                href="/contact"
                className="inline-block px-10 py-3 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary transition-all duration-300"
              >
                お問い合わせ
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
