import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendBookingConfirmation } from '@/lib/mail'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      eventId?: unknown
      name?: unknown
      email?: unknown
    }

    const { eventId, name, email } = body

    if (!eventId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (typeof email !== 'string' || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const event = await prisma.event.findUnique({
      where: { id: Number(eventId) },
      include: { _count: { select: { bookings: true } } },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 400 })
    }

    if (event._count.bookings >= event.totalSpots) {
      return NextResponse.json({ error: 'Event is full' }, { status: 409 })
    }

    // Check for duplicate booking
    const existing = await prisma.booking.findFirst({
      where: { eventId: Number(eventId), email: String(email) },
    })
    if (existing) {
      return NextResponse.json({ error: 'Already booked' }, { status: 409 })
    }

    const booking = await prisma.booking.create({
      data: {
        eventId: Number(eventId),
        name: String(name),
        email: String(email),
      },
    })

    try {
      await sendBookingConfirmation(
        { name: booking.name, email: booking.email },
        { title: event.title, date: event.date, location: event.location }
      )
    } catch {
      // Email failure should not block response
    }

    return NextResponse.json(booking, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
