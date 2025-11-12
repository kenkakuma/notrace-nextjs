'use client'

import { ScrollReveal } from '@/components/ScrollReveal'

export function AboutHeroSection() {
  return (
    <section className="py-24 md:py-32 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">About Us</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          {/* Main Title */}
          <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
            企業情報
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

          {/* Description */}
          <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-2xl mx-auto">
            NO TRACE EXPLORATIONの最新ニュース、お知らせ、サービス情報をご覧いただけます
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
