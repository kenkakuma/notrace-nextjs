'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function SecondaryHeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background container with slight darker background */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Title and Description */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                総合サービスリソース
              </h2>
              <p className="text-base md:text-lg text-text-secondary leading-relaxed mb-8">
                コーヒー事業から技術研究開発まで、5つの専門分野で総合的なサービスを展開し、
                お客様のビジネス成長を支える信頼できるパートナーとして価値創造に取り組みます。
              </p>
              <Link href="/about">
                <button className="px-8 py-3 bg-text-dark text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300">
                  企業情報を見る
                </button>
              </Link>
            </div>

            {/* Right side - LAB and CLUB Cards */}
            <div className="flex flex-col gap-6">
              {/* LAB Card */}
              <Link href="/lab">
                <div className="bg-gray-50/80 rounded-2xl px-6 py-4 hover:bg-gray-100/80 hover:shadow-md transition-all duration-300 cursor-pointer group flex items-center justify-between">
                  <div>
                    <div className="mb-1">
                      <span className="text-xs text-text-secondary">
                        技術研究開発
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-text-dark group-hover:text-primary transition-colors">
                      ラボ | LAB
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>

              {/* CLUB Card */}
              <Link href="/club">
                <div className="bg-gray-50/80 rounded-2xl px-6 py-4 hover:bg-gray-100/80 hover:shadow-md transition-all duration-300 cursor-pointer group flex items-center justify-between">
                  <div>
                    <div className="mb-1">
                      <span className="text-xs text-text-secondary">
                        会員制コミュニティ
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-text-dark group-hover:text-primary transition-colors">
                      クラブ | CLUB
                    </h3>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
