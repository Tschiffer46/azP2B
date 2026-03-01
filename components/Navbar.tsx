'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavbarProps {
  locale: string
  t: {
    nav: {
      home: string
      calendar: string
      membership: string
      findUs: string
    }
    lang: {
      sv: string
      da: string
    }
  }
}

export default function Navbar({ locale, t }: NavbarProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const otherLocale = locale === 'sv' ? 'da' : 'sv'
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  const otherLocalePath = `/${otherLocale}${pathWithoutLocale}`

  const links = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/kalender`, label: t.nav.calendar },
    { href: `/${locale}/bli-medlem`, label: t.nav.membership },
    { href: `/${locale}/hitta-hit`, label: t.nav.findUs },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-p2b-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <span className="text-p2b-lime font-bold text-xl tracking-tight">
              P2B
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-p2b-lime'
                    : 'text-p2b-grey hover:text-p2b-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language switcher + hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href={otherLocalePath}
              className="text-xs font-semibold text-p2b-grey hover:text-p2b-lime transition-colors tracking-widest"
              aria-label="Switch language"
            >
              {locale === 'sv' ? t.lang.da : t.lang.sv}
            </Link>

            <button
              className="md:hidden text-p2b-grey hover:text-p2b-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-white/10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-p2b-lime'
                    : 'text-p2b-grey hover:text-p2b-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
