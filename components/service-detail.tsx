import { ContactCTA } from '@/components/contact-cta'
import { SectionHeading } from '@/components/section-heading'
import type { Service } from '@/lib/site-data'

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <main>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            eyebrow="บริการกฎหมาย"
            title={service.title}
            description={service.short}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <div className="rounded-3xl border border-border bg-card p-7">
                <h2 className="font-serif text-2xl font-bold text-burgundy">
                  บทนำเกี่ยวกับ {service.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {service.intro}
                </p>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  ปัญหาที่พบบ่อย
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {service.commonProblems.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-burgundy" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  เราช่วยอะไรได้บ้าง
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {service.help.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-burgundy" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  เอกสารที่ควรเตรียม
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {service.documents.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-burgundy" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  ขั้นตอนการทำงาน
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {service.steps.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-burgundy" />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  คำถามที่พบบ่อย
                </h3>
                <div className="mt-4 space-y-4 text-sm text-muted-foreground">
                  {service.faq.map((item) => (
                    <div key={item.q}>
                      <p className="font-semibold text-burgundy">{item.q}</p>
                      <p className="mt-2 leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  เหมาะสำหรับผู้ที่
                </h3>
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>
                    หากคุณกำลังเผชิญข้อพิพาททางกฎหมาย ต้องการคำปรึกษา หรืออยากได้แนวทางในการเตรียมเอกสาร เราพร้อมช่วยเหลือทุกขั้นตอน
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-7">
                <h3 className="font-serif text-xl font-bold text-burgundy">
                  ติดต่อเราเพื่อเริ่มต้น
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  นัดหมายปรึกษาเบื้องต้น เพื่อให้ทนายประเมินข้อมูลและวางแนวทางการทำงานที่เหมาะสมกับคดีของคุณ
                </p>
                <div className="mt-6 grid gap-3">
                  <a
                    href="tel:0823772404"
                    className="rounded-md bg-burgundy px-4 py-3 text-sm font-semibold text-burgundy-foreground transition-colors hover:bg-burgundy-dark"
                  >
                    โทรปรึกษาเบื้องต้น
                  </a>
                  <a
                    href="https://line.me/R/ti/p/~Kasemchimphlee"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-burgundy px-4 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy/10"
                  >
                    ติดต่อผ่าน LINE
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  )
}
