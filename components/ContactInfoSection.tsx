'use client'

import { Mail, Building2, Clock } from 'lucide-react'

interface ContactInfo {
  title: string
  type: string
  icon: React.ReactNode
  details: string[]
}

const CONTACT_INFO: ContactInfo[] = [
  {
    title: 'Email',
    type: 'email',
    icon: <Mail className="w-8 h-8" strokeWidth={1.5} />,
    details: ['info@no-trace.jp', 'support@no-trace.jp'],
  },
  {
    title: 'Office',
    type: 'office',
    icon: <Building2 className="w-8 h-8" strokeWidth={1.5} />,
    details: ['東京都渋谷区', '(設立準備中につき詳細は後日公開)'],
  },
  {
    title: 'Business Hours',
    type: 'hours',
    icon: <Clock className="w-8 h-8" strokeWidth={1.5} />,
    details: ['平日 9:00-18:00', '土日祝日休業'],
  },
]

export function ContactInfoSection() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* English Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-32 bg-primary/20"></div>
            <span className="text-primary/60 text-xs tracking-[0.3em] uppercase">Information</span>
            <div className="h-px w-32 bg-primary/20"></div>
          </div>

          <h2 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-8">
            お問い合わせ先
          </h2>

          {/* Divider */}
          <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

          <p className="text-sm md:text-base text-text-secondary/80 leading-loose">
            その他のお問い合わせ方法
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_INFO.map((contact) => (
            <div
              key={contact.title}
              className="bg-white border border-gray-200/50 p-8 hover:border-primary/30 transition-all duration-300 text-center flex flex-col items-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center mb-6 opacity-60">
                <div className="text-primary/70" style={{ transform: 'scale(1)' }}>
                  {contact.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm text-text-secondary/80 mb-6 tracking-wide uppercase">
                {contact.title}
              </h3>

              {/* Details */}
              <div className="space-y-3">
                {contact.details.map((detail, idx) => (
                  <div key={idx} className="text-sm text-text-secondary/80 leading-relaxed">
                    {detail}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
