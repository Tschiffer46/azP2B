import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' },
      include: { _count: { select: { bookings: true } } },
    })

    const eventsWithAvailability = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      totalSpots: event.totalSpots,
      availableSpots: event.totalSpots - event._count.bookings,
    }))

    return NextResponse.json(eventsWithAvailability)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
