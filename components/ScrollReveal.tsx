'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 800,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px',
    triggerOnce: true,
  })

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
