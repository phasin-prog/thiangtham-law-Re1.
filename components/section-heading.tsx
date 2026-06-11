import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
  hideDivider = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
  hideDivider?: boolean
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-[13px] font-bold tracking-[0.2em] uppercase opacity-80',
            light ? 'text-gold' : 'text-primary/70',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-3 text-balance font-serif text-3xl font-bold leading-tight md:text-4xl',
          light ? 'text-white' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {!hideDivider && (
        <span
          className={cn(
            'mt-4 block h-0.5 w-12 rounded-full bg-gold/60',
            align === 'center' && 'mx-auto',
          )}
          aria-hidden="true"
        />
      )}
      {description && (
        <p
          className={cn(
            'mt-5 text-pretty text-base leading-8',
            light ? 'text-white/80' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
