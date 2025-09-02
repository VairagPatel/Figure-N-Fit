import { useMemo, useState } from "react";

type T = {
  name: string;
  text: string;
  rating: number;     // 1..5
  date: string;       // ISO
  source?: "Google" | "Facebook" | "In-Clinic" | "Website";
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(+d)) return iso;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function SourceBadge({ source }: { source?: T["source"] }) {
  if (!source) return null;
  const map: Record<NonNullable<T["source"]>, string> = {
    Google: "bg-green-100 text-green-800 border-green-200",
    Facebook: "bg-blue-100 text-blue-800 border-blue-200",
    "In-Clinic": "bg-amber-100 text-amber-800 border-amber-200",
    Website: "bg-brand-100 text-brand-800 border-brand-200",
  };
  return (
    <span className={`ml-2 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] ${map[source]}`}>
      {source}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  // clamp 0..5
  const r = Math.max(0, Math.min(5, rating));
  return (
    <div className="relative inline-flex items-center gap-1" aria-label={`${r} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`
            inline-block h-4 w-4 leading-none
            ${i < r ? "text-yellow-500" : "text-gray-300"}
            transition-colors duration-300
          `}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialCard({ name, text, rating, date, source }: T) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 180;
  const display = useMemo(() => (expanded || !isLong ? text : text.slice(0, 180) + "…"), [expanded, isLong, text]);

  return (
    <article
      className="
        group relative rounded-2xl border bg-white p-6 shadow-soft
        transition hover:-translate-y-0.5 hover:shadow-lg motion-safe:animate-fade-in
      "
    >
      {/* subtle hover glow */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition duration-500
          bg-gradient-to-tr from-brand-50 to-transparent
        "
        aria-hidden
      />

      {/* header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="font-semibold text-brand-700">{name}</h3>
          <SourceBadge source={source} />
        </div>
        <span className="text-xs text-gray-500">{formatDate(date)}</span>
      </div>

      {/* stars */}
      <div className="relative z-10 mt-2 flex items-center gap-2">
        <Stars rating={rating} />
        <span className="text-xs text-gray-500">({rating}/5)</span>
      </div>

      {/* quote text */}
      <p className="relative z-10 mt-3 text-gray-800">
        {display}
        {isLong && (
          <>
            {" "}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-brand-700 underline underline-offset-2 text-sm hover:text-brand-600"
            >
              {expanded ? "Show less" : "Read more"}
            </button>
          </>
        )}
      </p>

      {/* decorative quote mark */}
      <span
        className="
          pointer-events-none absolute -top-3 -left-2 text-6xl text-brand-100 select-none
        "
        aria-hidden
      >
        “
      </span>
    </article>
  );
}
