import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  return {
    title: `${t.findUs.pageTitle} — Padel to Business`,
    description: t.findUs.pageDescription,
  }
}

export default async function HittaHitPage({ params }: PageProps) {
  const { locale } = await params
  const t = getTranslations(locale)
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-p2b-white mb-8 text-center">
          {t.findUs.headline}
        </h1>

        <div className="rounded-xl overflow-hidden border border-white/10 mb-8">
          <iframe
            src="https://maps.google.com/maps?q=Lommavägen+39,+232+35+Arlöv,+Sweden&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title={t.findUs.mapsAlt}
          />
        </div>

        <div className="text-center">
          <p className="text-p2b-grey mb-2">{t.findUs.address}</p>
          <a
            href={`mailto:${t.findUs.email}`}
            className="text-p2b-lime hover:underline"
          >
            {t.findUs.email}
          </a>
        </div>
      </div>
    </div>
  )
}
