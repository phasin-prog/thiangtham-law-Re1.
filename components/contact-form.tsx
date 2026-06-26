'use client'

import { useId, useState, useRef } from 'react'
import { 
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
  AlertCircle
} from 'lucide-react'
import { DisclaimerBlock } from '@/components/disclaimer-block'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const serviceOptions = [
  { value: 'civil', th: 'คดีแพ่งและพาณิชย์', en: 'Civil & Commercial', icon: Scale, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { value: 'criminal', th: 'คดีอาญา', en: 'Criminal Defense', icon: ShieldCheck, color: 'text-slate-900', bg: 'bg-slate-900/10' },
  { value: 'family', th: 'คดีครอบครัว', en: 'Family Law', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-600/10' },
  { value: 'inheritance', th: 'คดีมรดก', en: 'Inheritance Law', icon: Landmark, color: 'text-amber-600', bg: 'bg-amber-600/10' },
  { value: 'contract', th: 'สัญญาและธุรกิจ', en: 'Contracts & Business', icon: FileText, color: 'text-amber-700', bg: 'bg-amber-700/10' },
  { value: 'land', th: 'คดีที่ดิน', en: 'Land Disputes', icon: MapPin, color: 'text-orange-600', bg: 'bg-orange-600/10' },
  { value: 'other', th: 'เรื่องอื่น ๆ', en: 'Other Matters', icon: CircleHelp, color: 'text-primary', bg: 'bg-secondary' },
] as const

const inputClass =
  'mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-gold/35'

export function ContactForm() {
  const { locale, t } = useTranslation()
  const formId = useId().replace(/:/g, '')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string>('')
  
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (isDropdownOpen) {
      gsap.to(listRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
        display: 'block'
      })
      gsap.fromTo(".contact-dropdown-item", 
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || ''),
      phone: String(data.get('phone') || ''),
      message: String(data.get('detail') || ''),
      service: selectedService || 'other',
      locale,
      sourcePath: window.location.pathname,
      consent: true,
      website: '',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const selectedOption = serviceOptions.find(opt => opt.value === selectedService)

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center animate-in fade-in zoom-in duration-500 shadow-xl">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold text-primary">
          {t('ได้รับข้อมูลของท่านแล้ว', 'Received Your Information')}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {t(
            'ขอบคุณที่ติดต่อสำนักกฎหมายเที่ยงธรรมทนายความ ทีมงานจะติดต่อกลับตามช่องทางที่ท่านระบุโดยเร็วที่สุด',
            'Thank you for contacting Thiangtham Law Office. Our team will get back to you through your preferred channel as soon as possible.'
          )}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 rounded-lg border-2 border-primary px-8 py-3 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white"
        >
          {t('ส่งข้อมูลอีกครั้ง', 'Send information again')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-card p-6 md:p-10 shadow-xl"
    >
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0" tabIndex={-1}>
        <input name="website" value="" autoComplete="off" tabIndex={-1} />
      </div>
      <div className="mb-8 flex items-start gap-3 rounded-xl bg-secondary/50 px-5 py-4 text-sm font-semibold text-primary border border-border shadow-sm">
        <AlertCircle className="size-5 shrink-0 mt-0.5 text-gold-ink" />
        <p className="leading-relaxed">
          {t(
            'เครื่องหมาย * จำเป็นต้องระบุ เพื่อให้ทีมทนายตรวจสอบข้อมูลเบื้องต้นได้อย่างครบถ้วน',
            'Fields marked with * are required for a complete initial legal review.'
          )}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-name`} className="text-sm font-bold text-primary">
            {t('ชื่อ-นามสกุล', 'Full Name')} <span className="text-red-500">*</span>
          </label>
          <input 
            id={`${formId}-name`} 
            name="name" 
            required 
            className={inputClass}
            placeholder={t('เช่น นายสมชาย ใจดี', 'e.g. Mr. John Doe')} 
          />
        </div>
        <div>
          <label htmlFor={`${formId}-phone`} className="text-sm font-bold text-primary">
            {t('เบอร์โทรศัพท์', 'Phone Number')} <span className="text-red-500">*</span>
          </label>
          <input 
            id={`${formId}-phone`} 
            name="phone" 
            type="tel" 
            required 
            className={inputClass}
            placeholder="081-234-5678" 
          />
        </div>
        <div>
          <label htmlFor={`${formId}-line`} className="text-sm font-bold text-primary">
            LINE ID
          </label>
          <input 
            id={`${formId}-line`} 
            name="line" 
            className={inputClass}
            placeholder={t('เช่น line_id_123', 'e.g. line_id_123')} 
          />
        </div>
        
        <div className="sm:col-span-2 relative">
          <label className="text-sm font-bold text-primary">
            {t('ประเภทเรื่องที่ต้องการปรึกษา', 'Inquiry Topic')} <span className="text-red-500">*</span>
          </label>
          
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            className={cn(
              inputClass,
              "flex items-center justify-between text-left",
              !selectedService && "text-muted-foreground"
            )}
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
                t('เลือกประเภทเรื่อง', 'Select topic')
              )}
            </span>
            <ChevronDown className={cn("size-4 transition-transform duration-300", isDropdownOpen && "rotate-180")} />
          </button>

          <div 
            ref={listRef}
            className="absolute z-50 mt-2 hidden w-full overflow-hidden rounded-xl border border-border bg-white shadow-2xl"
            role="listbox"
          >
            <div className="max-h-[280px] overflow-y-auto p-2">
              {serviceOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setSelectedService(option.value)
                    setIsDropdownOpen(false)
                  }}
                  role="option"
                  aria-selected={selectedService === option.value}
                  className={cn(
                    "contact-dropdown-item group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-secondary",
                    selectedService === option.value && "bg-secondary"
                  )}
                >
                  <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110", option.bg, option.color)}>
                    <option.icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-primary leading-none">{locale === 'en' ? option.en : option.th}</p>
                    <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">{option.value} service</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-detail`} className="text-sm font-bold text-primary">
            {t('รายละเอียดเบื้องต้น', 'Initial Details')} <span className="text-red-500">*</span>
          </label>
          <textarea
            id={`${formId}-detail`}
            name="detail"
            rows={4}
            required
            className={inputClass}
            placeholder={t('โปรดเล่าข้อเท็จจริงเบื้องต้นโดยสังเขป', 'Please briefly describe your situation')}
          />
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground leading-6">
        <input
          type="checkbox"
          required
          className="mt-1 size-4 rounded border-border accent-primary shrink-0"
        />
        <span>
          {t('ข้าพเจ้ายินยอมให้สำนักงานใช้ข้อมูลข้างต้นเพื่อการประเมินและติดต่อกลับเท่านั้น', 'I consent to the use of this information for evaluation and contact purposes only.')}
        </span>
      </label>

      {status === 'error' && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <p>{t('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่หรือโทรติดต่อโดยตรง', 'An error occurred. Please try again or contact us directly.')}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          "group mt-8 flex w-full min-h-14 items-center justify-center gap-3 rounded-xl bg-primary px-8 font-bold text-white shadow-lg transition-all hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed",
          status === 'submitting' && "cursor-not-allowed"
        )}
      >
        {status === 'submitting' ? (
          <>
            <span className="sr-only">{t('กำลังส่งข้อมูล...', 'Sending...')}</span>
            <span className="skeleton-shimmer skeleton-shimmer--inline h-3 w-36 rounded-full" aria-hidden="true" />
          </>
        ) : (
          <>
            <Send className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            {t('ส่งข้อมูลเพื่อให้ติดต่อกลับ', 'Submit Inquiry')}
          </>
        )}
      </button>

      <DisclaimerBlock className="mt-6" />
    </form>
  )
}
