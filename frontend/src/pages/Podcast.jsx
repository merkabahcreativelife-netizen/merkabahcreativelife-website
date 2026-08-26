import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function Podcast() {
  const [eps, setEps] = useState([]);
  useEffect(() => { api.get("/content/podcast_episodes").then(r => setEps(r.data)).catch(() => {}); }, []);
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552174588-6733961c358e?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Podcast</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-6">Conversations that move ideas.</h1>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">Episodes</div>
        {eps.length === 0 ? <p className="text-stone-500">First episodes coming soon. Stay tuned.</p> : (
          <div className="space-y-4">
            {eps.map(e => (
              <div key={e.id} className="border border-stone-800 p-8 hover:border-terracotta-500 transition-colors flex flex-col md:flex-row md:items-center gap-6">
                <div className="font-display text-4xl text-terracotta-500 md:w-20">#{e.episode_number}</div>
                <div className="flex-1"><div className="font-display text-2xl text-cream-50 mb-1">{e.title}</div><p className="text-stone-400 text-sm">{e.description}</p></div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
