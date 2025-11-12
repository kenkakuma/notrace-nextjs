'use client'

export function ExhibitionHeroSection() {
  return (
    <section className="py-24 md:py-32 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Exhibition Services</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          {/* Main Title */}
          <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
            展示サービス
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-primary/80 font-light mb-8 tracking-wide">
            コーヒー文化・技術展示事業
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto mb-4">
            中日コーヒー産業を結ぶ総合展示プラットフォーム
          </p>
          <p className="text-xs md:text-sm text-text-secondary/70 leading-loose max-w-xl mx-auto">
            独立咖啡主理人から企業まで、あらゆるコーヒー関係者に開放された展示・交流・競技の場を提供します
          </p>
        </div>
      </div>
    </section>
  )
}
