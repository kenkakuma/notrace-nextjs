import { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerSize?: 'default' | 'narrow' | 'wide'
  background?: 'default' | 'white' | 'gray' | 'dark'
  padding?: 'default' | 'small' | 'large' | 'none'
}

/**
 * 共享Section组件
 * 统一管理section的padding、背景色和容器
 */
export function Section({
  children,
  className = '',
  containerSize = 'default',
  background = 'default',
  padding = 'default'
}: SectionProps) {
  const backgroundClasses = {
    default: '',
    white: 'bg-white',
    gray: 'bg-gray-50',
    dark: 'bg-text-dark text-white',
  }

  const paddingClasses = {
    none: '',
    small: 'py-8 md:py-12',
    default: 'py-16 md:py-24',
    large: 'py-24 md:py-32',
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
