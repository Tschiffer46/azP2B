import { Link } from 'react-router-dom'
import t from '../i18n'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-p2b-black">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-p2b-black/60 via-p2b-black/40 to-p2b-black z-10" />

      {/* Background image */}
      <img
        src="/assets/hero/hero.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

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
            to="/bli-medlem"
            className="inline-block border border-p2b-lime text-p2b-lime font-bold px-8 py-4 rounded-lg hover:bg-p2b-lime hover:text-p2b-black transition-colors text-sm tracking-wide"
          >
            {t.hero.ctaMembership}
          </Link>
        </div>
      </div>
    </section>
  )
}
