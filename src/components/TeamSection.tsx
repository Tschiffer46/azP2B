import t from '../i18n'

export default function TeamSection() {
  const members = [
    { name: 'Gustav', bio: t.about.gustav },
    { name: 'Brian', bio: t.about.brian },
    { name: 'Jonte', bio: t.about.jonte },
  ]

  return (
    <section className="py-20 bg-p2b-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-p2b-white mb-8">
              {t.about.headline}
            </h2>
            <div className="space-y-6">
              {members.map((member) => (
                <div key={member.name}>
                  <p className="text-p2b-grey leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team photo */}
          <div className="rounded-xl overflow-hidden aspect-[3/2]">
            <img
              src="/assets/team/founders.jpg"
              alt={t.about.teamPhotoAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
