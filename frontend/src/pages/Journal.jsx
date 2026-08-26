import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { JOURNAL_IMG } from "@/data/worlds";

export default function Journal() {
  const [items, setItems] = useState([]);
  useEffect(() => { api.get("/content/articles").then(r => setItems(r.data)).catch(() => {}); }, []);
  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline">Merkabah Journal</div>
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-4">Stories on music, creativity & meaning.</h1>
      </section>
      <section className="pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {items.length === 0 ? <p className="text-stone-500">First articles coming soon.</p> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(a => (
              <article key={a.id} className="border border-stone-800 hover:border-terracotta-500 transition-colors">
                <img src={a.cover || JOURNAL_IMG} alt={a.title} className="aspect-[4/3] w-full object-cover"/>
                <div className="p-6">
                  <div className="overline mb-2">{a.category}</div>
                  <div className="font-display text-2xl text-cream-50 mb-2">{a.title}</div>
                  <p className="text-stone-400 text-sm">{a.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
