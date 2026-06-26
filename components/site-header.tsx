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
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  articleMenuGroups,
  headerNavigation,
  navigationCta,
  serviceMenuGroups,
} from '@/lib/data/navigation'
import { officeContact, officeInfo } from '@/lib/data/office'
import { useTranslation, getLocalePath } from '@/lib/i18n'
import { stripLocalePrefix } from '@/lib/i18n-config'
import { cn } from '@/lib/utils'

type DropdownKey = 'services' | 'knowledge'

function isActiveRoute(pathname: string, href: string) {
  const currentPath = stripLocalePrefix(pathname)
  const targetPath = stripLocalePrefix(href)
  return targetPath === '/'
    ? currentPath === '/'
    : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}

function TopInfoBar() {
  const { t } = useTranslation()

  return (
    <div className="border-b border-white/5 bg-primary-dark text-white/80">
      <Container className="flex min-h-10 items-center justify-between gap-4 py-2 text-xs font-medium tracking-wide">
        <a
          href={officeContact.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden min-w-0 items-center gap-2 transition hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold md:flex"
        >
          <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden="true" />
          <span className="truncate">
            {t('ที่อยู่สำนักงาน:', 'Office Address:')} {t(officeContact.address, officeContact.addressEn)}
          </span>
        </a>
        <div className="flex w-full items-center justify-center gap-5 md:w-auto md:justify-end">
          <a
            href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
            className="inline-flex items-center gap-1.5 transition hover:text-gold"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            <span className="font-bold">{officeContact.phones[0]}</span>
          </a>
          <a
            href={`https://line.me/R/ti/p/~${officeContact.line}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition hover:text-gold"
          >
            <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
            <span className="font-bold">LINE ID</span>
          </a>

          <div className="ml-2 hidden items-center border-l border-white/10 pl-5 md:flex">
            <LanguageSwitcher />
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
    <div className="border-b border-border bg-ivory/95 text-foreground">
      <Container className="flex min-h-24 items-center justify-between gap-3 py-4 sm:gap-6">
        <Link
          href={getLocalePath('/', locale)}
          className="group flex min-w-0 max-w-[calc(100%-3.5rem)] flex-1 items-center gap-4 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:max-w-none"
        >
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border border-gold/40 bg-primary shadow-md transition-transform duration-200 group-hover:scale-[1.03]">
            <Image
              src="/law-office-logo.svg"
              alt={t(officeInfo.name, officeInfo.englishName)}
              width={64}
              height={64}
              priority
              className="size-full object-contain p-1"
            />
          </div>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-lg font-bold text-primary sm:text-2xl lg:text-3xl">
              {t(officeInfo.name, officeInfo.englishName)}
            </span>
            <span className="mt-1 block truncate text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-gold-ink sm:text-xs">
              {officeInfo.englishName}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden flex-col items-end gap-0.5 lg:flex mr-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/80">{t('สายด่วนปรึกษา', 'Legal Hotline')}</span>
            <a
              href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
              className="text-lg font-bold text-primary transition-colors hover:text-gold"
            >
              {officeContact.phones[0]}
            </a>
          </div>

          <Link
            href={getLocalePath(navigationCta.href, locale)}
            className="hidden rounded-xl bg-gold px-7 py-3 text-sm font-bold text-white shadow-md shadow-gold/10 transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:block"
          >
            {t(navigationCta.label, navigationCta.labelEn)}
          </Link>

          <LanguageSwitcher className="lg:hidden" size="comfortable" />

          <button
            type="button"
            onClick={onToggleMobile}
            className="flex size-11 items-center justify-center rounded-sm border-2 border-primary/20 text-primary transition-[background-color,color,border-color] duration-200 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
            aria-label={mobileOpen ? t('ปิดเมนู', 'Close Menu') : t('เปิดเมนู', 'Open Menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
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

  function focusFirstMenuLink(menuId: string) {
    window.setTimeout(() => {
      document
        .getElementById(menuId)
        ?.querySelector<HTMLAnchorElement>('a[href]')
        ?.focus({ preventScroll: true })
    }, 0)
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
    <header className="relative z-50">
      <TopInfoBar />
      <BrandingHeader
        mobileOpen={mobileOpen}
        onToggleMobile={() => setMobileOpen((value) => !value)}
      />

      <div className="hidden border-b border-white/5 bg-primary text-primary-foreground shadow-md lg:block">
        <Container>
          <nav
            className="relative flex min-h-14 items-center justify-center gap-1"
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
                  : link.href === '/articles'
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
                      onKeyDown={(event) => {
                        if (event.key !== 'ArrowDown') return
                        event.preventDefault()
                        openDesktopMenu(dropdownKey)
                        focusFirstMenuLink(menuId)
                      }}
                      data-active={active || menuOpen ? 'true' : 'false'}
                      className={cn(
                        'site-nav-item inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                        active || menuOpen ? 'text-gold' : 'text-primary-foreground/90 hover:text-gold',
                      )}
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                      aria-controls={menuId}
                    >
                      {t(link.label, link.labelEn)}
                      <ChevronDown
                        className={cn(
                          'size-3.5 text-gold transition-transform duration-300',
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
                        groups={articleMenuGroups}
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
                    'site-nav-item rounded-md px-4 py-2 text-[13px] font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                    active ? 'text-gold' : 'text-primary-foreground/90 hover:text-gold',
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
              className="ml-2 flex size-11 items-center justify-center rounded-md text-gold transition-[background-color,transform] duration-200 hover:bg-white/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
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
          <Container className="py-6">
            <div className="mb-8 grid grid-cols-2 gap-3">
              <Link
                href={getLocalePath(navigationCta.href, locale)}
                onClick={closeNavigation}
                className="flex flex-col items-center justify-center gap-2 rounded-md bg-gold p-4 text-center text-white shadow-sm transition hover:bg-gold-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <MessageCircle className="size-6" />
                <span className="text-xs font-bold leading-tight">{t(navigationCta.label, navigationCta.labelEn)}</span>
              </Link>
              <a
                href={`tel:${officeContact.phones[0].replace(/-/g, '')}`}
                className="flex flex-col items-center justify-center gap-2 rounded-md bg-primary p-4 text-center text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Phone className="size-6 text-gold" />
                <span className="text-xs font-bold leading-tight">{t('โทรด่วน', 'Call Now')}</span>
              </a>
            </div>

            <nav aria-label={t('เมนูมือถือ', 'Mobile Menu')} className="space-y-1">
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

                if (link.href === '/articles') {
                  return (
                    <MobileNavigationAccordion
                      key={link.href}
                      id="mobile-knowledge-menu"
                      label={t(link.label, link.labelEn)}
                      href={localizedHref}
                      groups={articleMenuGroups}
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
                      'block rounded-sm px-4 py-3 text-sm font-semibold transition-[background-color,color] duration-200 hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold',
                      active ? 'bg-secondary/40 text-primary' : 'text-foreground/90',
                    )}
                  >
                    {t(link.label, link.labelEn)}
                  </Link>
                )
              })}
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
