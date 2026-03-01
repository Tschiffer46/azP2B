import t from '../i18n'

export default function PricingSection() {
  return (
    <section className="py-20 bg-p2b-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-p2b-white mb-4">
          {t.pricing.headline}
        </h2>
        <p className="text-p2b-grey text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.pricing.body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Standard */}
          <div className="bg-p2b-darker rounded-xl p-8 border border-white/10">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.standard.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-6">
              {t.pricing.standard.price}
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
            <p className="text-p2b-grey text-sm">{t.pricing.exclusive.tag}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
