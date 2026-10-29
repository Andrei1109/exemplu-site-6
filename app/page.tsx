import { CoupleStory } from '@/components/invitation/couple-story'
import { EventDetails } from '@/components/invitation/event-details'
import { InvitationMessage } from '@/components/invitation/invitation-message'
import { MotionProvider } from '@/components/invitation/reveal'
import { RsvpSection } from '@/components/invitation/rsvp-section'
import { WeddingClosing } from '@/components/invitation/wedding-closing'
import { WeddingDate } from '@/components/invitation/wedding-date'
import { WeddingHero } from '@/components/invitation/wedding-hero'

export default function InvitationPage() {
  return (
    <MotionProvider>
      <main>
        <WeddingHero />
        <InvitationMessage />
        <WeddingDate />
        <EventDetails />
        <CoupleStory />
        <RsvpSection />
      </main>
      <WeddingClosing />
    </MotionProvider>
  )
}
