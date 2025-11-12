'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

interface FormData {
  firstName: string
  lastName: string
  email: string
  company: string
  category: string
  message: string
  agreement: boolean
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  category?: string
  message?: string
  agreement?: string
}

const CATEGORIES = [
  'サービスに関するお問い合わせ',
  'コーヒー事業について',
  '展示・イベント運営について',
  'LAB・研究開発について',
  'クラブ・コミュニティについて',
  '採用について',
  'その他',
]

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    category: '',
    message: '',
    agreement: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.firstName) {
      newErrors.firstName = '姓を入力してください'
    } else if (formData.firstName.length > 50) {
      newErrors.firstName = '50文字以内で入力してください'
    }

    if (!formData.lastName) {
      newErrors.lastName = '名を入力してください'
    } else if (formData.lastName.length > 50) {
      newErrors.lastName = '50文字以内で入力してください'
    }

    if (!formData.email) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '正しいメールアドレスを入力してください'
    }

    if (!formData.category) {
      newErrors.category = 'お問い合わせ種別を選択してください'
    }

    if (!formData.message) {
      newErrors.message = 'お問い合わせ内容を入力してください'
    } else if (formData.message.length > 1000) {
      newErrors.message = '1000文字以内で入力してください'
    }

    if (!formData.agreement) {
      newErrors.agreement = 'プライバシーポリシーに同意してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success
      setSubmitted(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        category: '',
        message: '',
        agreement: false,
      })
      setErrors({})

      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  if (submitted) {
    return (
      <section className="py-20 ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            {/* Success Icon */}
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-16 h-16 text-green-500/80" strokeWidth={1.5} />
            </div>

            {/* Success Title */}
            <h3 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-4 tracking-wide">
              お問い合わせを受け付けました
            </h3>

            {/* Divider */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8"></div>

            {/* Success Message */}
            <p className="text-sm md:text-base text-text-secondary/80 leading-loose max-w-lg mx-auto">
              ご送信ありがとうございます
              <br />
              専門スタッフが確認し、ご連絡いたします
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Form Container */}
        <div className="border border-gray-200/50 p-8 md:p-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
                >
                  姓 <span className="text-primary/80">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName
                      ? 'border-red-500/50'
                      : 'border-gray-200/50'
                  } focus:outline-none focus:border-primary/30 transition-colors text-sm`}
                  required
                />
                {errors.firstName && (
                  <p className="mt-2 text-xs text-red-500/80">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
                >
                  名 <span className="text-primary/80">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? 'border-red-500/50' : 'border-gray-200/50'
                  } focus:outline-none focus:border-primary/30 transition-colors text-sm`}
                  required
                />
                {errors.lastName && (
                  <p className="mt-2 text-xs text-red-500/80">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
              >
                メールアドレス <span className="text-primary/80">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? 'border-red-500/50' : 'border-gray-200/50'
                } focus:outline-none focus:border-primary/30 transition-colors text-sm`}
                required
              />
              {errors.email && <p className="mt-2 text-xs text-red-500/80">{errors.email}</p>}
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
              >
                会社名・組織名
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200/50 focus:outline-none focus:border-primary/30 transition-colors text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
              >
                お問い合わせ種別 <span className="text-primary/80">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.category ? 'border-red-500/50' : 'border-gray-200/50'
                } focus:outline-none focus:border-primary/30 transition-colors text-sm`}
                required
              >
                <option value="">選択してください</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-xs text-red-500/80">{errors.category}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs text-text-secondary/80 mb-3 tracking-wide"
              >
                お問い合わせ内容 <span className="text-primary/80">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border ${
                  errors.message ? 'border-red-500/50' : 'border-gray-200/50'
                } focus:outline-none focus:border-primary/30 transition-colors resize-none text-sm`}
                required
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-500/80">{errors.message}</p>
              )}
            </div>

            {/* Agreement */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  className="w-4 h-4 mt-1 accent-primary/80 cursor-pointer"
                  required
                />
                <span className="text-xs text-text-secondary/80 leading-relaxed tracking-wide">
                  <a href="#" className="text-primary/80 hover:text-primary transition-colors">
                    プライバシーポリシー
                  </a>
                  に同意します
                </span>
              </label>
              {errors.agreement && (
                <p className="mt-2 text-xs text-red-500/80">{errors.agreement}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-10 py-4 border border-primary/30 text-primary/80 font-light text-sm tracking-wide hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>送信中...</>
                ) : (
                  <>
                    <Send className="w-4 h-4" strokeWidth={1.5} />
                    送信する
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
