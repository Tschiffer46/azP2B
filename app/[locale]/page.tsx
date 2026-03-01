import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import HeroSection from '@/components/HeroSection'
import TeamSection from '@/components/TeamSection'
import FeatureCard from '@/components/FeatureCard'
import PricingSection from '@/components/PricingSection'

interface HomePageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  return {
    title: `Padel to Business — ${t.hero.headline}`,
    description: t.hero.headline,
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params
  const t = getTranslations(locale)

  const featureItems = [
    t.features.item1,
    t.features.item2,
    t.features.item3,
    t.features.item4,
  ]

  return (
    <>
      <HeroSection locale={locale} t={t} />

      {/* About / Team */}
      <TeamSection t={t} />

      {/* Features */}
      <section className="py-20 bg-p2b-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-p2b-white mb-12">
            {t.features.headline}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureItems.map((item, i) => (
              <FeatureCard key={i} text={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection t={t} />

      {/* Contact */}
      <section id="kontakta-oss" className="py-20 bg-p2b-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-p2b-white mb-8">
            {t.contact.headline}
          </h2>
          <a
            href={`mailto:${t.contact.email}`}
            className="text-p2b-lime text-lg hover:underline block mb-4"
          >
            {t.contact.email}
          </a>
          <p className="text-p2b-grey mb-4">{t.contact.venue}</p>
          <a
            href="https://maps.app.goo.gl/fEW2keuUXtaWLoRw9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-p2b-grey hover:text-p2b-lime transition-colors text-sm underline"
          >
            {t.contact.mapsLinkText}
          </a>
        </div>
      </section>
    </>
  )
}
