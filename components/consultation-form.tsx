'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function ConsultationForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex size-16 items-center justify-center rounded-full bg-gold/20 text-gold">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-bold text-white">
          {t('ได้รับข้อมูลของท่านแล้ว', 'Request Received')}
        </h3>
        <p className="mt-2 text-primary-foreground/70">
          {t(
            'เจ้าหน้าที่จะติดต่อกลับเพื่อสอบถามรายละเอียดเพิ่มเติมโดยเร็วที่สุด',
            'Our team will contact you shortly to discuss your case details.',
          )}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 text-sm font-bold text-gold hover:underline"
        >
          {t('ส่งคำขอใหม่', 'Send another request')}
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gold/80">
            {t('ชื่อ-นามสกุล', 'Full Name')}
          </label>
          <input
            required
            id="name"
            name="name"
            type="text"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder={t('สมชาย ใจดี', 'e.g. John Doe')}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gold/80">
            {t('เบอร์โทรศัพท์', 'Phone Number')}
          </label>
          <input
            required
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            placeholder="081-234-5678"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-gold/80">
          {t('ประเภทคดี/บริการ', 'Legal Service Type')}
        </label>
        <select
          id="service"
          name="service"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold appearance-none"
        >
          <option value="civil" className="bg-primary-dark text-white">{t('คดีแพ่ง', 'Civil Case')}</option>
          <option value="criminal" className="bg-primary-dark text-white">{t('คดีอาญา', 'Criminal Case')}</option>
          <option value="family" className="bg-primary-dark text-white">{t('คดีครอบครัว', 'Family Law')}</option>
          <option value="inheritance" className="bg-primary-dark text-white">{t('คดีมรดก', 'Inheritance')}</option>
          <option value="other" className="bg-primary-dark text-white">{t('อื่นๆ', 'Other')}</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gold/80">
          {t('รายละเอียดเบื้องต้น', 'Case Brief')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/20 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          placeholder={t('ระบุรายละเอียดเบื้องต้นหรือคำถามของท่าน...', 'Briefly describe your situation or question...')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className={cn(
          "motion-action group mt-2 flex h-14 items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-bold text-primary-dark transition-all hover:bg-gold-soft focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-primary-dark disabled:opacity-50",
          status === 'submitting' && "cursor-not-allowed"
        )}
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            {t('กำลังส่งข้อมูล...', 'Sending...')}
          </>
        ) : (
          <>
            <Send className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            {t('ส่งข้อมูลเพื่อขอรับการประเมิน', 'Request Case Evaluation')}
          </>
        )}
      </button>
      
      <p className="mt-2 text-center text-[11px] leading-relaxed text-primary-foreground/40">
        {t(
          '* ข้อมูลของท่านจะถูกเก็บเป็นความลับตามมาตรฐานวิชาชีพทนายความ',
          '* Your information will be kept strictly confidential under legal professional standards.',
        )}
      </p>
    </form>
  )
}
