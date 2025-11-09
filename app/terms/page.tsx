import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '利用規約 | NO TRACE EXPLORER',
  description: 'NO TRACE EXPLORERのサービス利用規約について',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-8">
          利用規約
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-text-secondary mb-8">
            最終更新日: {new Date().getFullYear()}年{new Date().getMonth() + 1}月{new Date().getDate()}日
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第1条(適用)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                本利用規約(以下「本規約」といいます。)は、NO TRACE EXPLORER(以下「当社」といいます。)が
                提供するサービス(以下「本サービス」といいます。)の利用条件を定めるものです。
              </li>
              <li>
                ユーザーの皆様(以下「ユーザー」といいます。)には、本規約に従って本サービスをご利用いただきます。
              </li>
              <li>
                ユーザーが本サービスを利用した場合、本規約に同意したものとみなします。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第2条(定義)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
            </p>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>「サービス利用契約」とは、本規約を契約条件として当社とユーザーの間で締結される、本サービスの利用契約を意味します。</li>
              <li>「知的財産権」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権(それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。)を意味します。</li>
              <li>「投稿データ」とは、ユーザーが本サービスを利用して投稿その他送信するコンテンツ(文章、画像、動画その他のデータを含みますがこれらに限りません。)を意味します。</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第3条(会員登録)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                本サービスの利用を希望する者(以下「登録希望者」といいます。)は、本規約を遵守することに同意し、
                かつ当社の定める一定の情報(以下「登録事項」といいます。)を当社の定める方法で当社に提供することにより、
                当社に対し、本サービスの利用の登録を申請することができます。
              </li>
              <li>
                当社は、当社の基準に従って、登録希望者の登録の可否を判断し、当社が登録を認める場合には
                その旨を登録希望者に通知します。登録希望者のユーザーとしての登録は、
                当社が本項の通知を行ったことをもって完了したものとします。
              </li>
              <li>
                前項に定める登録の完了時に、サービス利用契約がユーザーと当社の間に成立し、
                ユーザーは本サービスを本規約に従い利用することができるようになります。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第4条(登録事項の変更)</h2>
            <p className="text-text-secondary leading-relaxed">
              ユーザーは、登録事項に変更があった場合、当社の定める方法により当該変更事項を遅滞なく当社に通知するものとします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第5条(パスワード及びユーザーIDの管理)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                ユーザーは、自己の責任において、本サービスに関するパスワード及びユーザーIDを適切に管理及び保管するものとし、
                これを第三者に利用させ、または貸与、譲渡、名義変更、売買等をしてはならないものとします。
              </li>
              <li>
                パスワードまたはユーザーIDの管理不十分、使用上の過誤、第三者の使用等によって生じた損害に関する責任は
                ユーザーが負うものとします。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第6条(禁止事項)</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当社、本サービスの他のユーザー、または第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
              <li>本サービスを通じ、以下に該当し、または該当すると当社が判断する情報を当社または本サービスの他のユーザーに送信すること</li>
              <li>過度に暴力的または残虐な表現を含む情報</li>
              <li>コンピューター・ウィルスその他の有害なコンピューター・プログラムを含む情報</li>
              <li>当社、本サービスの他のユーザーまたは第三者の名誉または信用を毀損する表現を含む情報</li>
              <li>過度にわいせつな表現を含む情報</li>
              <li>差別を助長する表現を含む情報</li>
              <li>自殺、自傷行為を助長する表現を含む情報</li>
              <li>薬物の不適切な利用を助長する表現を含む情報</li>
              <li>反社会的な表現を含む情報</li>
              <li>チェーンメール等の第三者への情報の拡散を求める情報</li>
              <li>他人に不快感を与える表現を含む情報</li>
              <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
              <li>当社が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>当社のネットワークまたはシステム等への不正アクセス</li>
              <li>第三者に成りすます行為</li>
              <li>本サービスの他のユーザーのIDまたはパスワードを利用する行為</li>
              <li>当社が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
              <li>本サービスの他のユーザーの情報の収集</li>
              <li>当社、本サービスの他のユーザーまたは第三者に不利益、損害、不快感を与える行為</li>
              <li>反社会的勢力等への利益供与</li>
              <li>前各号の行為を直接または間接に惹起し、または容易にする行為</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第7条(本サービスの停止等)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                当社は、以下のいずれかに該当する場合には、ユーザーに事前に通知することなく、
                本サービスの全部または一部の提供を停止または中断することができるものとします。
                <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                  <li>本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</li>
                  <li>コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合</li>
                  <li>地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合</li>
                  <li>その他、当社が停止または中断を必要と判断した場合</li>
                </ul>
              </li>
              <li>
                当社は、本条に基づき当社が行った措置に基づきユーザーに生じた損害について一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第8条(権利帰属)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                本サービスに関する知的財産権は全て当社または当社にライセンスを許諾している者に帰属しており、
                本規約に基づく本サービスの利用許諾は、本サービスに関する当社または当社にライセンスを許諾している者の
                知的財産権の使用許諾を意味するものではありません。
              </li>
              <li>
                ユーザーは、投稿データについて、自らが投稿その他送信することについての適法な権利を有していること、
                及び投稿データが第三者の権利を侵害していないことについて、当社に対し表明し、保証するものとします。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第9条(保証の否認及び免責)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>
                当社は、本サービスがユーザーの特定の目的に適合すること、期待する機能・商品的価値・正確性・有用性を有すること、
                ユーザーによる本サービスの利用がユーザーに適用のある法令または業界団体の内部規則等に適合すること、
                及び不具合が生じないことについて、何ら保証するものではありません。
              </li>
              <li>
                当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
                ただし、本サービスに関する当社とユーザーとの間の契約(本規約を含みます。)が消費者契約法に定める消費者契約となる場合、
                この免責規定は適用されません。
              </li>
              <li>
                前項ただし書に定める場合であっても、当社は、当社の過失(重過失を除きます。)による債務不履行または
                不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害(当社またはユーザーが損害発生につき
                予見し、または予見し得た場合を含みます。)について一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第10条(利用規約の変更)</h2>
            <p className="text-text-secondary leading-relaxed">
              当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。
              変更後の本規約は、本ウェブサイト上に表示した時点より効力を生じるものとします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第11条(通知または連絡)</h2>
            <p className="text-text-secondary leading-relaxed">
              ユーザーと当社との間の通知または連絡は、当社の定める方法によって行うものとします。
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">第12条(準拠法及び管轄裁判所)</h2>
            <ol className="list-decimal list-inside text-text-secondary space-y-3 ml-4">
              <li>本規約の準拠法は日本法とします。</li>
              <li>
                本規約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </li>
            </ol>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-text-dark mb-4">お問い合わせ</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              本規約に関するお問い合わせは、以下までご連絡ください:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-text-dark font-semibold mb-2">NO TRACE EXPLORER</p>
              <p className="text-text-secondary">メール: legal@no-trace.jp</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
