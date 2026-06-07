import Image from 'next/image'
import { BadgeCheck } from 'lucide-react'
import type { Person } from '@/lib/site-data'

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative aspect-[4/5] w-full bg-secondary">
        <Image
          src={person.image || '/placeholder.svg'}
          alt={`ภาพของ ${person.name}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-bold text-burgundy">
          {person.name}
        </h3>
        <p className="text-sm font-medium text-gold-soft">
          <span className="text-[oklch(0.55_0.1_60)]">{person.role}</span>
        </p>
        {person.license && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <BadgeCheck className="size-3.5 text-burgundy" aria-hidden="true" />
            {person.license}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {person.expertise.map((e) => (
            <span
              key={e}
              className="rounded-full bg-burgundy/10 px-2.5 py-0.5 text-xs font-medium text-burgundy"
            >
              {e}
            </span>
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {person.bio}
        </p>
      </div>
    </article>
  )
}
