'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ChevronDown,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  X,
} from 'lucide-react'
import { Container } from '@/components/container'
import { MobileNavigationAccordion } from '@/components/mobile-services-accordion'
import {
  LegalKnowledgeDropdown,
  ServicesMegaMenu,
} from '@/components/services-mega-menu'
import {
  headerNavigation,
  legalKnowledgeMenuGroups,
  navigationCta,
  serviceMenuGroups,
} from '@/lib/data/navigation'
import { officeContact, officeInfo } from '@/lib/data/office'
import { useTranslation, getLocalePath } from '@/lib/i18n'
import { cn } from '@/lib/utils'

type DropdownKey = 'services' | 'knowledge'

function isActiveRoute(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

function TopInfoBar() {
  const { locale, switchLocale, t } = useTranslation()

  return (
    <div className="bg-burgundy-dark text-burgundy-foreground/80">
      <Container className="flex min-h-9 items-center justify-between gap-4 py-1.5 text-[11px]">
        <a
          href={officeContact.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden min-w-0 items-center gap-1.5 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:flex"
        >
          <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span className="truncate">
            {t('ที่อยู่:', 'Address:')} {t(officeContact.address, officeContact.addressEn)}
          </span>
        </a>
        <div className="flex w-full items-center justify-center gap-4 md:w-auto md:justify-end">
          <a
            href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
            className="inline-flex items-center gap-1.5 transition hover:text-gold"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            <span>{officeContact.phones[0]}</span>
          </a>
          <a
            href={`https://line.me/R/ti/p/~${officeContact.line}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-gold"
          >
            <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
            <span>Line</span>
          </a>

          <div className="ml-4 flex items-center border-l border-white/20 pl-4">
            <div className="relative flex h-7 w-[76px] items-center rounded-full bg-black/25 p-0.5 ring-1 ring-white/10">
              {/* Sliding Background Indicator */}
              <div
                className={cn(
                  'absolute h-6 w-[35px] rounded-full bg-gold shadow-sm transition-transform duration-300 ease-out-quart',
                  locale === 'en' ? 'translate-x-[34px]' : 'translate-x-0',
                )}
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={() => switchLocale('th')}
                aria-label={t('เปลี่ยนภาษาเป็นไทย', 'Switch language to Thai')}
                aria-pressed={locale === 'th'}
                className={cn(
                  'relative z-10 flex h-6 w-[35px] items-center justify-center text-[10px] font-bold transition-colors duration-300 focus-visible:outline-none',
                  locale === 'th' ? 'text-burgundy-dark' : 'text-white/60 hover:text-white',
                )}
              >
                TH
              </button>

              <button
                type="button"
                onClick={() => switchLocale('en')}
                aria-label={t('เปลี่ยนภาษาเป็นอังกฤษ', 'Switch language to English')}
                aria-pressed={locale === 'en'}
                className={cn(
                  'relative z-10 flex h-6 w-[35px] items-center justify-center text-[10px] font-bold transition-colors duration-300 focus-visible:outline-none',
                  locale === 'en' ? 'text-burgundy-dark' : 'text-white/60 hover:text-white',
                )}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}


function BrandingHeader({
  mobileOpen,
  onToggleMobile,
}: {
  mobileOpen: boolean
  onToggleMobile: () => void
}) {
  const { locale, t } = useTranslation()

  return (
    <div className="border-b border-border bg-ivory text-foreground">
      <Container className="flex min-h-24 items-center justify-between gap-3 overflow-hidden py-3 sm:gap-5">
        <Link
          href={getLocalePath('/', locale)}
          className="flex min-w-0 max-w-[calc(100%-3.5rem)] flex-1 items-center gap-3 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:max-w-none"
        >
          <Image
            src="/law-office-logo.svg"
            alt=""
            width={64}
            height={64}
            priority
            className="size-14 shrink-0 rounded-xl border border-gold/40 bg-burgundy sm:size-16"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-sm font-bold text-burgundy sm:text-2xl">
              {t(officeInfo.name, officeInfo.englishName)}
            </span>
            <span className="mt-1 block truncate text-[9px] font-semibold tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">
              {officeInfo.englishName}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
            className="hidden items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-burgundy transition hover:border-gold lg:inline-flex"
          >
            <Phone className="size-4 text-gold" aria-hidden="true" />
            {officeContact.phones[0]}
          </a>
          <a
            href={`https://line.me/R/ti/p/~${officeContact.line}`}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-burgundy transition hover:border-gold lg:inline-flex"
          >
            <MessageCircle className="size-4 text-gold" aria-hidden="true" />
            LINE
          </a>
          <Link
            href={getLocalePath(navigationCta.href, locale)}
            className="hidden rounded-lg bg-gold px-4 py-2.5 text-sm font-bold text-burgundy-dark transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy md:block"
          >
            {t(navigationCta.label, navigationCta.labelEn)}
          </Link>
          <button
            type="button"
            onClick={onToggleMobile}
            className="flex size-11 items-center justify-center rounded-lg border border-burgundy/25 text-burgundy transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
            aria-label={mobileOpen ? t('ปิดเมนู', 'Close Menu') : t('เปิดเมนู', 'Open Menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>
    </div>
  )
}


export function SiteHeader() {
  const pathname = usePathname()
  const { locale, t } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<DropdownKey | null>(null)
  const servicesTriggerRef = useRef<HTMLButtonElement>(null)
  const knowledgeTriggerRef = useRef<HTMLButtonElement>(null)
  const closeMenuTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!openMenu) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      event.preventDefault()
      const trigger =
        openMenu === 'services' ? servicesTriggerRef.current : knowledgeTriggerRef.current
      trigger?.focus({ preventScroll: true })
      setOpenMenu(null)
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [openMenu])

  useEffect(() => {
    return () => {
      if (closeMenuTimerRef.current) {
        clearTimeout(closeMenuTimerRef.current)
      }
    }
  }, [])

  function cancelDesktopMenuClose() {
    if (!closeMenuTimerRef.current) return
    clearTimeout(closeMenuTimerRef.current)
    closeMenuTimerRef.current = null
  }

  function openDesktopMenu(menu: DropdownKey) {
    cancelDesktopMenuClose()
    setOpenMenu(menu)
  }

  function closeDesktopMenu() {
    cancelDesktopMenuClose()
    setOpenMenu(null)
  }

  function scheduleDesktopMenuClose() {
    cancelDesktopMenuClose()
    closeMenuTimerRef.current = setTimeout(() => {
      setOpenMenu(null)
      closeMenuTimerRef.current = null
    }, 160)
  }

  function closeNavigation() {
    closeDesktopMenu()
    setMobileOpen(false)
  }

  function handleDesktopKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== 'Escape' || !openMenu) return
    event.preventDefault()
    const trigger =
      openMenu === 'services' ? servicesTriggerRef.current : knowledgeTriggerRef.current
    trigger?.focus({ preventScroll: true })
    setOpenMenu(null)
  }

  function handleDesktopBlur(event: React.FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeDesktopMenu()
    }
  }

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      <TopInfoBar />
      <BrandingHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((value) => !value)}
      />

      <div className="hidden bg-burgundy text-burgundy-foreground lg:block">
        <Container>
          <nav
            className="relative flex min-h-13 items-center justify-center gap-0.5"
            aria-label={t('เมนูหลัก', 'Main Menu')}
            onPointerEnter={cancelDesktopMenuClose}
            onPointerLeave={scheduleDesktopMenuClose}
            onBlur={handleDesktopBlur}
            onKeyDown={handleDesktopKeyDown}
          >
            {headerNavigation.map((link) => {
              const localizedHref = getLocalePath(link.href, locale)
              const active = isActiveRoute(pathname, localizedHref)
              const dropdownKey: DropdownKey | null =
                link.href === '/services'
                  ? 'services'
                  : link.href === '/legal-knowledge'
                    ? 'knowledge'
                    : null

              if (dropdownKey) {
                const menuOpen = openMenu === dropdownKey
                const menuId =
                  dropdownKey === 'services'
                    ? 'services-mega-menu'
                    : 'legal-knowledge-menu'

                return (
                  <div
                    key={link.href}
                    className="desktop-nav-dropdown static"
                    onPointerEnter={() => openDesktopMenu(dropdownKey)}
                  >
                    <button
                      ref={dropdownKey === 'services' ? servicesTriggerRef : knowledgeTriggerRef}
                      type="button"
                      onFocus={() => openDesktopMenu(dropdownKey)}
                      onClick={() => {
                        cancelDesktopMenuClose()
                        setOpenMenu((value) => (value === dropdownKey ? null : dropdownKey))
                      }}
                      data-active={active || menuOpen ? 'true' : 'false'}
                      className={cn(
                        'site-nav-item inline-flex items-center gap-1 rounded-md px-2.5 py-2 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                        active || menuOpen ? 'text-gold' : 'text-burgundy-foreground/90',
                      )}
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                      aria-controls={menuId}
                    >
                      {t(link.label, link.labelEn)}
                      <ChevronDown
                        className={cn(
                          'size-3.5 text-gold transition-transform duration-200',
                          menuOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {dropdownKey === 'services' ? (
                      <ServicesMegaMenu
                        id={menuId}
                        groups={serviceMenuGroups}
                        open={menuOpen}
                        onNavigate={closeDesktopMenu}
                      />
                    ) : (
                      <LegalKnowledgeDropdown
                        id={menuId}
                        groups={legalKnowledgeMenuGroups}
                        open={menuOpen}
                        onNavigate={closeDesktopMenu}
                      />
                    )}
                  </div>
                )
              }

              return (
                <Link
                  key={link.href}
                  href={localizedHref}
                  onMouseEnter={closeDesktopMenu}
                  onFocus={closeDesktopMenu}
                  data-active={active ? 'true' : 'false'}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'site-nav-item rounded-md px-2.5 py-2 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                    active ? 'text-gold' : 'text-burgundy-foreground/90',
                  )}
                >
                  {t(link.label, link.labelEn)}
                </Link>
              )
            })}
            <Link
              href={getLocalePath('/search', locale)}
              onMouseEnter={closeDesktopMenu}
              onFocus={closeDesktopMenu}
              aria-label={t('ค้นหา', 'Search')}
              className="ml-1 flex size-9 items-center justify-center rounded-md text-gold transition hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Search className="size-4" aria-hidden="true" />
            </Link>
          </nav>
        </Container>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100vh-8.5rem)] overflow-y-auto border-t border-gold/40 bg-white text-foreground lg:hidden"
        >
          <Container className="py-3">
            <nav aria-label={t('เมนูมือถือ', 'Mobile Menu')}>
              {headerNavigation.map((link) => {
                const localizedHref = getLocalePath(link.href, locale)
                const active = isActiveRoute(pathname, localizedHref)

                if (link.href === '/services') {
                  return (
                    <MobileNavigationAccordion
                      key={link.href}
                      id="mobile-services-menu"
                      label={t(link.label, link.labelEn)}
                      href={localizedHref}
                      groups={serviceMenuGroups}
                      active={active}
                      onNavigate={closeNavigation}
                    />
                  )
                }

                if (link.href === '/legal-knowledge') {
                  return (
                    <MobileNavigationAccordion
                      key={link.href}
                      id="mobile-knowledge-menu"
                      label={t(link.label, link.labelEn)}
                      href={localizedHref}
                      groups={legalKnowledgeMenuGroups}
                      active={active}
                      onNavigate={closeNavigation}
                    />
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={localizedHref}
                    onClick={closeNavigation}
                    className={cn(
                      'block border-b border-border/60 px-3 py-3 text-sm font-semibold transition hover:bg-secondary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                      active ? 'bg-secondary/40 text-primary font-bold' : 'text-foreground/90',
                    )}
                  >
                    {t(link.label, link.labelEn)}
                  </Link>
                )
              })}
              <Link
                href={getLocalePath(navigationCta.href, locale)}
                onClick={closeNavigation}
                className="mt-4 block rounded-lg bg-gold px-4 py-3 text-center text-sm font-bold text-burgundy-dark shadow-sm transition hover:bg-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burgundy"
              >
                {t(navigationCta.label, navigationCta.labelEn)}
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
