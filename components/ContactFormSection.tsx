'use client'

import { useState } from 'react'

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
      <section className="py-20 bg-bg-light">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-text-dark mb-3">
              お問い合わせを受け付けました
            </h3>
            <p className="text-text-secondary">
              ご送信ありがとうございます。専門スタッフが確認し、ご連絡いたします。
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-bg-light">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
          {/* Form Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              お気軽にお問い合わせください
            </h2>
            <p className="text-lg text-text-secondary">
              お客様のご要望をお聞かせください。専門スタッフが丁寧にご対応いたします。
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-text-dark mb-2">
                  姓 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.firstName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-text-dark mb-2">
                  名 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                    errors.lastName ? 'border-red-500' : 'border-gray-200'
                  }`}
                  required
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                メールアドレス <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-text-dark mb-2">
                会社名・組織名
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-text-dark mb-2">
                お問い合わせ種別 <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition ${
                  errors.category ? 'border-red-500' : 'border-gray-200'
                }`}
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
                <p className="mt-1 text-sm text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                お問い合わせ内容 <span className="text-red-600">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none ${
                  errors.message ? 'border-red-500' : 'border-gray-200'
                }`}
                required
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
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
                  className="w-5 h-5 mt-1 accent-primary"
                  required
                />
                <span className="text-sm text-text-secondary leading-relaxed">
                  <a href="#" className="text-primary font-medium hover:underline">
                    プライバシーポリシー
                  </a>
                  に同意します
                </span>
              </label>
              {errors.agreement && (
                <p className="mt-1 text-sm text-red-600">{errors.agreement}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-text-dark transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? '送信中...' : '送信する'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
