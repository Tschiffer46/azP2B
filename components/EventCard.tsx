interface EventType {
  id: number
  title: string
  date: string
  location: string
  totalSpots: number
  availableSpots: number
}

interface EventCardProps {
  event: EventType
  locale: string
  t: {
    calendar: {
      spotsLeft: string
      bookButton: string
      fullEvent: string
    }
  }
  onBook: (event: EventType) => void
}

export default function EventCard({ event, t, onBook }: EventCardProps) {
  const date = new Date(event.date)
  const isFull = event.availableSpots <= 0

  const dateStr = date.toLocaleDateString('sv-SE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const timeStr = date.toLocaleTimeString('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div className="bg-p2b-darker rounded-xl p-6 border border-white/10">
      <h3 className="text-p2b-white font-bold text-lg mb-2">{event.title}</h3>
      <p className="text-p2b-grey text-sm mb-1">
        📅 {dateStr}, {timeStr}
      </p>
      <p className="text-p2b-grey text-sm mb-4">📍 {event.location}</p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-semibold ${
            isFull ? 'text-red-400' : 'text-p2b-lime'
          }`}
        >
          {isFull
            ? t.calendar.fullEvent
            : `${event.availableSpots} ${t.calendar.spotsLeft}`}
        </span>
        {!isFull && (
          <button
            onClick={() => onBook(event)}
            className="bg-p2b-lime text-p2b-black font-bold px-4 py-2 rounded-lg hover:bg-lime-300 transition-colors text-sm"
          >
            {t.calendar.bookButton}
          </button>
        )}
      </div>
    </div>
  )
}
