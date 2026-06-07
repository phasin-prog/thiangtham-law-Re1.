import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { advisors } from '@/lib/site-data'

export default function AdvisorsPage() {
  return (
    <main>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="ที่ปรึกษากฎหมาย"
            title="ที่ปรึกษาของเรา"
            description="ที่ปรึกษามีความรู้ลึกด้านกฎหมายธุรกิจและอื่น ๆ สนับสนุนในการวางแนวทางคดีที่ซับซ้อน"
          />

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((advisor) => (
              <div key={advisor.name} className="overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-lg">
                <div className="relative h-80 w-full bg-muted">
                  {advisor.image && (
                    <Image
                      src={advisor.image}
                      alt={advisor.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="space-y-4 p-7">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-burgundy">
                      {advisor.name}
                    </h3>
                    <p className="text-sm font-semibold text-gold">{advisor.role}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-burgundy/80">
                      ความเชี่ยวชาญ
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {advisor.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="inline-block rounded-full bg-burgundy/10 px-3 py-1 text-xs text-burgundy"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-burgundy/80">
                      ประสบการณ์
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {advisor.experience}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-burgundy/80">
                      บรรยาย
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {advisor.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
