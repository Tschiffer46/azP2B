import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import CalendarClient from './CalendarClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  return {
    title: `${t.calendar.pageTitle} — Padel to Business`,
    description: t.calendar.pageDescription,
  }
}

export default async function KalenderPage({ params }: PageProps) {
  const { locale } = await params
  const t = getTranslations(locale)
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CalendarClient locale={locale} t={t} />
      </div>
    </div>
  )
}
