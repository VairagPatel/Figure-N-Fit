import { Helmet } from "react-helmet-async";
import { NavLink, useSearchParams } from "react-router-dom";
import { POSTS, CATEGORIES, ALL_TAGS } from "../data/blog";
import { isSaved } from "../lib/blogExtras";


const PAGE_SIZE = 6;

function getAllBlogs() {
  const userBlogs = JSON.parse(localStorage.getItem("userBlogs") || "[]");
  return [...userBlogs, ...POSTS]; // user blogs appear first
}

function useFilters() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") ?? "";
  const category = sp.get("category") ?? "All";
  const tag = sp.get("tag") ?? "All";
  const page = Math.max(1, parseInt(sp.get("page") ?? "1", 10));
  const sort = sp.get("sort") ?? "new"; // new | popular
  const onlySaved = sp.get("saved") === "1";

  function set(next: Record<string, string | number | undefined | boolean>) {
    const params = new URLSearchParams(sp);
    Object.entries(next).forEach(([k, v]) => {
      if (!v || v === "All" || v === 1) params.delete(k);
      else params.set(k, String(v));
    });
    if ("q" in next || "category" in next || "tag" in next || "saved" in next) params.delete("page");
    setSp(params, { replace: true });
  }

  return { q, category, tag, page, sort, onlySaved, set };
}

function BlogCard({ slug, title, cover, excerpt, date, category }:{
  slug:string; title:string; cover:string; excerpt:string; date:string; category:string;
}) {
  return (
    <NavLink to={`/blog/${slug}`} className="group rounded-2xl overflow-hidden border bg-white hover:shadow-soft transition flex flex-col">
      <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${cover})` }} />
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-xs text-brand-600">{new Date(date).toLocaleDateString()} · {category}</div>
        <h3 className="mt-1 text-lg font-semibold text-brand-700 group-hover:text-brand-600">{title}</h3>
        <p className="mt-2 text-gray-700 line-clamp-3">{excerpt}</p>
        <span className="mt-3 text-sm text-brand-600 group-hover:underline">Read more →</span>
      </div>
    </NavLink>
  );
}

function Newsletter() {
  return (
    <div className="rounded-2xl border p-5 bg-brand-50">
      <h4 className="font-semibold text-brand-700">Get weekly diet & fitness tips</h4>
      <input className="mt-3 w-full border rounded-xl px-3 py-2" placeholder="Your email" />
      <button className="mt-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white px-4 py-2">Subscribe</button>
      <p className="text-xs text-gray-500 mt-2">No spam, unsubscribe anytime.</p>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="space-y-8">
      <div className="sticky top-20 space-y-8">
        <div>
          <h4 className="font-semibold text-brand-700">Categories</h4>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map(c=>(
              <li key={c}><NavLink to={`/blog?category=${encodeURIComponent(c)}`} className="hover:text-brand-600">{c}</NavLink></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brand-700">Tags</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {ALL_TAGS.map(t=>(
              <NavLink key={t} to={`/blog?tag=${encodeURIComponent(t)}`} className="text-sm rounded-full border px-3 py-1 hover:bg-brand-50">#{t}</NavLink>
            ))}
          </div>
        </div>
        <Newsletter />
      </div>
    </aside>
  );
}

export default function BlogList() {
  const { q, category, tag, page, sort, onlySaved, set } = useFilters();

  let filtered = POSTS.filter(p => {
    const matchesQ = q ? (p.title + " " + p.excerpt + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase()) : true;
    const matchesCat = category === "All" ? true : p.category === category;
    const matchesTag = tag === "All" ? true : p.tags.includes(tag);
    const matchesSaved = onlySaved ? isSaved(p.slug) : true;
    return matchesQ && matchesCat && matchesTag && matchesSaved;
  });

  filtered = filtered.sort((a,b)=>{
    if (sort === "popular") return (b.views ?? 0) - (a.views ?? 0);
    return +new Date(b.date) - +new Date(a.date);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / (PAGE_SIZE)));
  const pageClamp = Math.min(page, totalPages);
  const start = (pageClamp - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Helmet><title>Blog — Figure ‘n Fit</title></Helmet>

      <section className="bg-brand-50">
        <div className="container py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-700">Blog</h1>
          <form onSubmit={e=>e.preventDefault()} className="mt-6 grid md:grid-cols-4 gap-3">
            <input value={q} onChange={e=>set({ q: e.target.value })} placeholder="Search posts…" className="border rounded-xl px-4 py-3 md:col-span-2" />
            <select value={sort} onChange={e=>set({ sort: e.target.value })} className="border rounded-xl px-4 py-3">
              <option value="new">Newest</option>
              <option value="popular">Most Popular</option>
            </select>
            <label className="flex items-center gap-2 justify-center border rounded-xl px-4 py-3">
              <input type="checkbox" checked={onlySaved} onChange={(e)=>set({ saved: e.target.checked ? 1 : undefined })} />
              Saved only
            </label>
          </form>
        </div>
      </section>

      <section className="container py-6 md:py-10 grid lg:grid-cols-[1fr_320px] gap-10">
        <div>
          <div className="grid gap-6 sm:grid-cols-2">
            {pageItems.map(p=> <BlogCard key={p.slug} {...p} />)}
          </div>
          {totalPages>1 && (
            <div className="mt-8 flex items-center gap-2">
              {Array.from({length: totalPages}).map((_,i)=> {
                const n = i+1;
                return (
                  <button key={n} onClick={()=>set({ page: n })}
                    className={`px-3 py-1.5 rounded border ${n===page ? "bg-brand-500 text-white border-brand-500" : "hover:bg-brand-50"}`}>
                    {n}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <Sidebar />
      </section>
    </>
  );
}
