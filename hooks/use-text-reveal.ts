'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { useMotionPreferences } from '@/hooks/use-motion-preferences'

type TextRevealOptions = {
  delay?: number
  duration?: number
  stagger?: number
  direction?: 'up' | 'down'
  once?: boolean
}

export function useTextReveal<T extends HTMLElement>({
  delay = 0,
  duration = 0.8,
  direction = 'up',
  once = true,
}: TextRevealOptions = {}) {
  const textRef = useRef<T>(null)
  const { reducedMotion } = useMotionPreferences()

  useGSAP(
    () => {
      const element = textRef.current
      if (!element || reducedMotion) return

      gsap.from(element, {
        y: direction === 'up' ? 36 : -36,
        opacity: 0,
        duration,
        delay,
        ease: 'power4.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: element,
          start: 'top 92%',
          once,
        },
      })
    },
    {
      scope: textRef,
      dependencies: [delay, duration, direction, once, reducedMotion],
      revertOnUpdate: true,
    },
  )

  return textRef
}
