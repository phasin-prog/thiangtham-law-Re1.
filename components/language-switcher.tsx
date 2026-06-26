'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { useTranslation, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type LanguageSwitcherProps = {
  className?: string
  size?: 'compact' | 'comfortable'
}

const languageOptions: Array<{
  locale: Locale
  label: string
  ariaLabel: string
  changedLabel: string
}> = [
  {
    locale: 'th',
    label: 'ไทย',
    ariaLabel: 'Switch language to Thai',
    changedLabel: 'Language changed to Thai',
  },
  {
    locale: 'en',
    label: 'EN',
    ariaLabel: 'Switch language to English',
    changedLabel: 'Language changed to English',
  },
]

export function LanguageSwitcher({
  className,
  size = 'compact',
}: LanguageSwitcherProps) {
  const { targetLocale, successLocale, switchLocale } = useTranslation()
  const [rippleLocale, setRippleLocale] = useState<Locale | null>(null)
  const rippleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (rippleTimerRef.current) {
        clearTimeout(rippleTimerRef.current)
      }
    }
  }, [])

  function showRipple(locale: Locale) {
    setRippleLocale(locale)
    if (rippleTimerRef.current) {
      clearTimeout(rippleTimerRef.current)
    }
    rippleTimerRef.current = setTimeout(() => {
      setRippleLocale(null)
    }, 150)
  }

  const statusText = successLocale
    ? languageOptions.find((option) => option.locale === successLocale)?.changedLabel
    : ''

  return (
    <div
      className={cn('language-switcher', className)}
      data-active-locale={targetLocale}
      data-size={size}
      role="group"
      aria-label="Language switcher"
    >
      <span className="language-switcher__indicator" aria-hidden="true" />
      {languageOptions.map((option) => {
        const active = targetLocale === option.locale
        const success = successLocale === option.locale

        return (
          <button
            key={option.locale}
            type="button"
            className="language-switcher__option"
            data-active={active ? 'true' : 'false'}
            data-ripple={rippleLocale === option.locale ? 'true' : 'false'}
            aria-label={option.ariaLabel}
            aria-pressed={active}
            onPointerDown={() => showRipple(option.locale)}
            onClick={() => switchLocale(option.locale)}
          >
            <span className="language-switcher__label">{option.label}</span>
            <Check
              className="language-switcher__check"
              data-visible={success ? 'true' : 'false'}
              aria-hidden="true"
            />
          </button>
        )
      })}
      <span className="sr-only" aria-live="polite">
        {statusText}
      </span>
    </div>
  )
}
