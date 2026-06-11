'use client'

import { MessageSquare, Phone, Send } from 'lucide-react'
import { Container } from '@/components/container'
import { SectionHeading } from '@/components/section-heading'
import { officeContact } from '@/lib/data/office'
import { useTranslation } from '@/lib/i18n'

export function FreeConsultationSection() {
  const { t } = useTranslation()

  const methods = [
    {
      icon: Phone,
      title: t('โทรปรึกษาเบื้องต้น', 'Initial Call'),
      description: t('แจ้งข้อเท็จจริงเบื้องต้นทางโทรศัพท์ เพื่อประเมินแนวทางเบื้องต้น', 'Tell us your facts over the phone for an initial evaluation.'),
      action: {
        label: officeContact.phones[0],
        href: `tel:${officeContact.phones[0].replace(/-/g, '')}`,
      },
    },
    {
      icon: MessageSquare,
      title: t('แชทผ่าน Line', 'Chat via Line'),
      description: t('ส่งภาพถ่ายเอกสารหรือหมายศาลมาที่ Line เพื่อให้ทีมงานช่วยตรวจสอบ', 'Send photos of documents or summons via Line for a quick review.'),
      action: {
        label: `@${officeContact.line}`,
        href: `https://line.me/R/ti/p/~${officeContact.line}`,
      },
    },
    {
      icon: Send,
      title: t('ส่งแบบฟอร์ม', 'Submit Form'),
      description: t('ระบุข้อมูลการติดต่อและเรื่องที่ต้องการปรึกษาผ่านหน้าเว็บไซต์', 'Provide your contact info and legal issues through our website form.'),
      action: {
        label: t('ไปที่แบบฟอร์ม', 'Go to Form'),
        href: '/consultation',
      },
    },
  ]

  return (
    <section className="bg-secondary/40 py-16 md:py-22">
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

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.title}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-primary/5 text-primary">
                <method.icon className="size-7" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary">{method.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {method.description}
              </p>
              <a
                href={method.action.href}
                className="mt-6 font-serif text-lg font-bold text-gold hover:text-primary transition-colors"
              >
                {method.action.label}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-gold/30 bg-primary p-6 text-center text-white md:p-8">
          <p className="font-serif text-xl font-bold italic">
            &ldquo;{t('ไม่มีค่าใช้จ่ายในการแจ้งข้อเท็จจริงและประเมินแนวทางเบื้องต้น', 'No charge for initial fact reporting and pathway evaluation.')}&rdquo;
          </p>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {t(
              '*การปรึกษาเบื้องต้นเป็นข้อมูลทั่วไปเพื่อประเมินแนวทาง ไม่ใช่ความเห็นทางกฎหมายเฉพาะกรณี',
              '*Initial consultation provides general guidance and does not constitute formal legal advice.',
            )}
          </p>
        </div>
      </Container>
    </section>
  )
}
