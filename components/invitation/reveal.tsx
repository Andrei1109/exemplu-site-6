'use client'

import { motion, MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const

const inView = { once: true, margin: '0px 0px -12% 0px' } as const

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

export function MaskReveal({ children, className, delay = 0, immediate = false }: RevealProps) {
  return (
    <motion.span
      className={cn('-mt-[0.15em] block overflow-hidden pt-[0.15em] pb-[0.06em]', className)}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: inView })}
    >
      <motion.span
        className="block"
        variants={{ hidden: { y: '108%' }, visible: { y: '0%' } }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}

export function FadeIn({
  children,
  className,
  delay = 0,
  immediate = false,
  y = 14,
  duration = 0.8,
}: RevealProps & { y?: number; duration?: number }) {
  const target = { opacity: 1, y: 0 }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: inView })}
      transition={{ duration, ease: EASE_EDITORIAL, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ImageReveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={inView}
      transition={{ duration: 1.2, ease: EASE_EDITORIAL, delay }}
    >
      {children}
    </motion.div>
  )
}

export function DrawLine({
  className,
  delay = 0,
  immediate = false,
}: {
  className?: string
  delay?: number
  immediate?: boolean
}) {
  const target = { scaleX: 1 }
  return (
    <motion.span
      aria-hidden="true"
      className={cn('block h-px origin-left bg-line', className)}
      initial={{ scaleX: 0 }}
      {...(immediate ? { animate: target } : { whileInView: target, viewport: inView })}
      transition={{ duration: 1.1, ease: EASE_EDITORIAL, delay }}
    />
  )
}
