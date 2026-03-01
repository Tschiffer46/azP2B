'use client'

import { useState, useEffect } from 'react'

interface CookieBannerProps {
  t: {
    cookie: {
      message: string
      accept: string
    }
  }
}

const CONSENT_KEY = 'cookie_consent'

export default function CookieBanner({ t }: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-p2b-dark border-t border-white/10 px-4 py-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-p2b-grey text-sm">{t.cookie.message}</p>
        <button
          onClick={handleAccept}
          className="flex-shrink-0 bg-p2b-lime text-p2b-black font-bold px-6 py-2 rounded-lg hover:bg-lime-300 transition-colors text-sm"
        >
          {t.cookie.accept}
        </button>
      </div>
    </div>
  )
}
