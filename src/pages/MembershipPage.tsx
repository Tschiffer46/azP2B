import t from '../i18n'

export default function MembershipPage() {
  const benefits = [
    t.membership.benefit1,
    t.membership.benefit2,
    t.membership.benefit3,
    t.membership.benefit4,
  ]

  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-p2b-white mb-6">
          {t.membership.pageTitle}
        </h1>
        <p className="text-p2b-grey text-lg leading-relaxed mb-10">
          {t.membership.pitch}
        </p>

        {/* Benefits - compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12 text-left max-w-lg mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-2">
              <span className="text-p2b-lime font-bold mt-0.5">✓</span>
              <span className="text-p2b-grey text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-p2b-darker rounded-xl p-6 border border-white/10 text-left">
            <h3 className="text-p2b-white font-bold text-lg mb-1">
              {t.pricing.standard.name}
            </h3>
            <p className="text-p2b-lime text-2xl font-black mb-2">
              {t.pricing.standard.price}
            </p>
            <p className="text-p2b-grey text-sm">
              {t.pricing.standard.description}
            </p>
          </div>
          <div className="bg-p2b-darker rounded-xl p-6 border border-p2b-lime/40 text-left">
            <h3 className="text-p2b-white font-bold text-lg mb-1">
              {t.pricing.exclusive.name}
            </h3>
            <p className="text-p2b-lime text-2xl font-black mb-2">
              {t.pricing.exclusive.price}
            </p>
            <p className="text-p2b-grey text-sm">
              {t.pricing.exclusive.description}
            </p>
          </div>
        </div>

        {/* CTA */}
        <p className="text-p2b-grey mb-6 text-sm">{t.membership.howItWorks}</p>
        <a
          href="mailto:info@padeltobusiness.se"
          className="inline-block bg-p2b-lime text-p2b-black font-bold px-10 py-4 rounded-lg hover:bg-lime-300 transition-colors text-base tracking-wide"
        >
          {t.membership.applyByEmail}
        </a>
      </div>
    </div>
  )
}
