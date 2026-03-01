import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import '@/app/globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = getTranslations(params.locale)
  return {
    title: 'Padel to Business',
    description: t.hero.headline,
  }
}

export async function generateStaticParams() {
  return [{ locale: 'sv' }, { locale: 'da' }]
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const t = getTranslations(params.locale)
  return (
    <html lang={params.locale}>
      <body className="bg-p2b-black text-p2b-white font-sans">
        <Navbar locale={params.locale} t={t} />
        <main>{children}</main>
        <Footer locale={params.locale} t={t} />
        <CookieBanner t={t} />
      </body>
    </html>
  )
}
