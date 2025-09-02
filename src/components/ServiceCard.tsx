export default function ServiceCard({
  title,
  desc,
  icon,
}: {
  title: string
  desc: string
  icon?: React.ReactNode // optional custom icon
}) {
  return (
    <div
      className="
        group relative p-6 rounded-2xl border bg-white transition
        hover:shadow-lg hover:-translate-y-1 motion-safe:duration-300
      "
    >
      {/* decorative hover glow */}
      <span
        className="
          absolute inset-0 rounded-2xl bg-gradient-to-tr from-brand-100 to-brand-50
          opacity-0 group-hover:opacity-100 transition duration-500
          pointer-events-none
        "
      />

      {/* icon or placeholder */}
      <div
        className="
          relative z-10 flex items-center justify-center w-14 h-14 mb-4
          rounded-xl bg-brand-600 text-white shadow-soft
          group-hover:animate-blob-slow
        "
      >
        {icon ? icon : <span className="text-2xl">★</span>}
      </div>

      <h3
        className="
          relative z-10 font-semibold text-lg text-gray-900
          group-hover:text-brand-700 transition
        "
      >
        {title}
      </h3>
      <p className="relative z-10 text-sm text-gray-600 mt-2">{desc}</p>
    </div>
  )
}
