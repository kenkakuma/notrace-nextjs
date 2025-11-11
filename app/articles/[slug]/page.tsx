import { allArticles } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Mdx } from '@/components/articles/Mdx'
import Link from 'next/link'
import { Metadata } from 'next'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const article = allArticles.find((article) => article.slug === params.slug)

  if (!article) {
    return {
      title: '記事が見つかりません',
    }
  }

  return {
    title: `${article.title} | NO TRACE EXPLORER`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: article.image ? [article.image] : [],
    },
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = allArticles.find((article) => article.slug === params.slug)

  if (!article || !article.published) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Back Link */}
      <Section padding="small">
        <Container size="narrow">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>記事一覧に戻る</span>
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section>
        <Container size="narrow">
          {/* Category Badge */}
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-text-secondary mb-8">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <time dateTime={article.date}>
                {format(new Date(article.date), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{article.author}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{article.readTime}</span>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {article.image && (
        <Section padding="small">
          <Container size="narrow">
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
              <OptimizedImage
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Article Content */}
      <Section>
        <Container size="narrow">
          <article className="prose prose-lg max-w-none prose-headings:text-text-dark prose-p:text-text-secondary prose-a:text-primary prose-strong:text-text-dark prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200">
            <Mdx code={article.body.code} />
          </article>
        </Container>
      </Section>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <Section padding="small">
          <Container size="narrow">
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag, index) => (
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

      {/* Related Articles */}
      <Section variant="light">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-text-dark mb-6">
            関連記事
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {allArticles
              .filter(
                (a) =>
                  a.published &&
                  a.slug !== article.slug &&
                  a.category === article.category
              )
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle._id}
                  href={relatedArticle.url}
                  className="group block p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-2">
                    {relatedArticle.description}
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
