import { ContactHeroSection } from '@/components/ContactHeroSection'
import { ContactFormSection } from '@/components/ContactFormSection'
import { ContactInfoSection } from '@/components/ContactInfoSection'

export const metadata = {
  title: 'お問い合わせ | CONTACT - NO TRACE EXPLORER',
  description:
    'NO TRACE EXPLORERへのお問い合わせ、ご相談はこちらからお気軽にお問い合わせください。メール、電話、オフィス所在地などのお問い合わせ先情報。',
  keywords: 'お問い合わせ、コンタクト、相談、電話、メール',
}

export default function ContactPage() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* Contact Hero Section */}
      <ContactHeroSection />

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* Contact Info Section */}
      <ContactInfoSection />
    </main>
  )
}
