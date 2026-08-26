import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { INSTRUMENTS } from "@/data/worlds";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

export default function AcademyProgram() {
  const { slug } = useParams();
  const ins = INSTRUMENTS[slug];
  const [form, setForm] = useState({ name: "", email: "", phone: "", age: "", instrument: ins?.name || "", experience_level: "Beginner", preferred_time: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!ins) return <Navigate to="/academy" replace />;

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await api.post("/academy/trial", form); setDone(true); toast.success("Trial class request received."); }
    catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <section className="relative min-h-[80vh] flex items-end overflow-hidden pb-20">
        <img src={ins.img} alt="" className="absolute inset-0 w-full h-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-950" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link to="/academy" data-testid="back-academy" className="text-xs uppercase tracking-[0.25em] text-terracotta-400 hover:text-terracotta-300">← Academy</Link>
          <div className="overline mt-8">{ins.tagline}</div>
          <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-9xl leading-[0.9] tracking-tighter text-cream-50 mt-4">{ins.name}</h1>
        </div>
      </section>

      <section className="py-24 max-w-4xl mx-auto px-6 lg:px-8">
        <p className="font-display text-2xl lg:text-3xl text-cream-50 leading-snug italic font-light">{ins.intro}</p>
      </section>

      <section className="py-16 border-y border-stone-900 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {ins.highlights.map(([t, d]) => (
            <div key={t} className="border border-stone-800 p-8 hover:border-terracotta-500 transition-colors">
              <div className="font-display text-2xl text-cream-50 mb-3">{t}</div>
              <p className="text-stone-400 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline mb-4">Program Structure</div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {ins.levels.map(([lvl, desc]) => (
            <div key={lvl} className="border border-stone-800 p-8">
              <div className="overline mb-2 text-terracotta-500">{lvl}</div>
              <p className="text-stone-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="trial" className="py-24 border-t border-stone-900 bg-stone-900/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="overline mb-4">Book Your Free Trial Class</div>
          <h2 className="font-display text-4xl lg:text-5xl text-cream-50 font-light tracking-tight mb-10">Come experience {ins.name} with us.</h2>
          {done ? (
            <div data-testid="trial-success" className="border border-terracotta-500/40 p-10">
              <div className="font-display text-2xl text-cream-50 mb-3">Thank you.</div>
              <p className="text-stone-300">We've received your trial class request and will reach out shortly to confirm your time slot.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
              <input required placeholder="Full name*" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))} data-testid="trial-name" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input required type="email" placeholder="Email*" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} data-testid="trial-email" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input required placeholder="Phone*" value={form.phone} onChange={(e) => setForm(f => ({ ...f, phone: e.target.value }))} data-testid="trial-phone" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <input placeholder="Age (student)" value={form.age} onChange={(e) => setForm(f => ({ ...f, age: e.target.value }))} data-testid="trial-age" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <select value={form.experience_level} onChange={(e) => setForm(f => ({ ...f, experience_level: e.target.value }))} data-testid="trial-level" className="bg-stone-900 border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm text-cream-50">
                {["Beginner","Intermediate","Advanced"].map(l => <option key={l} value={l} className="bg-stone-900">{l}</option>)}
              </select>
              <input placeholder="Preferred day/time" value={form.preferred_time} onChange={(e) => setForm(f => ({ ...f, preferred_time: e.target.value }))} data-testid="trial-time" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <textarea placeholder="Anything else we should know?" rows={3} value={form.message} onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))} data-testid="trial-message" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
              <button disabled={loading} data-testid="trial-submit" className="md:col-span-2 mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">
                {loading ? "Sending…" : "Request Free Trial"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
