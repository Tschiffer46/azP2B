import Link from 'next/link'

interface HeroSectionProps {
  locale: string
  t: {
    hero: {
      label: string
      headline: string
      ctaContact: string
      ctaMembership: string
    }
  }
}

export default function HeroSection({ locale, t }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-p2b-black">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-p2b-black/60 via-p2b-black/40 to-p2b-black z-10" />

      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-p2b-darker" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block text-p2b-lime text-sm font-semibold tracking-widest uppercase mb-4">
          {t.hero.label}
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-p2b-white leading-tight mb-8">
          {t.hero.headline}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#kontakta-oss"
            className="inline-block bg-p2b-lime text-p2b-black font-bold px-8 py-4 rounded-lg hover:bg-lime-300 transition-colors text-sm tracking-wide"
          >
            {t.hero.ctaContact}
          </a>
          <Link
            href={`/${locale}/bli-medlem`}
            className="inline-block border border-p2b-lime text-p2b-lime font-bold px-8 py-4 rounded-lg hover:bg-p2b-lime hover:text-p2b-black transition-colors text-sm tracking-wide"
          >
            {t.hero.ctaMembership}
          </Link>
        </div>
      </div>
    </section>
  )
}
