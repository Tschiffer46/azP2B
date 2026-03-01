'use client'

import { useState } from 'react'

interface EventType {
  id: number
  title: string
  date: string
  location: string
}

interface BookingFormProps {
  event: EventType
  t: {
    calendar: {
      bookingFormHeadline: string
      bookingName: string
      bookingEmail: string
      bookingSubmit: string
      bookingSubmitting: string
      bookingSuccess: string
      bookingErrorRequired: string
      bookingErrorEmail: string
      bookingErrorGeneric: string
      bookingErrorDuplicate: string
      close: string
    }
  }
  onClose: () => void
}

export default function BookingForm({ event, t, onClose }: BookingFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError(t.calendar.bookingErrorRequired)
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t.calendar.bookingErrorEmail)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, name, email }),
      })
      if (res.status === 409) {
        setError(t.calendar.bookingErrorDuplicate)
      } else if (!res.ok) {
        setError(t.calendar.bookingErrorGeneric)
      } else {
        setSuccess(true)
      }
    } catch {
      setError(t.calendar.bookingErrorGeneric)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="bg-p2b-dark rounded-xl p-8 w-full max-w-md border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-p2b-white font-bold text-xl">
            {t.calendar.bookingFormHeadline}
          </h2>
          <button
            onClick={onClose}
            className="text-p2b-grey hover:text-p2b-white transition-colors"
            aria-label={t.calendar.close}
          >
            ✕
          </button>
        </div>

        <p className="text-p2b-grey text-sm mb-6">{event.title}</p>

        {success ? (
          <p className="text-p2b-lime text-sm">{t.calendar.bookingSuccess}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-p2b-grey text-sm mb-1">
                {t.calendar.bookingName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-p2b-darker border border-white/10 rounded-lg px-4 py-2 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
                required
              />
            </div>
            <div>
              <label className="block text-p2b-grey text-sm mb-1">
                {t.calendar.bookingEmail}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-p2b-darker border border-white/10 rounded-lg px-4 py-2 text-p2b-white text-sm focus:outline-none focus:border-p2b-lime"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-p2b-lime text-p2b-black font-bold py-3 rounded-lg hover:bg-lime-300 transition-colors text-sm disabled:opacity-50"
            >
              {loading
                ? t.calendar.bookingSubmitting
                : t.calendar.bookingSubmit}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
