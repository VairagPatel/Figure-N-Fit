// src/lib/blogExtras.ts
const LS_KEY = "figurenfit_blog_user";
type UserState = { likes: Record<string, boolean>; saves: Record<string, boolean> };
function getState(): UserState {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "") as UserState; }
  catch { return { likes: {}, saves: {} }; }
}
function setState(s: UserState) { localStorage.setItem(LS_KEY, JSON.stringify(s)); }

export function isSaved(slug: string){ return !!getState().saves[slug]; }
export function toggleSave(slug: string){ const s = getState(); s.saves[slug] = !s.saves[slug]; setState(s); return s.saves[slug]; }

export function isLiked(slug: string){ return !!getState().likes[slug]; }
export function toggleLike(slug: string){ const s = getState(); s.likes[slug] = !s.likes[slug]; setState(s); return s.likes[slug]; }

// Optional helpers used on the post page:
export function readingTimeFromHtml(html: string) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return { words, minutes };
}
export function extractHeadings(html: string) {
  const matches = Array.from(html.matchAll(/<h(2|3)[^>]*>(.*?)<\/h\1>/gi));
  return matches.map((m, i) => ({ level: Number(m[1]), text: m[2].replace(/<[^>]+>/g,""), id: `sec-${i}` }));
}
export function injectHeadingIds(html: string) {
  let i = 0; return html.replace(/<h(2|3)([^>]*)>/gi, (_m, lvl, rest) => `<h${lvl}${rest} id="sec-${i++}">`);
}
