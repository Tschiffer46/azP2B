interface TeamSectionProps {
  t: {
    about: {
      headline: string
      gustav: string
      brian: string
      jonte: string
      teamPhotoAlt: string
    }
  }
}

export default function TeamSection({ t }: TeamSectionProps) {
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

          {/* Team photo placeholder */}
          <div className="bg-p2b-darker rounded-xl aspect-[3/2] flex items-center justify-center">
            <p className="text-p2b-grey text-sm text-center px-8">
              {t.about.teamPhotoAlt}
              <br />
              <span className="text-xs mt-1 block opacity-60">
                public/assets/team/founders.jpg
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
