'use client'

import { MessageSquare, Phone, Send } from 'lucide-react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { officeContact } from '@/lib/data/office'
import { getLocalePath, useTranslation } from '@/lib/i18n'

export function FreeConsultationSection() {
  const { locale, t } = useTranslation()

  const methods = [
    {
      icon: Phone,
      iconClassName: 'bg-navy-soft text-navy',
      actionClassName: 'text-navy hover:text-gold',
      title: t('โทรปรึกษาเบื้องต้น', 'Initial Call'),
      description: t('แจ้งข้อเท็จจริงเบื้องต้นทางโทรศัพท์ เพื่อประเมินแนวทางเบื้องต้น', 'Tell us your facts over the phone for an initial evaluation.'),
      action: {
        label: officeContact.phones[0],
        href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
      },
    },
    {
      icon: MessageSquare,
      iconClassName: 'bg-navy-soft text-navy',
      actionClassName: 'text-navy hover:text-gold',
      title: t('แชทผ่าน Line', 'Chat via Line'),
      description: t('ส่งภาพถ่ายเอกสารหรือหมายศาลมาที่ Line เพื่อให้ทีมงานช่วยตรวจสอบ', 'Send photos of documents or summons via Line for a quick review.'),
      action: {
        label: `@${officeContact.line}`,
        href: `https://line.me/R/ti/p/~${officeContact.line}`,
      },
    },
    {
      icon: Send,
      iconClassName: 'bg-gold/10 text-gold-ink',
      actionClassName: 'text-gold-ink hover:text-navy',
      title: t('ส่งแบบฟอร์ม', 'Submit Form'),
      description: t('ระบุข้อมูลการติดต่อและเรื่องที่ต้องการปรึกษาผ่านหน้าเว็บไซต์', 'Provide your contact info and legal issues through our website form.'),
      action: {
        label: t('ไปที่แบบฟอร์ม', 'Go to Form'),
        href: getLocalePath('/consultation', locale),
      },
    },
  ]

  return (
    <section className="bg-ivory py-16 md:py-24">
      <Container>
        <SectionHeading
          align="center"
          eyebrow={t('ติดต่อเรา', 'Contact Us')}
          title={t('ปรึกษาทนายเบื้องต้นฟรี', 'Free Initial Consultation')}
          description={t(
            'ท่านสามารถเล่าเหตุการณ์ แจ้งข้อมูล หรือส่งภาพถ่ายเอกสารเพื่อให้ทางสำนักงานช่วยตรวจข้อมูลและประเมินแนวทางเบื้องต้นได้ตามช่องทางที่สะดวก',
            'You can share your story, provide details, or send document photos. Our office will help review and evaluate initial pathways through your preferred channel.',
          )}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.title}
              className="group flex flex-col items-center rounded-2xl border border-border bg-card p-10 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-gold/30 hover:-translate-y-1"
            >
              <div className={`mb-6 flex size-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${method.iconClassName}`}>
                <method.icon className="size-8" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary">{method.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {method.description}
              </p>
              <a
                href={method.action.href}
                className={`mt-8 font-serif text-xl font-bold transition-colors underline decoration-gold/30 underline-offset-8 decoration-2 hover:decoration-gold ${method.actionClassName}`}
              >
                {method.action.label}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-gold/40 bg-primary p-1 shadow-2xl">
          <div className="rounded-xl border border-white/10 bg-primary-dark/40 px-8 py-10 text-center backdrop-blur-sm">
            <p className="font-serif text-2xl font-bold text-white leading-relaxed">
              &ldquo;{t('ไม่มีค่าใช้จ่ายในการแจ้งข้อเท็จจริงและประเมินแนวทางเบื้องต้น', 'No charge for initial fact reporting and pathway evaluation.')}&rdquo;
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-[11px] font-bold uppercase tracking-widest text-gold/60">
              {t(
                '*การปรึกษาเบื้องต้นเป็นข้อมูลทั่วไปเพื่อประเมินแนวทาง ไม่ใช่ความเห็นทางกฎหมายเฉพาะกรณี',
                '*Initial consultation provides general guidance and does not constitute formal legal advice.',
              )}
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
