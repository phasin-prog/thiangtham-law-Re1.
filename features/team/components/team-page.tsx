'use client'

import { useRef } from 'react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { getLocalePath, useTranslation } from '@/lib/i18n'
import type { MemberCategory, TeamMemberGroups } from '@/types/team'
import { TeamSection } from './team-section'
import { TeamSectionNav } from './team-section-nav'
import { teamSectionConfigs } from '../lib/team-display'

type TeamPageProps = {
  groups: TeamMemberGroups
}

export function TeamPage({ groups }: TeamPageProps) {
  const { locale, t } = useTranslation()
  const leaderRef = useRef<HTMLElement>(null)
  const lawyerRef = useRef<HTMLElement>(null)
  const advisorRef = useRef<HTMLElement>(null)
  const staffRef = useRef<HTMLElement>(null)

  const sectionRefs = {
    leader: leaderRef,
    lawyer: lawyerRef,
    advisor: advisorRef,
    staff: staffRef,
  }

  function scrollToSection(id: MemberCategory) {
    const target = sectionRefs[id].current
    if (!target) return

    const offset = 140
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <main className="relative bg-ivory">
      <PageHero
        title={t('ทนายความและทีมงาน', 'Lawyers & Team')}
        description={t(
          'สำนักงานทำงานเป็นทีม โดยมีทนายความ ที่ปรึกษาทางกฎหมาย และฝ่ายประสานงานคดีดูแลคนละบทบาท ตั้งแต่การตรวจข้อเท็จจริง เตรียมเอกสาร วิเคราะห์ประเด็นกฎหมาย ประสานนัดหมาย และติดตามความคืบหน้าของงานคดี',
          'The office works as a team. Lawyers, legal consultants, and case coordination staff each have distinct roles, covering fact review, document preparation, legal issue analysis, appointment coordination, and case follow-up.',
        )}
        crumbs={[
          { href: '/', label: t('หน้าแรก', 'Home') },
          { label: t('ทนายความและทีมงาน', 'Team') },
        ]}
      />

      <TeamSectionNav
        sections={teamSectionConfigs}
        onSelect={scrollToSection}
        onSelectAll={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <TeamSection
        ref={leaderRef}
        {...teamSectionConfigs[0]}
        members={groups.leader}
        variant="featured"
      />

      <TeamSection
        ref={lawyerRef}
        {...teamSectionConfigs[1]}
        members={groups.lawyer}
        className="bg-secondary/20"
      />

      <TeamSection
        ref={advisorRef}
        {...teamSectionConfigs[2]}
        members={groups.advisor}
        className="bg-ivory"
      />

      <TeamSection
        ref={staffRef}
        {...teamSectionConfigs[3]}
        members={groups.staff}
        variant="compact"
        light
      />

      <section className="border-t border-gold/10 bg-ivory py-16">
        <Container className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary">
              {t('ต้องการติดต่อสำนักงาน?', 'Need to contact the office?')}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t(
                'ส่งข้อมูลเบื้องต้นให้ทีมงานตรวจสอบและประสานทนายความหรือเจ้าหน้าที่ที่เกี่ยวข้องตามขั้นตอนของสำนักงาน',
                'Send initial information so the office can review it and coordinate with the appropriate lawyer or team member.',
              )}
            </p>
          </div>
          <a
            href={getLocalePath('/contact', locale)}
            className="inline-flex h-14 items-center justify-center rounded-xl bg-gold px-8 font-black uppercase tracking-widest text-primary-dark shadow-lg shadow-gold/20 transition-all hover:-translate-y-0.5 hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
          >
            {t('ติดต่อสำนักงาน', 'Contact the Office')}
          </a>
        </Container>
      </section>
    </main>
  )
}
