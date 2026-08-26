import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function Podcast() {
  const [eps, setEps] = useState([]);
  useEffect(() => { api.get("/content/podcast_episodes").then(r => setEps(r.data)).catch(() => {}); }, []);
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1552174588-6733961c358e?crop=entropy&cs=srgb&fm=jpg&q=85" alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 to-cream-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overline">Merkabah Podcast</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-6">Conversations that move ideas.</h1>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-6">Episodes</div>
        {eps.length === 0 ? <p className="text-ink-mute">First episodes coming soon. Stay tuned.</p> : (
          <div className="space-y-4">
            {eps.map(e => (
              <Link to={`/podcast/${e.id}`} key={e.id} data-testid={`episode-${e.id}`} className="block border border-cream-200 p-8 hover:border-terracotta-500 transition-colors md:flex md:items-center gap-6 group">
                <div className="font-display text-4xl text-terracotta-500 md:w-20">#{e.episode_number}</div>
                <div className="flex-1"><div className="font-display text-2xl text-ink mb-1 group-hover:text-terracotta-400 transition-colors">{e.title}</div><p className="text-ink-mute text-sm">{e.description}</p></div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <section className="py-24 border-t border-silver-200 bg-cream-100/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Become a Guest</div>
          <h2 className="font-display text-4xl lg:text-5xl text-ink font-light tracking-tight mb-6">Have a story worth a microphone?</h2>
          <p className="text-ink-mute mb-10">Artists, founders, educators and curious minds — tell us what you'd bring to the conversation.</p>
          <GuestForm />
        </div>
      </section>
    </>
  );
}

function GuestForm() {
  const [f, setF] = useState({ name: "", email: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.post("/contact", { name: f.name, email: f.email, message: `Topic: ${f.topic}\n\n${f.message}`, enquiry_type: "Podcast — Become a Guest" });
      setDone(true); toast.success("Guest request received.");
    } catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };
  if (done) return <div data-testid="guest-success" className="border border-terracotta-500/40 bg-white p-10"><div className="font-display text-2xl text-ink mb-2">Thank you.</div><p className="text-ink-mute">Our producers will review your story and reach out.</p></div>;
  return (
    <form onSubmit={submit} className="grid md:grid-cols-2 gap-5 border border-silver-200 bg-white p-8">
      <input required placeholder="Name*" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} data-testid="guest-name" className="bg-white border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
      <input required type="email" placeholder="Email*" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} data-testid="guest-email" className="bg-white border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
      <input required placeholder="Proposed topic*" value={f.topic} onChange={e => setF({ ...f, topic: e.target.value })} data-testid="guest-topic" className="md:col-span-2 bg-white border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
      <textarea required placeholder="Tell us your story*" rows={4} value={f.message} onChange={e => setF({ ...f, message: e.target.value })} data-testid="guest-message" className="md:col-span-2 bg-white border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
      <button disabled={loading} data-testid="guest-submit" className="md:col-span-2 bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">{loading ? "Sending…" : "Submit Guest Request"}</button>
    </form>
  );
}
