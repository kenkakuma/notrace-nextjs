'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Calendar, Clock, ExternalLink } from 'lucide-react'
import { News } from 'contentlayer/generated'
import { OptimizedImage } from '@/components/ui/OptimizedImage'

interface NewsCardProps {
  news: News
  featured?: boolean
  layout?: 'vertical' | 'horizontal'
}

export function NewsCard({ news, featured = false, layout = 'vertical' }: NewsCardProps) {
  const isExternal = !!news.externalLink
  const href = isExternal ? news.externalLink : news.url
  const LinkComponent = isExternal ? 'a' : Link

  if (layout === 'horizontal') {
    return (
      <LinkComponent
        href={href}
        {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
        className="group flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative w-full md:w-64 aspect-video md:aspect-square flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
          {news.image ? (
            <OptimizedImage
              src={news.image}
              alt={news.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Category */}
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3 self-start">
            {news.category}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-text-dark mb-2 group-hover:text-primary transition-colors">
            {news.title}
            {isExternal && <ExternalLink className="inline w-4 h-4 ml-2" />}
          </h3>

          {/* Description */}
          <p className="text-text-secondary mb-4 line-clamp-2 flex-1">
            {news.excerpt || news.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={news.date}>
                {format(new Date(news.date), 'yyyy年M月d日', { locale: ja })}
              </time>
            </div>
            {news.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{news.readTime}</span>
              </div>
            )}
          </div>
        </div>
      </LinkComponent>
    )
  }

  // Vertical layout (default)
  const cardClasses = featured
    ? 'group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white'
    : 'group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white'

  return (
    <LinkComponent
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cardClasses}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        {news.image ? (
          <OptimizedImage
            src={news.image}
            alt={news.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 via-primary/5 to-primary/20" />
        )}
        {featured && (
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
            注目
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
          {news.category}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
          {isExternal && <ExternalLink className="inline w-4 h-4 ml-2" />}
        </h3>

        {/* Description */}
        <p className="text-text-secondary mb-4 line-clamp-3">
          {news.excerpt || news.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={news.date}>
              {format(new Date(news.date), 'yyyy年M月d日', { locale: ja })}
            </time>
          </div>
          {news.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{news.readTime}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {news.tags.slice(0, 3).map((tag, index) => (
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
    </LinkComponent>
  )
}
