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
      data-motion-reveal=""
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-xs font-bold tracking-[0.18em] uppercase',
            light ? 'text-gold' : 'text-gold-ink',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-4 text-balance font-serif text-3xl font-bold leading-[1.12] tracking-tight md:text-4xl lg:text-[2.75rem]',
          light ? 'text-white' : 'text-primary',
        )}
      >
        {title}
      </h2>
      {!hideDivider && (
        <span
          className={cn(
            'mt-6 block h-1 w-10 rounded-full bg-gold',
            align === 'center' && 'mx-auto',
          )}
          aria-hidden="true"
        />
      )}
      {description && (
        <p
          className={cn(
            'mt-6 max-w-[68ch] text-pretty text-base leading-8 md:text-lg',
            align === 'center' && 'mx-auto',
            light ? 'text-white' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
