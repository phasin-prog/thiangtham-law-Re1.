'use client'

import { Container } from '@/components/container'
import { CTASection } from '@/components/cta-section'
import { PageHero } from '@/components/page-hero'
import { PersonCard } from '@/components/person-card'
import { lawyers } from '@/lib/data/lawyers'
import { useTranslation } from '@/lib/i18n'
import { useTeamEntrance } from '@/hooks/use-team-entrance'

export default function LawyersPage() {
  const { t } = useTranslation()
  const containerRef = useTeamEntrance()

  return (
    <main ref={containerRef} className="relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-1/4 -z-10 h-96 w-96 rounded-full bg-primary/[0.02] blur-3xl pointer-events-none" />
      
      <PageHero
        title={t('ทนายความ', 'Lawyers')}
        description={t('ทีมทนายความของสำนักงานให้คำปรึกษา วางแนวทาง และดำเนินคดีโดยพิจารณาจากข้อเท็จจริง พยานหลักฐาน และกฎหมายที่เกี่ยวข้อง', 'Our legal team provides consultation and litigation based on facts, evidence, and applicable laws.')}
        crumbs={[{ href: '/', label: t('หน้าแรก', 'Home') }, { label: t('ทนายความ', 'Lawyers') }]}
      />
      <section className="py-14 md:py-20">
        <Container>
          <div className="mb-12 max-w-3xl" data-team-heading>
            <p className="text-sm font-semibold tracking-wide text-gold">{t('ทีมกฎหมาย', 'Legal Team')}</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary md:text-4xl">
              {t('ดูแลแต่ละเรื่องด้วยความรอบคอบและตรงไปตรงมา', 'Handling every case with integrity and thoroughness')}
            </h2>
            <div className="team-gold-line my-5" />
            <p className="mt-3 leading-7 text-muted-foreground">
              {t('ข้อมูลประวัติและเลขใบอนุญาตที่ได้รับการยืนยันแสดงตามข้อเท็จจริง เพื่อความโปร่งใสและถูกต้องของข้อมูล', 'Verified credentials and professional history are displayed for transparency and accuracy.')}
            </p>
          </div>
          
          <div
            data-team-cards
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {lawyers.map((lawyer, index) => {
              // The first lawyer (chief) gets featured status
              const isFirst = index === 0
              return (
                <div 
                  key={`${lawyer.name}-${index}`}
                  className={isFirst ? 'team-card-featured' : ''}
                >
                  <PersonCard
                    person={lawyer as any}
                    variant="lawyer"
                    featured={isFirst}
                    index={index}
                  />
                </div>
              )
            })}
          </div>
        </Container>
      </section>
      <CTASection title={t('ต้องการปรึกษาทนายความเกี่ยวกับเรื่องของคุณ?', 'Need to consult a lawyer about your case?')} />
    </main>
  )
}

