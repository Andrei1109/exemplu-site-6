import { wedding } from '@/lib/wedding-config'
import { BotanicalArtwork } from './botanical-artwork'
import { Eyebrow } from './editorial-heading'
import { FadeIn, MaskReveal } from './reveal'

function splitLines(text: string, perLine: number) {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if ((current + ' ' + word).trim().length > perLine && current) {
      lines.push(current)
      current = word
    } else {
      current = (current + ' ' + word).trim()
    }
  }
  if (current) lines.push(current)
  return lines
}

export function InvitationMessage() {
  const { message } = wedding
  const lines = splitLines(message.headline, 18)

  return (
    <section
      id="mesaj"
      aria-labelledby="mesaj-titlu"
      className="relative scroll-mt-8 px-6 py-24 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <Eyebrow index="I">{message.eyebrow}</Eyebrow>

          <div className="relative mt-10 md:mt-14">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-2 -top-[0.42em] font-serif text-[clamp(8rem,26vw,18rem)] leading-none text-line/25 md:-left-10"
            >
              {'\u201C'}
            </span>
            <h2
              id="mesaj-titlu"
              className="relative font-serif text-[clamp(2.1rem,6.2vw,5.4rem)] font-normal leading-[1.04] tracking-[-0.015em] text-pretty"
            >
              <span className="sr-only">{message.headline}</span>
              <span aria-hidden="true">
                {lines.map((line, i) => (
                  <MaskReveal key={line} delay={0.08 * i}>
                    {line}
                  </MaskReveal>
                ))}
              </span>
            </h2>
          </div>

          <FadeIn delay={0.35} className="mt-12 md:ml-[33%] md:mt-16 md:max-w-md">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed">
              {message.body}
            </p>
          </FadeIn>
        </div>

        <FadeIn
          delay={0.2}
          y={30}
          duration={1.4}
          className="flex justify-end md:col-span-3 md:col-start-10 md:items-end md:pb-4"
        >
          <BotanicalArtwork variant="sprig" className="w-28 opacity-80 md:w-44" />
        </FadeIn>
      </div>
    </section>
  )
}
