export type RsvpSubmission = {
  name: string
  attending: boolean
  guests: number
  dietary?: string
  message?: string
}

export type RsvpResponse = { ok: true } | { ok: false; error: string }

export function validateRsvp(input: unknown, maxGuests: number): RsvpSubmission | string {
  if (!input || typeof input !== 'object') return 'Date invalide.'
  const data = input as Record<string, unknown>

  const name = typeof data.name === 'string' ? data.name.trim() : ''
  if (name.length < 2 || name.length > 120) return 'Vă rugăm să introduceți numele complet.'

  if (typeof data.attending !== 'boolean') return 'Vă rugăm să alegeți o opțiune.'

  const guests = data.attending ? Number(data.guests) : 0
  if (data.attending && (!Number.isInteger(guests) || guests < 1 || guests > maxGuests)) {
    return `Numărul de invitați trebuie să fie între 1 și ${maxGuests}.`
  }

  const clean = (value: unknown, max: number) =>
    typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined

  return {
    name,
    attending: data.attending,
    guests,
    dietary: data.attending ? clean(data.dietary, 300) : undefined,
    message: clean(data.message, 1000),
  }
}
