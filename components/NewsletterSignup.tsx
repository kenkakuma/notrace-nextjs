'use client'

import { useState } from 'react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: 後で実装 - メールサービス統合
    console.log('Newsletter signup:', email)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <div className="bg-primary/10 rounded-xl p-6 md:p-8">
      <h4 className="font-bold text-text-dark mb-2 text-lg">
        最新情報をお届けします
      </h4>
      <p className="text-sm text-text-secondary mb-4">
        コーヒー業界の最新トレンドやイベント情報をメールでお届けします
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力"
          required
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          disabled={submitted}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            submitted
              ? 'bg-green-500 text-white'
              : 'bg-primary text-white hover:opacity-90'
          }`}
        >
          {submitted ? '登録完了!' : '登録する'}
        </button>
      </form>

      <p className="text-xs text-text-secondary mt-3">
        ※現在開発中の機能です。実際の配信は後日開始予定です。
      </p>
    </div>
  )
}
