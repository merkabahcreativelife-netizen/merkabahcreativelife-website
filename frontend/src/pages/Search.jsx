import { useState } from "react";
import { api } from "@/lib/api";
import { Search } from "lucide-react";

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState(null);
  const submit = async (e) => {
    e.preventDefault();
    if (q.length < 2) return;
    const { data } = await api.get(`/search?q=${encodeURIComponent(q)}`);
    setResults(data);
  };
  return (
    <section className="pt-24 pb-24 max-w-4xl mx-auto px-6 lg:px-8">
      <div className="overline">Search</div>
      <h1 className="font-display font-light text-5xl leading-[0.95] tracking-tighter text-cream-50 mt-4">What are you looking for?</h1>
      <form onSubmit={submit} className="mt-10 flex border-b border-stone-800 focus-within:border-terracotta-500">
        <Search size={18} className="text-stone-400 mr-3 self-center" />
        <input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search courses, events, journal, jobs, store…" data-testid="search-input" className="flex-1 bg-transparent outline-none py-4 text-lg text-cream-50" />
        <button data-testid="search-submit" className="text-xs uppercase tracking-[0.2em] text-terracotta-400 px-4">Go</button>
      </form>
      {results && (
        <div className="mt-12 space-y-10">
          {Object.keys(results).length === 0 && <p className="text-stone-500">No results found.</p>}
          {Object.entries(results).map(([coll, items]) => (
            <div key={coll}>
              <div className="overline mb-3">{coll.replace(/_/g, " ")}</div>
              <ul className="divide-y divide-stone-800">
                {items.map(i => <li key={i.id} className="py-4 text-cream-50 font-display text-lg">{i.title || i.name}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
