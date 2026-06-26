'use client'

import { useId, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { 
  AlertCircle, 
  CheckCircle2, 
  Send, 
  ChevronDown,
  Scale,
  ShieldCheck,
  Users,
  Landmark,
  FileText,
  CircleHelp,
  MapPin,
} from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type ConsultationFormProps = {
  tone?: 'light' | 'dark'
}

const serviceOptions = [
  { value: 'civil', th: 'คดีแพ่งและพาณิชย์', en: 'Civil & Commercial', icon: Scale, color: 'text-blue', bg: 'bg-blue/10' },
  { value: 'criminal', th: 'คดีอาญา', en: 'Criminal Defense', icon: ShieldCheck, color: 'text-navy', bg: 'bg-navy/10' },
  { value: 'family', th: 'คดีครอบครัว', en: 'Family Law', icon: Users, color: 'text-jade', bg: 'bg-jade/10' },
  { value: 'inheritance', th: 'คดีมรดก', en: 'Inheritance Law', icon: Landmark, color: 'text-gold-ink', bg: 'bg-gold/10' },
  { value: 'contract', th: 'สัญญาและธุรกิจ', en: 'Contracts & Business', icon: FileText, color: 'text-gold-ink', bg: 'bg-gold/10' },
  { value: 'land', th: 'คดีที่ดิน', en: 'Land Disputes', icon: MapPin, color: 'text-gold-ink', bg: 'bg-gold/10' },
  { value: 'other', th: 'เรื่องอื่น ๆ', en: 'Other Matters', icon: CircleHelp, color: 'text-primary', bg: 'bg-secondary' },
] as const

export function ConsultationForm({ tone = 'light' }: ConsultationFormProps) {
  const { locale, t } = useTranslation()
  const pathname = usePathname()
  const formId = useId().replace(/:/g, '')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [focusIndex, setFocusIndex] = useState<number>(-1)
  const isDark = tone === 'dark'

  const labelClass = cn(
    'text-sm font-semibold',
    isDark ? 'text-gold' : 'text-primary',
  )
  const inputClass = cn(
    'mt-2 w-full rounded-lg border px-4 py-3 text-base outline-none transition-colors focus:ring-2',
    isDark
      ? 'border-white/20 bg-white/[0.07] text-white placeholder:text-primary-foreground/60 focus:border-gold focus:ring-gold/35'
      : 'border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-gold/35',
  )

  useGSAP(() => {
    if (isDropdownOpen) {
      gsap.to(listRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        display: 'block'
      })
      gsap.fromTo(".dropdown-item", 
        { x: -10, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      gsap.to(listRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        display: 'none'
      })
    }
  }, [isDropdownOpen])

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (!isDropdownOpen) {
          setIsDropdownOpen(true)
          setFocusIndex(0)
        } else {
          setFocusIndex((prev) => Math.min(prev + 1, serviceOptions.length - 1))
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isDropdownOpen) {
          setFocusIndex((prev) => Math.max(prev - 1, 0))
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isDropdownOpen && focusIndex >= 0) {
          setSelectedService(serviceOptions[focusIndex].value)
          setIsDropdownOpen(false)
          setFocusIndex(-1)
          triggerRef.current?.focus()
        } else {
          setIsDropdownOpen(true)
          setFocusIndex(0)
        }
        break
      case 'Escape':
        if (isDropdownOpen) {
          event.preventDefault()
          setIsDropdownOpen(false)
          setFocusIndex(-1)
        }
        break
    }
  }

  function handleOptionKeyDown(event: React.KeyboardEvent<HTMLDivElement>, index: number) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        setSelectedService(serviceOptions[index].value)
        setIsDropdownOpen(false)
        setFocusIndex(-1)
        triggerRef.current?.focus()
        break
      case 'Escape':
        event.preventDefault()
        setIsDropdownOpen(false)
        setFocusIndex(-1)
        triggerRef.current?.focus()
        break
      case 'ArrowDown':
        event.preventDefault()
        setFocusIndex((prev) => Math.min(prev + 1, serviceOptions.length - 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        setFocusIndex((prev) => Math.max(prev - 1, 0))
        break
    }
  }

  function selectService(value: string) {
    setSelectedService(value)
    setIsDropdownOpen(false)
    setFocusIndex(-1)
    triggerRef.current?.focus()
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedService) {
      setErrorMessage(t('กรุณาเลือกประเภทคดี', 'Please select a case type'))
      setStatus('error')
      return
    }
    
    setStatus('submitting')
    setErrorMessage('')

    const data = new FormData(event.currentTarget)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          message: data.get('message'),
          service: selectedService,
          website: data.get('website'),
          consent: data.get('consent') === 'on',
          locale,
          sourcePath: pathname,
        }),
      })

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`)
      }

      setStatus('success')
    } catch {
      setErrorMessage(
        t(
          'ยังไม่สามารถส่งข้อมูลได้ กรุณาลองอีกครั้ง หรือติดต่อสำนักงานทางโทรศัพท์หรือ LINE',
          'We could not send your information. Please try again or contact the office by phone or LINE.',
        ),
      )
      setStatus('error')
    }
  }

  const selectedOption = serviceOptions.find(opt => opt.value === selectedService)

  if (status === 'success') {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-10 text-center',
          !isDark && 'rounded-xl border border-border bg-card px-6',
        )}
        role="status"
        aria-live="polite"
      >
        <div
          className={cn(
            'flex size-16 items-center justify-center rounded-full',
            isDark ? 'bg-gold/20 text-gold' : 'bg-primary/10 text-primary',
          )}
        >
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h3
          className={cn(
            'mt-6 font-serif text-2xl font-bold',
            isDark ? 'text-white' : 'text-primary',
          )}
        >
          {t('ได้รับข้อมูลของท่านแล้ว', 'Request Received')}
        </h3>
        <p
          className={cn(
            'mt-2 max-w-md text-sm leading-7',
            isDark ? 'text-primary-foreground/75' : 'text-muted-foreground',
          )}
        >
          {t(
            'ทีมงานจะตรวจสอบข้อมูลเบื้องต้นและติดต่อกลับตามหมายเลขที่ท่านระบุ',
            'Our team will review the information and contact you using the phone number provided.',
          )}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className={cn(
            'mt-8 rounded-md px-4 py-2 text-sm font-bold focus-visible:outline-none focus-visible:ring-2',
            isDark
              ? 'text-gold hover:bg-white/10 focus-visible:ring-gold'
              : 'text-primary hover:bg-secondary focus-visible:ring-primary',
          )}
        >
          {t('ส่งคำขอใหม่', 'Send another request')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-busy={status === 'submitting'}
      className={cn(
        'grid gap-5',
        !isDark && 'rounded-xl border border-border bg-card p-6 md:p-8',
      )}
    >
      <div className={cn(
        "flex items-start gap-2.5 rounded-lg px-4 py-3 text-[12px] font-semibold border",
        isDark 
          ? "bg-white/10 text-white border-white/20 shadow-sm" 
          : "bg-gold/10 text-gold-ink border-gold/20"
      )}>
        <AlertCircle className={cn("size-4 shrink-0 mt-0.5", isDark ? "text-gold" : "text-gold-ink")} />
        <p className="leading-relaxed">
          {t(
            'เครื่องหมาย * จำเป็นต้องระบุ เพื่อให้ทนายความประเมินเบื้องต้นได้อย่างถูกต้อง',
            'Fields marked with * are required for an accurate initial legal assessment.'
          )}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-name`} className={labelClass}>
            {t('ชื่อ-นามสกุล', 'Full Name')} <span className="text-red-500">*</span>
          </label>
          <input
            required
            id={`${formId}-name`}
            name="name"
            type="text"
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className={inputClass}
            placeholder={t('เช่น สมชาย ใจดี', 'e.g. John Doe')}
            aria-label={t('ชื่อและนามสกุลของคุณ', 'Your full name')}
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className={labelClass}>
            {t('เบอร์โทรศัพท์', 'Phone Number')} <span className="text-red-500">*</span>
          </label>
          <input
            required
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            minLength={6}
            maxLength={30}
            autoComplete="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="081-234-5678"
            aria-label={t('เบอร์โทรศัพท์ติดต่อ', 'Your phone number')}
          />
        </div>
      </div>

      <div className="relative">
        <label className={labelClass}>
          {t('ประเภทคดีหรือบริการ', 'Legal Service Type')} <span className="text-red-500">*</span>
        </label>
        
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            inputClass,
            "flex items-center justify-between text-left",
            !selectedService && (isDark ? "text-primary-foreground/60" : "text-muted-foreground")
          )}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-activedescendant={isDropdownOpen && focusIndex >= 0 ? `${formId}-option-${serviceOptions[focusIndex].value}` : undefined}
        >
          <span className="flex items-center gap-3">
            {selectedOption ? (
              <>
                <div className={cn("flex size-6 items-center justify-center rounded-md", selectedOption.bg, selectedOption.color)}>
                  <selectedOption.icon className="size-4" />
                </div>
                <span className="font-semibold text-primary">{locale === 'en' ? selectedOption.en : selectedOption.th}</span>
              </>
            ) : (
              t('เลือกประเภทเรื่องที่ต้องการปรึกษา', 'Select a legal service')
            )}
          </span>
          <ChevronDown className={cn("size-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
        </button>

        <div 
          ref={listRef}
          className="absolute z-50 mt-2 hidden w-full overflow-hidden rounded-xl border border-border bg-white shadow-xl"
          role="listbox"
          tabIndex={-1}
          aria-label={t('ประเภทคดีหรือบริการ', 'Legal Service Type')}
        >
          <div className="max-h-[300px] overflow-y-auto p-2">
            {serviceOptions.map((option, index) => (
              <div
                key={option.value}
                id={`${formId}-option-${option.value}`}
                onClick={() => selectService(option.value)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                tabIndex={-1}
                className={cn(
                  "dropdown-item group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary focus:bg-secondary focus:outline-none",
                  selectedService === option.value && "bg-secondary",
                  focusIndex === index && "bg-secondary"
                )}
                role="option"
                aria-selected={selectedService === option.value}
              >
                <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110", option.bg, option.color)}>
                  <option.icon className="size-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-primary leading-none">{locale === 'en' ? option.en : option.th}</p>
                  <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">{option.value} case</p>
                </div>
                {selectedService === option.value && (
                  <CheckCircle2 className="size-4 text-gold-ink" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          {t('รายละเอียดเบื้องต้น', 'Case Brief')} <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          id={`${formId}-message`}
          name="message"
          rows={4}
          minLength={10}
          maxLength={5000}
          className={cn(inputClass, 'resize-y')}
          placeholder={t(
            'ระบุเหตุการณ์สำคัญ วันที่ คู่กรณี และสิ่งที่ต้องการให้ช่วยโดยสังเขป',
            'Briefly describe the key events, dates, parties involved, and the help you need.',
          )}
          aria-label={t('รายละเอียดเรื่องที่ต้องการปรึกษา', 'Case details and inquiry brief')}
        />
        <div className="mt-2 flex items-start gap-2 text-xs leading-5">
          <CircleHelp className="size-3.5 mt-0.5 text-gold-ink shrink-0" />
          <p className={isDark ? 'text-primary-foreground/65' : 'text-muted-foreground'}>
            {t(
              'โปรดเล่าเรื่องตามจริง เพื่อประโยชน์ในการวินิจฉัยประเด็นข้อกฎหมาย',
              'Please provide factual details to ensure accurate legal diagnosis.'
            )}
          </p>
        </div>
      </div>

      <div className="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <label
        className={cn(
          'flex items-start gap-3 text-sm leading-6',
          isDark ? 'text-primary-foreground/80' : 'text-muted-foreground',
        )}
      >
        <input
          required
          name="consent"
          type="checkbox"
          className="mt-1 size-4 shrink-0 accent-gold"
        />
        <span>
          {t(
            'ข้าพเจ้ายินยอมให้สำนักงานใช้ข้อมูลนี้เพื่อประเมินเบื้องต้นและติดต่อกลับ',
            'I consent to the office using this information for an initial assessment and follow-up.',
          )}
        </span>
      </label>

      {status === 'error' && (
        <div
          className={cn(
            'flex items-start gap-3 rounded-lg px-4 py-3 text-sm leading-6',
            isDark
              ? 'border border-red-300/35 bg-red-950/35 text-red-100'
              : 'bg-destructive/10 text-destructive',
          )}
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          'motion-action group mt-1 flex min-h-14 items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
          isDark
            ? 'bg-gold text-primary-dark hover:bg-gold-soft focus-visible:ring-gold focus-visible:ring-offset-primary-dark'
            : 'bg-primary text-primary-foreground hover:bg-primary-dark focus-visible:ring-primary focus-visible:ring-offset-background',
        )}
      >
        {status === 'submitting' ? (
          <>
            <span className="sr-only">{t('กำลังส่งข้อมูล...', 'Sending...')}</span>
            <span className="skeleton-shimmer skeleton-shimmer--inline h-3 w-40 rounded-full" aria-hidden="true" />
          </>
        ) : (
          <>
            <Send
              className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
            {t('ส่งข้อมูลเพื่อขอรับการประเมิน', 'Request Case Evaluation')}
          </>
        )}
      </button>

      <p
        className={cn(
          'text-center text-xs leading-5',
          isDark ? 'text-primary-foreground/60' : 'text-muted-foreground',
        )}
      >
        {t(
          'การส่งแบบฟอร์มยังไม่ถือเป็นการรับว่าความหรือการให้ความเห็นทางกฎหมายเฉพาะกรณี',
          'Submitting this form does not establish a lawyer-client engagement or constitute case-specific legal advice.',
        )}
      </p>
    </form>
  )
}
