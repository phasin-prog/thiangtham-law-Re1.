 'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MessageCircle, Menu, X, Scale } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig, navLinks } from '@/lib/site-data'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/auth/me').then((r) => r.json()).then((j) => {
      setUser(j.user || null)
    }).catch(() => setUser(null))
  }, [])

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    location.reload()
  }

  return (
    <>
      {/* Top contact bar */}
      <div className="bg-burgundy-dark text-burgundy-foreground/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-1.5 text-xs sm:text-[13px]">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a
              href={`tel:${siteConfig.phones[0].replace(/-/g, '')}`}
              className="flex items-center gap-1.5 transition-colors hover:text-gold"
            >
              <Phone className="size-3.5 text-gold" aria-hidden="true" />
              <span>
                {siteConfig.phones[0]} / {siteConfig.phones[1]}
              </span>
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MessageCircle className="size-3.5 text-gold" aria-hidden="true" />
              LINE: {siteConfig.line}
            </span>
          </div>
          <div className="hidden items-center gap-x-5 md:flex">
            <span>Facebook: {siteConfig.facebook}</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="transition-colors hover:text-gold"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b-2 border-gold/40 bg-burgundy text-burgundy-foreground shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-burgundy-dark">
              <Scale className="size-6 text-gold" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-base font-bold text-gold sm:text-lg">
                {siteConfig.name}
              </span>
              <span className="text-[11px] tracking-wide text-burgundy-foreground/70">
                {siteConfig.nameEn} · เดชอุดม อุบลราชธานี
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="เมนูหลัก">
            {navLinks.map((link) => {
              const active =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-gold',
                    active
                      ? 'text-gold'
                      : 'text-burgundy-foreground/90',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${siteConfig.phones[0].replace(/-/g, '')}`}
              className="hidden items-center gap-1.5 rounded-md bg-gold px-3 py-2 text-sm font-semibold text-burgundy-dark transition-colors hover:bg-gold-soft sm:flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              โทรปรึกษา
            </a>
            <a
              href={`https://line.me/R/ti/p/~${siteConfig.line}`}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-md border border-gold/60 px-3 py-2 text-sm font-semibold text-gold transition-colors hover:bg-burgundy-dark sm:flex"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              LINE
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-md border border-gold/40 text-gold lg:hidden"
              aria-label={open ? 'ปิดเมนู' : 'เปิดเมนู'}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            {/* auth actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm">{user.name}</span>
                  <button onClick={logout} className="rounded border px-3 py-1 text-sm">ออกจากระบบ</button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="text-sm underline">เข้าสู่ระบบ</Link>
                  <Link href="/register/customer" className="text-sm underline">สมัคร</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-gold/30 bg-burgundy-dark lg:hidden">
            <nav
              className="mx-auto flex max-w-6xl flex-col px-4 py-2"
              aria-label="เมนูมือถือ"
            >
              {navLinks.map((link) => {
                const active =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'text-gold'
                        : 'text-burgundy-foreground/90 hover:text-gold',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-2 flex gap-2 border-t border-gold/20 pt-3">
                <a
                  href={`tel:${siteConfig.phones[0].replace(/-/g, '')}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-gold px-3 py-2.5 text-sm font-semibold text-burgundy-dark"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  โทร
                </a>
                <a
                  href={`https://line.me/R/ti/p/~${siteConfig.line}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gold/60 px-3 py-2.5 text-sm font-semibold text-gold"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  LINE
                </a>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gold/60 px-3 py-2.5 text-sm font-semibold text-gold"
                >
                  แผนที่
                </a>
              </div>
              <div className="mt-3 flex items-center justify-end gap-3">
                {user ? (
                  <>
                    <span className="text-sm">{user.name}</span>
                    <button onClick={logout} className="rounded border px-3 py-1 text-sm">ออกจากระบบ</button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="text-sm underline">เข้าสู่ระบบ</Link>
                    <Link href="/register/customer" className="text-sm underline">สมัคร</Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
