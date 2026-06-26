'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import type {
  NavigationMenuGroup,
  ServiceMenuGroup,
} from '@/lib/data/navigation'
import { useTranslation, getLocalePath } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export function MobileNavigationAccordion({
  id,
  label,
  href,
  groups,
  active,
  onNavigate,
}: {
  id: string
  label: string
  href: string
  groups: Array<ServiceMenuGroup | NavigationMenuGroup>
  active: boolean
  onNavigate: () => void
}) {
  const [open, setOpen] = useState(false)
  const { locale, t } = useTranslation()
  const contentRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const isInitialRender = useRef(true)

  useGSAP(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      if (!open) return
    }

    if (open) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: 'power3.out',
        opacity: 1
      })
      
      const targets = itemsRef.current?.querySelectorAll('section, .view-all-btn')
      if (targets) {
        gsap.fromTo(targets,
          { x: -15, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
        )
      }
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        opacity: 0
      })
    }
  }, [open])

  return (
    <div className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-4 py-4 text-left text-sm font-semibold transition-[background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
          active || open ? 'bg-secondary/40 text-primary' : 'text-foreground/90 hover:bg-secondary/20',
        )}
        aria-expanded={open}
        aria-controls={id}
      >
        <span className={cn(active && "font-bold")}>{label}</span>
        <div className={cn(
          "flex size-7 items-center justify-center rounded-full border border-border transition-[transform,background-color,border-color,color] duration-200",
          open ? "bg-primary border-primary text-white rotate-180" : "bg-white text-gold"
        )}>
          <ChevronDown className="size-3.5" aria-hidden="true" />
        </div>
      </button>

      <div 
        id={id} 
        ref={contentRef} 
        hidden={!open}
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className="overflow-hidden h-0 opacity-0 bg-secondary/10"
      >
        <div ref={itemsRef} className="space-y-6 px-4 pb-8 pt-4">
          {groups.map((group) => (
            <section key={group.title}>
              <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink/70">
                {t(group.title, group.titleEn)}
              </p>
              <ul className="mt-4 grid gap-1 border-l border-gold/15 ml-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={getLocalePath(link.href, locale)}
                      onClick={onNavigate}
                      className="block rounded-r-sm px-4 py-2.5 text-[13px] leading-tight text-foreground/85 transition-[padding-left,background-color,color] duration-200 hover:bg-gold/10 hover:pl-5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    >
                      {t(link.label, link.labelEn)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <div className="view-all-btn px-2 pt-2">
            <Link
              href={getLocalePath(href, locale)}
              onClick={onNavigate}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-xs font-bold text-white shadow-sm transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {t('ดูภาพรวมทั้งหมด', 'View Overview')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
