'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { Container } from '@/components/container'
import { cn } from '@/lib/utils'

function SkeletonBlock({
  className,
  rounded = 'rounded-lg',
}: {
  className?: string
  rounded?: string
}) {
  return (
    <span
      className={cn('skeleton-shimmer block bg-muted', rounded, className)}
      aria-hidden="true"
    />
  )
}

export function DelayedSkeleton({
  children,
  delay = 150,
}: {
  children: ReactNode
  delay?: number
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={cn('skeleton-loading-shell', visible && 'is-visible')}
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      {children}
    </div>
  )
}

export function SkeletonNavbar() {
  return (
    <div className="border-b border-border bg-primary text-primary-foreground">
      <Container className="flex min-h-14 items-center justify-center gap-3 py-2">
        {Array.from({ length: 7 }).map((_, index) => (
          <SkeletonBlock
            key={index}
            className={cn('hidden h-8 w-24 bg-primary-foreground/12 lg:block', index > 4 && 'w-11')}
            rounded="rounded-md"
          />
        ))}
      </Container>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <section className="relative min-h-[700px] overflow-hidden bg-primary text-primary-foreground lg:min-h-[850px]">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary to-primary/80" />
      <Container className="relative flex h-full min-h-[inherit] items-center py-24 lg:py-32">
        <div className="grid w-full gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-4xl">
            <SkeletonBlock className="h-10 w-64 bg-primary-foreground/12" rounded="rounded-full" />
            <div className="mt-10 space-y-5">
              <SkeletonBlock className="h-16 w-full max-w-3xl bg-primary-foreground/14" />
              <SkeletonBlock className="h-14 w-11/12 max-w-2xl bg-primary-foreground/14" />
              <SkeletonBlock className="h-10 w-3/4 max-w-xl bg-gold/25" />
            </div>
            <div className="mt-10 space-y-3">
              <SkeletonBlock className="h-5 w-full max-w-2xl bg-primary-foreground/12" />
              <SkeletonBlock className="h-5 w-10/12 max-w-xl bg-primary-foreground/12" />
            </div>
            <div className="mt-12 flex flex-col gap-5 sm:flex-row">
              <SkeletonBlock className="h-[60px] w-full bg-gold/35 sm:w-56" rounded="rounded-xl" />
              <SkeletonBlock className="h-[60px] w-full bg-primary-foreground/10 sm:w-48" rounded="rounded-xl" />
            </div>
          </div>

          <div className="rounded-2xl border border-primary-foreground/15 bg-primary-dark/40 p-10 sm:p-12">
            <SkeletonContactForm tone="dark" />
          </div>
        </div>
      </Container>
    </section>
  )
}

export function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <article
      className={cn(
        'rounded-xl border border-border bg-card p-8 shadow-sm',
        featured ? 'min-h-[340px] lg:col-span-2' : 'min-h-[260px]',
      )}
    >
      <div className="flex items-start justify-between">
        <SkeletonBlock className="size-14 bg-secondary" rounded="rounded-2xl" />
        <SkeletonBlock className="size-10 bg-muted" rounded="rounded-full" />
      </div>
      <div className="mt-10 space-y-4">
        <SkeletonBlock className="h-8 w-8/12 bg-secondary" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-10/12" />
      </div>
    </article>
  )
}

export function SkeletonArticle() {
  return (
    <article className="rounded-2xl border border-border bg-card p-8 shadow-sm">
      <SkeletonBlock className="h-8 w-32 bg-gold/15" rounded="rounded-full" />
      <div className="mt-8 space-y-4">
        <SkeletonBlock className="h-7 w-full bg-secondary" />
        <SkeletonBlock className="h-7 w-10/12 bg-secondary" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-9/12" />
      </div>
      <SkeletonBlock className="mt-10 h-5 w-36 bg-secondary" />
    </article>
  )
}

