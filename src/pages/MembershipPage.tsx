import t from '../i18n'

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-p2b-white mb-2">
          {t.membership.pageTitle}
        </h1>
        <p className="text-p2b-grey mb-4">{t.membership.pageDescription}</p>
        <p className="text-p2b-grey mb-8 leading-relaxed">{t.membership.intro}</p>

        {/* How to join */}
        <h2 className="text-2xl font-bold text-p2b-white mb-4">
          {t.membership.howToJoinHeadline}
        </h2>
        <ol className="list-decimal list-inside space-y-3 text-p2b-grey mb-12">
          <li>{t.membership.howToJoinStep1}</li>
          <li>{t.membership.howToJoinStep2}</li>
          <li>{t.membership.howToJoinStep3}</li>
        </ol>

        {/* Benefits */}
        <h2 className="text-2xl font-bold text-p2b-white mb-4">
          {t.membership.benefitsHeadline}
        </h2>
        <ul className="space-y-3 text-p2b-grey mb-12">
          {[
            t.membership.benefit1,
            t.membership.benefit2,
            t.membership.benefit3,
            t.membership.benefit4,
          ].map((benefit) => (
            <li key={benefit} className="flex items-start gap-2">
              <span className="text-p2b-lime mt-0.5">✓</span>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          <div className="bg-p2b-darker rounded-xl p-8 border border-white/10">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.standard.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-3">
              {t.pricing.standard.price}
            </p>
            <p className="text-p2b-grey text-sm">{t.pricing.standard.description}</p>
          </div>

          <div className="bg-p2b-darker rounded-xl p-8 border border-p2b-lime/40">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.exclusive.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-2">
              {t.pricing.exclusive.price}
            </p>
            <p className="text-p2b-grey text-sm mb-3">{t.pricing.exclusive.tag}</p>
            <p className="text-p2b-grey text-sm">{t.pricing.exclusive.description}</p>
          </div>
        </div>

        {/* Apply via email */}
        <div className="text-center">
          <p className="text-p2b-grey mb-6 leading-relaxed">
            {t.pricing.body}
          </p>
          <a
            href="mailto:info@padeltobusiness.se"
            className="inline-block bg-p2b-lime text-p2b-black font-bold px-8 py-4 rounded-lg hover:bg-lime-300 transition-colors text-sm tracking-wide"
          >
            {t.membership.applyByEmail}
          </a>
        </div>
      </div>
    </div>
  )
}
