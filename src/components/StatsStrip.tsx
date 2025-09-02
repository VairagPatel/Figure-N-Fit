import { useEffect, useMemo, useRef, useState } from "react";

/* Prefers-reduced-motion */
function usePRM() {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const h = () => setPrm(!!m.matches);
    h();
    m?.addEventListener?.("change", h);
    return () => m?.removeEventListener?.("change", h);
  }, []);
  return prm;
}

/* In-view observer (fires once) */
function useInView<T extends HTMLElement>(rootMargin = "0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.2 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView, rootMargin]);
  return { ref, inView };
}

/* CountUp that can be paused or finished instantly */
function CountUp({
  to,
  duration = 1200,
  suffix = "",
  active = true,
}: {
  to: number;
  duration?: number;
  suffix?: string;
  active?: boolean;
}) {
  const [val, setVal] = useState(0);
  const start = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      setVal(to);
      return;
    }
    let raf = 0;
    const step = (ts: number) => {
      if (start.current === null) start.current = ts;
      const p = Math.min(1, (ts - start.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration, active]);

  return (
    <>
      {val.toLocaleString()}
      {suffix}
    </>
  );
}

export default function StatsStrip() {
  const prm = usePRM();
  const { ref, inView } = useInView<HTMLDivElement>("80px");

  const stats: Array<
    | { kind: "count"; to: number; suffix?: string; label: string }
    | { kind: "text"; display: string; label: string }
  > = useMemo(
    () => [
      { kind: "count", to: 15, suffix: "+", label: "Years Experience" },
      { kind: "count", to: 20000, suffix: "+", label: "Clients Guided" },
      { kind: "count", to: 98, suffix: "%", label: "Satisfaction" },
      { kind: "text", display: "24/7", label: "Support" },
    ],
    []
  );

  return (
    <section className="relative border-y bg-white" ref={ref}>
      {/* optional shimmer hairline */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/60 to-transparent motion-safe:animate-shimmer" />

      <div className="container grid grid-cols-2 md:grid-cols-4 text-center divide-x">
        {stats.map((s, i) => (
          <div
            key={i}
            className="relative py-6 md:py-10 group motion-safe:animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
            aria-label={s.label}
          >
            {/* underline sweep on hover */}
            <span
              className="pointer-events-none absolute left-6 right-6 bottom-3 h-0.5 origin-left scale-x-0 rounded bg-brand-300 transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden
            />

            <div className="text-2xl md:text-3xl font-semibold text-brand-800 group-hover:text-brand-700 transition">
              {s.kind === "count" ? (
                <CountUp to={s.to} suffix={s.suffix} active={!prm && inView} />
              ) : (
                s.display
              )}
            </div>

            <div className="text-xs md:text-sm text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
