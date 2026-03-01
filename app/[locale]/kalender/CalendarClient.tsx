'use client'

import { useState, useEffect } from 'react'
import EventCard from '@/components/EventCard'
import BookingForm from '@/components/BookingForm'

interface EventType {
  id: number
  title: string
  date: string
  location: string
  totalSpots: number
  availableSpots: number
}

interface CalendarClientProps {
  locale: string
  t: {
    calendar: {
      headline: string
      spotsLeft: string
      bookButton: string
      fullEvent: string
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
}

export default function CalendarClient({ locale, t }: CalendarClientProps) {
  const [events, setEvents] = useState<EventType[]>([])
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then(setEvents)
      .catch(console.error)
  }, [])

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold text-p2b-white mb-10 text-center">
        {t.calendar.headline}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            locale={locale}
            t={t}
            onBook={setSelectedEvent}
          />
        ))}
      </div>
      {selectedEvent && (
        <BookingForm
          event={selectedEvent}
          t={t}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  )
}
