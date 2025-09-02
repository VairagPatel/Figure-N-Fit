import { useEffect, useState } from "react";

type C = { name: string; text: string; ts: number };
const k = (slug:string)=>`ff_comments_${slug}`;

export default function Comments({ slug }: { slug: string }) {
  const [list, setList] = useState<C[]>([]);
  const [name, setName] = useState(""); const [text, setText] = useState("");

  useEffect(()=>{ try{ setList(JSON.parse(localStorage.getItem(k(slug))||"[]")); }catch{} },[slug]);

  function add(){
    if(!name.trim() || !text.trim()) return;
    const next = [{ name, text, ts: Date.now() }, ...list];
    setList(next); localStorage.setItem(k(slug), JSON.stringify(next));
    setText("");
  }

  return (
    <section className="mt-10">
      <h3 className="text-xl font-bold text-brand-700">Comments</h3>
      <div className="mt-3 grid gap-3">
        <input className="border rounded-xl px-4 py-2" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
        <textarea className="border rounded-xl px-4 py-2 min-h-24" placeholder="Write a comment…" value={text} onChange={e=>setText(e.target.value)} />
        <button onClick={add} className="self-start rounded-full bg-brand-500 hover:bg-brand-600 text-white px-5 py-2">Post</button>
      </div>
      <ul className="mt-6 space-y-4">
        {list.length===0 && <li className="text-gray-500">Be the first to comment.</li>}
        {list.map((c,i)=>(
          <li key={i} className="border rounded-xl p-4">
            <div className="text-sm text-gray-500">{new Date(c.ts).toLocaleString()}</div>
            <div className="font-semibold">{c.name}</div>
            <p className="text-gray-800">{c.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
