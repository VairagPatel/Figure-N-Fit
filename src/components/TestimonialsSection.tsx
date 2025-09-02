import TestimonialCard from "./TestimonialCard";

const SEED = [
  {
    name: "Daxesh Patel",
    text:
      "Excellent service and helpful Doctors and staff. Strongly recommend Figure ‘n Fit for a healthy lifestyle.",
    rating: 5,
    date: "2025-07-10",
    source: "Google",
  },
  {
    name: "Devang Vegad",
    text:
      "Cholesterol and weight back to normal in a month with their diet. Very grateful to the team.",
    rating: 5,
    date: "2025-06-22",
    source: "Google",import TestimonialCard from "./TestimonialCard";
import { useMemo } from "react";

const SEED = [
  {
    name: "Daxesh Patel",
    text:
      "Excellent service and helpful Doctors and staff. Strongly recommend Figure ‘n Fit for a healthy lifestyle.",
    rating: 5,
    date: "2025-07-10",
    source: "Google" as const,
  },
  {
    name: "Devang Vegad",
    text:
      "Cholesterol and weight back to normal in a month with their diet. Very grateful to the team.",
    rating: 5,
    date: "2025-06-22",
    source: "Google" as const,
  },
  {
    name: "Chavada Mayur",
    text:
      "Lost 5 kg with great inch loss and improved gut. Diet was simple to follow.",
    rating: 5,
    date: "2025-05-02",
    source: "Website" as const,
  },
];

function StarRow({ value }: { value: number }) {
  const v = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="inline-flex items-center gap-1" aria-label={`${v} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < v ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const { avg, total, sources } = useMemo(() => {
    const total = SEED.length;
    const avg =
      total === 0 ? 0 : SEED.reduce((a, b) => a + (b.rating || 0), 0) / total;
    const sources = Array.from(new Set(SEED.map((s) => s.source || "Website")));
    return { avg, total, sources };
  }, []);

  return (
    <section className="relative bg-brand-50">
      {/* soft radial background accent */}
      <span
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -bottom-20 -left-24 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl"
        aria-hidden
      />

      <div className="container py-14 md:py-20">
        <p className="text-center text-brand-600">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-700 mt-1">
          What Our Clients Say
        </h2>

        {/* rating summary */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <StarRow value={avg} />
            <span className="text-sm text-gray-600">
              {avg.toFixed(1)}/5 · {total} reviews
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Sources: {sources.join(" • ")}
          </div>

          {/* quick actions */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <a
              href="/testimonials"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-white"
            >
              Browse all
            </a>
            {/* Update these links if you have direct review URLs */}
            <a
              href="https://www.google.com/search?q=Figure+n+Fit+Surat+reviews"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-white"
            >
              Write a Google review
            </a>
            <a
              href="https://www.facebook.com/FigureNFits/reviews/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm hover:bg-white"
            >
              Write on Facebook
            </a>
          </div>
        </div>

        {/* cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEED.map((t, i) => (
            <div
              key={t.name}
              className="motion-safe:animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="/testimonials"
            className="relative inline-block rounded-full bg-brand-500 text-white px-6 py-3 hover:bg-brand-600 overflow-hidden"
          >
            <span className="relative z-10">Read all reviews</span>
            {/* shimmer sweep */}
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)] motion-safe:animate-shimmer" />
          </a>
        </div>
      </div>
    </section>
  );
}

  },
  {
    name: "Chavada Mayur",
    text:
      "Lost 5 kg with great inch loss and improved gut. Diet was simple to follow.",
    rating: 5,
    date: "2025-05-02",
    source: "Website",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-brand-50">
      <div className="container py-14 md:py-20">
        <p className="text-center text-brand-600">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-brand-700 mt-1">
          What Our Clients Say
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SEED.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/testimonials"
            className="inline-block rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3"
          >
            Read all reviews
          </a>
        </div>
      </div>
    </section>
  );
}
