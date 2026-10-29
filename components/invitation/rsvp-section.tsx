import { wedding } from '@/lib/wedding-config'
import { Eyebrow } from './editorial-heading'
import { FadeIn, MaskReveal } from './reveal'
import { RsvpForm } from './rsvp-form'

export function RsvpSection() {
  const { rsvp } = wedding
  return (
    <section
      id="confirmare"
      aria-labelledby="rsvp-titlu"
      className="bg-secondary px-6 py-24 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <Eyebrow index="V">Confirmare</Eyebrow>
          <h2
            id="rsvp-titlu"
            className="mt-10 font-serif text-[clamp(2.4rem,5.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.015em] text-balance md:mt-14"
          >
            <MaskReveal>{rsvp.heading}</MaskReveal>
          </h2>
          <FadeIn delay={0.25} className="mt-8 max-w-sm">
            <p className="text-base leading-relaxed text-muted-foreground">
              Vă rugăm să ne confirmați prezența până la{' '}
              <span className="whitespace-nowrap font-serif text-lg italic text-foreground">
                {rsvp.deadline}
              </span>
              .
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.2} className="md:col-span-6 md:col-start-7 md:pt-24">
          <RsvpForm config={rsvp} />
        </FadeIn>
      </div>
    </section>
  )
}
