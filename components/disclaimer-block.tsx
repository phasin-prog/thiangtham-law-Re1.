import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DisclaimerBlock({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-burgundy" aria-hidden="true" />
      <p>
        {children ??
          'ข้อมูลที่ส่งผ่านแบบฟอร์มนี้ใช้เพื่อการติดต่อกลับเบื้องต้นเท่านั้น ยังไม่ถือเป็นการรับว่าความหรือเกิดความสัมพันธ์ระหว่างทนายความกับลูกความ จนกว่าจะมีการตกลงให้บริการอย่างชัดเจน'}
      </p>
    </div>
  )
}
