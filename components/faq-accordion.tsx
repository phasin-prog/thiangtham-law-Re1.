'use client'

import { useRef, useState } from 'react'
import { 
  ChevronDown, 
  Scale, 
  ShieldCheck, 
  Users, 
  Landmark, 
  FileText, 
  HelpCircle,
  ClipboardCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

type FAQCategory = 'civil' | 'criminal' | 'family' | 'inheritance' | 'contract' | 'general' | 'process'

const categoryIcons = {
  civil: { icon: Scale, color: 'text-blue', bg: 'bg-blue/10' },
  criminal: { icon: ShieldCheck, color: 'text-navy', bg: 'bg-navy/10' },
  family: { icon: Users, color: 'text-jade', bg: 'bg-jade/10' },
  inheritance: { icon: Landmark, color: 'text-gold-ink', bg: 'bg-gold/10' },
  contract: { icon: FileText, color: 'text-gold-ink', bg: 'bg-gold/10' },
  general: { icon: HelpCircle, color: 'text-primary', bg: 'bg-secondary' },
  process: { icon: ClipboardCheck, color: 'text-jade', bg: 'bg-jade/10' },
}

interface FAQItemProps {
  q: string
  a: string
  category?: FAQCategory
  isOpen: boolean
  onClick: () => void
}

function FAQItem({ q, a, category = 'general', isOpen, onClick }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const { icon: Icon, color, bg } = categoryIcons[category] || categoryIcons.general
  const panelId = `faq-panel-${q.slice(0, 20).replace(/\s/g, '-')}`

  useGSAP(() => {
    if (isOpen) {
      gsap.to(contentRef.current, {
        height: 'auto',
        duration: 0.5,
        ease: 'power3.out',
        opacity: 1
      })
      gsap.fromTo(innerRef.current, 
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      )
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        duration: 0.4,
        ease: 'power3.inOut',
        opacity: 0
      })
    }
  }, [isOpen])

  return (
    <div className={cn(
      "border-b border-border/60 last:border-0 transition-colors",
      isOpen && "bg-secondary/20"
    )}>
      <button
        type="button"
        id={`faq-button-${q.slice(0, 20).replace(/\s/g, '-')}`}
        onClick={onClick}
        className="flex w-full items-center gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <div className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110",
          bg, color
        )}>
          <Icon className="size-5" />
        </div>
        
        <span className={cn(
          "flex-1 font-serif text-lg font-bold transition-colors",
          isOpen ? "text-primary" : "text-primary/80 group-hover:text-primary"
        )}>
          {q}
        </span>

        <div className={cn(
          "flex size-8 items-center justify-center rounded-full border border-border transition-[transform,background-color,border-color,color] duration-200",
          isOpen ? "bg-primary border-primary text-white rotate-180" : "bg-white text-muted-foreground group-hover:border-gold group-hover:text-gold"
        )}>
          <ChevronDown className="size-4" />
        </div>
      </button>

      <div 
        ref={contentRef} 
        id={panelId}
        role="region"
        aria-labelledby={`faq-button-${q.slice(0, 20).replace(/\s/g, '-')}`}
        className="overflow-hidden h-0 opacity-0"
      >
        <div ref={innerRef} className="px-20 pb-6 text-base leading-relaxed text-muted-foreground">
          {a}
        </div>
      </div>
    </div>
  )
}

export function FAQAccordion({
  items,
}: {
  items: { q: string; a: string; category?: FAQCategory }[]
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      {items.map((item, i) => (
        <FAQItem
          key={i}
          q={item.q}
          a={item.a}
          category={item.category}
          isOpen={openIndex === i}
          onClick={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  )
}
