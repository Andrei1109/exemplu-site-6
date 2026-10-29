import { wedding } from '@/lib/wedding-config'
import { BotanicalArtwork } from './botanical-artwork'
import { CornerLine } from './corner-line'
import { FadeIn, MaskReveal } from './reveal'

export function WeddingClosing() {
  const { couple, closing, date, attribution } = wedding
  return (
    <footer className="relative overflow-hidden px-6 pb-10 pt-28 md:px-12 md:pt-44 lg:px-20">
      <CornerLine corner="tl" className="absolute left-4 top-10 h-24 w-16 md:left-8 md:h-44 md:w-32" />
      <CornerLine
        corner="br"
        delay={0.4}
        className="absolute bottom-24 right-4 h-24 w-16 md:right-8 md:h-44 md:w-32"
      />

      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <FadeIn y={24} duration={1.4}>
          <BotanicalArtwork variant="sprig" className="w-20 opacity-80 md:w-28" />
        </FadeIn>

        <h2 className="mt-12 font-serif text-[clamp(2.25rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-0.015em] text-balance">
          <MaskReveal>{closing.headline}</MaskReveal>
        </h2>

        <FadeIn delay={0.3} className="mt-14">
          <p className="font-script text-5xl leading-none text-muted-foreground md:text-6xl">
            {closing.signoff}
          </p>
        </FadeIn>
        <p className="mt-4 font-serif text-[clamp(2.5rem,8vw,6.5rem)] font-normal uppercase leading-none tracking-[-0.02em]">
          <MaskReveal delay={0.45}>
            {couple.partnerOne}
            <span className="px-[0.2em] font-script normal-case text-muted-foreground">&</span>
            {couple.partnerTwo}
          </MaskReveal>
        </p>
        <FadeIn delay={0.6} className="mt-8">
          <p className="text-xs uppercase tracking-[0.38em] text-muted-foreground">
            <time dateTime={date.iso}>{date.display}</time>
          </p>
        </FadeIn>
      </div>

      <div className="mx-auto mt-32 flex max-w-7xl items-center justify-center border-t border-border pt-6 md:mt-44">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          {`Invitație creată de ${attribution}`}
        </p>
      </div>
    </footer>
  )
}
