export type WeddingEvent = {
  id: string
  label: string
  venue: string
  time: string
  address: string
  city: string
  mapsUrl: string
  image?: { src: string; alt: string }
}

export type StoryChapter = {
  marker: string
  title: string
  body: string
  scriptNote?: string
  image?: {
    src: string
    alt: string
    orientation: 'portrait' | 'landscape'
  }
}

export type RsvpConfig = {
  heading: string
  deadline: string
  endpoint: string
  maxGuests: number
  attendingLabel: string
  decliningLabel: string
  submitLabel: string
}

export type WeddingConfig = {
  couple: {
    partnerOne: string
    partnerTwo: string
    joiner: string
  }
  date: {
    iso: string
    day: string
    month: string
    year: string
    weekday: string
    display: string
    saidYes: string
  }
  city: string
  hero: {
    eyebrow: string
    scrollCta: string
  }
  message: {
    eyebrow: string
    headline: string
    body: string
  }
  events: WeddingEvent[]
  story: {
    eyebrow: string
    title: string
    /** Shown above the chapters in every variant. */
    quote?: string
    /** Max 2 chapters are rendered; chapters with an empty body are hidden. */
    chapters: StoryChapter[]
  }
  rsvp: RsvpConfig
  closing: {
    headline: string
    signoff: string
  }
  theme: {
    botanical: {
      branch: { src: string; width: number; height: number }
      sprig: { src: string; width: number; height: number }
    }
  }
  attribution: string
}

function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export const wedding: WeddingConfig = {
  couple: {
    partnerOne: 'Gabriela',
    partnerTwo: 'Andrei',
    joiner: 'și',
  },
  date: {
    iso: '2026-07-18T13:00:00+03:00',
    day: '18',
    month: '07',
    year: '2026',
    weekday: 'Sâmbătă',
    display: '18 Iulie 2026',
    saidYes: '13 Aprilie 2024',
  },
  city: 'București',
  hero: {
    eyebrow: 'Cu bucurie vă invităm',
    scrollCta: 'Descoperă povestea noastră',
  },
  message: {
    eyebrow: 'Un moment special',
    headline: 'Unele povești sunt prea frumoase pentru a fi trăite doar în doi.',
    body: 'Cu emoție, bucurie și inimile pline de iubire, vă invităm să ne fiți alături la cununia religioasă și să sărbătorim apoi împreună.',
  },
  events: [
    {
      id: 'ceremonie',
      label: 'Ceremonia religioasă',
      venue: 'Biserica Domnița Bălașa',
      time: '13:00',
      address: 'Strada Sfinții Apostoli 60',
      city: 'București',
      mapsUrl: mapsSearch('Biserica Domnița Bălașa, Strada Sfinții Apostoli 60, București'),
      image: {
        src: '/venues/domnita-balasa.png',
        alt: 'Biserica Domnița Bălașa, cu fațada din cărămidă și piatră și turlele verzi, înconjurată de brazi',
      },
    },
    {
      id: 'petrecere',
      label: 'Petrecerea',
      venue: 'Terra Events',
      time: '19:00',
      address: 'Bulevardul Lacul Tei 1 Bis',
      city: 'București',
      mapsUrl: mapsSearch('Terra Events, Bulevardul Lacul Tei 1 Bis, București'),
      image: {
        src: '/venues/terra-events.png',
        alt: 'Salonul Terra Events cu mese rotunde îmbrăcate în verde închis și aranjamente florale albe',
      },
    },
  ],
  story: {
    eyebrow: 'Povestea noastră',
    title: 'Înainte de această zi, au fost toate celelalte.',
    quote: 'Cele mai frumoase lucruri nu se întâmplă dintr-odată. Se adună, zi după zi, până devin acasă.',
    chapters: [
      {
        marker: 'Capitolul I',
        title: 'Prima pagină',
        body: 'Nu știm exact când o întâlnire devine începutul unei povești. Știm doar că, privind înapoi, sunt câteva momente pe care le-am alege din nou.',
        image: {
          src: '/story/couple-1.png',
          alt: 'Gabriela și Andrei plimbându-se de mână pe o stradă pietruită din centrul vechi',
          orientation: 'portrait',
        },
      },
      {
        marker: 'Capitolul II',
        title: 'De aici, împreună',
        body: 'Și pentru că cele mai frumoase momente sunt cele împărtășite, ne dorim să-i avem aproape pe oamenii dragi atunci când vom spune „Da”.',
        image: {
          src: '/story/couple-2.png',
          alt: 'Mâinile lor împreunate pe o masă cu față de in, lângă o floare de magnolie',
          orientation: 'landscape',
        },
      },
    ],
  },
  rsvp: {
    heading: 'Ne-ar bucura să fiți alături de noi.',
    deadline: '20 iunie 2026',
    endpoint: '/api/rsvp',
    maxGuests: 4,
    attendingLabel: 'Da, voi participa',
    decliningLabel: 'Din păcate, nu pot ajunge',
    submitLabel: 'Trimite confirmarea',
  },
  closing: {
    headline: 'Abia așteptăm să ne revedem.',
    signoff: 'Cu drag,',
  },
  theme: {
    botanical: {
      branch: { src: '/botanical/magnolia-branch-ink.png', width: 1209, height: 626 },
      sprig: { src: '/botanical/magnolia-sprig-ink.png', width: 378, height: 556 },
    },
  },
  attribution: 'Palfi Events',
}
