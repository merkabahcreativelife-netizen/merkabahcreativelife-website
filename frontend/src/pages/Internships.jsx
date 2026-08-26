import { useState } from "react";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

const AREAS = ["Creative Production","Audio","Music","Video","Marketing","Social Media","Graphic Design","Events","Content","Podcast","Wellness","Technology"];

export default function Internships() {
  const [f, setF] = useState({ full_name: "", email: "", phone: "", city: "", education: "", course: "", skills: "", portfolio_url: "", linkedin_url: "", resume_url: "", cover_letter: "", why_merkabah: "", availability: "", area: "", duration: "", kind: "internship" });
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const on = (k) => (e) => setF(x => ({ ...x, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    if (!consent) { toast.error("Please accept the consent to submit."); return; }
    setLoading(true);
    try { await api.post("/careers/apply", f); setDone(true); toast.success("Application received."); }
    catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };
  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline">Merkabah Internships</div>
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-cream-50 mt-4 max-w-4xl">Start your creative journey with us.</h1>
      </section>
      <section className="pb-24 max-w-4xl mx-auto px-6 lg:px-8">
        {done ? (
          <div data-testid="internship-success" className="border border-terracotta-500/40 p-12">
            <div className="font-display text-3xl text-cream-50 mb-3">Thank you.</div>
            <p className="text-stone-300">Your application has been received. Our team will review it and reach out if we see a great fit.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-5 border border-stone-800 p-8 lg:p-12">
            {[["full_name","Full name*"],["email","Email*","email"],["phone","Phone*"],["city","City"],["education","Education"],["course","Course / Degree"]].map(([k, l, t]) => (
              <input key={k} required={l.endsWith("*")} type={t || "text"} placeholder={l} value={f[k]} onChange={on(k)} data-testid={`intern-${k}`} className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            ))}
            <input placeholder="Portfolio URL" value={f.portfolio_url} onChange={on("portfolio_url")} data-testid="intern-portfolio" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="LinkedIn URL" value={f.linkedin_url} onChange={on("linkedin_url")} data-testid="intern-linkedin" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="Resume URL (link to PDF)" value={f.resume_url} onChange={on("resume_url")} data-testid="intern-resume" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <select value={f.area} onChange={on("area")} data-testid="intern-area" className="bg-stone-900 border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm">
              <option value="" className="bg-stone-900">Preferred area…</option>
              {AREAS.map(a => <option key={a} value={a} className="bg-stone-900">{a}</option>)}
            </select>
            <input placeholder="Duration (e.g. 3 months)" value={f.duration} onChange={on("duration")} data-testid="intern-duration" className="bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <textarea placeholder="Skills (comma separated)" rows={2} value={f.skills} onChange={on("skills")} data-testid="intern-skills" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <textarea placeholder="Cover letter" rows={4} value={f.cover_letter} onChange={on("cover_letter")} data-testid="intern-cover" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <textarea placeholder="Why do you want to work with Merkabah?" rows={4} value={f.why_merkabah} onChange={on("why_merkabah")} data-testid="intern-why" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="Availability" value={f.availability} onChange={on("availability")} data-testid="intern-availability" className="md:col-span-2 bg-transparent border border-stone-800 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <label className="md:col-span-2 flex items-start gap-3 text-stone-300 text-sm">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} data-testid="intern-consent" className="mt-1 accent-terracotta-500" />
              I consent to Merkabah Creative Life storing my application details for recruitment purposes.
            </label>
            <button disabled={loading} data-testid="intern-submit" className="md:col-span-2 mt-4 bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">{loading ? "Sending…" : "Submit Application"}</button>
          </form>
        )}
      </section>
    </>
  );
}
