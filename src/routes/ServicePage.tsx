import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SERVICES } from "../data/services";

export default function ServicePage() {
  const { slug } = useParams();
  const svc = SERVICES.find((s) => s.slug === slug);

  if (!svc) {
    return (
      <section className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <NavLink to="/services" className="underline text-brand-600 mt-3 inline-block">
          Back to all programs
        </NavLink>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{svc.title} — Programs — Figure ‘n Fit</title>
      </Helmet>

      {/* Banner */}
      <section
        className="h-48 md:h-64 bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${svc.heroImage})` }}
      >
        <h1 className="text-4xl font-extrabold text-brand-600 bg-white/70 px-6 py-2 rounded-xl">
          {svc.title}
        </h1>
      </section>

      {/* Ideal for strip */}
      <section className="bg-brand-500 text-white">
        <div className="container py-6 text-center">
          <h2 className="text-2xl font-extrabold">Ideal for:</h2>
          <p className="opacity-95 mt-1">{svc.idealFor}</p>
        </div>
      </section>

      {/* Image + Features */}
      <section className="container py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* LEFT image */}
          <img
            src={svc.thumb}
            alt={svc.title}
            className="rounded-2xl shadow-soft object-cover w-full h-[360px]"
          />
          {/* RIGHT features box */}
          <div className="rounded-2xl p-6 border-2 border-dashed border-brand-500">
            <h3 className="text-2xl font-bold text-brand-700">Program Features</h3>
            <ul className="mt-4 space-y-3">
              {svc.features.map((f) => (
                <li key={f} className="flex gap-3 text-gray-800">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-brand-400 text-brand-600">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {svc.extras?.length ? (
              <>
                <h4 className="mt-6 font-semibold text-brand-700">You will also get:</h4>
                <ul className="mt-2 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                  {svc.extras.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-gray-800">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-brand-400 text-brand-600">✓</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>

        {/* Description */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-brand-700">Program Description</h3>
          <div className="prose max-w-none mt-3">
            {svc.description.map((p) => (
              <p key={p} className="text-gray-800">{p}</p>
            ))}
          </div>
        </div>

        {/* Package select (styled like screenshot) */}
        <div className="mt-8">
          <label className="mr-3 font-semibold">Package</label>
          <select className="rounded-full border-2 border-brand-400 px-5 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option>Choose an option</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>
        </div>

        <div className="mt-10">
          <NavLink
            to="/book-appointment"
            className="inline-block rounded-full bg-brand-500 hover:bg-brand-600 text-white px-6 py-3"
          >
            Book this Program
          </NavLink>
          <NavLink to="/services" className="ml-4 underline text-brand-600">
            Back to all programs
          </NavLink>
        </div>
      </section>
    </>
  );
}
