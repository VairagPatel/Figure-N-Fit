import { NavLink } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 to-white -z-10" />

      <div className="container pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* LEFT */}
          <div className="animate-fade-in-down">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-brand-100 text-brand-800">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600 animate-pulse-soft" />
              Diet • Fitness • Lifestyle
            </span>

            <h1
              className="
                mt-3 text-4xl md:text-5xl font-extrabold leading-tight
                bg-[linear-gradient(90deg,#3B661B,#8CC63E,#3B661B)]
                bg-[length:200%_100%] bg-clip-text text-transparent
                motion-safe:animate-shimmer
              "
            >
              Real, sustainable results with personalized nutrition.
            </h1>

            <p className="mt-4 text-gray-700 text-lg">
              Tailored plans for fat loss, weight gain, diabetes management, PCOS, pregnancy, and more.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink to="/book-appointment" className="btn btn-primary">
                Book Appointment
              </NavLink>
              <NavLink to="/services" className="btn border">
                Explore Services
              </NavLink>
              {/* quick entry to AI planner (feature) */}
              <NavLink to="/assistant" className="btn border">
                Try AI Planner
              </NavLink>
            </div>

            {/* benefit chips */}
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {['No crash diets', 'Whole-food approach', 'India-friendly meals', 'Light follow-ups'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border bg-white">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-72 md:h-96">
            {/* base card (keeps your gradient block but adds subtle motion) */}
            <div className="h-full rounded-2xl shadow-soft border overflow-hidden">
              <div className="relative h-full bg-gradient-to-tr from-brand-200 to-brand-500">
                {/* animated blobs */}
                <span className="pointer-events-none absolute -top-6 -left-6 h-32 w-32 rounded-full bg-white/20 blur-xl motion-safe:animate-blob-slow" />
                <span className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-2xl motion-safe:animate-blob-fast" />
                <span className="pointer-events-none absolute top-12 right-1/3 h-24 w-24 rounded-full bg-white/10 blur-xl motion-safe:animate-blob-slow" />
              </div>
            </div>

            {/* floating stats card */}
            <div className="absolute -bottom-5 left-4 right-4 md:right-auto md:left-6">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-2xl border bg-white p-4 shadow-soft motion-safe:animate-fade-in">
                  <div className="text-xs text-gray-600">Transformations</div>
                  <div className="text-lg font-semibold text-brand-700">10,000+ success stories</div>
                </div>
                <div className="rounded-2xl border bg-white p-4 shadow-soft motion-safe:animate-fade-in">
                  <div className="text-xs text-gray-600">Client Rating</div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-brand-700">4.9/5</span>
                    <span className="inline-flex -space-x-1">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-300" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* scroll cue */}
            <div className="absolute -bottom-10 right-4 hidden md:flex items-center gap-2 text-xs text-gray-500">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-600 animate-ring-pulse" />
              Scroll for programs
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
