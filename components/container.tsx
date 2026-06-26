import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Container({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-6xl px-4 sm:px-6',
        className,
      )}
      data-motion-container=""
      {...props}
    >
      {children}
    </div>
  )
}
