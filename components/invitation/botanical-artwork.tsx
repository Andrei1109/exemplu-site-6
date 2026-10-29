import Image from 'next/image'
import { wedding } from '@/lib/wedding-config'
import { cn } from '@/lib/utils'

type BotanicalArtworkProps = {
  variant: 'branch' | 'sprig'
  className?: string
  priority?: boolean
  sizes?: string
}

export function BotanicalArtwork({ variant, className, priority, sizes }: BotanicalArtworkProps) {
  const asset = wedding.theme.botanical[variant]
  return (
    <Image
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt=""
      aria-hidden="true"
      priority={priority}
      sizes={sizes ?? (variant === 'branch' ? '(min-width: 768px) 60vw, 130vw' : '200px')}
      className={cn('pointer-events-none h-auto select-none', className)}
      draggable={false}
    />
  )
}
