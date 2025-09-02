import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { LOCATIONS } from "../data/locations";



type L = (typeof LOCATIONS)[number];

function LocationCard({ loc, active, onClick }: { loc: L; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border p-5 w-full shadow-soft hover:shadow transition ${
        active ? "ring-2 ring-brand-500 bg-brand-50" : "bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 grid place-items-center rounded-xl bg-brand-100 text-brand-700 font-bold">📍</div>
        <div>
          <div className="font-semibold text-brand-700">{loc.name}</div>
          <div className="text-sm text-gray-700">{loc.address}</div>
          <div className="text-sm text-brand-700 mt-1">📞 {loc.phone}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {loc.hours.slice(0,2).map((h) => (
              <span key={h} className="text-xs px-2 py-1 rounded-full border bg-white">{h}</span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Locations() {
  const [idx, setIdx] = useState(0);
  const current = useMemo(() => LOCATIONS[idx] || LOCATIONS[0], [idx]);

  return (
    <>
      <Helmet><title>Our Locations — Figure ‘n Fit</title></Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
        <div className="container py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-900">Visit our clinics</h1>
          <p className="mt-2 text-gray-700">Find the nearest Figure ‘n Fit and get directions.</p>
          {/* quick chips */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {LOCATIONS.map((l, i) => (
              <button key={l.name} onClick={()=>setIdx(i)}
                className={`text-sm px-3 py-1.5 rounded-full border ${i===idx ? "bg-brand-500 text-white border-brand-500" : "hover:bg-brand-50"}`}>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* MAP + DETAILS */}
      <section className="container pb-12 grid lg:grid-cols-[1fr_420px] gap-8 items-start">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden border shadow-soft">
          <div className="aspect-[16/10]">
            <iframe
              src={current.mapEmbed}
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>

        {/* List of cards (acts like tabs) */}
        <div className="grid gap-4">
          {LOCATIONS.map((l, i) => (
            <LocationCard key={l.name} loc={l} active={i===idx} onClick={()=>setIdx(i)} />
          ))}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(current.address)}`}
            target="_blank" rel="noreferrer"
            className="mt-2 inline-flex justify-center rounded-full bg-brand-500 hover:bg-brand-600 text-white px-5 py-3"
          >
            Get Directions to {current.name}
          </a>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="bg-brand-50">
        <div className="container py-10 md:py-12">
          <div className="rounded-2xl border bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-brand-700">Have questions about timings or parking?</h3>
              <p className="text-gray-700 mt-1">Call us and we’ll guide you to the best slot.</p>
            </div>
            <div className="flex gap-3">
              <a href={`tel:${current.phone.replace(/\s/g,"")}`} className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-5 py-3">
                Call {current.phone}
              </a>
              <a href="https://wa.me/9913348004" target="_blank" rel="noreferrer" className="rounded-full border hover:bg-brand-50 px-5 py-3">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
