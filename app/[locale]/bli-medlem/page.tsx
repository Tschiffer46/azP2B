import type { Metadata } from 'next'
import { getTranslations } from '@/lib/i18n'
import MembershipForm from '@/components/MembershipForm'

interface PageProps {
  params: { locale: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const t = getTranslations(params.locale)
  return {
    title: `${t.membership.pageTitle} — Padel to Business`,
    description: t.membership.pageDescription,
  }
}

export default function BliMedlemPage({ params }: PageProps) {
  const t = getTranslations(params.locale)
  return (
    <div className="min-h-screen bg-p2b-black py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-p2b-white mb-2">
          {t.membership.pageTitle}
        </h1>
        <p className="text-p2b-grey mb-8">{t.membership.pageDescription}</p>
        <MembershipForm t={t} />
      </div>
    </div>
  )
}
