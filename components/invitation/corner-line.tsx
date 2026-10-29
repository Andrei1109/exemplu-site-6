'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE_EDITORIAL } from './reveal'

const paths = {
  tl: 'M0 100 L0 0 L100 0',
  tr: 'M0 0 L100 0 L100 100',
  br: 'M100 0 L100 100 L0 100',
  bl: 'M0 0 L0 100 L100 100',
} as const

type CornerLineProps = {
  corner: keyof typeof paths
  className?: string
  delay?: number
  duration?: number
  immediate?: boolean
}

export function CornerLine({
  corner,
  className,
  delay = 0,
  duration = 1.6,
  immediate = false,
}: CornerLineProps) {
  const target = { pathLength: 1, opacity: 1 }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('pointer-events-none overflow-visible text-line', className)}
    >
      <motion.path
        d={paths[corner]}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        {...(immediate
          ? { animate: target }
          : { whileInView: target, viewport: { once: true, margin: '0px 0px -10% 0px' } })}
        transition={{
          pathLength: { duration, ease: EASE_EDITORIAL, delay },
          opacity: { duration: 0.2, delay },
        }}
      />
    </svg>
  )
}
