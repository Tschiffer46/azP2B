import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import t from '../i18n'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/kalender', label: t.nav.calendar },
    { href: '/bli-medlem', label: t.nav.membership },
    { href: '/hitta-hit', label: t.nav.findUs },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-p2b-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo/logo.webp"
              alt="P2B"
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
                    ? 'text-p2b-lime'
                    : 'text-p2b-grey hover:text-p2b-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4 border-t border-white/10">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href
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
