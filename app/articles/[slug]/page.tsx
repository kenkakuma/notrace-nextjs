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
    title: `${article.title} | NO TRACE EXPLORATION`,
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
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary transition-colors text-xs font-light"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
            <span>記事一覧に戻る</span>
          </Link>
        </Container>
      </Section>

      {/* Article Header */}
      <Section>
        <Container size="narrow">
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary/80 text-xs font-light mb-6">
            {article.category}
          </div>

          {/* Title */}
          <h1 className="font-noto-serif-jp text-xl md:text-2xl font-medium text-text-dark mb-6 leading-loose drop-shadow-sm">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-xs md:text-sm text-text-secondary/80 mb-8 leading-loose">
            {article.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-text-secondary/80 pb-8 border-b border-gray-200/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {format(new Date(article.date), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
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
          <article className="font-noto-serif-jp prose prose-sm max-w-none prose-headings:font-noto-serif-jp prose-headings:text-text-dark prose-headings:font-medium prose-p:text-text-secondary/80 prose-p:text-xs prose-p:md:text-sm prose-p:leading-loose prose-a:text-primary prose-strong:text-text-dark prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-li:text-xs prose-li:md:text-sm prose-li:text-text-secondary/80">
            <Mdx code={article.body.code} />
          </article>
        </Container>
      </Section>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <Section padding="small">
          <Container size="narrow">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs text-text-secondary/60 font-light"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Related Articles */}
      <Section>
        <Container size="narrow">
          <h2 className="font-noto-serif-jp text-lg md:text-xl font-medium text-text-dark mb-6">
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
                  className="group block p-6 bg-white border border-gray-200/50 hover:border-primary/30 transition-all"
                >
                  <h3 className="font-noto-serif-jp text-base font-medium text-text-dark mb-2 group-hover:text-primary transition-colors">
                    {relatedArticle.title}
                  </h3>
                  <p className="text-xs text-text-secondary/80 line-clamp-2 leading-loose">
                    {relatedArticle.description}
                  </p>
                  <div className="mt-4 text-xs text-primary/80 font-light">
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
