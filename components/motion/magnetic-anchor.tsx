'use client'

import {
  useRef,
  type ComponentPropsWithoutRef,
  type PointerEvent,
} from 'react'
import { gsap, useGSAP } from '@/lib/motion/gsap'
import { useMotionPreferences } from '@/hooks/use-motion-preferences'
import { cn } from '@/lib/utils'

type MagneticAnchorProps = ComponentPropsWithoutRef<'a'> & {
  strength?: number
}

export function MagneticAnchor({
  className,
  strength = 0.18,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticAnchorProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null)
  const { allowEnhancedMotion } = useMotionPreferences()
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useGSAP(
    () => {
      if (!anchorRef.current || !allowEnhancedMotion) return

      xTo.current = gsap.quickTo(anchorRef.current, 'x', {
        duration: 0.32,
        ease: 'power3.out',
      })
      yTo.current = gsap.quickTo(anchorRef.current, 'y', {
        duration: 0.32,
        ease: 'power3.out',
      })

      return () => {
        xTo.current = null
        yTo.current = null
      }
    },
    {
      scope: anchorRef,
      dependencies: [allowEnhancedMotion],
      revertOnUpdate: true,
    },
  )

  function handlePointerMove(event: PointerEvent<HTMLAnchorElement>) {
    onPointerMove?.(event)
    if (!allowEnhancedMotion || !anchorRef.current) return

    const bounds = anchorRef.current.getBoundingClientRect()
    xTo.current?.((event.clientX - bounds.left - bounds.width / 2) * strength)
    yTo.current?.((event.clientY - bounds.top - bounds.height / 2) * strength)
  }

  function handlePointerLeave(event: PointerEvent<HTMLAnchorElement>) {
    onPointerLeave?.(event)
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <a
      ref={anchorRef}
      className={cn('motion-magnetic', className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...props}
    />
  )
}
