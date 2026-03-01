import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import '@/app/globals.css'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  return {
    title: 'Padel to Business',
    description: t.hero.headline,
  }
}

export async function generateStaticParams() {
  return [{ locale: 'sv' }, { locale: 'da' }]
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const t = getTranslations(locale)
  return (
    <html lang={locale}>
      <body className="bg-p2b-black text-p2b-white font-sans">
        <Navbar locale={locale} t={t} />
        <main>{children}</main>
        <Footer locale={locale} t={t} />
        <CookieBanner t={t} />
      </body>
    </html>
  )
}
