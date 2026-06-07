import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { lawyers } from '@/lib/site-data'

export default function LawyersPage() {
  return (
    <main>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="ทีมกฎหมาย"
            title="ทนายความของเรา"
            description="ทนายความมีประสบการณ์ด้านคดีแพ่ง คดีอาญา และอื่น ๆ พร้อมให้บริการด้วยความเที่ยงธรรม"
          />

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((lawyer) => (
              <div key={lawyer.name} className="overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-lg">
                <div className="relative h-80 w-full bg-muted">
                  {lawyer.image && (
                    <Image
                      src={lawyer.image}
                      alt={lawyer.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="space-y-4 p-7">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-burgundy">
                      {lawyer.name}
                    </h3>
                    <p className="text-sm font-semibold text-gold">{lawyer.role}</p>
                    {lawyer.license && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {lawyer.license}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-burgundy/80">
                      ความเชี่ยวชาญ
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {lawyer.expertise.map((skill) => (
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
                      {lawyer.experience}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-burgundy/80">
                      บรรยาย
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {lawyer.bio}
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
