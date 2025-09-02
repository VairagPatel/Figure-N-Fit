// src/routes/Services.tsx
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import { SERVICES } from "../data/services";

type Svc = (typeof SERVICES)[number];

function badgeFor(s: Svc) {
  const t = s.title.toLowerCase();
  if (t.includes("pcod") || t.includes("pcos")) return { text: "Women’s Health", tone: "bg-pink-100 text-pink-800" };
  if (t.includes("sports")) return { text: "Performance", tone: "bg-blue-100 text-blue-800" };
  if (t.includes("diabetes")) return { text: "Clinical", tone: "bg-amber-100 text-amber-800" };
  if (t.includes("cholesterol") || t.includes("heart")) return { text: "Heart Health", tone: "bg-red-100 text-red-800" };
  if (t.includes("weight loss") || t.includes("go fat")) return { text: "Popular", tone: "bg-emerald-100 text-emerald-800" };
  return null;
}

function SectionTitle({ title, eyebrow, center=false }:{ title:string; eyebrow?:string; center?:boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && <p className="text-brand-600">{eyebrow}</p>}
      <h1 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-1">{title}</h1>
    </div>
  );
}

function Filters({
  q, setQ, sort, setSort,
}:{
  q:string; setQ:(v:string)=>void;
  sort:"popular"|"az"|"za"; setSort:(v:"popular"|"az"|"za")=>void;
}) {
  return (
    <form onSubmit={(e)=>e.preventDefault()} className="grid md:grid-cols-3 gap-3">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        placeholder="Search programs…"
        className="border rounded-xl px-4 py-3 md:col-span-2"
      />
      <select
        value={sort}
        onChange={(e)=>setSort(e.target.value as any)}
        className="border rounded-xl px-4 py-3"
      >
        <option value="popular">Recommended</option>
        <option value="az">A → Z</option>
        <option value="za">Z → A</option>
      </select>
    </form>
  );
}

function ServiceCard({ s }: { s: Svc }) {
  const badge = badgeFor(s);
  return (
    <article className="group rounded-2xl overflow-hidden border bg-white shadow-soft hover:shadow transition">
      {/* cover */}
      <div className="relative h-48">
        <img src={s.cover} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <h3 className="text-white text-xl font-semibold drop-shadow">{s.title}</h3>
          {badge && <span className={`text-xs px-2 py-1 rounded-full ${badge.tone} backdrop-blur`}>{badge.text}</span>}
        </div>
      </div>

      {/* body */}
      <div className="p-5">
        <p className="text-gray-700">
          {s.description}
        </p>

        {/* features */}
        {s.features?.length ? (
          <ul className="mt-4 grid gap-2 text-sm text-brand-900">
            {s.features.slice(0, 3).map((f, i)=>(
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* actions */}
        <div className="mt-5 flex items-center gap-3">
          <NavLink
            to={`/services/${s.slug}`}
            className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2"
          >
            Explore
          </NavLink>
          <NavLink
            to={`/book-appointment?program=${encodeURIComponent(s.slug)}`}
            className="rounded-full border hover:bg-brand-50 px-4 py-2"
          >
            Book
          </NavLink>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"popular"|"az"|"za">("popular");

  const list = useMemo(() => {
    let L = SERVICES.filter(s => {
      if (!q.trim()) return true;
      const hay = (s.title + " " + s.description + " " + (s.features?.join(" ") || "")).toLowerCase();
      return hay.includes(q.toLowerCase());
    });
    if (sort === "az") L = [...L].sort((a,b)=> a.title.localeCompare(b.title));
    if (sort === "za") L = [...L].sort((a,b)=> b.title.localeCompare(a.title));
    return L;
  }, [q, sort]);

  return (
    <>
      <Helmet><title>Programs — Figure ‘n Fit</title></Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
        <div className="container py-10 md:py-14 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
          <div>
            <SectionTitle eyebrow="Programs" title="Personalized plans that fit your life" />
            <p className="mt-3 text-gray-700 max-w-xl">
              From fat loss and PCOS to diabetes and sports—choose a plan built around your routine,
              preferences, and health markers.
            </p>
            <div className="mt-6">
              <Filters q={q} setQ={setQ} sort={sort} setSort={setSort} />
            </div>
          </div>
          <div className="relative">
            {/* keep your own hero image if you have one */}
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop"
              alt="Programs"
              className="w-full h-72 md:h-[340px] rounded-2xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[70%] rounded-2xl bg-white shadow-soft border p-4 flex items-center gap-4">
              <div className="text-2xl">🥗</div>
              <div className="text-sm">
                <div className="font-semibold text-brand-700">Whole-food approach</div>
                <div className="text-gray-600">No crash diets · No powders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS GRID */}
      <section className="container py-10">
        {list.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center text-gray-700">
            No programs found. Try a different search.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s)=> <ServiceCard key={s.slug} s={s} />)}
          </div>
        )}
      </section>

      {/* COMPARE STRIP */}
      <section className="bg-brand-50">
        <div className="container py-10 md:py-12">
          <div className="rounded-2xl border bg-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-2xl font-extrabold text-brand-700">Not sure which plan fits?</h3>
                <p className="text-gray-700 mt-1">Answer a few questions and we’ll recommend the right program.</p>
              </div>
              <NavLink to="/contact" className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-5 py-3">
                Get a recommendation
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
