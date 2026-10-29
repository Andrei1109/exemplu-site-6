import type { ReactNode } from 'react'
import Image from 'next/image'
import { wedding, type StoryChapter } from '@/lib/wedding-config'
import { cn } from '@/lib/utils'
import { Eyebrow } from './editorial-heading'
import { FadeIn, ImageReveal, MaskReveal } from './reveal'

type ChapterWithImage = StoryChapter & { image: NonNullable<StoryChapter['image']> }

function hasImage(chapter: StoryChapter): chapter is ChapterWithImage {
  return Boolean(chapter.image?.src)
}

function ChapterText({ chapter, className }: { chapter: StoryChapter; className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <FadeIn>
        <p className="font-serif text-sm italic text-muted-foreground">{chapter.marker}</p>
      </FadeIn>
      <h3 className="mt-4 font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.05]">
        <MaskReveal delay={0.1}>{chapter.title}</MaskReveal>
      </h3>
      <FadeIn delay={0.25} className="mt-6">
        <p className="max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
          {chapter.body}
        </p>
      </FadeIn>
    </div>
  )
}

function ChapterPhoto({
  chapter,
  sizes,
  className,
}: {
  chapter: ChapterWithImage
  sizes: string
  className?: string
}) {
  const portrait = chapter.image.orientation === 'portrait'
  return (
    <figure className={cn('relative', className)}>
      <ImageReveal
        className={cn(
          'relative overflow-hidden bg-secondary',
          portrait ? 'aspect-[4/5]' : 'aspect-[3/2]',
        )}
      >
        <Image
          src={chapter.image.src}
          alt={chapter.image.alt}
          fill
          sizes={sizes}
          className="object-cover grayscale"
        />
      </ImageReveal>
      {chapter.scriptNote ? (
        <figcaption className="mt-5 font-script text-[clamp(2.25rem,5vw,3.75rem)] leading-tight text-foreground">
          {chapter.scriptNote}
        </figcaption>
      ) : null}
    </figure>
  )
}

function TwoPhotoLayout({ chapters }: { chapters: ChapterWithImage[] }) {
  return (
    <div className="mt-20 flex flex-col gap-28 md:mt-32 md:gap-48">
      {chapters.map((chapter, i) => {
        const reversed = i % 2 === 1
        const portrait = chapter.image.orientation === 'portrait'
        return (
          <article
            key={chapter.marker}
            className="grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-8"
          >
            <ChapterPhoto
              chapter={chapter}
              sizes="(min-width: 768px) 55vw, 100vw"
              className={cn(
                portrait ? 'md:col-span-6' : 'md:col-span-7',
                reversed ? 'md:order-2 md:col-start-6' : 'md:col-start-1',
              )}
            />
            <ChapterText
              chapter={chapter}
              className={cn(
                'md:pb-16',
                reversed ? 'md:order-1 md:col-span-4 md:col-start-1' : 'md:col-span-4 md:col-start-8',
              )}
            />
          </article>
        )
      })}
    </div>
  )
}

function SinglePhotoLayout({ chapter }: { chapter: ChapterWithImage }) {
  return (
    <article className="mt-20 grid grid-cols-1 items-center gap-12 md:mt-32 md:grid-cols-12 md:gap-8">
      <ChapterPhoto
        chapter={chapter}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="md:col-span-6 md:col-start-2"
      />
      <ChapterText chapter={chapter} className="md:col-span-4 md:col-start-8" />
    </article>
  )
}

function StoryQuote({ quote }: { quote: string }) {
  return (
    <FadeIn className="mt-20 md:mt-32">
      <blockquote className="mx-auto max-w-3xl border-y border-border py-12 text-center md:py-16">
        <p className="font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-snug text-foreground text-balance">
          {`„${quote}”`}
        </p>
      </blockquote>
    </FadeIn>
  )
}

function TypographicLayout({ chapters }: { chapters: StoryChapter[] }) {
  if (chapters.length === 0) return null
  return (
    <div className="mt-20 grid grid-cols-1 gap-16 md:mt-32 md:grid-cols-2 md:gap-20">
      {chapters.map((chapter, i) => (
        <ChapterText
          key={chapter.marker}
          chapter={chapter}
          className={cn(i === 1 && 'md:mt-24')}
        />
      ))}
    </div>
  )
}

export function CoupleStory() {
  const { story } = wedding
  const chapters = story.chapters.filter((c) => c.body.trim().length > 0).slice(0, 2)
  const withPhotos = chapters.filter(hasImage)

  if (chapters.length === 0 && !story.quote) return null

  let content: ReactNode
  if (withPhotos.length >= 2) {
    content = <TwoPhotoLayout chapters={withPhotos} />
  } else if (withPhotos.length === 1) {
    content = <SinglePhotoLayout chapter={withPhotos[0]} />
  } else {
    content = <TypographicLayout chapters={chapters} />
  }

  return (
    <section
      aria-labelledby="poveste-titlu"
      className="border-t border-border px-6 py-24 md:px-12 md:py-40 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <Eyebrow index="IV">{story.eyebrow}</Eyebrow>
        <h2
          id="poveste-titlu"
          className="mt-10 max-w-4xl font-serif text-[clamp(2.4rem,7vw,6rem)] font-normal leading-[1] tracking-[-0.02em] text-balance md:mt-14"
        >
          <MaskReveal>{story.title}</MaskReveal>
        </h2>
        {story.quote ? <StoryQuote quote={story.quote} /> : null}
        {content}
      </div>
    </section>
  )
}
