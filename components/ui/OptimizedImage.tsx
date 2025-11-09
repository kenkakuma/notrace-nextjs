import Image from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
}

/**
 * 优化的图片组件
 * 使用Next.js Image组件自动优化图片
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  fill = false,
  priority = false,
  sizes,
}: OptimizedImageProps) {
  // 如果使用fill模式
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || '100vw'}
        style={{ objectFit: 'cover' }}
      />
    )
  }

  // 如果提供了宽高
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    )
  }

  // 回退到普通img标签(用于外部图片或特殊情况)
  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  )
}
