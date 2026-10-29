'use client'

import { useEffect, useState } from 'react'

function plural(value: number, one: string, many: string) {
  return value === 1 ? one : many
}

function remaining(target: number, now: number) {
  const diff = Math.max(0, target - now)
  return {
    done: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
  }
}

export function Countdown({ iso, pastLabel }: { iso: string; pastLabel: string }) {
  const target = new Date(iso).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = window.setInterval(() => setNow(Date.now()), 30_000)
    return () => window.clearInterval(id)
  }, [])

  if (now === null) {
    return <p className="h-7" aria-hidden="true" />
  }

  const r = remaining(target, now)

  if (r.done) {
    return (
      <p className="font-serif text-lg italic text-muted-foreground md:text-xl">{pastLabel}</p>
    )
  }

  const parts = [
    [r.days, plural(r.days, 'zi', 'zile')],
    [r.hours, plural(r.hours, 'oră', 'ore')],
    [r.minutes, plural(r.minutes, 'minut', 'minute')],
  ] as const

  return (
    <p className="flex flex-wrap items-baseline gap-x-5 gap-y-2" aria-live="off">
      <span className="sr-only">Au mai rămas </span>
      {parts.map(([value, label], i) => (
        <span key={label} className="flex items-baseline gap-2">
          <span className="font-serif text-2xl tabular-nums md:text-3xl">
            {String(value).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
          {i < parts.length - 1 ? (
            <span aria-hidden="true" className="pl-3 text-line">
              /
            </span>
          ) : null}
        </span>
      ))}
    </p>
  )
}
