import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

const CATS = ["All","Music","Creative Skills","Technology","Digital Media","Business","Personal Development","Special Workshops"];

export default function Courses() {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState("All");
  useEffect(() => { api.get("/content/courses").then(r => setItems(r.data)).catch(() => {}); }, []);
  const filtered = cat === "All" ? items : items.filter(i => (i.category || "Music") === cat);
  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline">Merkabah Courses & Workshops</div>
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">Learn something that moves you forward.</h1>
      </section>
      <section className="pb-8 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => <button key={c} onClick={() => setCat(c)} data-testid={`courses-cat-${c}`} className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${cat === c ? "bg-terracotta-500 border-terracotta-500 text-white" : "border-cream-200 text-ink-mute hover:border-terracotta-500"}`}>{c}</button>)}
        </div>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {filtered.length === 0 ? <p className="text-ink-mute mt-10">No courses in this category yet.</p> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map(c => (
              <Link to={`/courses/${c.id}`} key={c.id} data-testid={`course-${c.id}`} className="block border border-silver-200 bg-white p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" style={{ borderTop: "3px solid #c9a227" }}>
                <div className="overline mb-2">{c.level} · {c.mode}</div>
                <div className="font-display text-2xl text-ink mb-2">{c.title}</div>
                <p className="text-ink-mute text-sm mb-4">{c.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-terracotta-600 text-sm font-semibold">{c.price}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-mute">View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
