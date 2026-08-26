import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

export default function Live() {
  const [events, setEvents] = useState([]);
  useEffect(() => { api.get("/content/events").then(r => setEvents(r.data)).catch(() => {}); }, []);
  const upcoming = events.filter(e => e.upcoming);
  const past = events.filter(e => !e.upcoming);
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/30 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Live</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-6">Live. Loud. Together.</h1>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">Upcoming Events</div>
        {upcoming.length === 0 ? <p className="text-stone-500">No upcoming events yet. Watch this space.</p> : (
          <div className="grid md:grid-cols-2 gap-6">
            {upcoming.map(e => (
              <Link to={`/live/${e.id}`} key={e.id} data-testid={`event-${e.id}`} className="block border border-stone-800 p-8 hover:border-terracotta-500 transition-colors">
                <div className="overline mb-2 text-terracotta-500">{e.date} · {e.time}</div>
                <div className="font-display text-3xl text-cream-50 mb-2">{e.name}</div>
                <p className="text-stone-400 mb-3">{e.venue} · {e.location}</p>
                <p className="text-stone-400 text-sm">{e.description}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
      {past.length > 0 && (
        <section className="py-16 border-t border-stone-900 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline mb-6">Past Events</div>
          <ul className="divide-y divide-stone-800">
            {past.map(e => <li key={e.id} className="py-6 flex justify-between items-center"><span className="font-display text-xl text-cream-50">{e.name}</span><span className="text-stone-500 text-sm">{e.date}</span></li>)}
          </ul>
        </section>
      )}
    </>
  );
}
