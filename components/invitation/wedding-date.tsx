import { wedding } from '@/lib/wedding-config'
import { Countdown } from './countdown'
import { Eyebrow } from './editorial-heading'
import { DrawLine, FadeIn, MaskReveal } from './reveal'

const numeral =
  'font-serif text-[clamp(6.5rem,32vw,21rem)] font-normal leading-[0.8] tracking-[-0.04em] tabular-nums'

export function WeddingDate() {
  const { date, city } = wedding
  const monthName = date.display.split(' ')[1]

  return (
    <section
      aria-labelledby="data-titlu"
      className="relative overflow-hidden bg-secondary px-6 py-24 md:px-12 md:py-36 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <Eyebrow index="II">Salvați data</Eyebrow>
        <h2 id="data-titlu" className="sr-only">
          {`${date.weekday}, ${date.display}, ${city}`}
        </h2>

        <div aria-hidden="true" className="mt-14 flex flex-col gap-2 md:mt-20 md:gap-4">
          <div className="flex items-end gap-5 md:gap-10">
            <MaskReveal className={numeral}>{date.day}</MaskReveal>
            <FadeIn delay={0.3} className="pb-[0.6em] md:pb-[1.4em]">
              <p className="text-xs uppercase tracking-[0.32em] text-muted-foreground">
                {date.weekday}
              </p>
            </FadeIn>
          </div>

          <div className="flex items-end gap-5 pl-[16%] md:gap-10 md:pl-[24%]">
            <MaskReveal delay={0.12} className={numeral}>
              {date.month}
            </MaskReveal>
            <FadeIn delay={0.42} className="pb-[0.6em] md:pb-[1.4em]">
              <p className="font-script text-4xl text-muted-foreground md:text-6xl">
                {monthName}
              </p>
            </FadeIn>
          </div>

          <div className="flex justify-end">
            <MaskReveal delay={0.24} className={numeral}>
              {date.year}
            </MaskReveal>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-8 md:mt-24 md:flex-row md:items-center md:justify-between">
          <FadeIn className="flex items-center gap-5">
            <DrawLine className="w-12" />
            <p className="text-xs font-medium uppercase tracking-[0.38em]">{city}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Countdown
              iso={date.iso}
              pastLabel={`Ziua în care am spus DA \u2014 ${date.saidYes}`}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
