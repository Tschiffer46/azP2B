interface FeatureCardProps {
  text: string
}

export default function FeatureCard({ text }: FeatureCardProps) {
  return (
    <div className="bg-p2b-darker rounded-xl p-6 flex gap-4 items-start">
      <span
        className="text-p2b-lime text-xl font-bold flex-shrink-0 mt-0.5"
        aria-hidden="true"
      >
        ✓
      </span>
      <p className="text-p2b-white leading-relaxed text-sm">{text}</p>
    </div>
  )
}
