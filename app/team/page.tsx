import type { Metadata } from 'next'
import { CheckCircle2, MessageCircle, Phone, UserRound } from 'lucide-react'
import { Container } from '@/components/container'
import { PageHero } from '@/components/page-hero'
import { PersonCard } from '@/components/person-card'
import { SectionHeading } from '@/components/section-heading'
import { advisors } from '@/lib/data/advisors'
import { lawyers } from '@/lib/data/lawyers'
import { officeContact, officeInfo } from '@/lib/data/office'
import { team as staffMembers } from '@/lib/data/staff'
import { teamValues } from '@/lib/data/team'

export const metadata: Metadata = {
  title: 'ทนายความ ที่ปรึกษา และทีมงาน',
  description:
    'ข้อมูลทนายความ ที่ปรึกษา และทีมงานของสำนักกฎหมายเที่ยงธรรมทนายความ',
}

export default function TeamPage() {
  return (
    <main>
      <PageHero
        title="ทนายความ ที่ปรึกษา และทีมงาน"
        description="รู้จักบุคลากรแต่ละส่วน พร้อมข้อมูลที่เหมาะสมตามบทบาทและหน้าที่"
        crumbs={[{ href: '/', label: 'หน้าแรก' }, { label: 'ทนายความและทีมงาน' }]}
      />

      <section className="py-14 md:py-20">
        <Container>
          <SectionHeading
            title="ทนายความ"
            description={`ทีมทนายความ${officeInfo.teamSize} โดยข้อมูลแต่ละท่านสามารถระบุเลขที่ใบอนุญาตทนายความ ประสบการณ์ และขอบเขตงานที่ดูแลได้`}
          />
          <div
            className={
              lawyers.length === 1
                ? 'mt-10 max-w-4xl'
                : 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {lawyers.map((lawyer, index) => (
              <PersonCard
                key={`${lawyer.name}-${index}`}
                person={lawyer}
                variant="lawyer"
                featured={lawyers.length === 1}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary/60 py-14 md:py-20">
        <Container>
          <SectionHeading
            title="ที่ปรึกษา"
            description="แสดงตำแหน่งและประวัติการทำงานโดยย่อ เพื่อให้ทราบประสบการณ์ที่เกี่ยวข้องของที่ปรึกษาแต่ละท่าน"
          />
          <div
            className={
              advisors.length <= 2
                ? 'mt-10 grid max-w-4xl gap-6 sm:grid-cols-2'
                : 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {advisors.map((advisor, index) => (
              <PersonCard
                key={`${advisor.name}-${index}`}
                person={advisor}
                variant="advisor"
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="ทีมงาน"
            description="ข้อมูลทีมงานแสดงเฉพาะชื่อและหน้าที่ เพื่อให้ติดต่อประสานงานได้อย่างชัดเจนและไม่ใส่รายละเอียดเกินความจำเป็น"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {staffMembers.map((member) => (
              <article
                key={member.name}
                className="flex items-start gap-4 rounded-xl border border-border bg-card p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-gold">
                  <UserRound className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-primary">{member.name}</h2>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">{member.duty}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-secondary/60 py-14 md:py-20">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            title="หลักการที่ทีมงานยึดถือ"
            description="การดำเนินงานทุกเรื่องเริ่มจากข้อมูลจริง เอกสารที่ตรวจสอบได้ และการสื่อสารที่ลูกความเข้าใจ"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {teamValues.map((value) => (
              <div
                key={value}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <p className="font-semibold leading-7 text-primary">{value}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <Container className="flex flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-gold">ต้องการปรึกษาทนาย?</p>
            <h2 className="mt-2 font-serif text-2xl font-bold text-white md:text-3xl">
              ติดต่อทีมกฎหมายผ่านช่องทางที่สะดวก
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={`https://line.me/R/ti/p/~${officeContact.line}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-gold px-6 py-3 font-bold text-primary-dark transition hover:bg-gold-soft"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              ปรึกษาผ่าน Line
            </a>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/40 px-6 py-3 font-bold text-white transition hover:border-gold hover:text-gold"
            >
              <Phone className="size-5" aria-hidden="true" />
              โทรหาเรา
            </a>
          </div>
        </Container>
      </section>
    </main>
  )
}
