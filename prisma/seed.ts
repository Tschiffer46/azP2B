import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function findNextTuesdayFrom(fromDate: Date): Date {
  const d = new Date(fromDate)
  const day = d.getDay()
  const daysUntilTuesday = (2 - day + 7) % 7 || 7
  d.setDate(d.getDate() + daysUntilTuesday)
  d.setHours(0, 0, 0, 0)
  return d
}

async function main() {
  const now = new Date()

  // Event 1: first Tuesday of next month at 18:00
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const event1Date = findNextTuesdayFrom(nextMonth)
  event1Date.setHours(18, 0, 0, 0)

  // Event 2: two weeks after event 1 at 17:00
  const event2Date = new Date(event1Date)
  event2Date.setDate(event2Date.getDate() + 14)
  event2Date.setHours(17, 0, 0, 0)

  // Event 3: first Tuesday of month after event 2 at 18:30
  const monthAfterEvent2 = new Date(
    event2Date.getFullYear(),
    event2Date.getMonth() + 1,
    1
  )
  const event3Date = findNextTuesdayFrom(monthAfterEvent2)
  event3Date.setHours(18, 30, 0, 0)

  await prisma.event.createMany({
    data: [
      {
        title: 'Nätverksträff April',
        description: 'Padel och affärsnätverkande i en avslappnad miljö.',
        date: event1Date,
        location: 'Malmö Padel, Lommavägen 39, 232 35 Arlöv',
        totalSpots: 16,
      },
      {
        title: 'Padel & Affärer — Vårturnering',
        description: 'Vårturnering med affärsnätverkande och padel.',
        date: event2Date,
        location: 'Malmö Padel, Lommavägen 39, 232 35 Arlöv',
        totalSpots: 24,
      },
      {
        title: 'Exklusiv Medlemsträff',
        description: 'Exklusiv träff för P2B-medlemmar.',
        date: event3Date,
        location: 'Malmö Padel, Lommavägen 39, 232 35 Arlöv',
        totalSpots: 12,
      },
    ],
  })

  console.log('Seeded 3 sample events.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
