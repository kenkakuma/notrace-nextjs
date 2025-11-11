import { allNews } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, User, ArrowLeft, ExternalLink } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Mdx } from '@/components/articles/Mdx'
import Link from 'next/link'
import { Metadata } from 'next'

interface NewsPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allNews.map((news) => ({
    slug: news.slug,
  }))
}

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const news = allNews.find((news) => news.slug === params.slug)

  if (!news) {
    return {
      title: 'ニュースが見つかりません',
    }
  }

  return {
    title: `${news.title} | NO TRACE EXPLORER`,
    description: news.description,
    openGraph: {
      title: news.title,
      description: news.description,
      images: news.image ? [news.image] : [],
    },
  }
}

export default function NewsPage({ params }: NewsPageProps) {
  const news = allNews.find((news) => news.slug === params.slug)

  if (!news || !news.published) {
    notFound()
  }

  // 外部リンクの場合はリダイレクト（このページは表示されない想定だが念のため）
  if (news.externalLink) {
    return (
      <Section>
        <Container size="narrow">
          <div className="text-center py-16">
            <p className="text-text-secondary mb-6">
              外部サイトへリダイレクトしています...
            </p>
            <a
              href={news.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80"
            >
              外部サイトを開く
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </Container>
      </Section>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Back Link */}
      <Section padding="small">
        <Container size="narrow">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>ニュース一覧に戻る</span>
          </Link>
        </Container>
      </Section>

      {/* News Header */}
      <Section>
        <Container size="narrow">
          {/* Category Badge */}
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {news.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
            {news.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-text-secondary mb-8">
            {news.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={news.date}>
                {format(new Date(news.date), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{news.author}</span>
            </div>
            {news.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{news.readTime}</span>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {news.image && (
        <Section padding="small">
          <Container size="narrow">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <OptimizedImage
                src={news.image}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Container>
        </Section>
      )}

      {/* News Content */}
      <Section>
        <Container size="narrow">
          <article className="prose prose-lg max-w-none prose-headings:text-text-dark prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-dark prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
            <Mdx code={news.body.code} />
          </article>
        </Container>
      </Section>

      {/* Tags */}
      {news.tags && news.tags.length > 0 && (
        <Section padding="small">
          <Container size="narrow">
            <div className="flex flex-wrap gap-3">
              {news.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-text-secondary rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related News */}
      <Section variant="light">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            関連ニュース
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allNews
              .filter(
                (n) =>
                  n.published &&
                  n.slug !== news.slug &&
                  n.category === news.category
              )
              .slice(0, 2)
              .map((relatedNews) => (
                <Link
                  key={relatedNews._id}
                  href={relatedNews.externalLink || relatedNews.url}
                  {...(relatedNews.externalLink && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {relatedNews.title}
                    {relatedNews.externalLink && <ExternalLink className="inline w-4 h-4 ml-2" />}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {relatedNews.description}
                  </p>
                  <div className="mt-4 text-sm text-primary">
                    続きを読む →
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
