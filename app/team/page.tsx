import Image from 'next/image'
import { SectionHeading } from '@/components/section-heading'
import { team } from '@/lib/site-data'

export default function TeamPage() {
  return (
    <main>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
          <SectionHeading
            align="center"
            eyebrow="ทีมงาน"
            title="ทีมของเรา"
            description="ทีมคนมืออาชีพพร้อมช่วยเหลือให้บริการจากการติดต่อจนถึงการดำเนินคดี"
          />

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
            {team.map((member) => (
              <div key={member.name} className="overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-lg">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="relative h-80 w-full bg-muted md:h-auto">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="flex flex-col justify-center space-y-4 p-7">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-burgundy">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-gold">{member.role}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-burgundy/80">
                        หน้าที่ความรับผิดชอบ
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {member.duty}
                      </p>
                    </div>
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
