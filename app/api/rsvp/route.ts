import { NextResponse } from 'next/server'
import { validateRsvp, type RsvpResponse } from '@/lib/rsvp'
import { wedding } from '@/lib/wedding-config'

/**
 * Forwards validated RSVPs to the Palfi Events RSVP API.
 * Configure PALFI_RSVP_ENDPOINT (and optionally PALFI_RSVP_API_KEY) to enable submissions.
 * Payload: { invitation, name, attending, guests, dietary?, message?, submittedAt }
 */
export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json<RsvpResponse>({ ok: false, error: 'Date invalide.' }, { status: 400 })
  }

  const result = validateRsvp(body, wedding.rsvp.maxGuests)
  if (typeof result === 'string') {
    return NextResponse.json<RsvpResponse>({ ok: false, error: result }, { status: 422 })
  }

  const endpoint = process.env.PALFI_RSVP_ENDPOINT
  if (!endpoint) {
    return NextResponse.json<RsvpResponse>(
      {
        ok: false,
        error: 'Confirmările nu sunt încă activate pentru această invitație. Vă rugăm să reveniți curând.',
      },
      { status: 503 },
    )
  }

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.PALFI_RSVP_API_KEY
          ? { Authorization: `Bearer ${process.env.PALFI_RSVP_API_KEY}` }
          : {}),
      },
      body: JSON.stringify({
        invitation: `${wedding.couple.partnerOne}-${wedding.couple.partnerTwo}-${wedding.date.iso.slice(0, 10)}`,
        ...result,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!upstream.ok) throw new Error(`Upstream responded ${upstream.status}`)
    return NextResponse.json<RsvpResponse>({ ok: true })
  } catch (error) {
    console.error('RSVP forwarding failed', error)
    return NextResponse.json<RsvpResponse>(
      { ok: false, error: 'Nu am putut trimite confirmarea. Vă rugăm să încercați din nou.' },
      { status: 502 },
    )
  }
}
