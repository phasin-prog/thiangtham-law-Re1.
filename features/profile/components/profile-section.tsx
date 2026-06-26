'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ProfileSectionProps = {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function ProfileSection({ title, icon, children, className }: ProfileSectionProps) {
  return (
    <section className={cn('space-y-6', className)}>
      <div className="flex items-center gap-3 text-primary">
        {icon}
        <h2 className="font-serif text-2xl font-bold tracking-tight">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
