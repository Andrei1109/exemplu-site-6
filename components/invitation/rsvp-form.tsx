'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import type { RsvpResponse, RsvpSubmission } from '@/lib/rsvp'
import type { RsvpConfig } from '@/lib/wedding-config'
import { cn } from '@/lib/utils'
import { EASE_EDITORIAL } from './reveal'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const fieldClass =
  'peer w-full border-0 border-b border-line/60 bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-foreground focus-visible:outline-none'
const labelClass =
  'text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground transition-colors'

function Field({
  label,
  children,
  hint,
  id,
}: {
  label: string
  children: React.ReactNode
  hint?: string
  id: string
}) {
  return (
    <div className="flex flex-col gap-1 focus-within:[&>label]:text-foreground">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {hint ? <p className="pt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

export function RsvpForm({ config }: { config: RsvpConfig }) {
  const uid = useId()
  const [attending, setAttending] = useState<boolean | null>(null)
  const [guests, setGuests] = useState(1)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [submittedName, setSubmittedName] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (attending === null || status === 'submitting') return

    const form = new FormData(event.currentTarget)
    const payload: RsvpSubmission = {
      name: String(form.get('name') ?? '').trim(),
      attending,
      guests: attending ? guests : 0,
      dietary: attending ? String(form.get('dietary') ?? '') : undefined,
      message: String(form.get('message') ?? ''),
    }

    setStatus('submitting')
    setError(null)
    try {
      const res = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => null)) as RsvpResponse | null
      if (!res.ok || !data?.ok) {
        throw new Error(
          data && !data.ok ? data.error : 'Nu am putut trimite confirmarea. Încercați din nou.',
        )
      }
      setSubmittedName(payload.name.split(' ')[0])
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare neașteptată.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE_EDITORIAL }}
        className="flex flex-col gap-6 border-t border-foreground pt-10"
      >
        <p className="font-serif text-6xl italic leading-none md:text-7xl">Mulțumim</p>
        <p className="max-w-md font-serif text-2xl leading-snug md:text-3xl">
          {attending
            ? `${submittedName}, abia așteptăm să sărbătorim împreună.`
            : `${submittedName}, ne va fi dor de tine. Îți mulțumim că ne-ai anunțat.`}
        </p>
      </motion.div>
    )
  }

  const options = [
    { value: true, label: config.attendingLabel },
    { value: false, label: config.decliningLabel },
  ]

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="flex flex-col gap-12">
      <fieldset className="flex flex-col gap-5">
        <legend className={cn(labelClass, 'mb-5')}>Răspunsul dumneavoastră</legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {options.map((option) => {
            const id = `${uid}-attending-${option.value}`
            const selected = attending === option.value
            return (
              <div key={id} className="relative">
                <input
                  id={id}
                  type="radio"
                  name="attending"
                  value={String(option.value)}
                  checked={selected}
                  onChange={() => setAttending(option.value)}
                  required
                  className="peer sr-only"
                />
                <label
                  htmlFor={id}
                  className={cn(
                    'flex min-h-16 cursor-pointer items-center justify-between gap-4 border px-5 py-4 font-serif text-lg transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-foreground md:text-xl',
                    selected
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-line/60 hover:border-foreground',
                  )}
                >
                  {option.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-2.5 shrink-0 rounded-full border transition-colors',
                      selected ? 'border-background bg-background' : 'border-line',
                    )}
                  />
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>

      <AnimatePresence initial={false}>
        {attending !== null ? (
          <motion.div
            key="fields"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: EASE_EDITORIAL }}
            className="flex flex-col gap-10"
          >
            <Field id={`${uid}-name`} label="Nume și prenume">
              <input
                id={`${uid}-name`}
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={120}
                className={fieldClass}
              />
            </Field>

            {attending ? (
              <>
                <div className="flex flex-col gap-3">
                  <span id={`${uid}-guests-label`} className={labelClass}>
                    Număr de persoane
                  </span>
                  <div
                    role="group"
                    aria-labelledby={`${uid}-guests-label`}
                    className="flex items-center gap-6 border-b border-line/60 pb-3"
                  >
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      aria-label="Scade numărul de persoane"
                      className="flex size-10 items-center justify-center border border-line/60 transition-colors hover:border-foreground disabled:opacity-30"
                    >
                      <Minus className="size-4" strokeWidth={1.25} aria-hidden="true" />
                    </button>
                    <output aria-live="polite" className="min-w-8 text-center font-serif text-3xl tabular-nums">
                      {guests}
                    </output>
                    <button
                      type="button"
                      onClick={() => setGuests((g) => Math.min(config.maxGuests, g + 1))}
                      disabled={guests >= config.maxGuests}
                      aria-label="Crește numărul de persoane"
                      className="flex size-10 items-center justify-center border border-line/60 transition-colors hover:border-foreground disabled:opacity-30"
                    >
                      <Plus className="size-4" strokeWidth={1.25} aria-hidden="true" />
                    </button>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {`maximum ${config.maxGuests}`}
                    </span>
                  </div>
                </div>

                <Field
                  id={`${uid}-dietary`}
                  label="Preferințe alimentare"
                  hint="Vegetarian, alergii sau alte mențiuni (opțional)"
                >
                  <input
                    id={`${uid}-dietary`}
                    name="dietary"
                    type="text"
                    maxLength={300}
                    className={fieldClass}
                  />
                </Field>
              </>
            ) : null}

            <Field id={`${uid}-message`} label="Un gând pentru miri" hint="Opțional">
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={3}
                maxLength={1000}
                className={cn(fieldClass, 'resize-none leading-relaxed')}
              />
            </Field>

            <div className="flex flex-col gap-5 pt-2">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group relative inline-flex min-h-14 w-full items-center justify-center gap-4 overflow-hidden bg-foreground px-8 text-xs font-medium uppercase tracking-[0.32em] text-background transition-opacity disabled:opacity-60 sm:w-auto sm:self-start"
              >
                <span>{status === 'submitting' ? 'Se trimite...' : config.submitLabel}</span>
                <span
                  aria-hidden="true"
                  className="block h-px w-6 bg-background transition-[width] duration-500 group-hover:w-10"
                />
              </button>
              <p
                role="alert"
                aria-live="assertive"
                className={cn(
                  'border-l border-foreground pl-4 text-sm leading-relaxed',
                  error ? 'block' : 'hidden',
                )}
              >
                {error}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </form>
  )
}
