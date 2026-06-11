import Image from 'next/image'
import { BadgeCheck, BriefcaseBusiness } from 'lucide-react'
import type { Person } from '@/lib/site-data'
import { cn } from '@/lib/utils'

type PersonCardProps = {
  person: Person
  variant?: 'lawyer' | 'advisor'
  featured?: boolean
}

export function PersonCard({
  person,
  variant = 'lawyer',
  featured = false,
}: PersonCardProps) {
  const hasDetails =
    Boolean(person.experience) ||
    Boolean(person.bio) ||
    Boolean(person.workHistory) ||
    Boolean(person.expertise?.length)

  return (
    <article
      className={cn(
        'group overflow-hidden rounded-xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-gold/60',
        featured &&
          'md:grid md:grid-cols-[minmax(17rem,0.8fr)_minmax(0,1.2fr)]',
      )}
    >
      <div
        className={cn(
          'relative aspect-[4/5] w-full bg-secondary',
          featured && 'md:aspect-auto md:min-h-[30rem]',
        )}
      >
        <Image
          src={person.image || '/person-placeholder.svg'}
          alt={`ภาพของ ${person.name}`}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.02]"
          sizes={featured ? '(max-width: 768px) 100vw, 36vw' : '(max-width: 768px) 100vw, 33vw'}
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-primary/45 to-transparent" />
      </div>
      <div
        className={cn(
          'p-6',
          featured && 'md:flex md:flex-col md:justify-center md:p-8 lg:p-10',
        )}
      >
        <h3
          className={cn(
            'font-serif text-xl font-bold text-primary',
            featured && 'md:text-3xl',
          )}
        >
          {person.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[oklch(0.55_0.1_60)]">{person.role}</p>
        {variant === 'lawyer' && (
          <div className="mt-4 flex items-start gap-2 rounded-lg bg-secondary px-3 py-2.5">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="text-xs leading-5 text-muted-foreground">
              <span className="block font-semibold text-primary">เลขที่ใบอนุญาตทนายความ</span>
              {person.licenseNumber || 'รอระบุข้อมูล'}
            </p>
          </div>
        )}
        {person.expertise && person.expertise.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {person.expertise.map((expertise) => (
              <span
                key={expertise}
                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
              >
                {expertise}
              </span>
            ))}
          </div>
        )}
        {hasDetails && (
          <div className="mt-4 border-t border-border pt-4">
            {variant === 'advisor' && person.workHistory && (
              <div className="flex items-start gap-2">
                <BriefcaseBusiness className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-primary">ประวัติการทำงานโดยย่อ</p>
                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    {person.workHistory}
                  </p>
                </div>
              </div>
            )}
            {variant === 'lawyer' && person.experience && (
              <p className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                <BriefcaseBusiness className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{person.experience}</span>
              </p>
            )}
            {variant === 'lawyer' && person.bio && (
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{person.bio}</p>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
