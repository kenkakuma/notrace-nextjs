import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
          ページが見つかりません
        </h2>
        <p className="text-lg text-text-secondary mb-8">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300">
              ホームページへ戻る
            </button>
          </Link>
          <Link href="/contact">
            <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              お問い合わせ
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
