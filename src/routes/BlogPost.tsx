// src/routes/BlogPost.tsx
import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo, useState } from "react";
import { POSTS } from "../data/blog";
import Comments from "../components/Comments";
import {
  readingTimeFromHtml,
  extractHeadings,
  injectHeadingIds,
  isLiked,
  toggleLike,
  isSaved,
  toggleSave,
} from "../lib/blogExtras";

export default function BlogPost() {
  const { slug } = useParams();
  const idx = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[idx];

  if (!post) {
    return (
      <section className="container py-16 text-center">
        <h1 className="text-3xl font-bold">Post not found</h1>
        <NavLink to="/blog" className="underline text-brand-600 mt-3 inline-block">
          ← Back to Blog
        </NavLink>
      </section>
    );
  }

  const contentWithIds = useMemo(() => injectHeadingIds(post.content), [post.content]);
  const toc = useMemo(() => extractHeadings(post.content), [post.content]);
  const rt = useMemo(() => readingTimeFromHtml(post.content), [post.content]);

  const [liked, setLiked] = useState(isLiked(post.slug));
  const [saved, setSaved] = useState(isSaved(post.slug));

  const prev = POSTS[idx - 1];
  const next = POSTS[idx + 1];
  const related = POSTS
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} — Blog — Figure ‘n Fit</title>
      </Helmet>

      <section
        className="h-56 md:h-72 bg-center bg-cover"
        style={{ backgroundImage: `url(${post.cover})` }}
      />

      <section className="container max-w-5xl py-8 grid lg:grid-cols-[1fr_280px] gap-10">
        <article className="max-w-3xl">
          <NavLink to="/blog" className="text-sm underline text-brand-600">
            ← Back to Blog
          </NavLink>
          <h1 className="text-3xl md:text-4xl font-extrabold text-brand-700 mt-2">
            {post.title}
          </h1>
          <div className="text-sm text-gray-500 mt-1">
            {new Date(post.date).toLocaleDateString()} · {post.category} · by {post.author} ·{" "}
            {rt.minutes} min read
          </div>

          {/* actions */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setLiked(toggleLike(post.slug))}
              className={`rounded-full px-3 py-1.5 border ${
                liked ? "bg-brand-500 text-white border-brand-500" : "hover:bg-brand-50"
              }`}
            >
              ♥ Like
            </button>
            <button
              onClick={() => setSaved(toggleSave(post.slug))}
              className={`rounded-full px-3 py-1.5 border ${
                saved ? "bg-brand-500 text-white border-brand-500" : "hover:bg-brand-50"
              }`}
            >
              ★ Save
            </button>
          </div>

          <div
            className="prose prose-lg max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: contentWithIds }}
          />

          {/* author */}
          <div className="mt-10 rounded-2xl border p-5 bg-brand-50">
            <div className="font-semibold text-brand-700">{post.author}</div>
            <p className="text-sm text-gray-700 mt-1">
              Nutrition & Fitness writers at Figure ‘n Fit.
            </p>
          </div>

          {/* prev/next */}
          <div className="mt-8 flex justify-between text-sm">
            {prev ? (
              <NavLink to={`/blog/${prev.slug}`} className="underline text-brand-600">
                ← {prev.title}
              </NavLink>
            ) : (
              <span />
            )}
            {next ? (
              <NavLink to={`/blog/${next.slug}`} className="underline text-brand-600">
                {next.title} →
              </NavLink>
            ) : (
              <span />
            )}
          </div>

          <Comments slug={post.slug} />
        </article>

        {/* TOC + related */}
        <aside className="space-y-8">
          {toc.length > 0 && (
            <div className="rounded-2xl border p-5">
              <h4 className="font-semibold text-brand-700">On this page</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((h) => (
                  <li key={h.id} className={h.level === 3 ? "ml-3" : ""}>
                    <a href={`#${h.id}`} className="hover:text-brand-600">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {related.length > 0 && (
            <div className="rounded-2xl border p-5">
              <h4 className="font-semibold text-brand-700">Related</h4>
              <ul className="mt-3 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <NavLink to={`/blog/${r.slug}`} className="hover:text-brand-600">
                      {r.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
