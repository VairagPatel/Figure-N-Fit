// src/routes/BookAppointment.tsx
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";

type SlotStatus = "available" | "booked" | "selected";

/** ========= Utilities ========= */
function SectionTitle({ eyebrow, title, center=false }:{eyebrow?:string; title:string; center?:boolean}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow ? <p className="text-brand-600">{eyebrow}</p> : null}
      <h2 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-1">{title}</h2>
    </div>
  );
}
function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** ========= Demo “already booked” data (replace with backend later) =========
 * Keyed by yyyy-mm-dd → Set of "HH:MM" strings
 */
const BOOKED: Record<string, Set<string>> = {
  // demo: a couple of days with some busy slots
  [toYMD(offsetDate(0))]: new Set(["10:00","10:30","14:00","17:30"]),
  [toYMD(offsetDate(1))]: new Set(["12:00","12:30","13:00","16:00"]),
  [toYMD(offsetDate(2))]: new Set(["11:00","11:30","15:00"]),
};
function offsetDate(d: number) { const x = new Date(); x.setDate(x.getDate()+d); return x; }
function toYMD(dt: Date) {
  const y = dt.getFullYear();
  const m = String(dt.getMonth()+1).padStart(2,"0");
  const d = String(dt.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function makeSlots(start="10:00", end="19:00", intervalMin=30): string[] {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const slots: string[] = [];
  let cur = new Date(); cur.setHours(sh, sm, 0, 0);
  const last = new Date(); last.setHours(eh, em, 0, 0);
  while (cur <= last) {
    const h = String(cur.getHours()).padStart(2,"0");
    const m = String(cur.getMinutes()).padStart(2,"0");
    slots.push(`${h}:${m}`);
    cur = new Date(cur.getTime() + intervalMin*60000);
  }
  return slots;
}

export default function BookAppointment() {
  /** ======== Form state ======== */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("Weight Loss");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<string>(() => toYMD(offsetDate(0)));
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  /** ======== Slots ======== */
  const allSlots = useMemo(() => makeSlots("10:00","19:00",30), []);
  const bookedForDay = useMemo(() => BOOKED[date] ?? new Set<string>(), [date]);
  const slotStatus = (t: string): SlotStatus =>
    selectedSlot === t ? "selected" : bookedForDay.has(t) ? "booked" : "available";

  // Auto-clear selected slot if it becomes booked after date change
  useEffect(() => {
    if (selectedSlot && bookedForDay.has(selectedSlot)) setSelectedSlot(null);
  }, [date]); // eslint-disable-line

  /** ======== Simple validation ======== */
  const errors = useMemo(() => {
    const e: Record<string,string> = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    if (!/^\+?\d[\d\s-]{6,}$/.test(phone.trim())) e.phone = "Enter a valid phone number.";
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "Enter a valid email or leave it blank.";
    if (!selectedSlot) e.slot = "Please select a time slot.";
    return e;
  }, [name, phone, email, selectedSlot]);

  function submit() {
    if (Object.keys(errors).length) { setSubmitted(true); return; }
    // “Save” (demo): mark slot as booked in memory and show a toast-ish state
    if (!BOOKED[date]) BOOKED[date] = new Set();
    BOOKED[date].add(selectedSlot!);
    setSubmitted(true);
    // clear form minimally
    setSelectedSlot(null);
    setNotes("");
    alert("Appointment requested! We’ll confirm by phone/WhatsApp shortly.");
  }

  return (
    <>
      <Helmet><title>Book Appointment — Figure ‘n Fit</title></Helmet>

      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
        <div className="container py-10 md:py-14 grid md:grid-cols-[1.1fr_1fr] gap-8 items-center">
          <div className="motion-safe:animate-fade-in-down">
            <p className="text-brand-600 font-medium">Book a consult</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-brand-900">
              Let’s design your <span className="text-brand-600">personal plan</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
              Pick a convenient slot; we’ll connect, understand your routine and goals, and build a plan you can follow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-brand-50 border">No crash diets</span>
              <span className="px-3 py-1 rounded-full bg-brand-50 border">Whole-food approach</span>
              <span className="px-3 py-1 rounded-full bg-brand-50 border">Simple habits</span>
            </div>
          </div>

          {/* Right: Info card */}
          <div className="relative motion-safe:animate-fade-in">
            <div className="rounded-2xl border bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🗓️</div>
                <div>
                  <div className="font-semibold text-brand-700">Appointment Window</div>
                  <div className="text-gray-600 text-sm">Mon–Sat • 10:00 AM – 7:00 PM</div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-green-500" /> Available</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-red-500" /> Booked</span>
                <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-brand-700" /> Selected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FORM + SLOTS ========== */}
      <section className="container pb-12 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
        {/* Form */}
        <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-soft motion-safe:animate-fade-in">
          <SectionTitle eyebrow="Your details" title="Tell us a bit about you" />
          <div className="mt-6 grid gap-4">
            <div>
              <label className="text-sm text-gray-600">Full name</label>
              <input className={cx("mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2",
                                   errors.name ? "border-red-400 focus:ring-red-300" : "focus:ring-brand-500")}
                     placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
              {submitted && errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Phone (WhatsApp preferred)</label>
                <input className={cx("mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2",
                                     errors.phone ? "border-red-400 focus:ring-red-300" : "focus:ring-brand-500")}
                       placeholder="e.g. 99133 48004" value={phone} onChange={e=>setPhone(e.target.value)} />
                {submitted && errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm text-gray-600">Email (optional)</label>
                <input className={cx("mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2",
                                     errors.email ? "border-red-400 focus:ring-red-300" : "focus:ring-brand-500")}
                       placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
                {submitted && errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Your goal</label>
                <select className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={goal} onChange={e=>setGoal(e.target.value)}>
                  <option>Weight Loss</option>
                  <option>PCOS/PCOD</option>
                  <option>Diabetes Management</option>
                  <option>Cholesterol / Heart Health</option>
                  <option>Sports Nutrition</option>
                  <option>Weight Gain</option>
                  <option>General Wellness</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600">Preferred date</label>
                <input type="date"
                  className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  min={toYMD(offsetDate(0))} max={toYMD(offsetDate(30))}
                  value={date} onChange={e=>setDate(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600">Anything we should know?</label>
              <textarea className="mt-1 w-full rounded-xl border px-4 py-3 min-h-28 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="Diet preference, schedule, health conditions, etc."
                        value={notes} onChange={e=>setNotes(e.target.value)} />
            </div>

            <div className="mt-2 flex flex-wrap gap-3">
              <button
                onClick={submit}
                className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 motion-safe:hover:animate-pulse-soft"
              >
                Request Appointment
              </button>
              <button
                type="button"
                onClick={()=>{ setName(""); setPhone(""); setEmail(""); setGoal("Weight Loss"); setNotes(""); setSelectedSlot(null); }}
                className="rounded-full border hover:bg-brand-50 px-6 py-3"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Slots */}
        <div className="rounded-2xl border bg-white p-6 md:p-8 shadow-soft motion-safe:animate-fade-in">
          <SectionTitle eyebrow="Pick a time" title="Available meeting slots" />
          <p className="text-sm text-gray-700 mt-2">
            {new Date(date).toLocaleDateString()} — choose a 30-minute slot
          </p>

          <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {allSlots.map((t) => {
              const st = slotStatus(t);
              const base = "px-3 py-2 rounded-xl border text-sm text-center transition";
              if (st === "booked") {
                return (
                  <div key={t} className={cx(base, "bg-red-100 border-red-200 text-red-700 line-through cursor-not-allowed")}>
                    {t}
                  </div>
                );
              }
              if (st === "selected") {
                return (
                  <button key={t} onClick={()=>setSelectedSlot(null)}
                          className={cx(base, "bg-brand-700 border-brand-700 text-white shadow-soft")}>
                    {t}
                  </button>
                );
              }
              return (
                <button key={t} onClick={()=>setSelectedSlot(t)}
                        className={cx(base, "bg-green-100 border-green-200 text-green-800 hover:bg-green-200")}>
                  {t}
                </button>
              );
            })}
          </div>

          {submitted && errors.slot && <p className="text-sm text-red-600 mt-3">{errors.slot}</p>}

          {/* Tiny note */}
          <div className="mt-4 text-xs text-gray-500">
            We’ll confirm your slot via phone/WhatsApp. If your chosen time clashes, we’ll offer the closest available.
          </div>
        </div>
      </section>

      {/* ========== Bottom CTA ========== */}
      <section className="relative">
        <div className="bg-brand-600">
          <div className="container py-10 md:py-14 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-extrabold">Prefer talking first?</h3>
            <p className="opacity-95 mt-2">Call us at <b>99133 48004</b> or WhatsApp — we’ll help you pick a slot.</p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <a href="tel:+919913348004" className="rounded-full bg-black px-6 py-3">Call Now</a>
              <a href="https://wa.me/9913348004" target="_blank" rel="noreferrer"
                 className="rounded-full border px-6 py-3 hover:bg-white/10">WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
