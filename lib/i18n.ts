import svTranslations from '@/locales/sv.json'
import daTranslations from '@/locales/da.json'

type Locale = 'sv' | 'da'

const translations: Record<Locale, typeof svTranslations> = {
  sv: svTranslations,
  da: daTranslations,
}

export function getTranslations(locale: string): typeof svTranslations {
  const safeLocale = (locale === 'da' ? 'da' : 'sv') as Locale
  return translations[safeLocale]
}
