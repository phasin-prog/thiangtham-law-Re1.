import {
  DelayedSkeleton,
  SkeletonArticle,
  SkeletonCard,
  SkeletonHero,
  SkeletonNavbar,
  SkeletonTeam,
  SkeletonTestimonial,
} from '@/components/skeleton-loaders'
import { Container } from '@/components/container'

export default function Loading() {
  return (
    <DelayedSkeleton>
      <main className="overflow-x-hidden" aria-hidden="true">
        <SkeletonNavbar />
        <SkeletonHero />

        <section className="relative z-10 -mt-20 pb-24 md:pb-32">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
              <SkeletonCard featured />
              <SkeletonCard featured />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-5">
                <div className="skeleton-shimmer h-5 w-36 rounded-lg bg-gold/15" />
                <div className="skeleton-shimmer h-12 w-full rounded-lg bg-secondary" />
                <div className="skeleton-shimmer h-5 w-11/12 rounded-lg bg-muted" />
              </div>
              <div className="skeleton-shimmer h-16 w-64 rounded-full bg-muted" />
            </div>
            <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </Container>
        </section>

        <SkeletonTeam />

        <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-10 border-b border-primary-foreground/10 pb-16">
              <div className="max-w-2xl space-y-5">
                <div className="skeleton-shimmer h-5 w-40 rounded-lg bg-gold/20" />
                <div className="skeleton-shimmer h-12 w-full rounded-lg bg-primary-foreground/12" />
                <div className="skeleton-shimmer h-5 w-11/12 rounded-lg bg-primary-foreground/10" />
              </div>
              <div className="skeleton-shimmer h-10 w-56 rounded-lg bg-gold/20" />
            </div>
            <div className="mt-20 grid gap-12 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonArticle key={index} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-24 md:py-32">
          <Container>
            <div className="grid gap-8 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonTestimonial key={index} />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </DelayedSkeleton>
  )
}
