'use client'

import {
  BriefcaseBusiness,
  GraduationCap,
  ListChecks,
  Scale,
  ShieldAlert,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import type { Member } from '@/types/team'
import {
  getEducationSummary,
  getLocalizedText,
  getProfileRoleDescription,
  getRelatedWorkAreas,
  getWorkingApproach,
} from '@/features/team'
import { ProfileSection } from './profile-section'

type ProfileDetailsProps = {
  member: Member
}

export function ProfileDetails({ member }: ProfileDetailsProps) {
  const { locale, t } = useTranslation()
  const relatedWorkAreas = getRelatedWorkAreas(member, locale)
  const workingApproach = getWorkingApproach(member, locale)
  const educationItems = member.education.length > 0
    ? member.education.map((education) => getLocalizedText(education, locale))
    : [getEducationSummary(member, locale)]

  return (
    <div className="mt-16 md:mt-24">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        {/* Left Column: Role & Scope */}
        <div className="space-y-8">
          <ProfileSection
            title={t('บทบาทในสำนักงาน', 'Role in the Office')}
            icon={<BriefcaseBusiness className="size-6 text-gold" aria-hidden="true" />}
            className="rounded-[2rem] border border-border bg-white p-8 md:p-10 shadow-sm"
          >
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {getProfileRoleDescription(member, locale)}
              </p>

              {member.experience.length > 0 && (
                <div className="mt-6 space-y-4 border-l-4 border-gold/20 pl-6">
                  {member.experience.map((experience, idx) => (
                    <p key={idx} className="text-base font-medium text-primary/80">
                      {getLocalizedText(experience, locale)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </ProfileSection>

          <ProfileSection
            title={t('ขอบเขตงานที่เกี่ยวข้อง', 'Related Work Areas')}
            icon={<Scale className="size-6 text-gold" aria-hidden="true" />}
            className="rounded-[2rem] border border-border bg-white p-8 md:p-10 shadow-sm"
          >
            <div className="flex flex-wrap gap-3">
              {relatedWorkAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-xl border border-gold/20 bg-gold/5 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-gold/10"
                >
                  {area}
                </span>
              ))}
            </div>
          </ProfileSection>
        </div>

        {/* Right Column: Education & Approach */}
        <div className="space-y-8">
          <ProfileSection
            title={t('ประวัติการศึกษา', 'Education')}
            icon={<GraduationCap className="size-6 text-gold" aria-hidden="true" />}
            className="rounded-[2rem] border border-border bg-white p-8 md:p-10 shadow-sm"
          >
            <ul className="space-y-6">
              {educationItems.map((education, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="mt-2 size-2 shrink-0 rounded-full bg-gold" />
                  <span className="text-base leading-relaxed text-muted-foreground font-medium">
                    {education}
                  </span>
                </li>
              ))}
            </ul>
          </ProfileSection>

          <ProfileSection
            title={t('แนวทางการทำงาน', 'Working Approach')}
            icon={<ListChecks className="size-6 text-gold" aria-hidden="true" />}
            className="rounded-[2rem] border border-border bg-white p-8 md:p-10 shadow-sm"
          >
            <div className="space-y-4">
              {workingApproach.map((item, index) => (
                <div key={index} className="flex gap-4 items-start rounded-2xl bg-secondary/30 p-5">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-xs font-bold text-gold">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-primary/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </ProfileSection>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="mt-16 rounded-[2rem] border border-gold/30 bg-gold/5 p-8 md:p-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gold text-primary">
            <ShieldAlert className="size-8" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif text-xl font-bold text-primary">
              {t('หมายเหตุและคำเตือน', 'Important Disclaimer')}
            </h4>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t(
                'ข้อมูลบุคลากรในหน้านี้จัดทำขึ้นเพื่อแนะนำบทบาทของทีมงานสำนักงานเท่านั้น การให้คำปรึกษาทางกฎหมายเฉพาะกรณีต้องพิจารณาจากข้อเท็จจริง เอกสาร และพยานหลักฐานที่เกี่ยวข้อง',
                'The information on this page is provided to introduce the role of the office team. Legal advice for a specific matter depends on the relevant facts, documents, and evidence.',
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
