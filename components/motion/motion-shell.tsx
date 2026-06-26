'use client'

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  gsap,
  ScrollSmoother,
  ScrollTrigger,
  useGSAP,
} from '@/lib/motion/gsap'
import { useMotionPreferences } from '@/hooks/use-motion-preferences'

type MotionShellProps = {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
  floating: ReactNode
}

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean
  }
  deviceMemory?: number
}

function shouldEnableSmoothScrollForPath(pathname: string) {
  return (
    pathname === '/' ||
    pathname === '/en' ||
    pathname === '/about' ||
    pathname === '/en/about'
  )
}

function shouldHandleTransition(
  event: MouseEvent,
  anchor: HTMLAnchorElement,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return false
  }

  if (
    anchor.target ||
    anchor.download ||
    anchor.dataset.noTransition !== undefined
  ) {
    return false
  }

  const nextUrl = new URL(anchor.href, window.location.href)
  if (nextUrl.origin !== window.location.origin) return false
  if (
    nextUrl.pathname === window.location.pathname &&
    nextUrl.search === window.location.search
  ) {
    return false
  }

  return true
}

export function MotionShell({
  children,
  header,
  footer,
  floating,
}: MotionShellProps) {
  const shellRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const transitionActiveRef = useRef(false)
  const transitionFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )
  const router = useRouter()
  const pathname = usePathname()
  const { reducedMotion, allowSmoothScroll } = useMotionPreferences()

  const revealRoute = useCallback(() => {
    const overlay = overlayRef.current
    if (!overlay || reducedMotion) {
      transitionActiveRef.current = false
      return
    }

    if (transitionFallbackRef.current) {
      clearTimeout(transitionFallbackRef.current)
      transitionFallbackRef.current = null
    }

    gsap.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.46,
      ease: 'expo.inOut',
      onComplete: () => {
        gsap.set(overlay, {
          autoAlpha: 0,
          clipPath: 'inset(100% 0 0 0)',
          pointerEvents: 'none',
        })
        transitionActiveRef.current = false
      },
    })
  }, [reducedMotion])

  useEffect(() => {
    if (!headerRef.current) return
    const headerElement = headerRef.current

    function updateHeaderHeight() {
      document.documentElement.style.setProperty(
        '--site-header-height',
        `${headerElement.offsetHeight}px`,
      )
      ScrollTrigger.refresh()
    }

    updateHeaderHeight()
    const observer = new ResizeObserver(updateHeaderHeight)
    observer.observe(headerElement)

    return () => observer.disconnect()
  }, [])

  useGSAP(
    () => {
      if (
        !allowSmoothScroll ||
        !shouldEnableSmoothScrollForPath(pathname) ||
        !wrapperRef.current ||
        !contentRef.current
      ) {
        return
      }

      const navigatorInfo = navigator as NavigatorWithConnection
      if (
        navigatorInfo.connection?.saveData ||
        (navigatorInfo.deviceMemory !== undefined &&
          navigatorInfo.deviceMemory < 4) ||
        navigator.hardwareConcurrency < 4
      ) {
        return
      }

      document.documentElement.classList.add('has-scroll-smoother')
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 0.48,
        smoothTouch: false,
        effects: false,
        ignoreMobileResize: true,
      })

      return () => {
        smoother.kill()
        document.documentElement.classList.remove('has-scroll-smoother')
      }
    },
    {
      scope: shellRef,
      dependencies: [allowSmoothScroll, pathname],
      revertOnUpdate: true,
    },
  )

  useEffect(() => {
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(0, false)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    if (transitionActiveRef.current) {
      requestAnimationFrame(revealRoute)
    }
  }, [pathname, revealRoute])

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        !shouldHandleTransition(event, anchor) ||
        transitionActiveRef.current
      ) {
        return
      }

      const nextUrl = new URL(anchor.href, window.location.href)
      event.preventDefault()

      if (reducedMotion || !overlayRef.current) {
        router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
        return
      }

      transitionActiveRef.current = true
      gsap.set(overlayRef.current, {
        autoAlpha: 1,
        clipPath: 'inset(100% 0 0 0)',
        pointerEvents: 'auto',
      })
      gsap.to(overlayRef.current, {
        clipPath: 'inset(0 0 0 0)',
        duration: 0.34,
        ease: 'expo.inOut',
        onComplete: () => {
          router.push(`${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`)
          transitionFallbackRef.current = setTimeout(revealRoute, 900)
        },
      })
    }

    document.addEventListener('click', handleDocumentClick, true)
    return () => document.removeEventListener('click', handleDocumentClick, true)
  }, [reducedMotion, revealRoute, router])

  useEffect(() => {
    return () => {
      if (transitionFallbackRef.current) {
        clearTimeout(transitionFallbackRef.current)
      }
    }
  }, [])

  return (
    <div ref={shellRef} className="motion-shell">
      <div ref={headerRef} className="motion-site-header">
        {header}
      </div>

      <div ref={wrapperRef} id="smooth-wrapper">
        <div
          ref={contentRef}
          id="smooth-content"
          data-language-transition="content"
        >
          <div className="motion-header-spacer" aria-hidden="true" />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          {footer}
          <div className="h-16 lg:hidden" aria-hidden="true" />
        </div>
      </div>

      {floating}

      <div
        ref={overlayRef}
        className="motion-route-overlay"
        aria-hidden="true"
      >
        <div className="motion-route-overlay__line" />
      </div>
    </div>
  )
}
