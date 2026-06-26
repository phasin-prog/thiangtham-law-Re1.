'use client'

import { Container } from '@/components/container'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { getLocalizedText, type TeamSectionConfig } from '../lib/team-display'

type TeamSectionNavProps = {
  sections: TeamSectionConfig[]
  onSelect: (id: TeamSectionConfig['id']) => void
  onSelectAll?: () => void
  className?: string
}

export function TeamSectionNav({
  sections,
  onSelect,
  onSelectAll,
  className,
}: TeamSectionNavProps) {
  const { locale, t } = useTranslation()

  return (
    <nav
      aria-label={t('เมนูลัดรายชื่อทีมงาน', 'Team section navigation')}
      className={cn(
        'sticky top-20 z-30 border-b border-gold/20 bg-ivory/95 py-4 backdrop-blur-md md:top-24',
        className,
      )}
    >
      <Container>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center sm:gap-6 sm:overflow-visible sm:pb-0">
          {onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="shrink-0 text-[11px] font-black uppercase tracking-[0.2em] text-primary/45 transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
            >
              {t('ทั้งหมด', 'All')}
            </button>
          )}
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => onSelect(section.id)}
              className="shrink-0 text-[11px] font-black uppercase tracking-[0.2em] text-primary transition-colors hover:text-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
            >
              {getLocalizedText(section.label, locale)}
            </button>
          ))}
        </div>
      </Container>
    </nav>
  )
}
