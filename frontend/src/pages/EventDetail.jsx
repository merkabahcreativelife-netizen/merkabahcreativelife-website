import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const [e, setE] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get(`/content/events/${id}`).then(r => setE(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div className="min-h-[60vh]" />;
  if (!e) return <div className="pt-32 pb-24 text-center text-stone-400">Event not found.</div>;
  return (
    <>
      <section className="relative min-h-[60vh] flex items-end pb-16 overflow-hidden">
        {e.image && <img src={e.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <Link to="/live" data-testid="back-live" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300"><ArrowLeft size={14}/> Merkabah Live</Link>
          <div className="overline mt-8">{e.upcoming ? "Upcoming Event" : "Past Event"}</div>
          <h1 className="font-display font-light text-4xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-cream-50 mt-4 max-w-4xl">{e.name}</h1>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <p className="text-stone-300 text-lg leading-relaxed">{e.description}</p>
        </div>
        <div className="border border-stone-800 p-8 h-fit space-y-5">
          <div className="flex items-center gap-3 text-stone-300"><Calendar size={16} className="text-terracotta-500"/>{e.date}</div>
          <div className="flex items-center gap-3 text-stone-300"><Clock size={16} className="text-terracotta-500"/>{e.time}</div>
          <div className="flex items-center gap-3 text-stone-300"><MapPin size={16} className="text-terracotta-500"/>{e.venue}{e.location ? `, ${e.location}` : ""}</div>
          {e.upcoming && (
            <Link to="/contact" data-testid="event-register" className="block text-center bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em] transition-colors mt-4">Register Interest</Link>
          )}
        </div>
      </section>
    </>
  );
}
