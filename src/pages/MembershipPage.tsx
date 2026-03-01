import t from '../i18n'

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-p2b-white mb-2">
          {t.membership.pageTitle}
        </h1>
        <p className="text-p2b-grey mb-12">{t.membership.pageDescription}</p>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-6 mb-12">
          <div className="bg-p2b-darker rounded-xl p-8 border border-white/10">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.standard.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black">
              {t.pricing.standard.price}
            </p>
          </div>

          <div className="bg-p2b-darker rounded-xl p-8 border border-p2b-lime/40">
            <h3 className="text-p2b-white font-bold text-xl mb-2">
              {t.pricing.exclusive.name}
            </h3>
            <p className="text-p2b-lime text-3xl font-black mb-2">
              {t.pricing.exclusive.price}
            </p>
            <p className="text-p2b-grey text-sm">{t.pricing.exclusive.tag}</p>
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
