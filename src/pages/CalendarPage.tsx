import t from '../i18n'

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-black text-p2b-white mb-4">
          {t.calendar.pageTitle}
        </h1>
        <p className="text-p2b-grey mb-12">{t.calendar.pageDescription}</p>

        <div className="bg-p2b-darker rounded-xl p-12 border border-white/10">
          <h2 className="text-2xl font-bold text-p2b-white mb-6">
            {t.calendar.headline}
          </h2>
          <p className="text-p2b-grey mb-8 leading-relaxed">
            {t.calendar.contactBody}
          </p>
          <a
            href="mailto:info@padeltobusiness.se"
            className="inline-block bg-p2b-lime text-p2b-black font-bold px-8 py-4 rounded-lg hover:bg-lime-300 transition-colors text-sm tracking-wide"
          >
            {t.calendar.contactBooking}
          </a>
        </div>
      </div>
    </div>
  )
}
