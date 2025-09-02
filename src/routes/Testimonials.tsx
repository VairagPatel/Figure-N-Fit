import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

/** Local types */
type Review = {
  name: string;
  text: string;
  rating: number;    // 1..5
  date: string;      // ISO
  source?: "Google" | "Facebook" | "In-Clinic" | "Website";
  avatar?: string;   // optional image url
};

const LS_KEY = "ff_testimonials_user";

/** Seed reviews (edit with your real quotes) */
const SEED: Review[] = [
  { name: "Daxesh Patel", text: "Excellent service and helpful Doctors and staff. Strongly recommend Figure ‘n Fit.", rating: 5, date: "2025-07-10", source: "Google", avatar: "https://i.pravatar.cc/120?img=11" },
  { name: "Devang Vegad", text: "Cholesterol and weight back to normal in a month. Diet was simple & practical.", rating: 5, date: "2025-06-22", source: "Google", avatar: "https://i.pravatar.cc/120?img=12" },
  { name: "Chavada Mayur", text: "Lost 5 kg with great inch loss and improved gut health.", rating: 5, date: "2025-05-02", source: "Website", avatar: "https://i.pravatar.cc/120?img=13" },
  { name: "Nayana Vadsak", text: "Program kept me motivated and consistent without guilt.", rating: 5, date: "2025-04-11", source: "In-Clinic", avatar: "https://i.pravatar.cc/120?img=14" },
];

/** Tiny stars renderer */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "text-yellow-500" : "text-gray-300"}>★</span>
      ))}
    </div>
  );
}

/** Review card (modern) */
function ReviewCard({ r }: { r: Review }) {
  return (
    <article className="group rounded-2xl border bg-white shadow-soft hover:shadow transition p-5 flex flex-col">
      <div className="flex items-center gap-3">
        <img
          src={r.avatar || "https://i.pravatar.cc/120?u=" + encodeURIComponent(r.name)}
          alt={r.name}
          className="h-12 w-12 rounded-full object-cover border"
        />
        <div className="min-w-0">
          <div className="font-semibold text-brand-700 truncate">{r.name}</div>
          <div className="text-xs text-gray-500">
            {new Date(r.date).toLocaleDateString()} {r.source ? `· ${r.source}` : ""}
          </div>
        </div>
        <div className="ml-auto"><Stars n={r.rating} /></div>
      </div>
      <p className="mt-3 text-gray-800">{r.text}</p>
    </article>
  );
}

export default function Testimonials() {
  const [list, setList] = useState<Review[]>([]);
  const [q, setQ] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [source, setSource] = useState<"All" | Review["source"]>("All");

  // form state
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5 as Review["rating"]);
  const [src, setSrc] = useState<Review["source"]>("Website");

  // load local + seed
  useEffect(() => {
    let local: Review[] = [];
    try { local = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch {}
    setList([...local, ...SEED].sort((a, b) => +new Date(b.date) - +new Date(a.date)));
  }, []);

  const filtered = useMemo(() => {
    return list.filter((r) => {
      const matchQ = !q.trim()
        || r.name.toLowerCase().includes(q.toLowerCase())
        || r.text.toLowerCase().includes(q.toLowerCase());
      const matchR = r.rating >= minRating;
      const matchS = source === "All" ? true : r.source === source;
      return matchQ && matchR && matchS;
    });
  }, [list, q, minRating, source]);

  const avg = filtered.length
    ? +(filtered.reduce((s, r) => s + r.rating, 0) / filtered.length).toFixed(1)
    : 5.0;

  function addReview() {
    if (!name.trim() || !text.trim()) return;
    const next: Review = {
      name: name.trim(),
      text: text.trim(),
      rating,
      source: src,
      date: new Date().toISOString(),
    };
    const localOnly = [next, ...list.filter(l => !SEED.some(s => s.name===l.name && s.date===l.date))];
    localStorage.setItem(LS_KEY, JSON.stringify(localOnly));
    setList([next, ...list]);
    setName(""); setText(""); setRating(5); setSrc("Website");
  }

  return (
    <>
      <Helmet>
        <title>Testimonials — Figure ‘n Fit</title>
        {/* schema for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Figure ‘n Fit",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": String(avg),
              "reviewCount": filtered.length
            }
          })}
        </script>
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
        <div className="container py-12 md:py-16">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
            <div>
              <p className="text-brand-600 font-medium">Real results</p>
              <h1 className="mt-2 text-4xl md:text-5xl font-extrabold text-brand-900">Loved by our clients</h1>
              <p className="mt-3 text-gray-700 max-w-xl">
                Honest reviews from people who changed their health with simple, sustainable nutrition.
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Stars n={Math.round(avg)} /><span className="text-sm text-gray-700">{avg} / 5</span>
                </div>
                <span className="text-sm text-gray-500">({filtered.length} reviews)</span>
              </div>
              <form onSubmit={(e)=>e.preventDefault()} className="mt-6 grid md:grid-cols-3 gap-3">
                <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search reviews…"
                       className="border rounded-xl px-4 py-3 md:col-span-2" />
                <select value={String(minRating)} onChange={(e)=>setMinRating(+e.target.value)}
                        className="border rounded-xl px-4 py-3">
                  <option value="0">All ratings</option>
                  <option value="5">5★ only</option>
                  <option value="4">4★ & up</option>
                  <option value="3">3★ & up</option>
                </select>
                <select value={source || "All"} onChange={(e)=>setSource(e.target.value as any)}
                        className="border rounded-xl px-4 py-3 md:col-span-1">
                  <option>All</option>
                  <option>Google</option>
                  <option>Facebook</option>
                  <option>In-Clinic</option>
                  <option>Website</option>
                </select>
              </form>
            </div>

            {/* Right: image card */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format&fit=crop"
                alt="Happy clients"
                className="w-full h-72 md:h-[340px] rounded-2xl object-cover shadow-soft"
              />
              <div className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-white shadow-soft border p-4 flex items-center gap-4">
                <div className="text-2xl">💬</div>
                <div className="text-sm">
                  <div className="font-semibold text-brand-700">Verified reviews</div>
                  <div className="text-gray-600">From clinic & online clients</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="container py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-gray-700">
            No reviews match your filters.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r, i) => <ReviewCard r={r} key={i + r.name} />)}
          </div>
        )}
      </section>

      {/* ADD REVIEW */}
      <section className="bg-brand-600 text-white">
        <div className="container py-10">
          <h2 className="text-2xl font-bold">Add Your Review</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <input className="rounded-xl px-4 py-3 text-black" placeholder="Your name"
                   value={name} onChange={(e)=>setName(e.target.value)} />
            <select className="rounded-xl px-4 py-3 text-black" value={String(rating)}
                    onChange={(e)=>setRating(+e.target.value as any)}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}★</option>)}
            </select>
            <select className="rounded-xl px-4 py-3 text-black" value={src} onChange={(e)=>setSrc(e.target.value as any)}>
              <option>Website</option><option>Google</option><option>Facebook</option><option>In-Clinic</option>
            </select>
            <textarea className="rounded-xl px-4 py-3 text-black min-h-28 md:col-span-2"
                      placeholder="Your experience…" value={text} onChange={(e)=>setText(e.target.value)} />
          </div>
          <button onClick={addReview} className="mt-4 rounded-full bg-black text-white px-6 py-3">
            Submit Review
          </button>
        </div>
      </section>
    </>
  );
}
