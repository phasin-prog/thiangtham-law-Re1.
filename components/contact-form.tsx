'use client'

import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { DisclaimerBlock } from '@/components/disclaimer-block'
import { services } from '@/lib/site-data'

const inputClass =
  'mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-burgundy focus:ring-2 focus:ring-gold/40'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto size-12 text-burgundy" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-burgundy">
          ได้รับข้อมูลของท่านแล้ว
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          ขอบคุณที่ติดต่อสำนักกฎหมายเที่ยงธรรมทนายความ ทีมงานจะติดต่อกลับตามช่องทางที่ท่านระบุโดยเร็วที่สุด
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-md border border-burgundy px-5 py-2.5 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-burgundy-foreground"
        >
          ส่งข้อมูลอีกครั้ง
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSubmitted(true)
      }}
      className="rounded-lg border border-border bg-card p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="text-sm font-medium text-card-foreground">
            ชื่อ-นามสกุล <span className="text-burgundy">*</span>
          </label>
          <input id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-card-foreground">
            เบอร์โทร <span className="text-burgundy">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="line" className="text-sm font-medium text-card-foreground">
            LINE ID
          </label>
          <input id="line" name="line" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-card-foreground">
            อีเมล
          </label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="topic" className="text-sm font-medium text-card-foreground">
            ประเภทเรื่องที่ต้องการปรึกษา
          </label>
          <select id="topic" name="topic" className={inputClass} defaultValue="">
            <option value="" disabled>
              เลือกประเภทเรื่อง
            </option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="อื่น ๆ">อื่น ๆ</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="detail" className="text-sm font-medium text-card-foreground">
            รายละเอียดเบื้องต้น
          </label>
          <textarea
            id="detail"
            name="detail"
            rows={4}
            className={inputClass}
            placeholder="โปรดเล่าข้อเท็จจริงเบื้องต้นโดยสังเขป"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="channel" className="text-sm font-medium text-card-foreground">
            ช่องทางที่สะดวกให้ติดต่อกลับ
          </label>
          <select id="channel" name="channel" className={inputClass} defaultValue="โทรศัพท์">
            <option value="โทรศัพท์">โทรศัพท์</option>
            <option value="LINE">LINE</option>
            <option value="อีเมล">อีเมล</option>
          </select>
        </div>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-sm text-muted-foreground">
        <input
          type="checkbox"
          required
          className="mt-0.5 size-4 rounded border-border accent-[oklch(0.33_0.105_22)]"
        />
        <span>
          ข้าพเจ้ายินยอมให้สำนักงานใช้ข้อมูลข้างต้นเพื่อการติดต่อกลับเท่านั้น
        </span>
      </label>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-burgundy px-6 py-3 text-sm font-semibold text-burgundy-foreground transition-colors hover:bg-burgundy-dark"
      >
        ส่งข้อมูลเพื่อให้ติดต่อกลับ
      </button>

      <DisclaimerBlock className="mt-5" />
    </form>
  )
}
