import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}

/**
 * 共享容器组件
 * 统一管理页面宽度和水平padding
 */
export function Container({
  children,
  className = '',
  size = 'default'
}: ContainerProps) {
  const sizeClasses = {
    default: 'max-w-7xl',
    narrow: 'max-w-4xl',
    wide: 'max-w-8xl',
  }

  return (
    <div className={`${sizeClasses[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  )
}
