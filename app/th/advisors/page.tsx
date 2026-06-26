'use client'

import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { PersonCard } from '@/components/person-card'
import { advisors } from '@/lib/data/advisors'
import { useTranslation } from '@/lib/i18n'
import { useTeamEntrance } from '@/hooks/use-team-entrance'

export default function AdvisorsPage() {
  const { t } = useTranslation()
  const containerRef = useTeamEntrance()

  return (
    <main ref={containerRef} className="relative overflow-hidden bg-secondary/20">
      {/* Large subtle decorative scale SVG in background */}
      <div className="absolute right-10 top-1/4 -z-10 text-primary/[0.03] pointer-events-none select-none">
        <svg
          width="400"
          height="400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1" />
          <path d="M18 8h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2" />
          <path d="M18 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
          <path d="M12 5V3" />
          <path d="M12 19v-2" />
        </svg>
      </div>

      <PageHero
        title={t('ที่ปรึกษา', 'Advisors')}
        description={t('ที่ปรึกษาสนับสนุนการวิเคราะห์ประเด็นและการวางแนวทางในเรื่องที่ต้องใช้ความรู้เฉพาะด้าน', 'Advisors support analysis and strategy for specialized matters.')}
        crumbs={[{ href: '/', label: t('หน้าแรก', 'Home') }, { label: t('ที่ปรึกษา', 'Advisors') }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-12 max-w-3xl" data-team-heading>
            <p className="text-sm font-semibold tracking-wide text-gold">{t('ที่ปรึกษา', 'Advisors')}</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">
              {t('สนับสนุนการพิจารณาประเด็นที่ซับซ้อน', 'Supporting Complex Case Analysis')}
            </h2>
            <div className="team-gold-line my-5" />
            <p className="mt-3 leading-7 text-muted-foreground">
              {t('การให้ความเห็นในแต่ละกรณีต้องอาศัยข้อเท็จจริงและเอกสารประกอบ ข้อมูลบนหน้านี้จึงเป็นขอบเขตความเชี่ยวชาญโดยสรุป', 'Expert opinions are based on specific facts and documentation. This page summarizes their areas of expertise.')}
            </p>
          </div>
          
          <div
            data-team-cards
            className={
              advisors.length <= 2
                ? 'grid max-w-4xl gap-8 sm:grid-cols-2'
                : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {advisors.map((advisor, index) => (
              <PersonCard 
                key={`${advisor.name}-${index}`} 
                person={advisor as any} 
                variant="advisor"
                index={index}
              />
            ))}
          </div>
        </Container>
      </section>
      <CTASection title={t('ต้องการให้ทีมงานช่วยประเมินประเด็นเบื้องต้น?', 'Need an initial assessment of your issue?')} />
    </main>
  )
}

