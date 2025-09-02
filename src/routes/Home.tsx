// src/routes/Home.tsx
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import { useMemo, useState } from "react";
import NutrientCalculator from "../components/NutrientCalculator";



/* ================== SMALL UTIL COMPONENTS ================== */
function SectionTitle({ eyebrow, title, center=false }: { eyebrow?: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow ? <p className="text-brand-600">{eyebrow}</p> : null}
      <h2 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-1">{title}</h2>
    </div>
  );
}

/* ================== HERO ================== */
function Hero() {
  // keep your existing hero image — only layout tweaks below
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-white" />
      <div className="container py-8 md:py-14">
        <div className="grid md:grid-cols-2 items-center gap-8 md:gap-12">
          <div>
            <p className="text-brand-600 font-medium">Welcome to</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-brand-900">
              Figure ‘n Fit, <span className="text-brand-600">Your Diet Clinic.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl">
              Qualified dietitians, nutritionists and lifestyle coaches—personalized diet plans for clients worldwide.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink to="/about" className="rounded-full px-6 py-3 bg-brand-500 text-white hover:bg-brand-600">
                Read More
              </NavLink>
              
              <NavLink to="/book-appointment" className="rounded-full px-6 py-3 border border-brand-300 hover:bg-brand-50">
                Book Appointment
              </NavLink>
              
            </div>
          </div>

          {/* RIGHT: keep your current hero image src — only classes changed */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop"
              alt="Healthy lifestyle"
              className="w-full h-80 md:h-[420px] rounded-2xl object-cover shadow-soft"
            />
            <div className="absolute -bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-[70%] rounded-2xl bg-white shadow-soft border p-4 flex items-center gap-4">
              <div className="text-2xl">🥗</div>
              <div className="text-sm">
                <div className="font-semibold text-brand-700">Personalized plans</div>
                <div className="text-gray-600">No crash diets · No powders</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================== TRUST STRIP (fills dead space) ================== */
function TrustStrip() {
  const items = [
    { k: "15+", v: "Years Experience" },
    { k: "10k+", v: "Transformations" },
    { k: "4+",  v: "Branches" },
    { k: "100%", v: "Personalized" },
  ];
  return (
    <section className="bg-white">
      <div className="container py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((it) => (
          <div key={it.v} className="rounded-xl border bg-brand-50/60 p-4 text-center">
            <div className="text-2xl md:text-3xl font-extrabold text-brand-700">{it.k}</div>
            <div className="text-sm text-gray-700">{it.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================== PROGRAMS GRID ================== */
type CardProps = { title: string; desc: string; href?: string; };
function ProgramCard({ title, desc, href = "/services" }: CardProps) {
  return (
    <article className="bg-white border rounded-2xl p-6 shadow-soft hover:shadow transition">
      <h3 className="text-xl font-semibold text-brand-700">{title}</h3>
      <p className="mt-2 text-gray-700">{desc}</p>
      <NavLink
        to={href}
        className="inline-block mt-6 rounded-full px-5 py-2.5 bg-brand-500 text-white hover:bg-brand-600"
      >
        Read More
      </NavLink>
    </article>
  );
}

function Programs() {
  const items: CardProps[] = [
    { title: "Go Fat Program", desc: "Lose fat sustainably with balanced meals and coaching." },
    { title: "Fight PCOD Program", desc: "Cycle-aware nutrition for PCOS/PCOD." },
    { title: "Gut Nourishment Program", desc: "Digestive comfort with fiber & trigger management." },
    { title: "Sports Nutrition", desc: "Fuel training and recovery for performance." },
    { title: "Stay Healthy", desc: "Simple, enjoyable routines for long-term health." },
    { title: "Weight Gain", desc: "Lean mass gain with whole-food plans." },
  ];
  return (
    <section className="bg-brand-50">
      <div className="container py-12 md:py-16">
        <SectionTitle eyebrow="Programs" title="How We Can Help" center />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => <ProgramCard key={it.title} {...it} />)}
        </div>
      </div>
    </section>
  );
}

/* ================== IMAGE + COPY (keep your image) ================== */
function AboutSplit() {
  return (
    <section className="container py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT: keep your image src — only layout/styling refined */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1200&auto=format&fit=crop"
            alt="Healthy food"
            className="w-full h-80 md:h-[420px] rounded-2xl shadow-soft object-cover"
          />
        </div>
        {/* RIGHT: text */}
        <div>
          <h3 className="text-4xl font-extrabold text-brand-700">You are what you eat…!!</h3>
          <div className="mt-5 space-y-4 text-gray-700 text-lg">
            <p>Eat healthy—get healthy. Eat poorly—face preventable issues. We make the healthy path simple.</p>
            <p>A balanced diet gives your body the macro & micro nutrients it needs to work effectively.</p>
            <p>Without balanced nutrition, risks rise for disease, infection, and poor energy.</p>
          </div>
          <NavLink to="/about" className="inline-block mt-8 rounded-full px-6 py-3 bg-brand-500 text-white hover:bg-brand-600">
            Read More
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* ================== 3-STEP PROCESS (compact) ================== */
function Steps() {
  const steps = [
    { n: "01", t: "Book a consult", d: "Tell us your goal, routine, and preferences." },
    { n: "02", t: "Get your plan", d: "Personalized diet + easy habit playbook." },
    { n: "03", t: "Track & adjust", d: "Light follow-ups to keep you on track." },
  ];
  return (
    <section className="bg-white">
      <div className="container py-10 md:py-14">
        <SectionTitle eyebrow="How it works" title="3 Easy Steps" center />
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {steps.map(s => (
            <div key={s.n} className="rounded-2xl border p-6 bg-white">
              <div className="text-brand-600 font-extrabold text-2xl">{s.n}</div>
              <div className="mt-2 text-xl font-bold text-brand-700">{s.t}</div>
              <p className="mt-2 text-gray-700">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== BIG CTA ================== */
function WideCTA() {
  return (
    <section className="relative">
      <div className="bg-brand-600">
        <div className="container py-12 md:py-16 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-extrabold">
            Ready to start your transformation?
          </h3>
          <p className="opacity-95 mt-3 text-lg">We’ll make it simple and sustainable.</p>
          <NavLink
            to="/book-appointment"
            className="inline-block mt-7 rounded-full px-7 py-3 bg-black text-white"
          >
            Book an Appointment
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* ================== BMI CARD (tighter, centered) ================== */
function BMIForm() {
  type Mode = "asian" | "western";
  const [mode, setMode] = useState<Mode>("asian");
  const [heightCm, setHeightCm] = useState<string>("");
  const [weightKg, setWeightKg] = useState<string>("");

  const bmi = useMemo(() => {
    const h = parseFloat(heightCm) / 100;
    const w = parseFloat(weightKg);
    if (!h || !w) return null;
    return +(w / (h * h)).toFixed(1);
  }, [heightCm, weightKg]);

  const status = useMemo(() => {
    if (!bmi) return "";
    const bands =
      mode === "asian"
        ? [
            { max: 18.4, label: "Underweight" },
            { max: 22.9, label: "Normal" },
            { max: 27.4, label: "Overweight" },
            { max: Infinity, label: "Obese" },
          ]
        : [
            { max: 18.4, label: "Underweight" },
            { max: 24.9, label: "Normal" },
            { max: 29.9, label: "Overweight" },
            { max: Infinity, label: "Obese" },
          ];
    return bands.find((b) => bmi <= b.max)?.label ?? "";
  }, [bmi, mode]);

  return (
    <section className="bg-brand-50">
      <div className="container py-12">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 md:p-8 shadow-soft">
          <SectionTitle eyebrow="Quick Tool" title="Calculate Your BMI" center />
          <div className="mt-6 flex gap-6 justify-center text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="mode" value="asian" checked={mode === "asian"} onChange={() => setMode("asian")} /> Asian
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name="mode" value="western" checked={mode === "western"} onChange={() => setMode("western")} /> Western
            </label>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-gray-600">Height (cm)</label>
              <input
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="e.g. 170"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Weight (kg)</label>
              <input
                className="mt-1 w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="e.g. 65"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-3 justify-center">
            <button onClick={(e) => e.preventDefault()} className="rounded-full bg-brand-500 text-white px-6 py-2.5 hover:bg-brand-600">
              Calculate
            </button>
            <button
              onClick={() => { setHeightCm(""); setWeightKg(""); }}
              className="rounded-full bg-gray-400 text-white px-6 py-2.5"
            >
              Reset
            </button>
          </div>

          {bmi && (
            <div className="mt-4 rounded-xl bg-brand-50 p-4 border">
              <p className="text-brand-900">
                <span className="font-semibold">BMI:</span> {bmi} — <span className="font-medium">{status}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================== TESTIMONIALS (compact wall) ================== */
function TestimonialsWall() {
  const data = [
    { name: "Daxesh Patel", text: "Excellent service and helpful Doctors and staff. Strongly recommend Figure ‘n Fit.", },
    { name: "Devang Vegad", text: "Cholesterol and weight normal in one month with their diet. Thank you!", },
    { name: "Chavada Mayur", text: "Lost 5 kg with great inch loss. Gut issues improved too.", },
  ];
  return (
    <section className="bg-white">
      <div className="container py-12 md:py-16">
        <SectionTitle eyebrow="Testimonials" title="What Our Clients Say" center />
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {data.map((t) => (
            <blockquote key={t.name} className="rounded-2xl border p-6 bg-white shadow-soft">
              <h4 className="text-lg font-semibold text-brand-700">{t.name}</h4>
              <p className="mt-2 text-gray-700">{t.text}</p>
            </blockquote>
          ))}
        </div>
        <div className="text-center mt-8">
          <NavLink to="/testimonials" className="inline-block rounded-full px-6 py-3 border hover:bg-brand-50">
            Read all reviews
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* ================== FAQ (fills space nicely) ================== */
function FAQ() {
  const faqs = [
    { q: "Will I have to stop my favorite foods?", a: "No. We plan around your routine and preferences with flexible swaps and portions." },
    { q: "Are there medicines/powders?", a: "No shakes or crash diets. Whole-food approach with simple habits." },
    { q: "How often are follow-ups?", a: "Light touch weekly check-ins and a deeper review every 10 days." },
  ];
  return (
    <section className="bg-brand-50">
      <div className="container py-12 md:py-16">
        <SectionTitle eyebrow="Questions" title="Frequently Asked" center />
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {faqs.map(f => (
            <div key={f.q} className="rounded-2xl border bg-white p-6">
              <div className="font-semibold text-brand-700">{f.q}</div>
              <p className="mt-2 text-gray-700">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================== LOCATION TEASER ================== */
function LocationTeaser() {
  return (
    <section className="bg-white">
      <div className="container py-12 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <SectionTitle eyebrow="Visit Us" title="Find a Figure ‘n Fit Near You" />
          <p className="mt-3 text-gray-700">We have multiple branches across the city. Get directions and timings.</p>
          <NavLink to="/locations" className="mt-6 inline-block rounded-full px-6 py-3 bg-brand-500 text-white hover:bg-brand-600">
            View Locations
          </NavLink>
        </div>
        <div className="rounded-2xl overflow-hidden border shadow-soft">
          {/* keep image/map placeholder; replace with your embed if you want */}
          <img
            src="https://images.unsplash.com/photo-1453873531674-2151bcd01707?q=80&w=1200&auto=format&fit=crop"
            alt="Map"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* ================== NEWSLETTER STRIP ================== */
function Newsletter() {
  return (
    <section className="bg-brand-600 text-white">
      <div className="container py-10 md:py-12 grid md:grid-cols-[1fr_auto] items-center gap-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold">Get weekly diet & fitness tips</h3>
          <p className="opacity-90 mt-1">No spam. Unsubscribe anytime.</p>
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="flex gap-3">
          <input className="rounded-full px-4 py-3 text-black w-64" placeholder="Your email" />
          <button className="rounded-full bg-black text-white px-6 py-3">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

/* ================== PAGE ================== */
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Figure ‘n Fit</title>
        <meta name="description" content="Personalized nutrition programs for fat loss, PCOS, diabetes, sports and more." />
      </Helmet>

      <Hero />
      <TrustStrip />
      <Programs />
      <AboutSplit />
      <Steps />
      <WideCTA />
      <BMIForm />
      <NutrientCalculator />
      <TestimonialsWall />
      <FAQ />
      <LocationTeaser />
      <Newsletter />
    </>
  );
}
