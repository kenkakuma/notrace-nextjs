import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | NO TRACE EXPLORER',
  description: 'NO TRACE EXPLORERのプライバシーポリシーと個人情報の取り扱いについて',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
          プライバシーポリシー
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            最終更新日: {new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">1. 個人情報の定義</h2>
            <p className="text-text-secondary leading-relaxed">
              本プライバシーポリシーにおいて、個人情報とは、個人情報保護法第2条第1項により定義された個人情報、
              すなわち、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により
              特定の個人を識別することができるもの(他の情報と容易に照合することができ、それにより特定の個人を
              識別することができることとなるものを含みます。)を指します。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">2. 個人情報の収集方法</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              当社は、以下の方法で個人情報を収集します:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>お問い合わせフォームからのご入力</li>
              <li>会員登録時のご入力</li>
              <li>イベント参加申込時のご入力</li>
              <li>商品・サービスのご購入時のご入力</li>
              <li>アンケートやキャンペーンへのご参加</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">3. 個人情報の利用目的</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              当社は、収集した個人情報を以下の目的で利用します:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
              <li>お問い合わせへの回答</li>
              <li>サービスの提供および運営</li>
              <li>会員管理</li>
              <li>商品の配送およびアフターサービス</li>
              <li>新商品・サービスの情報提供</li>
              <li>イベント・セミナーのご案内</li>
              <li>マーケティング調査および分析</li>
              <li>サービス向上のための統計データ作成</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">4. 個人情報の第三者提供</h2>
            <p className="text-text-secondary leading-relaxed">
              当社は、以下の場合を除き、個人情報を第三者に提供することはありません:
            </p>
            <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mt-4">
              <li>ご本人の同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">5. 個人情報の安全管理</h2>
            <p className="text-text-secondary leading-relaxed">
              当社は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              また、個人情報を取り扱う従業員や委託先に対して、必要かつ適切な監督を行います。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">6. Cookie(クッキー)の使用について</h2>
            <p className="text-text-secondary leading-relaxed">
              当社のウェブサイトでは、より良いサービスを提供するため、Cookieを使用する場合があります。
              Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができます。
              ただし、Cookieを無効にした場合、一部のサービスが利用できなくなる可能性があります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">7. 個人情報の開示・訂正・削除</h2>
            <p className="text-text-secondary leading-relaxed">
              ご本人から個人情報の開示、訂正、削除等のお申し出があった場合は、合理的な期間内に対応いたします。
              お申し出の際は、本人確認のため、必要な書類の提出をお願いする場合があります。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">8. プライバシーポリシーの変更</h2>
            <p className="text-text-secondary leading-relaxed">
              当社は、必要に応じて本プライバシーポリシーを変更することがあります。
              変更後のプライバシーポリシーは、本ウェブサイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">9. お問い合わせ</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-text-dark font-semibold mb-2">NO TRACE EXPLORER</p>
              <p className="text-text-secondary">メール: privacy@no-trace.jp</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
