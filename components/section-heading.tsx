import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-semibold uppercase tracking-wider',
            light ? 'text-gold' : 'text-primary',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'mt-2 text-balance font-serif text-2xl font-bold md:text-3xl',
          light ? 'text-gold' : 'text-primary',
        )}
      >
        {title}
      </h2>
      <span
        className={cn(
          'mt-3 block h-0.5 w-16 rounded bg-gold',
          align === 'center' && 'mx-auto',
        )}
        aria-hidden="true"
      />
      {description && (
        <p
          className={cn(
            'mt-4 text-pretty leading-relaxed',
            light ? 'text-primary-foreground/85' : 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
