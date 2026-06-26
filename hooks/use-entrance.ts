'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap'
import { useMotionPreferences } from '@/hooks/use-motion-preferences'

type EntranceVariant = 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'split-text'

type EntranceOptions = {
  selector?: string
  stagger?: number
  y?: number
  x?: number
  scale?: number
  duration?: number
  delay?: number
  variant?: EntranceVariant
  start?: string
  once?: boolean
}

export function useEntrance<T extends HTMLElement>({
  selector = ':scope > *',
  stagger = 0.08,
  y = 20,
  x = 0,
  scale = 1,
  duration = 0.72,
  delay = 0,
  variant = 'slide-up',
  start = 'top 88%',
  once = true,
}: EntranceOptions = {}) {
  const scope = useRef<T>(null)
  const { reducedMotion } = useMotionPreferences()

  useGSAP(
    () => {
      if (reducedMotion || !scope.current) return

      const targets = gsap.utils.toArray<HTMLElement>(
        selector,
        scope.current,
      )
      if (!targets.length) return

      const vars: gsap.TweenVars = {
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: 'expo.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: scope.current,
          start,
          once,
        },
      }

      if (variant === 'slide-up') {
        vars.y = y
      } else if (variant === 'slide-right') {
        vars.x = -x || -20
      } else if (variant === 'scale') {
        vars.scale = scale || 0.95
        vars.y = y
      } else if (variant === 'fade') {
        vars.y = 0
      }

      gsap.from(targets, vars)
    },
    {
      scope,
      dependencies: [reducedMotion, selector, stagger, y, x, scale, duration, delay, variant, start, once],
      revertOnUpdate: true,
    },
  )

  return scope
}

export { ScrollTrigger }
