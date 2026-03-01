import Link from 'next/link'

interface FooterProps {
  locale: string
  t: {
    footer: {
      tagline: string
      address: string
      email: string
      linkedIn: string
      copyright: string
      logoAlt: string
    }
  }
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-p2b-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-p2b-lime font-bold text-2xl tracking-tight">
              P2B
            </span>
            <p className="mt-4 text-p2b-grey text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-p2b-white font-semibold mb-3">
              Kontakt
            </h3>
            <p className="text-p2b-grey text-sm">{t.footer.address}</p>
            <a
              href={`mailto:${t.footer.email}`}
              className="text-p2b-lime text-sm hover:underline mt-2 inline-block"
            >
              {t.footer.email}
            </a>
          </div>

          {/* Social */}
          <div>
            <Link
              href="https://www.linkedin.com/company/padel-to-business/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-p2b-grey hover:text-p2b-lime transition-colors text-sm"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              {t.footer.linkedIn}
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-p2b-grey text-xs">
          © {new Date().getFullYear()} {t.footer.copyright}
        </div>
      </div>
    </footer>
  )
}
