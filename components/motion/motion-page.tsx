'use client'

import { useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/motion/gsap'
import { useMotionPreferences } from '@/hooks/use-motion-preferences'

export function MotionPage({ children }: { children: ReactNode }) {
  const pageRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { reducedMotion, allowEnhancedMotion } = useMotionPreferences()

  useGSAP(
    () => {
      if (!pageRef.current || reducedMotion) return

      gsap.from(pageRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: 'power3.out',
        clearProps: 'all',
      })

      const revealElements = gsap.utils.toArray<HTMLElement>(
        '[data-motion-reveal]',
        pageRef.current,
      )

      revealElements.forEach((element) => {
        const stagger = parseFloat(element.getAttribute('data-motion-stagger') || '0')
        const delay = parseFloat(element.getAttribute('data-motion-delay') || '0')
        const children = stagger > 0 ? Array.from(element.children) : [element]

        gsap.from(children, {
          opacity: 0,
          y: 30,
          scale: element.hasAttribute('data-motion-scale') ? 0.96 : 1,
          duration: 0.8,
          delay,
          stagger: stagger || 0,
          ease: 'expo.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        })
      })

      const portraitElements = gsap.utils.toArray<HTMLElement>(
        '[data-motion-portrait]',
        pageRef.current,
      )

      portraitElements.forEach((element) => {
        gsap.from(element, {
          clipPath: 'inset(0 0 100% 0)',
          opacity: 0,
          y: 40,
          duration: 1.2,
          ease: 'expo.inOut',
          clearProps: 'all',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        })
      })

      const readingElements = gsap.utils.toArray<HTMLElement>(
        '[data-motion-reading]',
        pageRef.current,
      )

      readingElements.forEach((element) => {
        const title = element.querySelector('h2, h3')
        const meta = element.querySelector('[data-motion-meta]')
        gsap.from([meta, title].filter(Boolean), {
          opacity: 0.72,
          y: 14,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        })
      })

      const cleanups: Array<() => void> = []

      if (allowEnhancedMotion) {
        const depthElements = gsap.utils.toArray<HTMLElement>(
          '[data-motion-depth]',
          pageRef.current,
        )

        depthElements.forEach((element) => {
          const rotateX = gsap.quickTo(element, 'rotateX', {
            duration: 0.35,
            ease: 'power3.out',
          })
          const rotateY = gsap.quickTo(element, 'rotateY', {
            duration: 0.35,
            ease: 'power3.out',
          })

          function handlePointerMove(event: PointerEvent) {
            const bounds = element.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            rotateX(y * -4)
            rotateY(x * 4)
          }

          function handlePointerLeave() {
            rotateX(0)
            rotateY(0)
          }

          gsap.set(element, {
            transformPerspective: 900,
            transformOrigin: 'center',
          })
          element.addEventListener('pointermove', handlePointerMove)
          element.addEventListener('pointerleave', handlePointerLeave)
          cleanups.push(() => {
            element.removeEventListener('pointermove', handlePointerMove)
            element.removeEventListener('pointerleave', handlePointerLeave)
          })
        })
      }

      ScrollTrigger.refresh()
      return () => cleanups.forEach((cleanup) => cleanup())
    },
    {
      scope: pageRef,
      dependencies: [pathname, reducedMotion, allowEnhancedMotion],
      revertOnUpdate: true,
    },
  )

  return (
    <div ref={pageRef} className="motion-page" data-route={pathname}>
      {children}
    </div>
  )
}
