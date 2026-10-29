import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { wedding, type WeddingEvent } from '@/lib/wedding-config'
import { cn } from '@/lib/utils'
import { Eyebrow } from './editorial-heading'
import { DrawLine, FadeIn, ImageReveal, MaskReveal } from './reveal'

function EventBlock({ event, index }: { event: WeddingEvent; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <article
      aria-labelledby={`${event.id}-titlu`}
      className={cn('flex flex-col', index % 2 === 1 && 'md:mt-40')}
    >
      <div className="flex items-baseline justify-between gap-6">
        <FadeIn>
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-muted-foreground">
            {event.label}
          </p>
        </FadeIn>
        <span aria-hidden="true" className="font-serif text-sm italic text-line">
          {number}
        </span>
      </div>

      <DrawLine className="mt-5 w-full" delay={0.1} />

      <h3
        id={`${event.id}-titlu`}
        className="mt-8 font-serif text-[clamp(2.25rem,5.2vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.01em] text-balance"
      >
        <MaskReveal delay={0.15}>{event.venue}</MaskReveal>
      </h3>

      {event.image ? (
        <ImageReveal className="relative mt-10 aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={event.image.src}
            alt={event.image.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </ImageReveal>
      ) : null}

      <FadeIn delay={0.3} className="mt-10">
        <dl className="grid grid-cols-[5.5rem_1fr] gap-x-6 gap-y-4 text-sm leading-relaxed md:text-base">
          <dt className="pt-0.5 text-xs uppercase tracking-[0.28em] text-muted-foreground">Ora</dt>
          <dd className="font-serif text-2xl leading-none">
            <time>{event.time}</time>
          </dd>
          <dt className="pt-0.5 text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Adresa
          </dt>
          <dd>
            <address className="not-italic">
              {event.address}
              <br />
              {event.city}
            </address>
          </dd>
        </dl>
      </FadeIn>

      <FadeIn delay={0.4} className="mt-10">
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 border-b border-foreground pb-1.5 text-xs font-medium uppercase tracking-[0.3em] transition-[gap] duration-500 hover:gap-5"
        >
          Vezi locația
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.25}
          />
          <span className="sr-only">{`pentru ${event.venue} (se deschide în Google Maps)`}</span>
        </a>
      </FadeIn>
    </article>
  )
}

export function EventDetails() {
  return (
    <section
      aria-labelledby="program-titlu"
      className="px-6 py-24 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Eyebrow index="III">Programul zilei</Eyebrow>
          <h2
            id="program-titlu"
            className="font-serif text-[clamp(2rem,4vw,3rem)] font-normal italic leading-tight text-muted-foreground"
          >
            <MaskReveal>Unde ne vom întâlni</MaskReveal>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-20 md:mt-24 md:grid-cols-2 md:gap-x-20 lg:gap-x-32">
          {wedding.events.map((event, i) => (
            <EventBlock key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
