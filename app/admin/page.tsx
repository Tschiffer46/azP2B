import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'

export default async function AdminDashboardPage() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (session?.value !== 'authenticated') {
    redirect('/admin/login')
  }

  const [members, bookings] = await Promise.all([
    prisma.member.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: { event: true },
    }),
  ])

  return (
    <div className="min-h-screen bg-p2b-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Warning banner */}
        <div className="bg-yellow-500/10 border border-yellow-500/40 rounded-xl p-4 mb-8 text-yellow-400 text-sm font-semibold">
          ⚠️ TODO: Replace cookie auth with proper authentication before going
          live
        </div>

        <h1 className="text-3xl font-black text-p2b-white mb-10">
          Admin – Dashboard
        </h1>

        {/* Members */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-p2b-white mb-4">Medlemmar</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-p2b-darker">
                <tr>
                  {['Namn', 'E-post', 'Företag', 'Bransch', 'Nivå', 'Registrerad'].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-p2b-grey px-4 py-3 font-semibold"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-p2b-white">{m.name}</td>
                    <td className="px-4 py-3 text-p2b-grey">{m.email}</td>
                    <td className="px-4 py-3 text-p2b-grey">{m.company}</td>
                    <td className="px-4 py-3 text-p2b-grey">{m.industry}</td>
                    <td className="px-4 py-3 text-p2b-lime">{m.tier}</td>
                    <td className="px-4 py-3 text-p2b-grey">
                      {new Date(m.createdAt).toLocaleDateString('sv-SE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bookings */}
        <section>
          <h2 className="text-xl font-bold text-p2b-white mb-4">Bokningar</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-p2b-darker">
                <tr>
                  {['Evenemang', 'Namn', 'E-post', 'Bokad'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-p2b-grey px-4 py-3 font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-white/5">
                    <td className="px-4 py-3 text-p2b-white">{b.event.title}</td>
                    <td className="px-4 py-3 text-p2b-grey">{b.name}</td>
                    <td className="px-4 py-3 text-p2b-grey">{b.email}</td>
                    <td className="px-4 py-3 text-p2b-grey">
                      {new Date(b.createdAt).toLocaleDateString('sv-SE')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
