'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ModelCard {
  id: string
  label: string
  name: string
  link: string
}

const MODEL_CARDS: ModelCard[] = [
  {
    id: 'lab',
    label: '技術研究開発',
    name: 'ラボ | LAB',
    link: '/lab',
  },
  {
    id: 'club',
    label: '会員制コミュニティ',
    name: 'クラブ | CLUB',
    link: '/club',
  },
]

export function SecondaryHeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">
            {/* Left Side - Header and Description */}
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6 leading-tight">
                総合サービスリソース
              </h2>

              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                コーヒー事業から技術研究開発まで、5つの専門分野で総合的なサービスを展開し、お客様のビジネス成長を支える信頼できるパートナーとして価値創造に取り組みます。
              </p>

              <div className="inline-flex">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-text-dark text-text-dark rounded-xl font-semibold hover:bg-text-dark hover:text-white transition-all duration-300"
                >
                  企業情報を見る
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Side - Model Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MODEL_CARDS.map((card) => (
                <Link key={card.id} href={card.link}>
                  <div className="group relative h-full bg-gradient-to-br from-primary/10 to-orange-600/10 rounded-xl p-6 border-2 border-primary/20 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer">
                    {/* Card Header */}
                    <div className="mb-6">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                        {card.label}
                      </span>
                    </div>

                    {/* Card Name */}
                    <h3 className="text-2xl font-bold text-text-dark mb-6 group-hover:text-primary transition-colors">
                      {card.name}
                    </h3>

                    {/* Arrow Icon */}
                    <div className="absolute top-6 right-6 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                      <ArrowRight className="w-6 h-6" />
                    </div>

                    {/* Hover Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
