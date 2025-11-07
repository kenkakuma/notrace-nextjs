'use client'

export function ClubJoinCTASection() {
  return (
    <section className="py-20 bg-text-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            コミュニティに参加しませんか？
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            専門的な知識を共有し、新しいつながりを築きましょう
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Primary Button */}
            <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-transparent hover:border-primary border-2 border-primary transition-all duration-300">
              入会申し込み
            </button>

            {/* Secondary Button */}
            <button className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-text-dark transition-all duration-300">
              詳細資料請求
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
