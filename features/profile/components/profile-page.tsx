'use client'

import { Container } from '@/components/container'
import type { Member } from '@/types/team'
import { ProfileCTA } from './profile-cta'
import { ProfileDetails } from './profile-details'
import { ProfileHero } from './profile-hero'

type ProfilePageProps = {
  member: Member
}

export function ProfilePage({ member }: ProfilePageProps) {
  return (
    <main className="min-h-screen bg-ivory pb-20">
      <ProfileHero member={member} />

      <Container>
        <ProfileDetails member={member} />
      </Container>

      <ProfileCTA />
    </main>
  )
}
