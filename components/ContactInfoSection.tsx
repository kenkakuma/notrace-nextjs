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
    icon: <Mail className="w-8 h-8" />,
    details: ['info@no-trace.jp', 'support@no-trace.jp'],
  },
  {
    title: 'Office',
    type: 'office',
    icon: <Building2 className="w-8 h-8" />,
    details: ['東京都渋谷区', '(設立準備中につき詳細は後日公開)'],
  },
  {
    title: 'Business Hours',
    type: 'hours',
    icon: <Clock className="w-8 h-8" />,
    details: ['平日 9:00-18:00', '土日祝日休業'],
  },
]

export function ContactInfoSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            お問い合わせ先
          </h2>
          <p className="text-lg text-text-secondary">
            その他のお問い合わせ方法
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONTACT_INFO.map((contact, index) => (
            <div
              key={contact.title}
              className="animate-fade-in-up bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
              style={{
                animation: `fadeInUp 0.8s ease-out ${0.1 * (index + 1)}s forwards`,
                opacity: 0,
              }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mb-6">
                {contact.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-text-dark mb-4">
                {contact.title}
              </h3>

              {/* Details */}
              <div className="space-y-2">
                {contact.details.map((detail, idx) => (
                  <div key={idx} className="text-text-secondary">
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
