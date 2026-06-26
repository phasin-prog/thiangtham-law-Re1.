'use client'

import { forwardRef } from 'react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import type { LocalizedText, Member } from '@/types/team'
import { getLocalizedText } from '../lib/team-display'
import { TeamMemberCard } from './team-member-card'

type TeamSectionVariant = 'featured' | 'grid' | 'compact'

type TeamSectionProps = {
  id: string
  eyebrow?: LocalizedText
  title: LocalizedText
  description?: LocalizedText
  members: Member[]
  variant?: TeamSectionVariant
  light?: boolean
  className?: string
}

export const TeamSection = forwardRef<HTMLElement, TeamSectionProps>(
  (
    {
      id,
      eyebrow,
      title,
      description,
      members,
      variant = 'grid',
      light = false,
      className,
    },
    ref,
  ) => {
    const { locale, t } = useTranslation()
    const isCompact = variant === 'compact'
    const isFeatured = variant === 'featured'

    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          light ? 'bg-primary py-20 text-white md:py-32' : 'py-20 md:py-32',
          className,
        )}
      >
        <Container>
          <SectionHeading
            light={light}
            align="center"
            eyebrow={eyebrow ? getLocalizedText(eyebrow, locale) : undefined}
            title={getLocalizedText(title, locale)}
            description={description ? getLocalizedText(description, locale) : undefined}
          />

          {members.length > 0 ? (
            <div
              className={cn(
                'mt-16 grid gap-6',
                isFeatured && 'mx-auto max-w-4xl grid-cols-1',
                !isFeatured && !isCompact && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
                isCompact && 'mx-auto max-w-5xl grid-cols-1 md:grid-cols-2',
              )}
            >
              {members.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  featured={isFeatured}
                  priority={isFeatured && index === 0}
                  className={isCompact ? 'border-white/15 bg-white text-foreground' : undefined}
                />
              ))}
            </div>
          ) : (
            <div
              className={cn(
                'mx-auto mt-16 max-w-2xl rounded-2xl border border-dashed p-10 text-center',
                light
                  ? 'border-white/20 bg-white/5 text-white/75'
                  : 'border-border bg-secondary/30 text-muted-foreground',
              )}
            >
              <p className="font-serif text-xl font-bold text-current">
                {t('กำลังอัปเดตรายชื่อ', 'Team list is being updated')}
              </p>
              <p className="mt-3 text-sm leading-relaxed">
                {t(
                  'ข้อมูลในส่วนนี้จะถูกเพิ่มเมื่อพร้อมเผยแพร่',
                  'This section will be updated when the information is ready to publish.',
                )}
              </p>
            </div>
          )}
        </Container>
      </section>
    )
  },
)

TeamSection.displayName = 'TeamSection'
