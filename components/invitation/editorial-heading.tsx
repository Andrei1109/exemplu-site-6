import { cn } from '@/lib/utils'
import { DrawLine, FadeIn } from './reveal'

export function Eyebrow({
  children,
  index,
  className,
}: {
  children: React.ReactNode
  index?: string
  className?: string
}) {
  return (
    <FadeIn className={cn('flex items-center gap-4', className)}>
      {index ? (
        <span className="font-serif text-sm italic text-muted-foreground">{index}</span>
      ) : null}
      <DrawLine className="w-10" delay={0.1} />
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground md:text-xs">
        {children}
      </p>
    </FadeIn>
  )
}
