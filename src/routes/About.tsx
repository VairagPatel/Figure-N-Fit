// src/routes/About.tsx
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import g1 from "../assets/gallary1.jpg";
import g2 from "../assets/gallary2.jpg";
import g3 from "../assets/gallary3.jpg";
import g4 from "../assets/gallary4.jpg";
import g5 from "../assets/gallary5.jpg";
import g6 from "../assets/gallary6.jpg";
import g7 from "../assets/gallary8.jpg"; // (you have 1..6 and 8)
import g8 from "../assets/staff.jpg";     // filler; swap if you add gallary7.jpg
// Doctors + assistants
import drDrupal from "../assets/Dr. Drupal Akbari.jpg"; // works with the space; renaming to 'dr-drupal-akbari.jpg' is better
import staffHero from "../assets/staff.jpg";             // use as the other doctor's photo (or replace with the real one)
import asst1 from "../assets/asst1.jpg";
import asst2 from "../assets/asst2.jpg";


// --- Film-reel gallery helpers (TOP-LEVEL) ---
const GALLERY: string[] = [g1, g2, g3, g4, g5, g6, g7, g8];


function GalleryReel() {
  // duplicate the strip so it loops seamlessly
  const STRIP = [...GALLERY, ...GALLERY];
  return (
    <section className="bg-white">
      <div className="container py-10 md:py-14">
        <div className="text-center">
          <p className="text-brand-600">Clinic moments</p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-brand-700 mt-1">
            A peek into our world
          </h3>
        </div>

        <div className="mt-6 relative group">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="overflow-hidden rounded-2xl border shadow-soft">
            <div className="flex gap-3 md:gap-4 w-[200%] animate-reel-30s group-hover:[animation-play-state:paused] motion-reduce:animate-none">
              {STRIP.map((src, i) => (
                <div key={i} className="shrink-0 w-56 md:w-64">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div aria-hidden className="mt-3 h-1 rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.2)_2px,_transparent_2px)] bg-[length:16px_1px]" />
        </div>
      </div>
    </section>
  );
}


/** Small reusable title */
function SectionTitle({ eyebrow, title, center=false }:{
  eyebrow?: string; title: string; center?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow ? <p className="text-brand-600">{eyebrow}</p> : null}
      <h2 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-1">{title}</h2>
    </div>
  );
}

/** Badge pill */
function Pill({ children }: { children: React.ReactNode }) {
  return <span className="px-3 py-1 rounded-full bg-brand-50 border text-sm">{children}</span>;
}

/** Team card */
function TeamCard({
  name, title, img, points,
}: { name:string; title:string; img:string; points:string[] }) {
  return (
    <article className="grid md:grid-cols-[240px_1fr] gap-6 items-start rounded-2xl border bg-white p-6 shadow-soft">
      <img src={img} alt={name} className="w-full md:w-[240px] h-64 md:h-[220px] object-cover rounded-xl" />
      <div>
        <h3 className="text-2xl font-bold text-brand-700">{name}</h3>
        <p className="text-brand-600">{title}</p>
        <ul className="mt-4 grid gap-2 text-gray-800 list-disc pl-5">
          {points.map((p, i)=> <li key={i}>{p}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us — Figure ‘n Fit</title>
        <meta name="description" content="Figure ‘n Fit is a diet & lifestyle clinic focused on simple, sustainable transformations — fat loss, PCOS, diabetes, sports nutrition and more." />
      </Helmet>

      {/* HERO */}
      <section className="bg-brand-50 border-b">
        <div className="container py-12 md:py-16 grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div>
            <p className="text-brand-600 font-medium">About Figure ‘n Fit</p>
            <h1 className="mt-2 text-4xl md:text-5xl font-extrabold leading-tight text-brand-900">
              Sustainable nutrition, <span className="text-brand-600">for real life.</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
              We blend medical expertise with everyday practicality so you can eat well, feel great,
              and maintain results — without crash diets or supplements.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Personalized Diets</Pill>
              <Pill>Lifestyle Coaching</Pill>
              <Pill>Evidence-Based</Pill>
              <Pill>India-friendly Meals</Pill>
            </div>
            <div className="mt-7 flex gap-3">
              <NavLink to="/services" className="rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3">Explore Programs</NavLink>
              <NavLink to="/book-appointment" className="rounded-full border px-6 py-3 hover:bg-brand-50">Book Appointment</NavLink>
            </div>
          </div>
          <div>
            {/* keep your image if you have one; this is a safe placeholder */}
            <img
              src="https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=1300&auto=format&fit=crop"
              alt="About Figure ‘n Fit"
              className="w-full h-80 md:h-[420px] object-cover rounded-2xl shadow-soft"
            />
          </div>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="container py-12 md:py-16">
        <SectionTitle eyebrow="Our approach" title="What makes us different" center />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Simple & Enjoyable", d: "Meals you like, easy prep, flexible plans you can actually follow." },
            { t: "Medical + Practical", d: "Dietitians coordinate with health needs — PCOS, diabetes, cholesterol." },
            { t: "Habits over Hacks", d: "We build routine & mindset so results stick long-term." },
            { t: "Follow-ups that Fit", d: "Light, regular check-ins to adjust plans without pressure." },
          ].map((x)=>(
            <div key={x.t} className="rounded-2xl border bg-white p-6">
              <div className="text-xl font-bold text-brand-700">{x.t}</div>
              <p className="mt-2 text-gray-700">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="bg-white">
        <div className="container py-12 md:py-16">
          <SectionTitle eyebrow="Our story" title="From a small clinic to many happy transformations" center />
          <div className="mt-8 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-100" />
            <div className="space-y-8">
              {[
                { y: "2010", t: "Clinic founded", d: "Started with a simple mission: make healthy eating realistic and personal." },
                { y: "2015", t: "Expanded programs", d: "Added PCOS, diabetes care and sports nutrition with structured protocols." },
                { y: "2020", t: "Tele-nutrition", d: "Began serving clients worldwide with flexible, online coaching." },
                { y: "2024→", t: "Thousands empowered", d: "10k+ transformations across fat loss, health markers and performance." },
              ].map((ev, i)=>(
                <div key={ev.y} className={`grid md:grid-cols-2 gap-6 items-start ${i%2 ? "md:text-right" : ""}`}>
                  <div className={`md:col-start-1 ${i%2 ? "md:col-start-1" : "md:col-start-1 md:order-2"}`}>
                    <div className="relative pl-10 md:pl-0 md:pr-10">
                      <span className="absolute left-0 md:left-auto md:right-0 top-2 h-3 w-3 rounded-full bg-brand-500" />
                      <div className="text-brand-600 font-semibold">{ev.y}</div>
                      <div className="text-xl font-bold text-brand-700">{ev.t}</div>
                      <p className="text-gray-700 mt-1">{ev.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-brand-50">
        <div className="container py-8 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "15+", v: "Years Experience" },
            { k: "10k+", v: "Transformations" },
            { k: "4+",  v: "Branches" },
            { k: "100%", v: "Personalized" },
          ].map((s)=>(
            <div key={s.v} className="rounded-xl border bg-white p-5 text-center shadow-soft">
              <div className="text-2xl md:text-3xl font-extrabold text-brand-700">{s.k}</div>
              <div className="text-sm text-gray-700">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

            {/* DOCTOR SPOTLIGHT – two parallel sections */} 
      <section className="container py-10 md:py-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-700">Our Doctors</h2>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Dt. Drupal Akbari */}
          <article className="rounded-2xl border bg-white shadow-soft overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img src={drDrupal} alt="Dt. Drupal Akbari" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-brand-700">Dt. Drupal Akbari</h3>
              <p className="text-gray-700 mt-1">
                Clinical Dietitian & Lifestyle Coach. Plans focused on sustainable habits, balanced nutrition and real-life routines.
              </p>
            </div>
          </article>

          {/* Second doctor */}
          <article className="rounded-2xl border bg-white shadow-soft overflow-hidden">
            <div className="relative aspect-[4/3]">
              <img src={staffHero} alt="Senior Doctor" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-brand-700">Dr. Manish Akbari</h3>
              <p className="text-gray-700 mt-1">
                Senior Consultant. Special interest in metabolic health, diabetes and sports nutrition.
              </p>
            </div>
          </article>
        </div>
      </section>


      {/* ASSISTANTS SECTION */}
      <section className="bg-brand-50">
        <div className="container py-12 md:py-16">
          <SectionTitle eyebrow="Our Team" title="Dedicated Assistants" center />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Priya Patel", role: "Nutrition Assistant", img: asst1, skills: ["Meal Planning", "Client Support"] },
              { name: "Rohan Mehta", role: "Lifestyle Coach Assistant", img: asst2, skills: ["Follow-ups", "Diet Tracking"] },
              { name: "Staff Member", role: "Support Staff", img: staffHero, skills: ["Scheduling", "Client Care"] },
            ].map((a) => (
              <article key={a.name} className="rounded-2xl border bg-white shadow-soft p-6 text-center">
                <div className="relative mx-auto w-32 h-32 rounded-full overflow-hidden border">
                  <img src={a.img} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-700">{a.name}</h3>
                <p className="text-brand-600 text-sm">{a.role}</p>
                <ul className="mt-3 text-sm text-gray-700 space-y-1">
                  {a.skills.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* CERTIFICATIONS / AFFILIATIONS */}
      <section className="bg-white">
        <div className="container py-12">
          <SectionTitle eyebrow="Trust" title="Certifications & Associations" center />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {["FSSAI compliant", "ISSA", "IDA", "WHO nutrition guidelines aligned"].map((b)=>(
              <span key={b} className="px-4 py-2 rounded-full border bg-brand-50">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-50">
        <div className="container py-12 md:py-16">
          <SectionTitle eyebrow="Questions" title="FAQs" center />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Do you prescribe medicines or powders?",
                a: "No. We work with whole foods and sustainable habits. If you’re under a doctor’s care, we coordinate with them."
              },
              {
                q: "Can I follow this with a busy schedule?",
                a: "Yes. Plans are built around your routine with easy swaps, eating-out guidance, and batch-prep tips."
              },
              {
                q: "How often are follow-ups?",
                a: "Weekly light check-ins, plus deeper reviews every 10–14 days based on progress and feedback."
              },
              {
                q: "Do you handle PCOS/diabetes/cholesterol?",
                a: "Yes. We tailor carbs, protein, fiber and timing to your clinical needs and lab markers."
              },
            ].map((f)=>(
              <details key={f.q} className="rounded-2xl border bg-white p-5">
                <summary className="cursor-pointer font-semibold text-brand-700">{f.q}</summary>
                <p className="mt-2 text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Film-reel gallery */}
<GalleryReel />

            
      {/* CTA */}
      <section className="relative">
        <div className="bg-brand-600">
          <div className="container py-12 md:py-16 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-extrabold">Let’s build your plan together</h3>
            <p className="opacity-95 mt-2">Book a consult — we’ll keep it simple and sustainable.</p>
            <NavLink to="/book-appointment" className="inline-block mt-6 rounded-full bg-black px-7 py-3">Book Appointment</NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
