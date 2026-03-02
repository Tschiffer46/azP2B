import { Link } from 'react-router-dom'
import t from '../i18n'

export default function PricingSection() {
  return (
    <section className="py-20 bg-p2b-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-p2b-white mb-4">
          {t.pricing.headline}
        </h2>
        <p className="text-p2b-grey max-w-2xl mx-auto mb-10 leading-relaxed text-lg">
          {t.pricing.pitch}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-10">
          {/* Standard */}
          <div className="bg-p2b-darker rounded-xl p-8 border border-white/10">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.standard.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-3">
              {t.pricing.standard.price}
            </p>
            <p className="text-p2b-grey text-sm">
              {t.pricing.standard.description}
            </p>
          </div>

          {/* Exclusive */}
          <div className="bg-p2b-darker rounded-xl p-8 border border-p2b-lime/40 relative">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.exclusive.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-2">
              {t.pricing.exclusive.price}
            </p>
            <p className="text-p2b-grey text-sm mb-3">
              {t.pricing.exclusive.tag}
            </p>
            <p className="text-p2b-grey text-sm">
              {t.pricing.exclusive.description}
            </p>
          </div>
        </div>
        <Link
          to="/bli-medlem"
          className="inline-block bg-p2b-lime text-p2b-black font-bold px-10 py-4 rounded-lg hover:bg-lime-300 transition-colors text-base tracking-wide"
        >
          {t.pricing.ctaButton}
        </Link>
      </div>
    </section>
  )
}