export function SkeletonTeam() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <SkeletonBlock className="h-5 w-32 bg-gold/15" />
            <SkeletonBlock className="h-12 w-10/12 bg-secondary" />
            <SkeletonBlock className="h-5 w-full" />
            <SkeletonBlock className="h-5 w-9/12" />
            <div className="space-y-4 pt-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-5 rounded-2xl border border-border p-4">
                  <SkeletonBlock className="size-14 bg-secondary" rounded="rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <SkeletonBlock className="h-5 w-7/12 bg-secondary" />
                    <SkeletonBlock className="h-4 w-11/12" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <SkeletonBlock className="min-h-[420px] bg-primary/90" rounded="rounded-3xl" />
        </div>
      </Container>
    </section>
  )
}

export function SkeletonTestimonial() {
  return (
    <article className="rounded-2xl border border-border bg-card p-10 shadow-sm">
      <SkeletonBlock className="size-12 bg-secondary" rounded="rounded-xl" />
      <div className="mt-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBlock key={index} className="size-5 bg-gold/20" rounded="rounded-full" />
        ))}
      </div>
      <div className="mt-8 space-y-4">
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-8/12" />
      </div>
      <div className="mt-10 border-t border-border pt-6">
        <SkeletonBlock className="h-6 w-44 bg-secondary" />
        <SkeletonBlock className="mt-3 h-4 w-28" />
      </div>
    </article>
  )
}

export function SkeletonContactForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  const blockClass = dark ? 'bg-primary-foreground/12' : undefined

  return (
    <div className="grid gap-5">
      <SkeletonBlock className={cn('h-12 w-full', blockClass)} rounded="rounded-lg" />
      <div className="grid gap-5 sm:grid-cols-2">
        <SkeletonBlock className={cn('h-20 w-full', blockClass)} />
        <SkeletonBlock className={cn('h-20 w-full', blockClass)} />
      </div>
      <SkeletonBlock className={cn('h-20 w-full', blockClass)} />
      <SkeletonBlock className={cn('h-36 w-full', blockClass)} />
      <SkeletonBlock className={cn('h-6 w-10/12', blockClass)} />
      <SkeletonBlock className={cn('h-14 w-full', dark ? 'bg-gold/25' : 'bg-primary/15')} rounded="rounded-lg" />
    </div>
  )
}

export function SkeletonFooter() {
  return (
    <footer className="bg-primary-dark py-16 text-primary-foreground">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <SkeletonBlock className="h-6 w-36 bg-primary-foreground/12" />
            <SkeletonBlock className="h-4 w-full bg-primary-foreground/10" />
            <SkeletonBlock className="h-4 w-10/12 bg-primary-foreground/10" />
            <SkeletonBlock className="h-4 w-8/12 bg-primary-foreground/10" />
          </div>
        ))}
      </Container>
    </footer>
  )
}

function SkeletonTeamMemberCard({ featured = false }: { featured?: boolean }) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-xl border border-border bg-card',
        featured && 'md:grid md:grid-cols-[0.9fr_1.1fr]',
      )}
    >
      <SkeletonBlock
        className={cn('aspect-[4/5] w-full bg-secondary', featured && 'md:aspect-auto md:min-h-[400px]')}
        rounded="rounded-none"
      />
      <div className={cn('p-6', featured && 'md:p-10')}>
        <SkeletonBlock className={cn('h-8 w-8/12 bg-secondary', featured && 'md:h-10')} />
        <SkeletonBlock className="mt-3 h-4 w-5/12 bg-gold/20" />
        <SkeletonBlock className="mt-8 h-px w-full bg-border" rounded="rounded-none" />
        <SkeletonBlock className="mt-6 h-4 w-full" />
        <SkeletonBlock className="mt-3 h-4 w-9/12" />
        <div className="mt-6 flex gap-2">
          <SkeletonBlock className="h-7 w-28 bg-secondary" rounded="rounded-full" />
          <SkeletonBlock className="h-7 w-24 bg-secondary" rounded="rounded-full" />
        </div>
      </div>
    </article>
  )
}

function SkeletonSectionHeader({ light = false }: { light?: boolean }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <SkeletonBlock className={cn('mx-auto h-4 w-32', light ? 'bg-gold/20' : 'bg-gold/15')} />
      <SkeletonBlock className={cn('mx-auto mt-5 h-12 w-8/12', light ? 'bg-primary-foreground/12' : 'bg-secondary')} />
      <SkeletonBlock className={cn('mx-auto mt-6 h-1 w-10', light ? 'bg-gold/30' : 'bg-gold/30')} rounded="rounded-full" />
      <SkeletonBlock className={cn('mx-auto mt-6 h-5 w-10/12', light ? 'bg-primary-foreground/10' : undefined)} />
    </div>
  )
}

