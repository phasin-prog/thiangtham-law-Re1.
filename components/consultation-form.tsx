'use client'

import { useState } from 'react'
import { CheckCircle2, LockKeyhole } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

const fieldClass =
  'mt-2 w-full rounded-lg border border-border bg-white px-3.5 py-3 text-sm text-foreground outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/15'

export function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false)
  const { t } = useTranslation()

  if (submitted) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-card p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h2 className="mt-4 font-serif text-2xl font-bold text-primary">
          {t('ส่งข้อมูลเรียบร้อยแล้ว', 'Your Information Has Been Submitted')}
        </h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-muted-foreground">
          {t(
            'ทีมงานจะตรวจสอบรายละเอียดและติดต่อกลับตามช่องทางที่คุณระบุ',
            'Our team will review the details and contact you through your preferred channel.',
          )}
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary"
        >
          {t('ส่งข้อมูลเพิ่มเติม', 'Submit Another Enquiry')}
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {t('ชื่อ-นามสกุล', 'Full Name')} <span className="text-destructive">*</span>
          <input name="fullName" autoComplete="name" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          {t('เบอร์โทรศัพท์', 'Phone Number')} <span className="text-destructive">*</span>
          <input name="phone" type="tel" autoComplete="tel" required className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          {t('อีเมล', 'Email')}
          <input name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>
        <label className="text-sm font-medium">
          {t('ประเภทปัญหากฎหมาย', 'Type of Legal Matter')} <span className="text-destructive">*</span>
          <select name="legalIssueType" required defaultValue="" className={fieldClass}>
            <option value="" disabled>{t('เลือกประเภทเรื่อง', 'Select a Matter')}</option>
            <option value="civil">{t('คดีแพ่ง', 'Civil Matter')}</option>
            <option value="criminal">{t('คดีอาญา', 'Criminal Matter')}</option>
            <option value="family-inheritance">{t('ครอบครัว / มรดก', 'Family / Inheritance')}</option>
            <option value="labor">{t('แรงงาน', 'Labor')}</option>
            <option value="business-contracts">{t('ธุรกิจ / สัญญา', 'Business / Contracts')}</option>
            <option value="property">{t('อสังหาริมทรัพย์', 'Property')}</option>
            <option value="other">{t('อื่น ๆ', 'Other')}</option>
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {t('รายละเอียดเบื้องต้น', 'Initial Details')} <span className="text-destructive">*</span>
          <textarea
            name="message"
            rows={6}
            required
            className={fieldClass}
            placeholder={t(
              'โปรดเล่าลำดับเหตุการณ์ เอกสารที่มี และสิ่งที่ต้องการความช่วยเหลือ',
              'Describe the timeline, available documents, and the help you need.',
            )}
          />
        </label>
        <label className="text-sm font-medium">
          {t('มีเอกสารที่เกี่ยวข้องหรือไม่', 'Do You Have Related Documents?')}
          <select name="hasDocuments" defaultValue="yes" className={fieldClass}>
            <option value="yes">{t('มีเอกสาร', 'Yes')}</option>
            <option value="no">{t('ยังไม่มีเอกสาร', 'Not Yet')}</option>
            <option value="unsure">{t('ไม่แน่ใจ', 'Not Sure')}</option>
          </select>
        </label>
        <label className="text-sm font-medium">
          {t('ช่องทางที่สะดวก', 'Preferred Contact Method')}
          <select name="preferredContactMethod" defaultValue="phone" className={fieldClass}>
            <option value="phone">{t('โทรศัพท์', 'Phone')}</option>
            <option value="line">Line</option>
            <option value="email">Email</option>
          </select>
        </label>
        <label className="text-sm font-medium sm:col-span-2">
          {t('วันที่สะดวกให้ติดต่อ', 'Preferred Contact Date')}
          <input name="preferredDate" type="date" className={fieldClass} />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input name="consent" type="checkbox" required className="mt-1 size-4 accent-primary" />
        <span>
          {t(
            'ข้าพเจ้ายินยอมให้สำนักงานใช้ข้อมูลนี้เพื่อประเมินเบื้องต้นและติดต่อกลับ และเข้าใจว่าการส่งแบบฟอร์มยังไม่ถือเป็นการรับว่าความ',
            'I consent to the office using this information for an initial assessment and follow-up. I understand that submitting this form does not establish a lawyer-client engagement.',
          )}
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          {t('ส่งข้อมูลเพื่อขอรับการติดต่อ', 'Request a Follow-up')}
        </button>
        <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <LockKeyhole className="size-4 text-primary" aria-hidden="true" />
          {t(
            'กรุณาอย่าส่งรหัสผ่านหรือข้อมูลทางการเงินที่ไม่จำเป็น',
            'Do not send passwords or unnecessary financial information.',
          )}
        </p>
      </div>
    </form>
  )
}
