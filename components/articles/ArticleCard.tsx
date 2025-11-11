'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Article } from 'contentlayer/generated'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface ArticleCardProps {
  article: Article
  featured?: boolean
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const cardClasses = featured
    ? 'group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white'
    : 'group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white'

  return (
    <Link href={article.url} className={cardClasses}>
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {article.image ? (
          <OptimizedImage
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20 flex items-center justify-center">
            <Tag className="w-16 h-16 text-primary/30" />
          </div>
        )}
        {featured && (
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            注目記事
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
          {article.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-text-secondary mb-4 line-clamp-3">
          {article.excerpt || article.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={article.date}>
              {format(new Date(article.date), 'yyyy年M月d日', { locale: ja })}
            </time>
          </div>
          {article.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-text-secondary rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors pointer-events-none" />
    </Link>
  )
}
