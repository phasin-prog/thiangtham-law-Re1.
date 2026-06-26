'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreferences } from './use-motion-preferences'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useTeamEntrance() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { reducedMotion } = useMotionPreferences()

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Gold Divider Lines (scaleX 0 -> 1)
      const dividers = containerRef.current?.querySelectorAll('.team-gold-line')
      if (dividers && dividers.length > 0) {
        dividers.forEach((divider) => {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: divider,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }

      // 2. Headings reveal (SplitText/Word stagger style utilizing CSS/GSAP reveal)
      const headings = containerRef.current?.querySelectorAll('[data-team-heading]')
      if (headings && headings.length > 0) {
        headings.forEach((heading) => {
          // Subtle fade + slide up reveal
          gsap.fromTo(
            heading,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          )
        })
      }

      // 3. Staggered Entrance for Cards
      const cardContainers = containerRef.current?.querySelectorAll('[data-team-cards]')
      if (cardContainers && cardContainers.length > 0) {
        cardContainers.forEach((container) => {
          const cards = container.querySelectorAll('article')
          if (cards.length > 0) {
            gsap.fromTo(
              cards,
              {
                opacity: 0,
                y: 40,
                clipPath: 'inset(0 0 12% 0)',
              },
              {
                opacity: 1,
                y: 0,
                clipPath: 'inset(0)',
                duration: 0.8,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                  trigger: container,
                  start: 'top 80%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }
        })
      }

      // 4. Staff Cards (slide from left)
      const staffContainers = containerRef.current?.querySelectorAll('[data-team-staff]')
      if (staffContainers && staffContainers.length > 0) {
        staffContainers.forEach((container) => {
          const staffCards = container.querySelectorAll('.team-staff-card-item')
          if (staffCards.length > 0) {
            gsap.fromTo(
              staffCards,
              {
                opacity: 0,
                x: -30,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.06,
                scrollTrigger: {
                  trigger: container,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            )
          }
        })
      }

      // 5. Values checklist draw-in and fade
      const valuesSection = containerRef.current?.querySelectorAll('[data-team-values]')
      if (valuesSection && valuesSection.length > 0) {
        valuesSection.forEach((section) => {
          const valueItems = section.querySelectorAll('.team-value-item')
          if (valueItems.length > 0) {
            gsap.fromTo(
              valueItems,
              { opacity: 0, x: -15 },
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: 'expo.out',
                stagger: 0.1,
                scrollTrigger: {
                  trigger: section,
                  start: 'top 85%',
                  onEnter: () => {
                    // Trigger SVG path animation via class
                    section.querySelectorAll('.team-value-icon').forEach((icon) => {
                      icon.classList.add('animate')
                    })
                  },
                  toggleActions: 'play none none none',
                },
              }
            )
          }
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return containerRef
}
