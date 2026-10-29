'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { wedding } from '@/lib/wedding-config'
import { BotanicalArtwork } from './botanical-artwork'
import { CornerLine } from './corner-line'
import { DrawLine, EASE_EDITORIAL, FadeIn, MaskReveal } from './reveal'

export function WeddingHero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const branchY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const branchRotate = useTransform(scrollYProgress, [0, 1], [0, -3])

  const { couple, date, city, hero } = wedding

  return (
    <section
      ref={ref}
      aria-label={`Invitația de nuntă a lui ${couple.partnerOne} și ${couple.partnerTwo}`}
      className="relative isolate flex min-h-svh flex-col overflow-hidden px-6 pb-8 pt-[max(1.5rem,env(safe-area-inset-top))] md:px-12 md:pb-12 lg:px-20"
    >
      <CornerLine
        corner="tl"
        immediate
        className="absolute left-4 top-4 h-28 w-20 md:left-8 md:top-8 md:h-52 md:w-40"
      />
      <CornerLine
        corner="br"
        immediate
        delay={0.4}
        className="absolute bottom-4 right-4 h-28 w-20 md:bottom-8 md:right-8 md:h-52 md:w-40"
      />

      <motion.div
        aria-hidden="true"
        className="absolute -right-[38%] top-[6%] -z-10 w-[135%] md:-right-[6%] md:top-[4%] md:w-[64%] lg:w-[58%]"
        style={{ y: branchY, rotate: branchRotate }}
      >
        <motion.div
          initial={{ opacity: 0, x: 40, y: -20 }}
          animate={{ opacity: 0.9, x: 0, y: 0 }}
          transition={{ duration: 1.8, ease: EASE_EDITORIAL, delay: 0.3 }}
        >
          <BotanicalArtwork variant="branch" priority className="w-full" />
        </motion.div>
      </motion.div>

      <header className="flex items-start justify-between pl-6 pt-4 md:pl-10 md:pt-6">
        <FadeIn immediate delay={0.5} y={0}>
          <p className="font-serif text-sm italic text-muted-foreground">
            {couple.partnerOne.charAt(0)}
            <span className="px-1 not-italic">&</span>
            {couple.partnerTwo.charAt(0)}
          </p>
        </FadeIn>
      </header>

      <div className="flex flex-1 flex-col justify-end pb-10 pt-[38vh] md:pb-16 md:pt-24">
        <FadeIn immediate delay={0.6} y={8} className="mb-6 md:mb-10">
          <p className="text-xs font-medium uppercase tracking-[0.38em] text-muted-foreground">
            {hero.eyebrow}
          </p>
        </FadeIn>

        <h1 className="font-serif font-normal uppercase leading-[0.86] tracking-[-0.02em] text-foreground [overflow-wrap:anywhere]">
          <MaskReveal immediate delay={0.8} className="text-[clamp(3.1rem,15vw,11rem)]">
            {couple.partnerOne}
          </MaskReveal>
          <span className="relative z-10 -my-[0.15em] block pl-[18%] md:pl-[24%]">
            <FadeIn immediate delay={1.15} y={6}>
              <span className="font-serif text-[clamp(2.25rem,8vw,5.5rem)] font-normal italic normal-case leading-none tracking-normal text-muted-foreground">
                {couple.joiner}
              </span>
            </FadeIn>
          </span>
          <MaskReveal
            immediate
            delay={1.25}
            className="pl-[12%] text-[clamp(3.1rem,15vw,11rem)] md:pl-[30%]"
          >
            {couple.partnerTwo}
          </MaskReveal>
        </h1>

        <FadeIn
          immediate
          delay={1.7}
          y={8}
          className="mt-10 flex flex-col gap-3 md:mt-14 md:flex-row md:items-center md:justify-end md:gap-6 md:pr-[4%]"
        >
          <p className="font-serif text-lg tracking-[0.2em] uppercase md:text-xl">
            <time dateTime={date.iso}>{date.display}</time>
          </p>
          <DrawLine immediate delay={1.9} className="w-16 md:w-24" />
          <p className="text-xs font-medium uppercase tracking-[0.38em] text-muted-foreground">
            {city}
          </p>
        </FadeIn>
      </div>

      <FadeIn immediate delay={2.1} y={0} className="flex justify-center">
        <a
          href="#mesaj"
          className="group flex flex-col items-center gap-3 py-2 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {hero.scrollCta}
          <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-line/30">
            <motion.span
              className="absolute inset-x-0 top-0 block h-full origin-top bg-foreground"
              animate={{ scaleY: [0, 1, 1], y: ['0%', '0%', '100%'] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
            />
          </span>
        </a>
      </FadeIn>
    </section>
  )
}
