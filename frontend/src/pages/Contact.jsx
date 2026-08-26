import { useState } from "react";
import { api, formatError } from "@/lib/api";
import { toast } from "sonner";

const CATS = ["General Enquiry","Creative Agency","Studios","Academy","Events","Courses","Podcast","Wellness","Careers","Store"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", enquiry_type: "General Enquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setLoading(true);
    try { await api.post("/contact", form); setDone(true); toast.success("Message received."); }
    catch (err) { toast.error(formatError(err.response?.data?.detail) || err.message); }
    finally { setLoading(false); }
  };

  return (
    <>
      <section className="pt-24 pb-16 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overline">Contact</div>
        <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tighter text-ink mt-4 max-w-4xl">Let's create something meaningful.</h1>
      </section>

      <section className="pb-24 max-w-4xl mx-auto px-6 lg:px-8">
        {done ? (
          <div data-testid="contact-success" className="border border-terracotta-500/40 p-12">
            <div className="font-display text-3xl text-ink mb-3">Thank you.</div>
            <p className="text-ink-soft">Your message has been received. Our team will get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-5 border border-silver-200 p-8 lg:p-12">
            <input required placeholder="Name*" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} data-testid="contact-name" className="md:col-span-2 bg-transparent border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input required type="email" placeholder="Email*" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} data-testid="contact-email" className="bg-transparent border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <input placeholder="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} data-testid="contact-phone" className="bg-transparent border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <select value={form.enquiry_type} onChange={e => setForm(f => ({ ...f, enquiry_type: e.target.value }))} data-testid="contact-type" className="md:col-span-2 bg-cream-100 border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm">
              {CATS.map(c => <option key={c} value={c} className="bg-cream-100">{c}</option>)}
            </select>
            <textarea required placeholder="Message*" rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} data-testid="contact-message" className="md:col-span-2 bg-transparent border border-silver-200 focus:border-terracotta-500 outline-none px-4 py-3.5 text-sm" />
            <button disabled={loading} data-testid="contact-submit" className="md:col-span-2 mt-2 bg-terracotta-500 hover:bg-terracotta-600 text-white py-4 text-xs uppercase tracking-[0.25em] transition-colors disabled:opacity-60">{loading ? "Sending…" : "Send Message"}</button>
          </form>
        )}
      </section>
    </>
  );
}
