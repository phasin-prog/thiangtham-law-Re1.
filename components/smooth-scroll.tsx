'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { ScrollSmoother, useGSAP } from '@/lib/gsap'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const smoother = useRef<ScrollSmoother | null>(null)

  useGSAP(
    () => {
      // Initialize ScrollSmoother
      smoother.current = ScrollSmoother.create({
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
      })

      // Fix for route transitions: ensure scroll position is handled properly
      return () => {
        smoother.current?.kill()
      }
    },
    { scope: undefined },
  )

  useEffect(() => {
    // When pathname changes, scroll to top instantly before new animations start
    if (smoother.current) {
      smoother.current.scrollTop(0)
    }
  }, [pathname])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}
