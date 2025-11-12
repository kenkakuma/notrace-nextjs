'use client'

import { Mail } from 'lucide-react'

export function ContactHeroSection() {
  return (
    <section className="py-24 md:py-32 ">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Contact</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          {/* Icon */}
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-8 opacity-60">
            <Mail className="w-12 h-12 text-primary/70" strokeWidth={1.5} />
          </div>

          {/* Main Title */}
          <h1 className="font-noto-serif-jp text-2xl md:text-3xl lg:text-4xl font-medium text-text-dark mb-8 leading-relaxed drop-shadow-sm">
            お問い合わせ
          </h1>

          {/* Divider */}
          <div className="w-12 h-px bg-primary/30 mx-auto mb-12"></div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-text-secondary/80 leading-loose">
              NO TRACE EXPLORATIONへのお問い合わせ、ご相談はこちらから
              <br className="md:hidden" />
              お気軽にどうぞ
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