export function SkeletonTeamPage() {
  return (
    <DelayedSkeleton>
      <main className="relative bg-ivory" aria-hidden="true">
        <section className="border-b-2 border-gold/40 bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <SkeletonBlock className="h-4 w-48 bg-primary-foreground/12" />
            <SkeletonBlock className="mt-5 h-10 w-80 max-w-full bg-gold/25" />
            <SkeletonBlock className="mt-4 h-5 w-full max-w-2xl bg-primary-foreground/12" />
            <SkeletonBlock className="mt-3 h-5 w-10/12 max-w-xl bg-primary-foreground/12" />
          </div>
        </section>

        <div className="sticky top-20 z-30 border-b border-gold/20 bg-ivory/95 py-4 md:top-24">
          <Container>
            <div className="flex justify-center gap-3 overflow-hidden sm:gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <SkeletonBlock
                  key={index}
                  className={cn('h-4 bg-muted', index === 0 ? 'w-14' : 'w-24')}
                />
              ))}
            </div>
          </Container>
        </div>

        <section className="py-20 md:py-32">
          <Container>
            <SkeletonSectionHeader />
            <div className="mx-auto mt-16 max-w-4xl">
              <SkeletonTeamMemberCard featured />
            </div>
          </Container>
        </section>

        <section className="bg-secondary/20 py-20 md:py-32">
          <Container>
            <SkeletonSectionHeader />
            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonTeamMemberCard key={index} />
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 md:py-32">
          <Container>
            <SkeletonSectionHeader />
            <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonTeamMemberCard key={index} />
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-primary py-20 text-white md:py-32">
          <Container>
            <SkeletonSectionHeader light />
            <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <article key={index} className="rounded-xl border border-white/10 bg-white/8 p-6">
                  <SkeletonBlock className="h-4 w-32 bg-gold/20" />
                  <SkeletonBlock className="mt-4 h-7 w-8/12 bg-primary-foreground/12" />
                </article>
              ))}
            </div>
          </Container>
        </section>
      </main>
    </DelayedSkeleton>
  )
}

export function SkeletonProfilePage() {
  return (
    <DelayedSkeleton>
      <main className="min-h-screen bg-ivory pb-20" aria-hidden="true">
        <div className="border-b border-gold/10 bg-card/70">
          <Container className="flex h-16 items-center">
            <SkeletonBlock className="h-5 w-40 bg-secondary" />
          </Container>
        </div>

        <Container className="mt-12 md:mt-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
            <SkeletonBlock className="aspect-[4/5] w-full bg-secondary shadow-2xl md:sticky md:top-32" rounded="rounded-2xl" />

            <div>
              <SkeletonBlock className="h-4 w-56 bg-gold/20" />
              <SkeletonBlock className="mt-5 h-14 w-10/12 bg-secondary md:h-20" />
              <SkeletonBlock className="mt-4 h-7 w-7/12 bg-muted" />
              <SkeletonBlock className="mt-8 h-20 w-full bg-primary/15" rounded="rounded-xl" />

              <div className="mt-12 grid gap-10 border-t border-gold/10 pt-12 md:grid-cols-2">
                <div className="rounded-2xl bg-secondary/30 p-8 md:col-span-2">
                  <SkeletonBlock className="h-5 w-full" />
                  <SkeletonBlock className="mt-3 h-5 w-10/12" />
                </div>

                {Array.from({ length: 3 }).map((_, index) => (
                  <section key={index} className="space-y-5">
                    <SkeletonBlock className="h-8 w-52 bg-secondary" />
                    <div className="space-y-4 border-l-2 border-gold/10 pl-6">
                      <SkeletonBlock className="h-5 w-full" />
                      <SkeletonBlock className="h-5 w-10/12" />
                      <SkeletonBlock className="h-5 w-8/12" />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </DelayedSkeleton>
  )
}
