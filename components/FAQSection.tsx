'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: '無迹探索株式会社の主な事業内容は何ですか？',
    answer:
      '当社は4つの核心事業を展開しています。珈琲事業では高品質コーヒー商品の企画開発・貿易・ブランド展開を、展示・イベント運営では文化・技術・芸術分野の展示企画とイベント運営を、技術研究開発では革新的な技術研究とイノベーション開発を、コミュニティ運営では会員制の専門家ネットワークと限定サービスを提供しています。',
  },
  {
    id: 2,
    question: 'コーヒー事業の品質管理はどのように行っていますか？',
    answer:
      '当社のコーヒー事業では、豆の選定から最終パッケージングまで全工程で厳格な品質評価を実施しています。世界各地の優良農園と直接的な関係を築き、独自の焙煎技術を活用し、広範囲な味覚テストを行うことで、卓越した品質基準を確保しています。また、サステナブルな調達と品質保証も重視しています。',
  },
  {
    id: 3,
    question: '展示・イベント運営ではどのような分野を専門としていますか？',
    answer:
      '文化・芸術展示、技術デモンストレーション、企業イベント、没入型体験デザインを専門としています。美術館展示、技術発表会、製品発表、教育ワークショップなど、様々な業界で革新的な展示空間設計と専門的なイベント運営サービスを提供し、印象的な体験を創造します。',
  },
  {
    id: 4,
    question: 'コミュニティプログラムへの参加方法や専門サービスの利用方法を教えてください',
    answer:
      '当社ウェブサイトのお問い合わせフォームまたはクラブページから会員機会についてお問い合わせください。コーヒー愛好家クラブ、アウトドアスポーツグループ、文化芸術サークルなど多様なコミュニティプログラムを提供しており、初心者から上級者まで様々なレベルに対応しています。',
  },
]

export function FAQSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            よくあるご質問
          </h2>
          <p className="text-lg text-text-secondary animate-fade-in-up animation-delay-100">
            無迹探索株式会社のサービスや事業に関するよくあるご質問にお答えします
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 2)}s forwards`,
                opacity: 0,
              }}
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full text-left group"
              >
                {/* Question */}
                <div className="bg-white/50 border-2 border-primary/20 rounded-lg p-6 hover:border-primary hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold text-text-dark group-hover:text-primary transition-colors pr-8">
                      {item.question}
                    </h3>

                    {/* Icon */}
                    <div
                      className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                        expandedId === item.id ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Answer */}
                {expandedId === item.id && (
                  <div className="bg-primary/5 border-2 border-t-0 border-primary/20 rounded-b-lg p-6 animate-fade-in-up">
                    <p className="text-text-secondary leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-orange-600/10 rounded-2xl border-2 border-primary/20 text-center">
          <h3 className="text-xl font-semibold text-text-dark mb-4">
            ご不明な点やご相談があればお気軽にお問い合わせください
          </h3>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
          >
            お問い合わせフォームへ
          </a>
        </div>
      </div>
    </section>
  )
}
